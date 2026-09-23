import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "classification", title: "Classification" },
    { name: "publication", title: "Publication" },
    { name: "seo", title: "SEO" },
    { name: "faq", title: "FAQ" },
    { name: "related", title: "Related content" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: "Primary article H1 on the website.",
      validation: (rule) => rule.required().min(8).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/['’]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "Used on cards, listings, and as Open Graph fallback.",
      validation: (rule) =>
        rule.max(320).warning("Keep excerpts concise for cards and social previews."),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Describe the image. Required when an image is set.",
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context.parent as { asset?: unknown } | undefined;
              if (parent?.asset && !value) {
                return "Add meaningful alt text. Do not use generic labels like “blog image”.";
              }
              if (value && /^(image|blog image|mike blog)$/i.test(value.trim())) {
                return "Use a descriptive alt text.";
              }
              return true;
            }),
        }),
        defineField({
          name: "caption",
          type: "string",
          title: "Caption",
        }),
      ],
      validation: (rule) =>
        rule.warning("A featured image improves sharing and the blog listing."),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      group: "content",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "classification",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "classification",
      validation: (rule) =>
        rule.warning("Categories help readers browse related ideas."),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "classification",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "publication",
      description: "Drafts without a publish date (or a future date) stay off the public site.",
      validation: (rule) =>
        rule.warning("Set a publish date when you are ready for the post to go live."),
    }),
    defineField({
      name: "updatedAt",
      title: "Updated at",
      type: "datetime",
      group: "publication",
      description: "Only set when the article is genuinely updated.",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "publication",
      initialValue: false,
      description: "Show this post in the large featured slot on /blog.",
    }),
    defineField({
      name: "noIndex",
      title: "No index (document-level)",
      type: "boolean",
      group: "seo",
      initialValue: false,
      description: "Shortcut for excluding this post from search indexes and the sitemap.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL (document-level)",
      type: "url",
      group: "seo",
      description: "Optional. Prefer the SEO object field when setting overrides.",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "seo",
      title: "SEO settings",
      type: "seo",
      group: "seo",
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      group: "faq",
      of: [defineArrayMember({ type: "faqItem" })],
      description: "Visible FAQ section. Also powers FAQPage JSON-LD when present.",
    }),
    defineField({
      name: "relatedPosts",
      title: "Related posts",
      type: "array",
      group: "related",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })],
      description: "Optional manual overrides. Otherwise related posts are inferred.",
      validation: (rule) => rule.max(3),
    }),
  ],
  orderings: [
    {
      title: "Published date, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Title",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "featuredImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, author, media, publishedAt }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "Draft";
      return {
        title: title || "Untitled post",
        subtitle: [author, date].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
