import type { Metadata } from "next";
import { personalTrainer } from "@/content";
import { LandingPage } from "@/components/LandingPage";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(personalTrainer, "/")} />
      <LandingPage content={personalTrainer} />
    </>
  );
}
