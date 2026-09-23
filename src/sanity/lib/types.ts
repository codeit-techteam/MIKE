import type { PortableTextBlock } from "@portabletext/types";

export type SanityImageAsset = {
  _id?: string;
  url?: string;
  metadata?: {
    dimensions?: { width?: number; height?: number; aspectRatio?: number };
    lqip?: string;
  };
};

export type SanityImage = {
  asset?: SanityImageAsset | { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
  caption?: string;
};

export type Author = {
  _id: string;
  name: string;
  slug?: string | null;
  bio?: string | null;
  image?: SanityImage | null;
};

export type Category = {
  _id: string;
  title: string;
  slug: string;
  description?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

export type Tag = {
  _id: string;
  title: string;
  slug: string;
};

export type FaqItem = {
  _key?: string;
  question: string;
  answer: string;
};

export type SeoFields = {
  seoTitle?: string | null;
  metaDescription?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: SanityImage | null;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
};

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  featured?: boolean | null;
  featuredImage?: SanityImage | null;
  author?: Author | null;
  category?: Category | null;
  tags?: Tag[] | null;
  estimatedWordCount?: number | null;
};

export type Post = PostCard & {
  body?: PortableTextBlock[] | null;
  faq?: FaqItem[] | null;
  relatedPosts?: PostCard[] | null;
  seo?: SeoFields | null;
  noIndex?: boolean | null;
  canonicalUrl?: string | null;
};
