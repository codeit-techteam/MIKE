import { defineArrayMember, defineType } from "sanity";

/**
 * Portable Text body for blog posts — renders as real semantic HTML on the site.
 */
export const blockContent = defineType({
  name: "blockContent",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
              {
                name: "blank",
                type: "boolean",
                title: "Open in new tab",
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Describe the image. Required for meaningful images.",
          validation: (rule) => rule.required().min(4).max(200),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
    }),
    defineArrayMember({
      name: "code",
      title: "Code block",
      type: "object",
      fields: [
        {
          name: "language",
          title: "Language",
          type: "string",
          options: {
            list: [
              { title: "Plain text", value: "text" },
              { title: "TypeScript", value: "typescript" },
              { title: "JavaScript", value: "javascript" },
              { title: "JSON", value: "json" },
              { title: "Bash", value: "bash" },
              { title: "CSS", value: "css" },
              { title: "HTML", value: "html" },
            ],
          },
          initialValue: "text",
        },
        {
          name: "code",
          title: "Code",
          type: "text",
          rows: 8,
          validation: (rule) => rule.required(),
        },
        {
          name: "filename",
          title: "Filename",
          type: "string",
        },
      ],
      preview: {
        select: { title: "filename", subtitle: "language" },
        prepare({ title, subtitle }) {
          return {
            title: title || "Code block",
            subtitle: subtitle || "text",
          };
        },
      },
    }),
    defineArrayMember({
      name: "callout",
      title: "Callout",
      type: "object",
      fields: [
        {
          name: "tone",
          title: "Tone",
          type: "string",
          options: {
            list: [
              { title: "Note", value: "note" },
              { title: "Tip", value: "tip" },
              { title: "Important", value: "important" },
            ],
            layout: "radio",
          },
          initialValue: "note",
        },
        {
          name: "body",
          title: "Text",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required(),
        },
      ],
      preview: {
        select: { title: "body", subtitle: "tone" },
      },
    }),
  ],
});
