import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      description: "Recommended ~50–60 characters. Falls back to the post title.",
      validation: (rule) =>
        rule.max(70).warning("Keep SEO titles under ~60 characters when possible."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Recommended ~140–160 characters. Falls back to the excerpt.",
      validation: (rule) =>
        rule
          .max(180)
          .warning("Keep meta descriptions under ~160 characters when practical."),
    }),
    defineField({
      name: "ogTitle",
      title: "Open Graph title",
      type: "string",
      description: "Optional. Falls back to the post title.",
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph description",
      type: "text",
      rows: 3,
      description: "Optional. Falls back to the excerpt.",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context.parent as { asset?: unknown } | undefined;
              if (parent?.asset && !value) {
                return "Describe the image for accessibility and social previews.";
              }
              return true;
            }),
        }),
      ],
      description: "Optional. Falls back to the featured image.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description:
        "Optional absolute URL. Defaults to https://michaelross.ai/blog/[slug].",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "noIndex",
      title: "No index",
      type: "boolean",
      description: "If enabled, search engines are asked not to index this post.",
      initialValue: false,
    }),
  ],
});
