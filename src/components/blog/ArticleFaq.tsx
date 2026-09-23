import type { FaqItem } from "@/sanity/lib/types";

export function ArticleFaq({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;

  return (
    <section className="mt-16 border-t border-[var(--border-subtle)] pt-12" aria-labelledby="article-faq-heading">
      <h2 id="article-faq-heading" className="blog-h2">
        Frequently asked questions
      </h2>
      <div className="mt-8 space-y-8">
        {items.map((item, index) => (
          <div key={item._key || `${item.question}-${index}`}>
            <h3 className="blog-h3 mt-0">{item.question}</h3>
            <p className="blog-p mt-3">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
