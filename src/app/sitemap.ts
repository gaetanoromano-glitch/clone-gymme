import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/content";
import { getAllPosts } from "@/lib/blog";
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

  const posts = getAllPosts();
  const blog: MetadataRoute.Sitemap = posts.length
    ? [
        {
          url: `${SITE_URL}/blog`,
          lastModified: new Date(posts.map((p) => p.updated).sort().at(-1)!),
          changeFrequency: "weekly",
          priority: 0.8,
        },
        ...posts.map((post) => ({
          url: `${SITE_URL}/blog/${post.slug}`,
          lastModified: new Date(post.updated),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
      ]
    : [];

  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    ...professionals,
    { url: `${SITE_URL}/demo`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    ...blog,
  ];
}
