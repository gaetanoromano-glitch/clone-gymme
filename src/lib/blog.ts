import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Articles live as Markdown files in src/content/blog/<slug>.md, with a small
// frontmatter block on top. The file name is the URL slug.
const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

const WORDS_PER_MINUTE = 200;

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD) of first publication. */
  date: string;
  /** ISO date of the last meaningful update; defaults to `date`. */
  updated: string;
  author: string;
  category: string;
  /** Optional professional slug the article targets, for the in-article CTA. */
  professional?: string;
  readingMinutes: number;
}

export interface BlogPost extends BlogPostMeta {
  html: string;
}

const REQUIRED_FIELDS = ["title", "description", "date", "category"] as const;

function parseFrontmatter(source: string, file: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`${file}: frontmatter mancante (blocco --- iniziale).`);

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (!pair) continue;
    data[pair[1]] = pair[2].trim().replace(/^(["'])(.*)\1$/, "$2");
  }

  for (const field of REQUIRED_FIELDS) {
    if (!data[field]) throw new Error(`${file}: campo "${field}" mancante nel frontmatter.`);
  }
  return { data, body: match[2] };
}

function readPost(file: string): BlogPost {
  const slug = file.replace(/\.md$/, "");
  const source = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, body } = parseFrontmatter(source, file);
  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated || data.date,
    author: data.author || "Redazione gymme",
    category: data.category,
    professional: data.professional || undefined,
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    html: marked.parse(body, { async: false }),
  };
}

/** All published posts, newest first. */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): BlogPost | null {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

export function getRelatedPosts(post: BlogPostMeta, limit = 2): BlogPost[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  return [...sameCategory, ...others.filter((p) => p.category !== post.category)].slice(0, limit);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${iso}T00:00:00`),
  );
}
