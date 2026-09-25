import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { BlogShell } from "@/components/blog/BlogShell";
import { PostCard } from "@/components/blog/PostCard";
import { categoryColor } from "@/components/blog/categoryColor";
import { JsonLd } from "@/components/JsonLd";
import { getProfessionalContent } from "@/content";
import { formatDate, getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { HOME_SLUG, SITE_NAME, blogPostJsonLd } from "@/lib/seo";

// Plural audience used in the closing call to action ("gymme per nutrizionisti").
const AUDIENCE_PLURAL: Record<string, string> = {
  "personal-trainer": "personal trainer",
  nutrizionista: "nutrizionisti",
  osteopata: "osteopati",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: path },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      url: path,
      title: `${post.title} | ${SITE_NAME}`,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated,
      section: post.category,
    },
    twitter: { title: `${post.title} | ${SITE_NAME}`, description: post.description },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const professional = post.professional ? getProfessionalContent(post.professional) : null;
  const professionalHref = professional
    ? professional.slug === HOME_SLUG
      ? "/"
      : `/${professional.slug}`
    : "/";

  return (
    <BlogShell>
      <JsonLd data={blogPostJsonLd(post)} />
      <article className="mx-auto max-w-[760px]">
        <nav aria-label="Percorso" className="font-inter text-[13px] text-text-secondary">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="transition-colors hover:text-text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="transition-colors hover:text-text-primary">
                Blog
              </Link>
            </li>
          </ol>
        </nav>

        <header className="mt-8">
          <span
            className="font-inter inline-block rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.04em] text-text-primary"
            style={{ backgroundColor: categoryColor(post.category) }}
          >
            {post.category}
          </span>
          <h1 className="mt-5 text-[clamp(30px,5vw,52px)] font-bold leading-[1.1] tracking-[-1.5px] text-text-primary">
            {post.title}
          </h1>
          <p className="font-inter mt-5 text-[clamp(16px,1.8vw,19px)] leading-[1.6] text-text-secondary">
            {post.description}
          </p>
          <p className="font-inter mt-6 flex flex-wrap gap-x-2 text-[13px] text-text-secondary">
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updated !== post.date && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Aggiornato il <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min di lettura</span>
          </p>
        </header>

        <div
          className="blog-prose mt-10 rounded-[28px] border border-stroke bg-surface px-6 py-8 md:mt-12 md:px-12 md:py-12"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <aside className="mt-10 rounded-[28px] bg-gymme-purple px-6 py-8 text-white md:px-12 md:py-10">
          <p className="font-[family-name:var(--font-unbounded)] text-[clamp(22px,3vw,30px)] font-bold leading-[1.2] tracking-[-0.5px]">
            {professional ? `Scopri gymme per ${AUDIENCE_PLURAL[professional.slug] ?? professional.name}` : "Scopri gymme"}
          </p>
          <p className="font-inter mt-3 max-w-[520px] text-[15px] leading-[1.6] text-white/85">
            La piattaforma italiana che unisce personal trainer, nutrizionisti e osteopati attorno allo stesso cliente.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="font-inter inline-flex h-12 items-center rounded-full bg-white px-6 text-[14px] font-bold text-text-primary transition-transform hover:-translate-y-0.5"
            >
              Richiedi una demo
            </Link>
            <Link
              href={professionalHref}
              className="font-inter inline-flex h-12 items-center gap-2 rounded-full border border-white/40 px-6 text-[14px] font-bold text-white transition-colors hover:bg-white/10"
            >
              Scopri le funzionalità
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mx-auto mt-16 max-w-[1280px] md:mt-24">
          <h2 id="related-heading" className="text-[clamp(24px,3.5vw,40px)] font-bold tracking-[-1px] text-text-primary">
            Leggi anche
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} headingLevel="h3" />
            ))}
          </div>
        </section>
      )}
    </BlogShell>
  );
}
