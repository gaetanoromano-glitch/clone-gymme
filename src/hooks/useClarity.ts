"use client";

import Clarity from "@microsoft/clarity";
import { isClarityActive } from "@/lib/cookieConsent";

export function useClarity() {
  const trackEvent = (eventName: string) => {
    // Clarity is only loaded once the visitor accepts measurement cookies;
    // before that there's nothing to send events to.
    if (typeof window !== "undefined" && isClarityActive()) {
      Clarity.event(eventName);
    }
  };
  return { trackEvent };
}
