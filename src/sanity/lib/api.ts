import { draftMode } from "next/headers";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CATEGORIES_WITH_POSTS_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  FEATURED_POST_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  POST_BY_SLUG_DRAFT_QUERY,
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
  PUBLISHED_POSTS_QUERY,
  RECENT_POSTS_QUERY,
  RELATED_POSTS_QUERY,
  SITEMAP_POSTS_QUERY,
} from "@/sanity/lib/queries";
import type { Category, Post, PostCard } from "@/sanity/lib/types";

const publishedClient = client.withConfig({
  useCdn: true,
  perspective: "published",
  stega: false,
});

async function fetchPublished<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await publishedClient.fetch<T>(query, params, {
      next: { revalidate: 60, tags: ["sanity"] },
    });
  } catch (error) {
    console.error("[sanity:published]", error);
    return null;
  }
}

async function fetchLive<T>(
  options: Parameters<typeof sanityFetch>[0]
): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    const result = await sanityFetch(options);
    return (result.data as T) ?? null;
  } catch (error) {
    console.error("[sanity:live]", error);
    return null;
  }
}

export async function getPublishedPosts(): Promise<PostCard[]> {
  const data = await fetchPublished<PostCard[]>(PUBLISHED_POSTS_QUERY);
  return data ?? [];
}

export async function getFeaturedPost(): Promise<PostCard | null> {
  return fetchPublished<PostCard>(FEATURED_POST_QUERY);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { isEnabled } = await draftMode();

  if (isEnabled) {
    return fetchLive<Post>({
      query: POST_BY_SLUG_DRAFT_QUERY,
      params: { slug },
    });
  }

  return fetchPublished<Post>(POST_BY_SLUG_QUERY, { slug });
}

export async function getPostBySlugForMetadata(
  slug: string
): Promise<Post | null> {
  const { isEnabled } = await draftMode();

  if (isEnabled) {
    return fetchLive<Post>({
      query: POST_BY_SLUG_DRAFT_QUERY,
      params: { slug },
      stega: false,
    });
  }

  return fetchPublished<Post>(POST_BY_SLUG_QUERY, { slug });
}

export async function getAllPublishedPostSlugs(): Promise<{ slug: string }[]> {
  const data = await fetchPublished<{ slug: string }[]>(POST_SLUGS_QUERY);
  return data ?? [];
}

export async function getSitemapPosts(): Promise<
  { slug: string; publishedAt?: string | null; updatedAt?: string | null }[]
> {
  const data = await fetchPublished<
    { slug: string; publishedAt?: string | null; updatedAt?: string | null }[]
  >(SITEMAP_POSTS_QUERY);
  return data ?? [];
}

export async function getRelatedPosts(
  post: Post,
  limit = 3
): Promise<PostCard[]> {
  if (post.relatedPosts?.length) {
    return post.relatedPosts.filter((p) => p.slug !== post.slug).slice(0, limit);
  }

  const tagIds = (post.tags ?? []).map((t) => t._id);
  const related = await fetchPublished<PostCard[]>(RELATED_POSTS_QUERY, {
    slug: post.slug,
    categoryId: post.category?._id ?? "",
    tagIds,
  });

  if (related?.length) return related.slice(0, limit);

  const recent = await fetchPublished<PostCard[]>(RECENT_POSTS_QUERY, {
    slug: post.slug,
  });
  return (recent ?? []).slice(0, limit);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return fetchPublished<Category>(CATEGORY_BY_SLUG_QUERY, { slug });
}

export async function getPostsByCategory(slug: string): Promise<PostCard[]> {
  const data = await fetchPublished<PostCard[]>(POSTS_BY_CATEGORY_QUERY, {
    slug,
  });
  return data ?? [];
}

export async function getCategoriesWithPosts(): Promise<
  (Category & { postCount: number })[]
> {
  const data = await fetchPublished<(Category & { postCount: number })[]>(
    CATEGORIES_WITH_POSTS_QUERY
  );
  return data ?? [];
}
