"use client";

import { useId, useState } from "react";
import type { PrivacyFaqItem } from "@/lib/privacy";

type PrivacyFaqProps = {
  items: PrivacyFaqItem[];
};

export function PrivacyFaq({ items }: PrivacyFaqProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="privacy-faq">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <div key={item.id} className="privacy-faq-item border-b border-[var(--border-subtle)]">
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--foreground)]"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span className="text-[clamp(1.05rem,2.2vw,1.2rem)] leading-snug text-[var(--foreground)]">
                  {item.question}
                </span>
                <span
                  className={`mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-sm text-[var(--muted)] transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 pr-10 text-[var(--muted)]"
            >
              <p className="m-0 max-w-prose text-[1.02rem] leading-relaxed">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
