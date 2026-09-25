"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Switch } from "@base-ui/react/switch";
import { COOKIE_POLICY_HREF } from "@/lib/legal";
import {
  getStoredConsent,
  storeConsent,
  applyConsent,
  DEFAULT_PREFERENCES,
  OPEN_COOKIE_PREFERENCES_EVENT,
  type ConsentPreferences,
} from "@/lib/cookieConsent";

const actionButtonClass =
  "h-11 cursor-pointer rounded-full px-6 font-[family-name:var(--font-plus-jakarta)] text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/40 focus-visible:ring-offset-2";
const outlineButtonClass = `${actionButtonClass} border-[1.5px] border-black/12 bg-white text-[#1b1b1b] hover:bg-black/[0.04]`;
const filledButtonClass = `${actionButtonClass} bg-[#1b1b1b] text-white hover:-translate-y-0.5 hover:bg-[#1b1b1b]/90`;

type View = "hidden" | "banner" | "panel";

function PolicyLink() {
  return (
    <>
      {" "}
      <Link href={COOKIE_POLICY_HREF} className="underline underline-offset-2 hover:text-[#1b1b1b]">
        Leggi la cookie policy
      </Link>
      .
    </>
  );
}

function ConsentSwitch({
  checked,
  disabled,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label: string;
}) {
  return (
    <Switch.Root
      checked={checked}
      disabled={disabled}
      onCheckedChange={(next) => onCheckedChange?.(next)}
      aria-label={label}
      className="relative mt-0.5 inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-black/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/40 focus-visible:ring-offset-2 data-checked:bg-[#7C5CFF] data-disabled:cursor-not-allowed data-disabled:opacity-50"
    >
      <Switch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-white shadow-sm transition-transform data-checked:translate-x-[22px]" />
    </Switch.Root>
  );
}

export function CookieConsent() {
  const [view, setView] = useState<View>("hidden");
  const [prefs, setPrefs] = useState<ConsentPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      applyConsent(stored);
    } else {
      // Deferred so the banner mounts after hydration without a
      // synchronous setState inside the effect body.
      queueMicrotask(() => setView("banner"));
    }

    // Reopens straight into the detailed panel — someone clicking "Preferenze
    // cookie" already wants to review/change specific categories, not see
    // the simple accept/reject banner again.
    const reopen = () => {
      setPrefs(getStoredConsent() ?? DEFAULT_PREFERENCES);
      setView("panel");
    };
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, reopen);
  }, []);

  const confirm = (next: ConsentPreferences) => {
    storeConsent(next);
    applyConsent(next);
    setView("hidden");
  };

  const acceptAll = () => confirm({ measurement: true });
  const rejectAll = () => confirm({ measurement: false });
  const savePreferences = () => confirm(prefs);

  if (view === "hidden") return null;

  return (
    <div
      role="dialog"
      aria-label="Preferenze cookie"
      className="fixed inset-x-4 bottom-4 z-[1000] mx-auto flex max-w-2xl flex-col gap-4 rounded-[24px] border border-black/10 bg-white p-5 font-[family-name:var(--font-plus-jakarta)] text-[#1b1b1b] shadow-[0px_12px_32px_rgba(0,0,0,0.14)] sm:p-6"
    >
      {view === "banner" && (
        <>
          <p className="text-sm leading-relaxed">
            Usiamo cookie necessari al funzionamento del sito e, se acconsenti, cookie di
            misurazione (<strong>Google Analytics</strong> e <strong>Microsoft Clarity</strong>)
            per capire come viene usato il sito e migliorarlo.
            <PolicyLink />
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={rejectAll} className={outlineButtonClass}>
              Rifiuta tutti
            </button>
            <button type="button" onClick={() => setView("panel")} className={outlineButtonClass}>
              Personalizza
            </button>
            <button type="button" onClick={acceptAll} className={filledButtonClass}>
              Accetta tutti
            </button>
          </div>
        </>
      )}

      {view === "panel" && (
        <>
          <div>
            <p className="font-[family-name:var(--font-unbounded)] text-base font-bold tracking-[-0.5px]">
              Preferenze cookie
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[#1b1b1b]/60">
              Scegli quali categorie di cookie attivare.
              <PolicyLink />
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold">Necessari</p>
                <p className="text-sm text-[#1b1b1b]/60">
                  Indispensabili al funzionamento del sito. Sempre attivi.
                </p>
              </div>
              <ConsentSwitch checked disabled label="Cookie necessari, sempre attivi" />
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold">Misurazione</p>
                <p className="text-sm text-[#1b1b1b]/60">
                  Google Analytics e Microsoft Clarity, per capire come viene usato il sito e
                  migliorarne l&apos;esperienza.
                </p>
              </div>
              <ConsentSwitch
                checked={prefs.measurement}
                onCheckedChange={(checked) =>
                  setPrefs((prev) => ({ ...prev, measurement: checked }))
                }
                label="Cookie di misurazione"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={rejectAll} className={outlineButtonClass}>
              Rifiuta tutti
            </button>
            <button type="button" onClick={acceptAll} className={outlineButtonClass}>
              Accetta tutti
            </button>
            <button type="button" onClick={savePreferences} className={filledButtonClass}>
              Salva preferenze
            </button>
          </div>
        </>
      )}
    </div>
  );
}
