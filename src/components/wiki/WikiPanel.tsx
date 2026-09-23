"use client";

import { useId, useState } from "react";
import { WIKI_PAGES, type WikiPage } from "./data";
import { ChevronIcon, WikiIcon } from "./icons";

type WikiPanelProps = {
  className?: string;
};

export function WikiPanel({ className = "" }: WikiPanelProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const previewId = useId();

  const toggle = (page: WikiPage) => {
    setActiveId((current) => (current === page.id ? null : page.id));
  };

  return (
    <div
      className={`wiki-panel relative overflow-hidden rounded-[1.35rem] border border-[rgba(255,255,255,0.08)] bg-[#151518] shadow-[0_28px_80px_rgba(0,0,0,0.45)] ${className}`.trim()}
    >
      <header className="border-b border-[rgba(255,255,255,0.06)] px-5 pb-5 pt-6 sm:px-6">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#6F6F76]">
          Recently updated
        </p>
        <h3 className="display mt-2 text-[clamp(2rem,4vw,2.75rem)] text-[#F5F5F2]">Wiki</h3>
      </header>

      <ul className="divide-y divide-[rgba(255,255,255,0.06)]" role="list">
        {WIKI_PAGES.map((page) => {
          const expanded = activeId === page.id;
          const panelId = `${previewId}-${page.id}`;

          return (
            <li key={page.id} className="wiki-row" data-page={page.id}>
              <button
                type="button"
                className="wiki-row-btn group flex w-full items-start gap-3 px-5 py-4 text-left transition-colors duration-300 hover:bg-[rgba(255,255,255,0.03)] focus-visible:bg-[rgba(255,255,255,0.04)] sm:gap-3.5 sm:px-6"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(page)}
              >
                <span className="wiki-row-icon mt-0.5 origin-center flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.7rem] bg-[rgba(200,196,255,0.12)] text-[rgba(200,196,255,0.9)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-[rgba(200,196,255,0.18)]">
                  <WikiIcon name={page.icon} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-[0.95rem] font-medium text-[#E8E8E4] transition-colors duration-300 group-hover:text-[#F5F5F2]">
                      {page.title}
                    </span>
                    <span className="flex shrink-0 items-center gap-2 pt-0.5">
                      <span className="text-[0.7rem] tabular-nums text-[#6F6F76]">{page.updated}</span>
                      <span
                        className={`text-[#6F6F76] transition-[opacity,transform] duration-300 ${
                          expanded
                            ? "translate-x-0 opacity-100"
                            : "translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-70 group-focus-visible:translate-x-0 group-focus-visible:opacity-70"
                        }`}
                      >
                        <ChevronIcon />
                      </span>
                    </span>
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-[#8E8E93]">
                    {page.description}
                  </span>
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-label={`${page.title} page preview`}
                hidden={!expanded}
                className={`overflow-hidden border-t border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] px-5 sm:px-6 ${
                  expanded ? "pb-5 pt-1" : ""
                }`}
              >
                {expanded ? <WikiPagePreview page={page} /> : null}
              </div>
            </li>
          );
        })}
      </ul>

      <p className="border-t border-[rgba(255,255,255,0.06)] px-5 py-3 text-[0.65rem] leading-relaxed text-[#6F6F76] sm:px-6">
        Demo pages for illustration — not connected to a live account.
      </p>
    </div>
  );
}

function WikiPagePreview({ page }: { page: WikiPage }) {
  return (
    <article className="pl-12 sm:pl-[3.25rem]">
      <h4 className="display text-2xl text-[#F5F5F2]">{page.title}</h4>
      <div className="mt-3 space-y-1">
        {page.detail.lines.map((line) => (
          <p key={line} className="text-sm leading-relaxed text-[#B0B0B0]">
            {line}
          </p>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[#6F6F76]">
          Recently mentioned
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-[#E8E8E4]">
          &ldquo;{page.detail.recentMention}&rdquo;
        </p>
      </div>

      <div className="mt-5">
        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[#6F6F76]">Related</p>
        <ul className="mt-2 flex flex-wrap gap-2" aria-label={`Related to ${page.title}`}>
          {page.detail.related.map((item) => (
            <li
              key={item}
              className="rounded-full border border-[rgba(255,255,255,0.08)] px-2.5 py-1 text-[0.7rem] text-[#A1A1A6]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
