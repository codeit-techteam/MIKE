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
    month: "long",
    day: "numeric",
  });
}

export function FeaturedPost({ post }: { post: PostCard }) {
  const imageUrl = resolveImageUrl(post.featuredImage, 1400);
  const reading = formatReadingTime(
    estimateReadingMinutes(null, post.estimatedWordCount)
  );
  const date = formatDate(post.publishedAt);

  return (
    <article className="group border-b border-[var(--border-subtle)] py-14">
      <p className="eyebrow">Featured</p>
      <div className="mt-4 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          {post.category ? (
            <Link
              href={`/blog/category/${post.category.slug}`}
              className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted-dim)] transition-colors hover:text-[var(--foreground)]"
            >
              {post.category.title}
            </Link>
          ) : null}
          <h2 className="display mt-3 max-w-[18ch] text-[clamp(2.1rem,5vw,3.5rem)] tracking-tight transition-transform duration-500 group-hover:translate-x-1">
            <Link href={`/blog/${post.slug}`} className="hover:text-[var(--accent-warm)]">
              {post.title}
            </Link>
          </h2>
          {post.excerpt ? (
            <p className="mt-5 max-w-[38rem] text-[1.05rem] leading-relaxed text-[var(--muted)]">
              {post.excerpt}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--muted-dim)]">
            {post.author?.name ? <span>By {post.author.name}</span> : null}
            {date ? (
              <time dateTime={post.publishedAt || undefined}>{date}</time>
            ) : null}
            <span>{reading}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-[var(--accent-warm)] transition-transform duration-300 group-hover:translate-x-1"
          >
            Read article
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {imageUrl ? (
          <Link
            href={`/blog/${post.slug}`}
            className="relative aspect-[4/3] overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface)]"
            aria-label={post.title}
          >
            <Image
              src={imageUrl}
              alt={post.featuredImage?.alt || ""}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
            />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
