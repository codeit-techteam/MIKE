import type { MetadataRoute } from "next";
import { INDEXABLE_PAGES, absoluteUrl } from "@/lib/seo";
import { getSitemapPosts } from "@/sanity/lib/api";
import { getCategoriesWithPosts } from "@/sanity/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = INDEXABLE_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: page.lastModified,
  }));

  const [posts, categories] = await Promise.all([
    getSitemapPosts(),
    getCategoriesWithPosts(),
  ]);

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt || post.publishedAt || undefined,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/blog/category/${category.slug}`),
    lastModified: new Date().toISOString().slice(0, 10),
  }));

  return [...staticEntries, ...postEntries, ...categoryEntries];
}
