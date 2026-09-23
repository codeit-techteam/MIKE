import Image from "next/image";
import type { ReactNode } from "react";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function blockText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(blockText).join("");
  return "";
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => {
      const text = blockText(children);
      const id = slugify(text);
      return (
        <h2 id={id} className="blog-h2 scroll-mt-28">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = blockText(children);
      const id = slugify(text);
      return (
        <h3 id={id} className="blog-h3 scroll-mt-28">
          {children}
        </h3>
      );
    },
    h4: ({ children }) => <h4 className="blog-h4">{children}</h4>,
    normal: ({ children }) => <p className="blog-p">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="blog-quote">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="blog-list">{children}</ul>,
    number: ({ children }) => <ol className="blog-list blog-list-ordered">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code className="blog-inline-code">{children}</code>,
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const blank = Boolean(value?.blank);
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="blog-link"
          {...(blank || external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      let src: string | undefined;
      try {
        src = urlForImage(value).width(1200).auto("format").url();
      } catch {
        return null;
      }
      if (!src) return null;
      return (
        <figure className="blog-figure">
          <Image
            src={src}
            alt={value.alt || ""}
            width={1200}
            height={675}
            className="h-auto w-full"
            sizes="(max-width: 900px) 100vw, 720px"
          />
          {value.caption ? (
            <figcaption className="blog-figcaption">{value.caption}</figcaption>
          ) : null}
        </figure>
      );
    },
    code: ({ value }) => (
      <figure className="blog-code">
        {value?.filename ? (
          <figcaption className="blog-code-filename">{value.filename}</figcaption>
        ) : null}
        <pre>
          <code className={value?.language ? `language-${value.language}` : undefined}>
            {value?.code || ""}
          </code>
        </pre>
      </figure>
    ),
    callout: ({ value }) => (
      <aside className={`blog-callout blog-callout-${value?.tone || "note"}`} role="note">
        <p className="blog-callout-label">
          {value?.tone === "tip"
            ? "Tip"
            : value?.tone === "important"
              ? "Important"
              : "Note"}
        </p>
        <p>{value?.body}</p>
      </aside>
    ),
  },
};

export function ArticleBody({
  value,
}: {
  value: PortableTextBlock[] | null | undefined;
}) {
  if (!value?.length) return null;
  return (
    <div className="blog-prose">
      <PortableText value={value} components={components} />
    </div>
  );
}

export function extractToc(
  body: PortableTextBlock[] | null | undefined
): { id: string; text: string; level: 2 | 3 }[] {
  if (!body?.length) return [];
  const items: { id: string; text: string; level: 2 | 3 }[] = [];

  for (const block of body) {
    if (block._type !== "block") continue;
    const style = "style" in block ? String(block.style) : "";
    if (style !== "h2" && style !== "h3") continue;
    const children = "children" in block && Array.isArray(block.children)
      ? block.children
      : [];
    const text = children
      .map((child) =>
        typeof child === "object" && child && "text" in child
          ? String(child.text)
          : ""
      )
      .join("")
      .trim();
    if (!text) continue;
    items.push({
      id: slugify(text),
      text,
      level: style === "h2" ? 2 : 3,
    });
  }

  return items;
}
