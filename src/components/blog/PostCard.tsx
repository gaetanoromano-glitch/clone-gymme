import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { formatDate, type BlogPostMeta } from "@/lib/blog";
import { categoryColor } from "./categoryColor";

interface PostCardProps {
  post: BlogPostMeta;
  /** Heading level inside the card, so it fits the page outline. */
  headingLevel?: "h2" | "h3";
}

export function PostCard({ post, headingLevel = "h2" }: PostCardProps) {
  const Heading = headingLevel;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-[24px] border border-stroke bg-surface p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gymme-purple/40 md:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <span
          className="font-inter rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.04em] text-text-primary"
          style={{ backgroundColor: categoryColor(post.category) }}
        >
          {post.category}
        </span>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-bg text-text-primary transition-colors duration-300 group-hover:bg-gymme-purple group-hover:text-white">
          <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
        </span>
      </div>

      <Heading className="mt-6 text-[20px] font-bold leading-[1.25] tracking-[-0.5px] text-text-primary md:text-[22px]">
        {post.title}
      </Heading>
      <p className="font-inter mt-3 flex-1 text-[15px] leading-[1.6] text-text-secondary">{post.description}</p>

      <p className="font-inter mt-6 text-[13px] text-text-secondary">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true"> · </span>
        {post.readingMinutes} min di lettura
      </p>
    </Link>
  );
}
