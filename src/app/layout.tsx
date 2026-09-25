import type { Metadata } from "next";
import { Unbounded, Plus_Jakarta_Sans } from "next/font/google";
import { ScrollMilestones } from "@/components/ScrollMilestones";
import { CookieConsent } from "@/components/CookieConsent";
import { ClarityStylesFix } from "@/components/ClarityStylesFix";
import { JsonLd } from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TITLE, SITE_URL, SITE_VERIFICATION, siteJsonLd } from "@/lib/seo";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-unbounded",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: "Webeetle", url: "https://webeetle.com" }],
  publisher: "Webeetle",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: SITE_VERIFICATION,
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${unbounded.variable} ${plusJakartaSans.variable} h-full antialiased bg-[#EEEDFB]`}>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <JsonLd data={siteJsonLd()} />
        {children}
        {/* Google Analytics and Clarity are loaded from here, only after consent. */}
        <CookieConsent />
      </body>
      <ClarityStylesFix />
      <ScrollMilestones />
    </html>
  );
}
