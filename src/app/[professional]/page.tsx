import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProfessionalContent, getAllSlugs } from "@/content";
import { LandingPage } from "@/components/LandingPage";
import { JsonLd } from "@/components/JsonLd";
import { HOME_SLUG, SITE_NAME, faqJsonLd, getProfessionalSeo, professionalJsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ professional: string }>;
}

// Only the known professional slugs exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ professional: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { professional } = await params;
  const content = getProfessionalContent(professional);
  if (!content) return {};

  const seo = getProfessionalSeo(content);
  // The home page renders the personal-trainer content too: point the
  // duplicate at "/" so search engines consolidate ranking on one URL.
  const path = content.slug === HOME_SLUG ? "/" : `/${content.slug}`;
  const fullTitle = `${seo.title} | ${SITE_NAME}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: path },
    openGraph: { url: path, title: fullTitle, description: seo.description },
    twitter: { title: fullTitle, description: seo.description },
  };
}

export default async function ProfessionalPage({ params }: Props) {
  const { professional } = await params;
  const content = getProfessionalContent(professional);

  if (!content) notFound();

  return (
    <>
      <JsonLd data={professionalJsonLd(content)} />
      <JsonLd data={faqJsonLd(content, `/${content.slug}`)} />
      <LandingPage content={content} />
    </>
  );
}
