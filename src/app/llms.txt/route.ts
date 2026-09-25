import { getAllSlugs, getProfessionalContent } from "@/content";
import type { ProfessionalContent } from "@/content/types";
import { getAllPosts } from "@/lib/blog";
import { SITE_DESCRIPTION, SITE_URL, getProfessionalSeo } from "@/lib/seo";

export const dynamic = "force-static";

// llms.txt (https://llmstxt.org): a plain-markdown briefing that generative
// engines can read without rendering the animated landing pages.
function professionalSection(content: ProfessionalContent) {
  const seo = getProfessionalSeo(content);
  const features = [...content.pillarsSection.pillars, ...content.featuresSection.features]
    .map((f) => `- **${f.title}**: ${f.description}`)
    .join("\n");
  const stats = content.ratings.stats.map((s) => `- ${s.value} ${s.label.replace(/\n/g, " ")}`).join("\n");

  return `## gymme per ${content.name}

URL: ${SITE_URL}/${content.slug}

${seo.description}

### Funzionalità

${features}

### Cosa ottiene il professionista

${content.serviceTier.studioFeatures.map((f) => `- ${f}`).join("\n")}

### Cosa ottiene il cliente

${content.serviceTier.clientFeatures.map((f) => `- ${f}`).join("\n")}

### Dati chiave

${stats}

### Domande frequenti

${content.faq.map((f) => `**${f.question}**\n${f.answer}`).join("\n\n")}`;
}

export function GET() {
  const sections = getAllSlugs()
    .map(getProfessionalContent)
    .filter((c): c is ProfessionalContent => c !== null)
    .map(professionalSection)
    .join("\n\n");

  const body = `# gymme

> ${SITE_DESCRIPTION}

gymme è un software italiano (web) per professionisti del benessere. A differenza dei gestionali single-role, permette a personal trainer, nutrizionisti/dietisti e osteopati/fisioterapisti di lavorare sullo stesso cliente con un contesto condiviso, mantenendo l'autonomia professionale. Funziona per chi lavora online, in sala o in modalità ibrida. È sviluppato da Webeetle (Angri, Salerno, Italia).

## Pagine principali

- [Home](${SITE_URL}/): panoramica della piattaforma
${getAllSlugs()
  .map(getProfessionalContent)
  .filter((c): c is ProfessionalContent => c !== null)
  .map((c) => `- [gymme per ${c.name}](${SITE_URL}/${c.slug}): ${getProfessionalSeo(c).title}`)
  .join("\n")}
- [Richiedi una demo](${SITE_URL}/demo): prenotazione di una demo
- [Blog](${SITE_URL}/blog): guide per professionisti del benessere

## Articoli del blog

${getAllPosts()
  .map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description}`)
  .join("\n")}

${sections}

## Contatti

- Email: info@webeetle.com
- Demo: ${SITE_URL}/demo
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
