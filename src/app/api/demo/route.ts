import { NextResponse } from "next/server";

/**
 * Forwards a demo request to the Flowrty intake API, server-side.
 *
 * The browser never sees the link token or the API secret: submitting from the
 * client would require the page origin to be in the link's allowed origins, and
 * would put the credentials in the bundle. Server-to-server sidesteps both.
 */

const BASE_URL = process.env.FLOWRTY_BASE_URL;
const LINK_TOKEN = process.env.FLOWRTY_LINK_TOKEN;
const API_KEY = process.env.FLOWRTY_API_KEY;

/**
 * Maps the demo form's answers onto the start-form field keys of the workflow.
 *
 * These keys must match the workflow's start form exactly, or the submit fails
 * validation. Check the current keys with:
 *   curl "$FLOWRTY_BASE_URL/public/links/$FLOWRTY_LINK_TOKEN/form"
 */
const FIELD_KEYS = {
  name: "nome",
  profession: "professione",
  followMode: "clienti",
  collaboration: "collaboratori",
  contactEmail: "email",
  contactPhone: "phone",
  timeSlot: "fascia_oraria",
  consentContact: "consenso_contatto",
  consentPrivacy: "consenso_privacy",
} as const;

/** Human-readable values — the start form stores option labels, not our codes. */
const PROFESSION_LABELS: Record<string, string> = {
  pt: "Personal Trainer",
  nutrizionista: "Nutrizionista / Dietista",
  osteopata: "Osteopata / Fisioterapista",
  studio: "Studio / Team multidisciplinare",
  altro: "Altro",
};

const FOLLOW_MODE_LABELS: Record<string, string> = {
  in_sala: "In sala",
  online: "Online",
  ibrido: "Ibrido",
};

const COLLABORATION_LABELS: Record<string, string> = {
  spesso: "Spesso",
  ogni_tanto: "Ogni tanto",
  raramente: "Raramente",
  mai: "Mai",
};

const TIME_SLOT_LABELS: Record<string, string> = {
  mattina: "Mattina (10:00 - 12:00)",
  pomeriggio: "Pomeriggio (15:00 - 18:00)",
  sera: "Sera (18:00 - 20:00)",
};

interface DemoPayload {
  name: string;
  profession: string;
  professionOther: string;
  followMode: string;
  collaboration: string;
  contactEmail: string;
  contactPhone: string;
  timeSlot: string | null;
  consentContact: boolean;
  consentPrivacy: boolean;
}

function isValid(body: unknown): body is DemoPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim() !== "" &&
    typeof b.profession === "string" &&
    b.profession in PROFESSION_LABELS &&
    typeof b.followMode === "string" &&
    b.followMode in FOLLOW_MODE_LABELS &&
    typeof b.collaboration === "string" &&
    b.collaboration in COLLABORATION_LABELS &&
    typeof b.contactEmail === "string" &&
    typeof b.contactPhone === "string" &&
    b.consentContact === true &&
    b.consentPrivacy === true &&
    (b.timeSlot === null || (typeof b.timeSlot === "string" && b.timeSlot in TIME_SLOT_LABELS))
  );
}

/** Turns an upstream failure into something safe to show the visitor. */
async function upstreamMessage(res: Response): Promise<string> {
  if (res.status === 429) return "Troppe richieste — riprova tra qualche minuto.";
  if (res.status === 400 || res.status === 422) {
    return "Alcuni dati non sono validi. Controlla i campi e riprova.";
  }
  return "Non siamo riusciti a inviare la richiesta. Riprova tra poco.";
}

export async function POST(request: Request) {
  if (!BASE_URL || !LINK_TOKEN || !API_KEY) {
    console.error("Flowrty intake is not configured — missing env vars.");
    return NextResponse.json(
      { error: "Il modulo non è al momento disponibile. Riprova più tardi." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json({ error: "Alcuni campi obbligatori mancano." }, { status: 400 });
  }

  const email = body.contactEmail.trim();
  const phone = body.contactPhone.trim();
  if (!email && !phone) {
    return NextResponse.json(
      { error: "Inserisci almeno un contatto — email o telefono." },
      { status: 400 }
    );
  }

  const professionLabel =
    body.profession === "altro" && body.professionOther.trim()
      ? `Altro — ${body.professionOther.trim()}`
      : PROFESSION_LABELS[body.profession];

  // All start-form fields are `short_text` (or typed email/phone) — none are
  // checkbox/select, so every value here is a plain string, including consent.
  const data: Record<string, string> = {
    [FIELD_KEYS.name]: body.name.trim(),
    [FIELD_KEYS.profession]: professionLabel,
    [FIELD_KEYS.followMode]: FOLLOW_MODE_LABELS[body.followMode],
    [FIELD_KEYS.collaboration]: COLLABORATION_LABELS[body.collaboration],
    [FIELD_KEYS.contactEmail]: email,
    [FIELD_KEYS.contactPhone]: phone,
    [FIELD_KEYS.consentContact]: "Sì",
    [FIELD_KEYS.consentPrivacy]: "Sì",
  };

  if (body.timeSlot) {
    data[FIELD_KEYS.timeSlot] = TIME_SLOT_LABELS[body.timeSlot];
  }

  const title = `Richiesta demo — ${body.name.trim()} (${professionLabel})`;
  const url = `${BASE_URL.replace(/\/+$/, "")}/public/links/${encodeURIComponent(LINK_TOKEN)}/submit`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Flowrty-Api-Key": API_KEY,
      },
      body: JSON.stringify({ title, data }),
    });
  } catch (error) {
    console.error("Flowrty intake unreachable:", error);
    return NextResponse.json(
      { error: "Non siamo riusciti a inviare la richiesta. Riprova tra poco." },
      { status: 502 }
    );
  }

  if (!res.ok) {
    console.error(`Flowrty intake rejected the submit (${res.status}):`, await res.text());
    return NextResponse.json({ error: await upstreamMessage(res) }, { status: 502 });
  }

  const out = (await res.json()) as { taskCode?: string };
  return NextResponse.json({ ok: true, taskCode: out.taskCode ?? null });
}
