// Data controller details shown on the cookie policy page.
export const CONTACT_EMAIL = "info@webeetle.com";
export const CONTACT_ADDRESS = "Via Semetelle 26, Angri (SA) - Italy";

export const PRIVACY_POLICY_HREF =
  "https://webeetle.com/assets/allegati/privacy/WEBEETLE_privacy_policy_2025.docx.pdf";

// Own page, so it can describe exactly what this site does
// (currently Google Analytics and Microsoft Clarity).
export const COOKIE_POLICY_HREF = "/cookie-policy";

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: PRIVACY_POLICY_HREF, external: true },
  { label: "Cookie Policy", href: COOKIE_POLICY_HREF, external: false },
] as const;
