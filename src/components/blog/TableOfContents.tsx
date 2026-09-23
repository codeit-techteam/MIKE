"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; text: string; level: 2 | 3 };

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!items.length) return;
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  const list = (
    <ol className="m-0 list-none space-y-2 p-0">
      {items.map((item) => (
        <li key={item.id} className={item.level === 3 ? "pl-3" : undefined}>
          <a
            href={`#${item.id}`}
            className={`block text-sm leading-snug transition-colors ${
              activeId === item.id
                ? "text-[var(--foreground)]"
                : "text-[var(--muted-dim)] hover:text-[var(--foreground)]"
            }`}
            onClick={() => setOpen(false)}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <nav aria-label="Table of contents" className="blog-toc">
      <div className="hidden lg:block">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted-dim)]">
          On this page
        </p>
        {list}
      </div>

      <div className="lg:hidden">
        <button
          type="button"
          className="flex w-full items-center justify-between border border-[var(--border)] px-4 py-3 text-left text-sm text-[var(--foreground)]"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          On this page
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        {open ? <div className="border border-t-0 border-[var(--border)] px-4 py-4">{list}</div> : null}
      </div>
    </nav>
  );
}
