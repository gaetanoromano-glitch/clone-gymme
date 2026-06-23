const LEAD_KEY = "lead_id";
const VISITED_KEY = "gymme_visited";
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

interface AnalyticsTags {
  leadId?: string;
  campaign?: string;
  utmSource?: string;
  utmMedium?: string;
  utmContent?: string;
  utmTerm?: string;
  visitorType: "new" | "returning";
}

function applyTags(tags: AnalyticsTags): void {
  try {
    window.clarity!("set", "visitor_type", tags.visitorType);
    if (tags.leadId) window.clarity!("set", LEAD_KEY, tags.leadId);
    if (tags.campaign) window.clarity!("set", "campaign", tags.campaign);
    if (tags.utmSource) window.clarity!("set", "utm_source", tags.utmSource);
    if (tags.utmMedium) window.clarity!("set", "utm_medium", tags.utmMedium);
    if (tags.utmContent) window.clarity!("set", "utm_content", tags.utmContent);
    if (tags.utmTerm) window.clarity!("set", "utm_term", tags.utmTerm);
    if (IS_DEV) {
      console.log("[Analytics] Clarity tags applied →", tags);
    }
  } catch (err) {
    if (IS_DEV) {
      console.warn("[Analytics] Failed to apply Clarity tags:", err);
    }
  }
}

// ── Polling until the real Clarity SDK is active ───────────────────────────

function waitAndApply(tags: AnalyticsTags): void {
  if (typeof window === "undefined") return;

  if (isClarityReady()) {
    applyTags(tags);
    return;
  }

  const deadline = Date.now() + POLL_TIMEOUT_MS;
  const timer = setInterval(() => {
    if (isClarityReady()) {
      clearInterval(timer);
      applyTags(tags);
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

  // 1. New vs. returning visitor (checked before any writes)
  const isNew = !storageGet(VISITED_KEY);
  if (isNew) storageSet(VISITED_KEY, "1");

  // 2. Resolve leadId: URL param wins, falls back to localStorage
  const fromUrl = getParam("lead");
  if (fromUrl) storageSet(LEAD_KEY, fromUrl);
  const leadId = (fromUrl ?? storageGet(LEAD_KEY)) ?? undefined;

  // 3. Collect UTM / campaign params
  const campaign = (getParam("campaign") ?? getParam("utm_campaign")) ?? undefined;
  const utmSource = getParam("utm_source") ?? undefined;
  const utmMedium = getParam("utm_medium") ?? undefined;
  const utmContent = getParam("utm_content") ?? undefined;
  const utmTerm = getParam("utm_term") ?? undefined;

  const tags: AnalyticsTags = {
    visitorType: isNew ? "new" : "returning",
    ...(leadId && { leadId }),
    ...(campaign && { campaign }),
    ...(utmSource && { utmSource }),
    ...(utmMedium && { utmMedium }),
    ...(utmContent && { utmContent }),
    ...(utmTerm && { utmTerm }),
  };

  if (IS_DEV) {
    console.log("[Analytics] Resolved tags →", tags);
  }

  waitAndApply(tags);
}
