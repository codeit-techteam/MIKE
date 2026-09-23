import Image from "next/image";
import Link from "next/link";
import {
  estimateReadingMinutes,
  formatReadingTime,
} from "@/sanity/lib/reading-time";
import { resolveImageUrl } from "@/sanity/lib/image";
import type { PostCard } from "@/sanity/lib/types";

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogCard({ post }: { post: PostCard }) {
  const imageUrl = resolveImageUrl(post.featuredImage, 900);
  const reading = formatReadingTime(
    estimateReadingMinutes(null, post.estimatedWordCount)
  );
  const date = formatDate(post.publishedAt);

  return (
    <article className="group flex h-full flex-col border-t border-[var(--border-subtle)] pt-8">
      {imageUrl ? (
        <Link
          href={`/blog/${post.slug}`}
          className="relative mb-6 aspect-[16/10] overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface)]"
          aria-label={post.title}
        >
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt || ""}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Link>
      ) : null}

      {post.category ? (
        <Link
          href={`/blog/category/${post.category.slug}`}
          className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted-dim)] transition-colors hover:text-[var(--foreground)]"
        >
          {post.category.title}
        </Link>
      ) : null}

      <h3 className="display mt-3 text-[clamp(1.45rem,2.8vw,1.85rem)] leading-tight tracking-tight transition-transform duration-500 group-hover:translate-x-0.5">
        <Link href={`/blog/${post.slug}`} className="hover:text-[var(--accent-warm)]">
          {post.title}
        </Link>
      </h3>

      {post.excerpt ? (
        <p className="mt-3 line-clamp-3 flex-1 text-[0.98rem] leading-relaxed text-[var(--muted)]">
          {post.excerpt}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--muted-dim)]">
        {date ? <time dateTime={post.publishedAt || undefined}>{date}</time> : null}
        <span>{reading}</span>
        <Link
          href={`/blog/${post.slug}`}
          className="ml-auto inline-flex items-center gap-1 text-[var(--accent-warm)] transition-transform duration-300 group-hover:translate-x-1"
          aria-label={`Read ${post.title}`}
        >
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
