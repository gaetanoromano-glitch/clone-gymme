import type { Metadata } from "next";
import { BlogShell } from "@/components/blog/BlogShell";
import { PostCard } from "@/components/blog/PostCard";
import { JsonLd } from "@/components/JsonLd";
import { getAllPosts } from "@/lib/blog";
import { BLOG_DESCRIPTION, BLOG_TITLE, SITE_NAME, blogIndexJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${BLOG_TITLE}: guide per professionisti del benessere`,
  description: BLOG_DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog", type: "website", title: `${BLOG_TITLE} | ${SITE_NAME}`, description: BLOG_DESCRIPTION },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <BlogShell>
      <JsonLd data={blogIndexJsonLd(posts)} />
      <div className="mx-auto max-w-[1280px]">
        <header className="max-w-[1000px]">
          <p className="font-inter text-[13px] font-bold uppercase tracking-[0.08em] text-gymme-purple">Blog gymme</p>
          <h1 className="mt-4 text-[clamp(34px,6vw,72px)] font-bold leading-[1.05] tracking-[-2px] text-text-primary">
            Guide per chi lavora nel benessere
          </h1>
          <p className="font-inter mt-5 max-w-[640px] text-[clamp(15px,1.6vw,18px)] leading-[1.6] text-text-secondary">
            {BLOG_DESCRIPTION}
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="font-inter mt-12 text-text-secondary">Presto nuovi articoli.</p>
        )}
      </div>
    </BlogShell>
  );
}
