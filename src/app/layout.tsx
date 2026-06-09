import type { Metadata } from "next";
import { Unbounded, Plus_Jakarta_Sans } from "next/font/google";
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
    icon: [
      { url: "/uploads/2025/01/cropped-favicon.png", sizes: "32x32" },
      { url: "/uploads/2025/01/cropped-favicon.png", sizes: "192x192" },
    ],
    apple: { url: "/uploads/2025/01/cropped-favicon.png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${unbounded.variable} ${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
