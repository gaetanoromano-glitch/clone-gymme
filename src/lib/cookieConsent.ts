import Clarity from "@microsoft/clarity";
import { initializeAnalyticsIdentity } from "@/lib/analyticsIdentity";

// "necessary" is always on and isn't stored (there's nothing to remember —
// it can't be turned off). "measurement" gates Google Analytics and
// Microsoft Clarity below: neither is loaded until the visitor opts in.

const STORAGE_KEY = "gymme_cookie_consent";
export const OPEN_COOKIE_PREFERENCES_EVENT = "open-cookie-preferences";

export const GA_MEASUREMENT_ID = "G-W4Q5P0YHEC";
export const CLARITY_PROJECT_ID = "xb1l4ggnzd";

export interface ConsentPreferences {
  measurement: boolean;
}

export const DEFAULT_PREFERENCES: ConsentPreferences = {
  measurement: false,
};

export function getStoredConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { measurement: Boolean(parsed.measurement) };
  } catch {
    return null;
  }
}

export function storeConsent(prefs: ConsentPreferences) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // localStorage unavailable (private mode, quota exceeded, etc.)
  }
}

// Loads/clears whatever each accepted/rejected purpose controls. Called
// whenever preferences are saved, and once on mount if consent was already
// given in a previous visit.
export function applyConsent(prefs: ConsentPreferences) {
  if (prefs.measurement) {
    loadGoogleAnalytics();
    loadClarity();
  } else {
    disableGoogleAnalytics();
    disableClarity();
  }
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
}

// ── Google Analytics ───────────────────────────────────────────────────────

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_DISABLE_KEY = `ga-disable-${GA_MEASUREMENT_ID}`;

function setGaDisabled(disabled: boolean) {
  (window as unknown as Record<string, boolean>)[GA_DISABLE_KEY] = disabled;
}

export function loadGoogleAnalytics() {
  if (typeof window === "undefined") return;
  setGaDisabled(false);
  if (window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the raw `arguments` object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

// An already-loaded gtag.js can't be unloaded; the official opt-out flag stops
// it from sending anything else for the rest of the page's life.
export function disableGoogleAnalytics() {
  if (typeof window === "undefined") return;
  setGaDisabled(true);
  clearCookies(["_ga", `_ga_${GA_MEASUREMENT_ID.replace(/^G-/, "")}`, "_gid"]);
}

// ── Microsoft Clarity ──────────────────────────────────────────────────────

let clarityLoaded = false;

export function isClarityActive() {
  return clarityLoaded;
}

export function loadClarity() {
  if (typeof window === "undefined") return;
  if (!clarityLoaded) {
    Clarity.init(CLARITY_PROJECT_ID);
    clarityLoaded = true;
    initializeAnalyticsIdentity();
  }
  Clarity.consent(true);
}

export function disableClarity() {
  if (typeof window === "undefined") return;
  // consent(false) makes Clarity stop tracking and delete its own cookies.
  if (clarityLoaded) {
    Clarity.consent(false);
  }
  clearCookies(["_clck", "_clsk"]);
}

// ── Cookie cleanup ─────────────────────────────────────────────────────────

// GA and Clarity may set their cookies on the parent domain (e.g. ".gymme.it"
// when visiting "www.gymme.it"), so each name is cleared on every level of
// the current hostname.
function clearCookies(names: string[]) {
  if (typeof document === "undefined") return;
  const parts = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) {
    domains.push(`; domain=.${parts.slice(i).join(".")}`);
  }
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${domain}`;
    }
  }
}
