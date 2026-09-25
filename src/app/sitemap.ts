import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/content";
import { HOME_SLUG, SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const professionals = getAllSlugs()
    .filter((slug) => slug !== HOME_SLUG)
    .map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    ...professionals,
    { url: `${SITE_URL}/demo`, lastModified, changeFrequency: "yearly", priority: 0.7 },
  ];
}
