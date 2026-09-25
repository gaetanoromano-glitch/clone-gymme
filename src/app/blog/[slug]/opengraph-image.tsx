import { getAllPosts, getPost } from "@/lib/blog";
import { OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const alt = "Articolo del blog gymme";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  return renderOgImage({
    eyebrow: post ? `Blog gymme · ${post.category}` : "Blog gymme",
    title: post?.title ?? "Guide per chi lavora nel benessere",
    subtitle: "Guide per personal trainer, nutrizionisti e osteopati",
  });
}
