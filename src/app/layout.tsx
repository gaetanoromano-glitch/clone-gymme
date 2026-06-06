import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Everfit | #1 Fitness and Wellness Coaching Platform",
  description:
    "Deliver your coaching at scale, from low-ticket to high-ticket. All-in-one platform designed for personal trainers, wellness coaches, and gym owners.",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
