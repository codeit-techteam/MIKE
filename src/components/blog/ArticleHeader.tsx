import Image from "next/image";
import Link from "next/link";
import {
  estimateReadingMinutes,
  formatReadingTime,
} from "@/sanity/lib/reading-time";
import { resolveImageUrl } from "@/sanity/lib/image";
import type { Post } from "@/sanity/lib/types";

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArticleHeader({ post }: { post: Post }) {
  const imageUrl = resolveImageUrl(post.featuredImage, 1600);
  const reading = formatReadingTime(
    estimateReadingMinutes(post.body, post.estimatedWordCount)
  );
  const published = formatDate(post.publishedAt);
  const updated = formatDate(post.updatedAt);

  return (
    <header className="border-b border-[var(--border-subtle)] pb-12">
      {post.category ? (
        <Link
          href={`/blog/category/${post.category.slug}`}
          className="eyebrow text-[var(--muted-dim)] transition-colors hover:text-[var(--foreground)]"
        >
          {post.category.title}
        </Link>
      ) : (
        <p className="eyebrow">Article</p>
      )}

      <h1 className="display mt-3 text-[clamp(2.4rem,6.5vw,4.4rem)] tracking-tight">
        {post.title}
      </h1>

      {post.excerpt ? (
        <p className="mt-6 max-w-[42rem] text-[clamp(1.1rem,2.3vw,1.35rem)] leading-relaxed text-[var(--accent-warm)]">
          {post.excerpt}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
        {post.author?.name ? (
          <span>
            By <span className="text-[var(--foreground)]">{post.author.name}</span>
          </span>
        ) : null}
        {published && post.publishedAt ? (
          <span>
            Published{" "}
            <time dateTime={post.publishedAt} className="text-[var(--foreground)]">
              {published}
            </time>
          </span>
        ) : null}
        {updated && post.updatedAt ? (
          <span>
            Updated{" "}
            <time dateTime={post.updatedAt} className="text-[var(--foreground)]">
              {updated}
            </time>
          </span>
        ) : null}
        <span>{reading}</span>
      </div>

      {imageUrl ? (
        <figure className="mt-10 overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface)]">
          <div className="relative aspect-[16/9]">
            <Image
              src={imageUrl}
              alt={post.featuredImage?.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 760px"
              priority
            />
          </div>
          {post.featuredImage?.caption ? (
            <figcaption className="border-t border-[var(--border-subtle)] px-4 py-3 text-sm text-[var(--muted-dim)]">
              {post.featuredImage.caption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
    </header>
  );
}
