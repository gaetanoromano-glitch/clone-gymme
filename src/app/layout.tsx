import type { Metadata } from "next";
import { Unbounded, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ClarityAnalytics } from "@/components/ClarityAnalytics";
import { ScrollMilestones } from "@/components/ScrollMilestones";
import { AnalyticsIdentity } from "@/components/AnalyticsIdentity";
import { ClarityStylesFix } from "@/components/ClarityStylesFix";
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
  title: "gymme | La Piattaforma #1 per il Coaching Fitness e Benessere",
  description:
    "Eroga il tuo coaching su larga scala, dai clienti base a quelli premium. Piattaforma all-in-one pensata per personal trainer, coach del benessere e proprietari di palestre.",
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
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
      <ClarityStylesFix />
      <GoogleAnalytics gaId="G-W4Q5P0YHEC" />
      <ClarityAnalytics projectId="xb1l4ggnzd" />
      <AnalyticsIdentity />
      <ScrollMilestones />
    </html>
  );
}
