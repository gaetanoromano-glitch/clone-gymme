"use client";

import { useEffect } from "react";

const ATTR = "data-clarity-fix";

// ── Dev mode fix: mirror document.adoptedStyleSheets → <style> tags ────────
//
// Next.js dev (Turbopack) and Tailwind v4 inject styles via the Constructable
// Stylesheets API (document.adoptedStyleSheets). Clarity's DOM serializer
// does not capture this API, so the recorder sees unstyled HTML.
// We patch the setter to always mirror sheet content into regular <style> tags
// that Clarity CAN capture.

function syncAdoptedMirrors(sheets: ReadonlyArray<CSSStyleSheet>): void {
  document.querySelectorAll(`style[${ATTR}="adopted"]`).forEach((el) => el.remove());

  for (const sheet of sheets) {
    try {
      const text = Array.from(sheet.cssRules)
        .map((r) => r.cssText)
        .join("\n");
      if (!text) continue;
      const style = document.createElement("style");
      style.setAttribute(ATTR, "adopted");
      style.textContent = text;
      document.head.appendChild(style);
    } catch {
      // SecurityError: cross-origin sheet — skip
    }
  }
}

function patchAdoptedStyleSheets(): void {
  const proto = Document.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(proto, "adoptedStyleSheets");
  if (!descriptor?.set) return;

  // Already patched
  if ((proto as unknown as Record<string, boolean>).__clarityPatched) return;
  (proto as unknown as Record<string, boolean>).__clarityPatched = true;

  Object.defineProperty(document, "adoptedStyleSheets", {
    configurable: true,
    get() {
      return descriptor.get!.call(this);
    },
    set(sheets: CSSStyleSheet[]) {
      descriptor.set!.call(this, sheets);
      syncAdoptedMirrors(sheets);
    },
  });

  // Sync sheets already set before this patch ran
  syncAdoptedMirrors(document.adoptedStyleSheets);
}

// ── Prod mode fix: inline <link> stylesheets → <style> tags ────────────────
//
// In production Next.js, CSS is a static file (/_next/static/css/xxx.css).
// Clarity fetches that file and tries to replay it, but fails to parse
// Tailwind v4's @layer constructs. By inlining the CSS as a <style> tag,
// Clarity captures the raw text directly during DOM serialization — no
// external fetch, no parser issues.

async function inlineLinkStylesheets(): Promise<void> {
  const links = Array.from(
    document.querySelectorAll<HTMLLinkElement>(
      `link[rel="stylesheet"]:not([${ATTR}])`
    )
  );

  const origin = window.location.origin;

  for (const link of links) {
    // Only inline same-origin stylesheets to avoid CORS issues
    if (!link.href || !link.href.startsWith(origin)) continue;

    try {
      const res = await fetch(link.href, { cache: "force-cache" });
      if (!res.ok) continue;
      const css = await res.text();

      const style = document.createElement("style");
      style.setAttribute(ATTR, "inline");
      style.textContent = css;
      // Insert before the <link> so cascade order is preserved
      link.parentNode?.insertBefore(style, link);
      // Mark the link so we don't process it again
      link.setAttribute(ATTR, "done");
    } catch {
      // Network error or CORS — skip silently
    }
  }
}

// ── Component ───────────────────────────────────────────────────────────────

export function ClarityStylesFix() {
  useEffect(() => {
    patchAdoptedStyleSheets();
    inlineLinkStylesheets();
  }, []);

  return null;
}
