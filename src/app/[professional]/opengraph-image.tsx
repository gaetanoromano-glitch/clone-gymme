import { getAllSlugs, getProfessionalContent } from "@/content";
import { OG_SIZE, renderOgImage } from "@/lib/ogImage";
import { getProfessionalSeo } from "@/lib/seo";

export const alt = "gymme — software per professionisti del benessere";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ professional: slug }));
}

export default async function Image({ params }: { params: Promise<{ professional: string }> }) {
  const { professional } = await params;
  const content = getProfessionalContent(professional);
  const seo = content ? getProfessionalSeo(content) : null;

  return renderOgImage({
    eyebrow: content ? `gymme per ${content.name}` : "gymme",
    title: seo?.title ?? "L'ecosistema digitale per il benessere",
    subtitle: "Un health team, un ecosistema condiviso attorno allo stesso cliente.",
  });
}
