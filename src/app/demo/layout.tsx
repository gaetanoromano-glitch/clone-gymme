import type { Metadata } from "next";

// The demo page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Richiedi una demo",
  description:
    "Prenota una demo di gymme: scopri come personal trainer, nutrizionisti e osteopati collaborano sullo stesso cliente con AI Protocol Builder, CRM e Business Dashboard.",
  alternates: { canonical: "/demo" },
  openGraph: { url: "/demo" },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
