"use client";

import Clarity from "@microsoft/clarity";

export function useClarity() {
  const trackEvent = (eventName: string) => {
    if (typeof window !== "undefined") {
      Clarity.event(eventName);
    }
  };
  return { trackEvent };
}
