import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CookiePreferencesButton } from "@/components/CookiePreferencesButton";
import { CONTACT_ADDRESS, CONTACT_EMAIL, PRIVACY_POLICY_HREF } from "@/lib/legal";
import { GA_MEASUREMENT_ID } from "@/lib/cookieConsent";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Quali cookie usa il sito di Gymme, a cosa servono e come gestire le tue preferenze.",
  alternates: { canonical: "/cookie-policy" },
  robots: { index: false, follow: true },
};

interface CookieRow {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
}

const GA_COOKIES: CookieRow[] = [
  {
    name: "_ga",
    provider: "Google Ireland Ltd.",
    purpose: "Distingue gli utenti per il calcolo delle statistiche",
    duration: "~2 anni",
  },
  {
    name: `_ga_${GA_MEASUREMENT_ID.replace(/^G-/, "")}`,
    provider: "Google Ireland Ltd.",
    purpose: "Mantiene lo stato della sessione per questa proprietà",
    duration: "~2 anni",
  },
];

const CLARITY_COOKIES: CookieRow[] = [
  {
    name: "_clck",
    provider: "Microsoft Ireland Operations Ltd.",
    purpose: "Riconosce il browser tra una visita e l'altra",
    duration: "1 anno",
  },
  {
    name: "_clsk",
    provider: "Microsoft Ireland Operations Ltd.",
    purpose: "Collega le pagine visitate in un'unica sessione",
    duration: "1 giorno",
  },
];

const headingClass = "font-[family-name:var(--font-unbounded)] text-xl font-bold tracking-[-0.5px]";
const bodyClass = "text-base leading-relaxed text-[#1b1b1b]/65";
const linkClass = "underline underline-offset-2 hover:text-[#1b1b1b]";

function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="mt-2 overflow-x-auto rounded-2xl border border-black/10 bg-white">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead>
          <tr className="border-b border-black/10 bg-black/[0.03]">
            <th className="px-4 py-2.5 font-bold">Nome</th>
            <th className="px-4 py-2.5 font-bold">Fornitore</th>
            <th className="px-4 py-2.5 font-bold">Finalità</th>
            <th className="px-4 py-2.5 font-bold">Durata</th>
          </tr>
        </thead>
        <tbody className="text-[#1b1b1b]/65">
          {rows.map((row, i) => (
            <tr key={row.name} className={i < rows.length - 1 ? "border-b border-black/10" : undefined}>
              <td className="px-4 py-2.5 font-mono text-xs text-[#1b1b1b]">{row.name}</td>
              <td className="px-4 py-2.5">{row.provider}</td>
              <td className="px-4 py-2.5">{row.purpose}</td>
              <td className="px-4 py-2.5">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={linkClass}>
      {children}
    </a>
  );
}

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen w-full font-[family-name:var(--font-plus-jakarta)] text-[#1b1b1b]">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-16">
        <Link href="/" className="inline-flex w-fit items-center">
          <Image
            src="/themes/gymme/assets2/images/logo-all-black.svg"
            alt="Gymme"
            width={110}
            height={28}
            className="h-7 w-auto"
          />
        </Link>

        <div>
          <h1 className="font-[family-name:var(--font-unbounded)] text-3xl font-bold tracking-[-1px] sm:text-4xl">
            Cookie Policy
          </h1>
          <p className="mt-2 text-sm text-[#1b1b1b]/50">Ultimo aggiornamento: 23 settembre 2026</p>
        </div>

        <p className={bodyClass}>
          Questa pagina descrive i cookie e le tecnologie simili usate sul sito di{" "}
          <strong className="text-[#1b1b1b]">Gymme</strong>, come li usiamo e come puoi gestire le
          tue preferenze.
        </p>

        <section className="flex flex-col gap-2">
          <h2 className={headingClass}>Cosa sono i cookie</h2>
          <p className={bodyClass}>
            I cookie sono piccoli file di testo che i siti che visiti salvano sul tuo dispositivo.
            Servono a far funzionare correttamente il sito, a ricordare le tue preferenze o, se lo
            autorizzi, a misurare il traffico e capire come viene usato il sito per migliorarlo.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className={headingClass}>Titolare del trattamento</h2>
          <p className={bodyClass}>
            weBeetle S.r.l., {CONTACT_ADDRESS} —{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={headingClass}>Le categorie di cookie che usiamo</h2>

          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-bold">Necessari</h3>
            <p className={bodyClass}>
              Indispensabili al funzionamento del sito. Comprendono, ad esempio, la memorizzazione
              nel tuo browser (tramite localStorage) della scelta che fai sul banner dei cookie,
              così da non richiedertela a ogni visita. Non richiedono consenso e non possono essere
              disattivati.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-bold">Misurazione</h3>
            <p className={bodyClass}>
              Usiamo <strong>Google Analytics</strong> per raccogliere statistiche aggregate sulle
              visite e <strong>Microsoft Clarity</strong> per capire come vengono usate le pagine
              (ad esempio tramite mappe di calore e registrazioni anonime delle sessioni di
              navigazione). Questi strumenti vengono caricati solo se acconsenti alla categoria
              &quot;Misurazione&quot;; con il tuo consenso salviamo inoltre nel browser (tramite
              localStorage) se hai già visitato il sito e l&apos;eventuale codice della campagna da
              cui provieni.
            </p>

            <p className="mt-2 text-sm font-bold">Google Analytics</p>
            <CookieTable rows={GA_COOKIES} />
            <p className={`mt-2 ${bodyClass}`}>
              Per maggiori informazioni su come Google tratta questi dati, consulta la{" "}
              <ExternalLink href="https://policies.google.com/privacy">
                informativa sulla privacy di Google
              </ExternalLink>
              .
            </p>

            <p className="mt-4 text-sm font-bold">Microsoft Clarity</p>
            <CookieTable rows={CLARITY_COOKIES} />
            <p className={`mt-2 ${bodyClass}`}>
              Clarity può impostare anche alcuni cookie sui domini di Microsoft (ad esempio{" "}
              <code className="font-mono text-sm">CLID</code> e{" "}
              <code className="font-mono text-sm">MUID</code>). Per maggiori informazioni consulta
              l&apos;{" "}
              <ExternalLink href="https://www.microsoft.com/it-it/privacy/privacystatement">
                informativa sulla privacy di Microsoft
              </ExternalLink>
              .
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className={headingClass}>Come gestire le tue preferenze</h2>
          <p className={bodyClass}>
            Puoi accettare, rifiutare o personalizzare in qualsiasi momento le categorie di cookie
            non necessari, anche dopo la prima scelta.
          </p>
          <CookiePreferencesButton className="mt-2 inline-flex h-12 w-fit cursor-pointer items-center justify-center rounded-full bg-[#1b1b1b] px-7 text-base font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#1b1b1b]/90">
            Gestisci le preferenze cookie
          </CookiePreferencesButton>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className={headingClass}>Altri trattamenti di dati</h2>
          <p className={bodyClass}>
            Per sapere come trattiamo i dati che ci invii, ad esempio tramite il form di richiesta
            demo, consulta la nostra{" "}
            <ExternalLink href={PRIVACY_POLICY_HREF}>Privacy Policy</ExternalLink>.
          </p>
        </section>

        <Link href="/" className="mt-4 text-sm font-semibold text-[#1b1b1b]/60 underline">
          Torna alla home
        </Link>
      </div>
    </main>
  );
}
