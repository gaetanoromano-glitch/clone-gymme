"use client";

import type { ReactNode } from "react";
import { openCookiePreferences } from "@/lib/cookieConsent";

export function CookiePreferencesButton({
  className,
  children = "Preferenze cookie",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      {children}
    </button>
  );
}
