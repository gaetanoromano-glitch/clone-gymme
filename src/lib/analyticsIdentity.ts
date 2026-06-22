const LEAD_KEY = "lead_id";
const POLL_INTERVAL_MS = 200;
const POLL_TIMEOUT_MS = 5000;
const IS_DEV = process.env.NODE_ENV === "development";

// ── URL helpers ────────────────────────────────────────────────────────────

function getParam(name: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return new URLSearchParams(window.location.search).get(name);
  } catch {
    return null;
  }
}

// ── localStorage helpers ───────────────────────────────────────────────────

function storageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // localStorage unavailable (private mode, quota exceeded, etc.)
  }
}

// ── Clarity readiness detection ────────────────────────────────────────────
//
// The @microsoft/clarity npm package sets window.clarity immediately as a
// queue stub: `function() { (clarity.q = clarity.q || []).push(arguments) }`
// The real Clarity SDK (loaded async from clarity.ms) later replaces this
// with its own implementation — which does NOT have a `.q` property.
// Calling custom methods while the stub is active works for queued calls,
// BUT the CDN script processes the queue using an internal method map where
// "setTag" does not exist (the correct name is "set").
// We wait for the real SDK to be in place before calling anything.

function isClarityReady(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.clarity === "function" &&
    !("q" in window.clarity)
  );
}

// ── Clarity tag application ────────────────────────────────────────────────
//
// NOTE: the correct Clarity API method name for custom tags is "set",
// NOT "setTag" — the npm package's Clarity.setTag() maps to window.clarity("set", ...).

function applyTags(leadId: string, campaign: string | null): void {
  try {
    window.clarity!("set", LEAD_KEY, leadId);
    if (campaign) {
      window.clarity!("set", "campaign", campaign);
    }
    if (IS_DEV) {
      console.log("[Analytics] Clarity tags applied →", {
        lead_id: leadId,
        ...(campaign ? { campaign } : {}),
      });
    }
  } catch (err) {
    if (IS_DEV) {
      console.warn("[Analytics] Failed to apply Clarity tags:", err);
    }
  }
}

// ── Polling until the real Clarity SDK is active ───────────────────────────

function waitAndApply(leadId: string, campaign: string | null): void {
  if (typeof window === "undefined") return;

  if (isClarityReady()) {
    applyTags(leadId, campaign);
    return;
  }

  const deadline = Date.now() + POLL_TIMEOUT_MS;
  const timer = setInterval(() => {
    if (isClarityReady()) {
      clearInterval(timer);
      applyTags(leadId, campaign);
    } else if (Date.now() >= deadline) {
      clearInterval(timer);
      if (IS_DEV) {
        console.warn("[Analytics] Clarity SDK not ready after", POLL_TIMEOUT_MS, "ms — tags not applied.");
      }
    }
  }, POLL_INTERVAL_MS);
}

// ── Public entry point ─────────────────────────────────────────────────────

export function initializeAnalyticsIdentity(): void {
  if (typeof window === "undefined") return;

  // 1. Resolve leadId: URL param wins, falls back to localStorage
  const fromUrl = getParam("lead");
  if (fromUrl) {
    storageSet(LEAD_KEY, fromUrl);
  }
  const leadId = fromUrl ?? storageGet(LEAD_KEY);

  if (!leadId) {
    if (IS_DEV) {
      console.log("[Analytics] No lead_id found — skipping Clarity tagging.");
    }
    return;
  }

  // 2. Resolve optional campaign (?campaign= or ?utm_campaign=)
  const campaign = getParam("campaign") ?? getParam("utm_campaign");

  if (IS_DEV) {
    console.log("[Analytics] lead_id resolved →", leadId, campaign ? `| campaign: ${campaign}` : "");
  }

  // 3. Apply tags when the real Clarity SDK is active
  waitAndApply(leadId, campaign);
}
