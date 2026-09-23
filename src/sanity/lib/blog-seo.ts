import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { absoluteUrl } from "@/lib/seo";
import { resolveImageUrl } from "@/sanity/lib/image";
import type { Post, SeoFields } from "@/sanity/lib/types";

export function resolveSeoTitle(post: Pick<Post, "title" | "seo">): string {
  return post.seo?.seoTitle?.trim() || post.title;
}

export function resolveMetaDescription(
  post: Pick<Post, "excerpt" | "seo">
): string {
  return (
    post.seo?.metaDescription?.trim() ||
    post.excerpt?.trim() ||
    SITE.description
  );
}

export function resolveOgTitle(post: Pick<Post, "title" | "seo">): string {
  return post.seo?.ogTitle?.trim() || post.title;
}

export function resolveOgDescription(
  post: Pick<Post, "excerpt" | "seo">
): string {
  return (
    post.seo?.ogDescription?.trim() ||
    post.excerpt?.trim() ||
    SITE.description
  );
}

export function resolveCanonicalUrl(
  post: Pick<Post, "slug" | "seo" | "canonicalUrl">
): string {
  const explicit =
    post.seo?.canonicalUrl?.trim() || post.canonicalUrl?.trim() || "";
  if (explicit) return explicit;
  return absoluteUrl(`/blog/${post.slug}`);
}

export function isNoIndex(post: Pick<Post, "noIndex" | "seo">): boolean {
  return Boolean(post.noIndex || post.seo?.noIndex);
}

export function resolveOgImageUrl(
  post: Pick<Post, "featuredImage" | "seo">
): string | undefined {
  const image = post.seo?.ogImage || post.featuredImage;
  return resolveImageUrl(image, 1200);
}

export function buildPostMetadata(post: Post): Metadata {
  const title = resolveSeoTitle(post);
  const description = resolveMetaDescription(post);
  const canonical = resolveCanonicalUrl(post);
  const ogTitle = resolveOgTitle(post);
  const ogDescription = resolveOgDescription(post);
  const ogImage = resolveOgImageUrl(post);
  const noIndex = isNoIndex(post);
  const documentTitle = post.seo?.seoTitle?.trim()
    ? title
    : `${title} — ${SITE.name}`;

  return {
    title: { absolute: documentTitle },
    description,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: canonical,
      siteName: SITE.name,
      title: ogTitle,
      description: ogDescription,
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt || post.publishedAt || undefined,
      authors: post.author?.name ? [post.author.name] : [SITE.company],
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: post.featuredImage?.alt || title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export function blogPostingSchema(post: Post) {
  const canonical = resolveCanonicalUrl(post);
  const description = resolveMetaDescription(post);
  const image = resolveOgImageUrl(post);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: resolveSeoTitle(post),
    description,
    image: image ? [image] : undefined,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || post.publishedAt || undefined,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
        }
      : {
          "@type": "Organization",
          name: SITE.company,
          url: SITE.url,
        },
    publisher: {
      "@type": "Organization",
      name: SITE.company,
      url: SITE.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    url: canonical,
    isPartOf: {
      "@type": "Blog",
      name: `${SITE.name} Blog`,
      url: absoluteUrl("/blog"),
    },
  };
}

export function charCountHint(value: string | undefined, min: number, max: number) {
  const length = value?.length ?? 0;
  if (length === 0) return `Recommended ${min}–${max} characters`;
  if (length < min) return `${length} characters (a bit short)`;
  if (length > max) return `${length} characters (a bit long)`;
  return `${length} characters`;
}

export type { SeoFields };
