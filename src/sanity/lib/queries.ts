import { defineQuery } from "next-sanity";

const imageFields = /* groq */ `
  ...,
  alt,
  caption,
  asset->{
    _id,
    url,
    metadata { dimensions, lqip }
  }
`;

const authorFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  bio,
  image { ${imageFields} }
`;

const categoryFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  description,
  seoTitle,
  seoDescription
`;

const tagFields = /* groq */ `
  _id,
  title,
  "slug": slug.current
`;

const postCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  featured,
  featuredImage { ${imageFields} },
  author->{ ${authorFields} },
  category->{ ${categoryFields} },
  tags[]->{ ${tagFields} },
  "estimatedWordCount": length(pt::text(body))
`;

/** Published + indexable posts only (public site). */
const publishedFilter = /* groq */ `
  _type == "post"
  && defined(slug.current)
  && defined(publishedAt)
  && publishedAt <= now()
  && coalesce(noIndex, false) != true
  && coalesce(seo.noIndex, false) != true
`;

export const PUBLISHED_POSTS_QUERY = defineQuery(`
  *[${publishedFilter}] | order(publishedAt desc) {
    ${postCardFields}
  }
`);

export const FEATURED_POST_QUERY = defineQuery(`
  *[${publishedFilter} && featured == true] | order(publishedAt desc) [0] {
    ${postCardFields}
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "post"
    && slug.current == $slug
    && defined(publishedAt)
    && publishedAt <= now()
  ][0] {
    ${postCardFields},
    body[]{
      ...,
      _type == "image" => {
        ...,
        alt,
        caption,
        asset->{
          _id,
          url,
          metadata { dimensions, lqip }
        }
      }
    },
    faq[]{ _key, question, answer },
    relatedPosts[]->{ ${postCardFields} },
    seo {
      seoTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage { ${imageFields} },
      canonicalUrl,
      noIndex
    },
    noIndex,
    canonicalUrl
  }
`);

/** Draft Mode / Presentation Tool: include drafts by slug. */
export const POST_BY_SLUG_DRAFT_QUERY = defineQuery(`
  *[
    _type == "post"
    && slug.current == $slug
  ] | order(_updatedAt desc) [0] {
    ${postCardFields},
    body[]{
      ...,
      _type == "image" => {
        ...,
        alt,
        caption,
        asset->{
          _id,
          url,
          metadata { dimensions, lqip }
        }
      }
    },
    faq[]{ _key, question, answer },
    relatedPosts[]->{ ${postCardFields} },
    seo {
      seoTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage { ${imageFields} },
      canonicalUrl,
      noIndex
    },
    noIndex,
    canonicalUrl
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[${publishedFilter}] {
    "slug": slug.current
  }
`);

export const SITEMAP_POSTS_QUERY = defineQuery(`
  *[${publishedFilter}] {
    "slug": slug.current,
    publishedAt,
    updatedAt
  }
`);

export const RELATED_POSTS_QUERY = defineQuery(`
  *[
    ${publishedFilter}
    && slug.current != $slug
    && (
      category._ref == $categoryId
      || count((tags[]._ref)[@ in $tagIds]) > 0
    )
  ] | order(
    select(category._ref == $categoryId => 0, 1) asc,
    publishedAt desc
  ) [0...3] {
    ${postCardFields}
  }
`);

export const RECENT_POSTS_QUERY = defineQuery(`
  *[${publishedFilter} && slug.current != $slug] | order(publishedAt desc) [0...3] {
    ${postCardFields}
  }
`);

export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    ${categoryFields}
  }
`);

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`
  *[${publishedFilter} && category->slug.current == $slug] | order(publishedAt desc) {
    ${postCardFields}
  }
`);

export const CATEGORIES_WITH_POSTS_QUERY = defineQuery(`
  *[_type == "category" && count(*[${publishedFilter} && references(^._id)]) > 0] | order(title asc) {
    ${categoryFields},
    "postCount": count(*[${publishedFilter} && references(^._id)])
  }
`);
