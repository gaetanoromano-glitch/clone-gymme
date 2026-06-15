import { notFound } from "next/navigation";
import { getProfessionalContent, getAllSlugs } from "@/content";
import { LandingPage } from "@/components/LandingPage";

interface Props {
  params: Promise<{ professional: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ professional: slug }));
}

export default async function ProfessionalPage({ params }: Props) {
  const { professional } = await params;
  const content = getProfessionalContent(professional);

  if (!content) notFound();

  return <LandingPage content={content} />;
}
