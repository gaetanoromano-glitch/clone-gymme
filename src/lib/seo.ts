import type { ProfessionalContent } from "@/content/types";

// Canonical origin. gymmeapp.it redirects to www, so www is the canonical host.
// NEXT_PUBLIC_SITE_URL can override it (e.g. for a staging domain).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gymmeapp.it").replace(/\/$/, "");

export const SITE_NAME = "gymme";

// Ownership tokens for Google Search Console and Bing Webmaster Tools.
// Tags are only rendered when the env var is set.
const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const BING_VERIFICATION = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const SITE_VERIFICATION = {
  ...(GOOGLE_VERIFICATION && { google: GOOGLE_VERIFICATION }),
  ...(BING_VERIFICATION && { other: { "msvalidate.01": BING_VERIFICATION } }),
};

/** Professional whose landing content is also served at "/". */
export const HOME_SLUG = "personal-trainer";

export const SITE_TITLE = "gymme | Software per Personal Trainer, Nutrizionisti e Osteopati";

export const SITE_DESCRIPTION =
  "gymme è la prima piattaforma italiana multi-professionale per il benessere: personal trainer, nutrizionisti e osteopati collaborano sullo stesso cliente con CRM, AI Protocol Builder, Client Risk Radar e Business Dashboard.";

export const SITE_KEYWORDS = [
  "software personal trainer",
  "app per personal trainer",
  "gestionale nutrizionista",
  "software osteopata",
  "piattaforma coaching fitness",
  "CRM clienti fitness",
  "schede allenamento AI",
  "team multidisciplinare benessere",
];

// Per-page copy, keyed by professional slug. Kept out of the page content
// files so marketing copy and search snippets can evolve independently.
const PROFESSIONAL_SEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  "personal-trainer": {
    title: "Software per Personal Trainer con AI e CRM",
    description:
      "Crea schede di allenamento con l'AI, gestisci clienti, appuntamenti e pacchetti e collabora con nutrizionisti e osteopati. Il software per personal trainer online, in sala o ibrido.",
    keywords: ["software personal trainer", "app schede allenamento", "gestionale personal trainer", "coaching online"],
  },
  nutrizionista: {
    title: "Software per Nutrizionisti e Dietisti",
    description:
      "Gestisci piani alimentari, diario alimentare e compliance dei pazienti, con AI Protocol Builder e collaborazione con personal trainer e osteopati. Il gestionale per nutrizionisti di gymme.",
    keywords: ["software nutrizionista", "gestionale dietista", "app piani alimentari", "diario alimentare pazienti"],
  },
  osteopata: {
    title: "Software per Osteopati e Fisioterapisti",
    description:
      "Gestisci protocolli di trattamento, monitora il recupero dei pazienti e collabora con personal trainer e nutrizionisti. Il gestionale per osteopati e fisioterapisti di gymme.",
    keywords: ["software osteopata", "gestionale fisioterapista", "protocolli di recupero", "CRM pazienti"],
  },
};

export function getProfessionalSeo(content: ProfessionalContent) {
  return (
    PROFESSIONAL_SEO[content.slug] ?? {
      title: `Software per ${content.name}`,
      description: content.hero.subtitle,
      keywords: [],
    }
  );
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SOFTWARE_ID = `${SITE_URL}/#software`;

// Site-wide entity graph: who publishes the site and what the product is.
// Generative engines lean on these entities to describe the brand accurately.
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/themes/gymme/assets2/images/logo.svg`,
        email: "info@webeetle.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Via Semetelle 26",
          addressLocality: "Angri",
          addressRegion: "SA",
          addressCountry: "IT",
        },
        parentOrganization: { "@type": "Organization", name: "Webeetle", url: "https://webeetle.com" },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "it-IT",
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "SoftwareApplication",
        "@id": SOFTWARE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        applicationCategory: "HealthApplication",
        applicationSubCategory: "Fitness & Wellness Coaching Software",
        operatingSystem: "Web",
        inLanguage: "it-IT",
        publisher: { "@id": ORGANIZATION_ID },
        audience: [
          { "@type": "Audience", audienceType: "Personal Trainer" },
          { "@type": "Audience", audienceType: "Nutrizionisti e Dietisti" },
          { "@type": "Audience", audienceType: "Osteopati e Fisioterapisti" },
          { "@type": "Audience", audienceType: "Studi multidisciplinari" },
        ],
        featureList: [
          "Collaborazione multi-professionale sullo stesso cliente",
          "AI Protocol Builder per schede e protocolli",
          "Client Risk Radar per prevenire l'abbandono dei clienti",
          "Business Dashboard su rinnovi e margini",
          "CRM clienti con anamnesi e misurazioni",
          "Gestione appuntamenti e pacchetti",
          "Live Mode per sessioni con più clienti",
        ],
      },
    ],
  };
}

export function faqJsonLd(content: ProfessionalContent, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    inLanguage: "it-IT",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function professionalJsonLd(content: ProfessionalContent) {
  const seo = getProfessionalSeo(content);
  const url = `${SITE_URL}/${content.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: seo.title,
        description: seo.description,
        inLanguage: "it-IT",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": SOFTWARE_ID },
        audience: { "@type": "Audience", audienceType: content.name },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: content.name, item: url },
        ],
      },
      {
        "@type": "ItemList",
        name: `Funzionalità gymme per ${content.name}`,
        itemListElement: [...content.pillarsSection.pillars, ...content.featuresSection.features].map(
          (feature, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: feature.title,
            description: feature.description,
          }),
        ),
      },
    ],
  };
}

/** Serialises JSON-LD safely for a <script> tag (no `</script>` breakouts). */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
