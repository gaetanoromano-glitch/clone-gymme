"use client";

import { useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatedButton } from "@/components/AnimatedButton";
import {
  Barbell,
  ForkKnife,
  FirstAid,
  UsersThree,
  DotsThreeCircle,
  Handshake,
  UserCircle,
  XCircle,
  Sun,
  SunHorizon,
  MoonStars,
  Envelope,
  Phone,
  User,
  CaretLeft,
  CaretRight,
  Check,
  ArrowLeft,
} from "@phosphor-icons/react";

type Profession = "pt" | "nutrizionista" | "osteopata" | "studio" | "altro";
type FollowMode = "in_sala" | "online" | "ibrido";
type Collaboration = "spesso" | "ogni_tanto" | "raramente" | "mai";
type TimeSlot = "mattina" | "pomeriggio" | "sera";

const PROFESSION_LABELS: Record<Profession, string> = {
  pt: "Personal Trainer",
  nutrizionista: "Nutrizionista / Dietista",
  osteopata: "Osteopata / Fisioterapista",
  studio: "Studio / Team multidisciplinare",
  altro: "Altro",
};

const inputStyle: CSSProperties = {
  width: "100%",
  height: "42px",
  borderRadius: "9999px",
  border: "1.5px solid rgba(0,0,0,0.12)",
  backgroundColor: "rgba(0,0,0,0.03)",
  padding: "0 16px",
  fontSize: "14px",
  fontFamily: "Plus Jakarta Sans, sans-serif",
  color: "#1b1b1b",
  outline: "none",
};

const focusRingClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <p
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "#1b1b1b",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          lineHeight: 1.35,
          margin: 0,
        }}
      >
        {label}
      </p>
      {children}
      {error && (
        <p
          style={{
            fontSize: "12px",
            color: "#dc2626",
            fontFamily: "Plus Jakarta Sans, sans-serif",
            margin: 0,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  label,
  description,
  icon,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={focusRingClass}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "100%",
        textAlign: "left",
        padding: "9px 14px",
        borderRadius: "12px",
        border: selected ? "1.5px solid #7C5CFF" : "1.5px solid rgba(0,0,0,0.1)",
        backgroundColor: selected ? "rgba(124,92,255,0.06)" : "#ffffff",
        cursor: "pointer",
        transition: "border-color 0.2s ease, background-color 0.2s ease",
      }}
    >
      {icon && (
        <span
          style={{
            display: "flex",
            flexShrink: 0,
            color: selected ? "#7C5CFF" : "rgba(27,27,27,0.55)",
            transition: "color 0.2s ease",
          }}
        >
          {icon}
        </span>
      )}
      <span style={{ flex: 1 }}>
        <span
          style={{
            display: "block",
            fontSize: "13.5px",
            fontWeight: 600,
            color: "#1b1b1b",
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
        >
          {label}
        </span>
        {description && (
          <span
            style={{
              display: "block",
              fontSize: "11.5px",
              color: "rgba(27,27,27,0.55)",
              marginTop: "1px",
              fontFamily: "Plus Jakarta Sans, sans-serif",
            }}
          >
            {description}
          </span>
        )}
      </span>
      <span
        style={{
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          border: selected ? "none" : "1.5px solid rgba(0,0,0,0.2)",
          backgroundColor: selected ? "#7C5CFF" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {selected && <Check size={11} weight="bold" color="#ffffff" />}
      </span>
    </button>
  );
}

function ImageOptionCard({
  selected,
  onClick,
  image,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  image: string;
  label: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={focusRingClass}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        padding: "10px 6px 8px",
        borderRadius: "12px",
        border: selected ? "1.5px solid #7C5CFF" : "1.5px solid rgba(0,0,0,0.1)",
        backgroundColor: selected ? "rgba(124,92,255,0.06)" : "#ffffff",
        cursor: "pointer",
        transition: "border-color 0.2s ease, background-color 0.2s ease",
      }}
    >
      <Image src={image} alt="" width={34} height={48} unoptimized style={{ height: "34px", width: "auto" }} />
      <span
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "#1b1b1b",
          fontFamily: "Plus Jakarta Sans, sans-serif",
        }}
      >
        {label}
      </span>
    </button>
  );
}

function ConsentCheckbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={focusRingClass}
        style={{
          width: "18px",
          height: "18px",
          borderRadius: "6px",
          flexShrink: 0,
          marginTop: "1px",
          border: checked ? "none" : "1.5px solid rgba(0,0,0,0.25)",
          backgroundColor: checked ? "#1b1b1b" : "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
        }}
      >
        {checked && <Check size={12} weight="bold" color="#ffffff" />}
      </button>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        style={{
          fontSize: "12.5px",
          color: "rgba(27,27,27,0.75)",
          lineHeight: 1.45,
          fontFamily: "Plus Jakarta Sans, sans-serif",
          textAlign: "left",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        {children}
      </button>
    </div>
  );
}

export default function DemoPage() {
  const [step, setStep] = useState<1 | 2>(1);

  // ── Step 1 — Profilo ──
  const [profession, setProfession] = useState<Profession | null>(null);
  const [professionOther, setProfessionOther] = useState("");
  const [followMode, setFollowMode] = useState<FollowMode | null>(null);
  const [collaboration, setCollaboration] = useState<Collaboration | null>(null);
  const [step1Errors, setStep1Errors] = useState<{
    profession?: string;
    followMode?: string;
    collaboration?: string;
  }>({});

  // ── Step 2 — Contatto per demo ──
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [timeSlot, setTimeSlot] = useState<TimeSlot | null>(null);
  const [consentContact, setConsentContact] = useState(false);
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [step2Errors, setStep2Errors] = useState<{
    name?: string;
    contact?: string;
    consentContact?: string;
    consentPrivacy?: string;
  }>({});

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateStep1 = () => {
    const next: typeof step1Errors = {};
    if (!profession) next.profession = "Seleziona la tua professione principale";
    else if (profession === "altro" && !professionOther.trim())
      next.profession = "Specifica la tua professione";
    if (!followMode) next.followMode = "Seleziona come segui i tuoi clienti";
    if (!collaboration) next.collaboration = "Seleziona un'opzione";
    setStep1Errors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const validateStep2 = () => {
    const next: typeof step2Errors = {};
    const emailTrim = contactEmail.trim();
    const phoneTrim = contactPhone.trim();

    if (!name.trim()) next.name = "Inserisci il tuo nome";

    if (!emailTrim && !phoneTrim) {
      next.contact = "Inserisci almeno un contatto — email o telefono";
    } else if (emailTrim && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
      next.contact = "L'email inserita non è valida";
    }
    if (!consentContact) next.consentContact = "Richiesto per procedere";
    if (!consentPrivacy) next.consentPrivacy = "Richiesto per procedere";

    setStep2Errors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (!validateStep2() || !profession || !followMode || !collaboration) return;

    setSending(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          profession,
          professionOther: profession === "altro" ? professionOther.trim() : "",
          followMode,
          collaboration,
          contactEmail: contactEmail.trim(),
          contactPhone: contactPhone.trim(),
          timeSlot,
          consentContact,
          consentPrivacy,
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setSubmitError(body?.error ?? "Invio non riuscito. Riprova tra poco.");
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Connessione non riuscita. Controlla la rete e riprova.");
    } finally {
      setSending(false);
    }
  };

  const cardStyle: CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    border: "1px solid rgba(0,0,0,0.08)",
    padding: "20px 22px",
  };

  return (
    <main
      className="relative h-dvh w-full overflow-hidden flex flex-col items-center justify-center px-5 md:px-8"
      style={{ backgroundColor: "#fafafa" }}
    >
      {/* ── Same textured background as the hero ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/themes/gymme/assets2/images/bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ── Back to home — compact corner link, replaces the navbar ── */}
      <Link
        href="/"
        className={`${focusRingClass} rounded-full`}
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          zIndex: 20,
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          height: "36px",
          padding: "0 14px",
          borderRadius: "9999px",
          backgroundColor: "rgba(255,255,255,0.7)",
          border: "1px solid rgba(0,0,0,0.08)",
          color: "#1b1b1b",
          fontSize: "12.5px",
          fontWeight: 600,
          fontFamily: "Plus Jakarta Sans, sans-serif",
          textDecoration: "none",
          backdropFilter: "blur(6px)",
        }}
      >
        <ArrowLeft size={14} weight="bold" />
        Home
      </Link>

      <div className="relative z-10 w-full max-w-[560px] h-full flex flex-col justify-center py-3">
        {!submitted ? (
          <>
            <div className="text-center shrink-0 mb-3">
              <h1
                style={{
                  fontFamily: '"Unbounded", sans-serif',
                  fontWeight: 700,
                  color: "#1b1b1b",
                  fontSize: "clamp(22px, 3vw, 30px)",
                  letterSpacing: "-1px",
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                Richiedi una demo
              </h1>
              <p
                style={{
                  color: "rgba(27,27,27,0.6)",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: "13.5px",
                  marginTop: "6px",
                  lineHeight: 1.4,
                }}
              >
                {step === 1
                  ? "Qualche domanda veloce per conoscere il tuo modo di lavorare."
                  : "Grazie per essere arrivatə fino a qui. Ti contatteremo per programmare la tua demo."}
              </p>
            </div>

            {/* Progress */}
            <div className="shrink-0 mb-3">
              <div style={{ display: "flex", gap: "8px" }}>
                <div
                  style={{
                    height: "4px",
                    borderRadius: "999px",
                    flex: 1,
                    backgroundColor: "#1b1b1b",
                    transition: "background-color 0.3s ease",
                  }}
                />
                <div
                  style={{
                    height: "4px",
                    borderRadius: "999px",
                    flex: 1,
                    backgroundColor: step === 2 ? "#1b1b1b" : "rgba(0,0,0,0.1)",
                    transition: "background-color 0.3s ease",
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: "10.5px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(27,27,27,0.45)",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  marginTop: "8px",
                }}
              >
                Sezione {step} di 2 — {step === 1 ? "Profilo" : "Contatto per demo"}
              </p>
            </div>

            {step === 1 ? (
              <div
                key="step1"
                style={cardStyle}
                className="animate-[fadeInUp_0.4s_ease] flex-1 min-h-0 overflow-y-auto"
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <Field label="Professione principale" error={step1Errors.profession}>
                    <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <OptionCard
                        selected={profession === "pt"}
                        onClick={() => setProfession("pt")}
                        icon={<Barbell size={18} weight="regular" />}
                        label="Personal Trainer"
                      />
                      <OptionCard
                        selected={profession === "nutrizionista"}
                        onClick={() => setProfession("nutrizionista")}
                        icon={<ForkKnife size={18} weight="regular" />}
                        label="Nutrizionista / Dietista"
                      />
                      <OptionCard
                        selected={profession === "osteopata"}
                        onClick={() => setProfession("osteopata")}
                        icon={<FirstAid size={18} weight="regular" />}
                        label="Osteopata / Fisioterapista"
                      />
                      <OptionCard
                        selected={profession === "studio"}
                        onClick={() => setProfession("studio")}
                        icon={<UsersThree size={18} weight="regular" />}
                        label="Studio / Team multidisciplinare"
                      />
                      <OptionCard
                        selected={profession === "altro"}
                        onClick={() => setProfession("altro")}
                        icon={<DotsThreeCircle size={18} weight="regular" />}
                        label="Altro"
                      />
                      {profession === "altro" && (
                        <input
                          type="text"
                          value={professionOther}
                          onChange={(e) => setProfessionOther(e.target.value)}
                          placeholder="Specifica la tua professione"
                          className={focusRingClass}
                          style={inputStyle}
                        />
                      )}
                    </div>
                  </Field>

                  <Field label="Come segui i tuoi clienti?" error={step1Errors.followMode}>
                    <div
                      role="radiogroup"
                      style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}
                    >
                      <ImageOptionCard
                        selected={followMode === "in_sala"}
                        onClick={() => setFollowMode("in_sala")}
                        image="/In_sala.svg"
                        label="In sala"
                      />
                      <ImageOptionCard
                        selected={followMode === "online"}
                        onClick={() => setFollowMode("online")}
                        image="/Online.svg"
                        label="Online"
                      />
                      <ImageOptionCard
                        selected={followMode === "ibrido"}
                        onClick={() => setFollowMode("ibrido")}
                        image="/Ibrido.svg"
                        label="Ibrido"
                      />
                    </div>
                  </Field>

                  <Field
                    label="Ti capita di collaborare con altre figure professionali sullo stesso cliente?"
                    error={step1Errors.collaboration}
                  >
                    <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <OptionCard
                        selected={collaboration === "spesso"}
                        onClick={() => setCollaboration("spesso")}
                        icon={<Handshake size={18} weight="regular" />}
                        label="Spesso"
                      />
                      <OptionCard
                        selected={collaboration === "ogni_tanto"}
                        onClick={() => setCollaboration("ogni_tanto")}
                        icon={<UsersThree size={18} weight="regular" />}
                        label="Ogni tanto"
                      />
                      <OptionCard
                        selected={collaboration === "raramente"}
                        onClick={() => setCollaboration("raramente")}
                        icon={<UserCircle size={18} weight="regular" />}
                        label="Raramente"
                      />
                      <OptionCard
                        selected={collaboration === "mai"}
                        onClick={() => setCollaboration("mai")}
                        icon={<XCircle size={18} weight="regular" />}
                        label="Mai"
                      />
                    </div>
                  </Field>

                  <AnimatedButton
                    type="button"
                    onClick={handleNext}
                    style={{ height: "46px", padding: "0 26px", fontSize: "14px", alignSelf: "flex-start" }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                      Avanti
                      <CaretRight size={15} weight="bold" />
                    </span>
                  </AnimatedButton>
                </div>
              </div>
            ) : (
              <form
                key="step2"
                onSubmit={handleSubmit}
                style={cardStyle}
                className="animate-[fadeInUp_0.4s_ease] flex-1 min-h-0 overflow-y-auto"
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <Field label="Nome e cognome*" error={step2Errors.name}>
                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: "16px",
                          display: "flex",
                          color: "rgba(27,27,27,0.4)",
                          pointerEvents: "none",
                        }}
                      >
                        <User size={16} weight="regular" />
                      </span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Il tuo nome"
                        className={focusRingClass}
                        style={{ ...inputStyle, paddingLeft: "40px" }}
                      />
                    </div>
                  </Field>

                  <Field
                    label="Come preferisci essere contattato/a? (Email o WhatsApp/telefono)*"
                    error={step2Errors.contact}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                        <span
                          style={{
                            position: "absolute",
                            left: "16px",
                            display: "flex",
                            color: "rgba(27,27,27,0.4)",
                            pointerEvents: "none",
                          }}
                        >
                          <Envelope size={16} weight="regular" />
                        </span>
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="Inserisci mail"
                          className={focusRingClass}
                          style={{ ...inputStyle, paddingLeft: "40px" }}
                        />
                      </div>
                      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                        <span
                          style={{
                            position: "absolute",
                            left: "16px",
                            display: "flex",
                            color: "rgba(27,27,27,0.4)",
                            pointerEvents: "none",
                          }}
                        >
                          <Phone size={16} weight="regular" />
                        </span>
                        <input
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="Inserisci cellulare"
                          className={focusRingClass}
                          style={{ ...inputStyle, paddingLeft: "40px" }}
                        />
                      </div>
                    </div>
                  </Field>

                  <Field label="Fascia oraria preferita">
                    <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <OptionCard
                        selected={timeSlot === "mattina"}
                        onClick={() => setTimeSlot(timeSlot === "mattina" ? null : "mattina")}
                        icon={<Sun size={18} weight="regular" />}
                        label="Mattina"
                        description="10:00 - 12:00"
                      />
                      <OptionCard
                        selected={timeSlot === "pomeriggio"}
                        onClick={() => setTimeSlot(timeSlot === "pomeriggio" ? null : "pomeriggio")}
                        icon={<SunHorizon size={18} weight="regular" />}
                        label="Pomeriggio"
                        description="15:00 - 18:00"
                      />
                      <OptionCard
                        selected={timeSlot === "sera"}
                        onClick={() => setTimeSlot(timeSlot === "sera" ? null : "sera")}
                        icon={<MoonStars size={18} weight="regular" />}
                        label="Sera"
                        description="18:00 - 20:00"
                      />
                    </div>
                  </Field>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <ConsentCheckbox checked={consentContact} onChange={setConsentContact}>
                      Acconsento a essere contattato/a da Gymme per fissare un&apos;intervista e ricevere
                      aggiornamenti sulla ricerca.
                    </ConsentCheckbox>
                    {step2Errors.consentContact && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#dc2626",
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                          margin: 0,
                          marginLeft: "28px",
                        }}
                      >
                        {step2Errors.consentContact}
                      </p>
                    )}
                    <ConsentCheckbox checked={consentPrivacy} onChange={setConsentPrivacy}>
                      Acconsento al trattamento dei dati personali secondo la Privacy Policy di Gymme.
                    </ConsentCheckbox>
                    {step2Errors.consentPrivacy && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#dc2626",
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                          margin: 0,
                          marginLeft: "28px",
                        }}
                      >
                        {step2Errors.consentPrivacy}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <p
                      role="alert"
                      style={{
                        fontSize: "12.5px",
                        color: "#dc2626",
                        backgroundColor: "rgba(220,38,38,0.06)",
                        border: "1px solid rgba(220,38,38,0.2)",
                        borderRadius: "12px",
                        padding: "10px 14px",
                        fontFamily: "Plus Jakarta Sans, sans-serif",
                        lineHeight: 1.45,
                        margin: 0,
                      }}
                    >
                      {submitError}
                    </p>
                  )}

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      disabled={sending}
                      onClick={() => setStep(1)}
                      className={focusRingClass}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        height: "46px",
                        padding: "0 20px",
                        borderRadius: "9999px",
                        border: "1.5px solid rgba(0,0,0,0.15)",
                        backgroundColor: "transparent",
                        color: "#1b1b1b",
                        fontSize: "14px",
                        fontWeight: 600,
                        fontFamily: "Plus Jakarta Sans, sans-serif",
                        cursor: sending ? "not-allowed" : "pointer",
                        opacity: sending ? 0.5 : 1,
                      }}
                    >
                      <CaretLeft size={15} weight="bold" />
                      Indietro
                    </button>
                    <AnimatedButton
                      type="submit"
                      disabled={sending}
                      style={{
                        height: "46px",
                        padding: "0 26px",
                        fontSize: "14px",
                        flex: 1,
                        opacity: sending ? 0.6 : 1,
                      }}
                    >
                      {sending ? "Invio in corso…" : "Richiedi una demo"}
                    </AnimatedButton>
                  </div>
                </div>
              </form>
            )}
          </>
        ) : (
          <div style={cardStyle} className="text-center animate-[fadeInUp_0.4s_ease]">
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "rgba(0,0,0,0.06)",
                border: "1.5px solid rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <Check size={20} weight="bold" color="#1b1b1b" />
            </div>
            <h2
              style={{
                fontFamily: '"Unbounded", sans-serif',
                fontWeight: 700,
                color: "#1b1b1b",
                fontSize: "clamp(20px, 3vw, 26px)",
                letterSpacing: "-1px",
                margin: 0,
              }}
            >
              Richiesta ricevuta
            </h2>
            <p
              style={{
                color: "rgba(27,27,27,0.6)",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontSize: "14px",
                marginTop: "10px",
                lineHeight: 1.5,
              }}
            >
              Grazie{name.trim() ? `, ${name.trim()}` : ""}! Sei registrato/a come{" "}
              {profession && PROFESSION_LABELS[profession]}
              {profession === "altro" && professionOther.trim() ? ` (${professionOther.trim()})` : ""}.
              Ti ricontattiamo a breve
              {contactEmail.trim() ? ` su ${contactEmail.trim()}` : ""}
              {contactPhone.trim() ? `${contactEmail.trim() ? " o" : " su"} ${contactPhone.trim()}` : ""} per
              fissare la tua demo.
            </p>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                marginTop: "20px",
                backgroundColor: "#1b1b1b",
                color: "#ffffff",
                borderRadius: "9999px",
                padding: "13px 26px",
                fontSize: "13.5px",
                fontWeight: 700,
                fontFamily: "Plus Jakarta Sans, sans-serif",
                textDecoration: "none",
              }}
            >
              Torna alla home
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
