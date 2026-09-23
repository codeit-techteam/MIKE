"use client";

import { useRef, useState } from "react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { gsap, MOTION_CONDITIONS, registerGsap, useGSAP } from "@/lib/gsap";

const HISTORY = [
  { when: "Today 18:42", verb: "Added", text: "He's coming to dinner Friday." },
  { when: "Yesterday 21:10", verb: "Added", text: "The dinner at Naru, and that you owe him ₹2,400." },
  { when: "31 Aug 09:15", verb: "Created", text: "From your message about college." },
];

const PAGE_LINES = ["From college.", "You owe him ₹2,400.", "Coming to dinner Friday."];

const VERSION_LABELS = ["Current version", "As of yesterday, 21:10", "As of 31 Aug, 09:15"];

const MANNERS = [
  {
    title: "Every change, in plain words",
    body: "“Changed Mum's dose to 5mg, up from 2.5.” What changed and why, not a timestamp and a diff.",
  },
  {
    title: "Anything can be put back",
    body: "Open a page's history and restore the version from before. Nothing Mike does is permanent.",
  },
  {
    title: "He says when he doesn't know",
    body: "If your pages hold no answer, Mike says so and asks, rather than inventing something that sounds right.",
  },
];

export function HistorySection() {
  const rootRef = useRef<HTMLElement>(null);
  const [restored, setRestored] = useState<number | null>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const line = q(".history-line");
      const items = q(".history-item");
      const pageLines = q(".version-line");
      const labels = q(".version-label");
      const restores = q(".history-restore");
      const manners = q(".manner-block");

      const mm = gsap.matchMedia();

      mm.add(MOTION_CONDITIONS, (context) => {
        const { story } = context.conditions as { story: boolean };

        if (!story) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: { trigger: q(".history-list")[0], start: "top 80%", end: "bottom 60%", scrub: true },
            }
          );
          gsap.fromTo(
            [...items, ...manners],
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: { trigger: q(".history-list")[0], start: "top 85%", toggleActions: "play none none reverse" },
            }
          );
          return;
        }

        const selected = "rgba(200,196,255,0.08)";
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=240%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        gsap.set(labels.slice(1), { opacity: 0, y: 10 });
        gsap.set(restores, { autoAlpha: 0, y: 6 });

        tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 1, transformOrigin: "top center" }, 0)
          .fromTo(
            items,
            { opacity: 0, x: -16 },
            { opacity: 1, x: 0, duration: 0.5, stagger: 0.25, ease: "power2.out" },
            0.1
          )
          .fromTo(
            manners,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: "power2.out" },
            0.3
          )
          .fromTo(items[0], { backgroundColor: "rgba(200,196,255,0)" }, { backgroundColor: selected, duration: 0.4 }, 0.9);

        // Step back through the page's versions, newest to oldest.
        [1, 2].forEach((step) => {
          const at = 1.2 + step * 1.1;
          tl.to(items[step - 1], { backgroundColor: "rgba(200,196,255,0)", duration: 0.4 }, at)
            .fromTo(items[step], { backgroundColor: "rgba(200,196,255,0)" }, { backgroundColor: selected, duration: 0.4 }, at)
            .to(pageLines[PAGE_LINES.length - step], { opacity: 0, x: 12, duration: 0.5 }, at)
            .to(labels[step - 1], { opacity: 0, y: -10, duration: 0.4 }, at)
            .to(labels[step], { opacity: 1, y: 0, duration: 0.4 }, at + 0.15);
        });

        tl.to(restores, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.1 }, 3.8).to({}, { duration: 0.8 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      id="manners"
      ref={rootRef}
      className="story-chapter relative border-t border-[var(--border-subtle)] py-[var(--section-spacing)] story:flex story:h-screen story:items-center story:overflow-hidden story:py-0 story:pt-16"
      aria-labelledby="manners-heading"
    >
      <div className="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <SectionEyebrow>Good manners</SectionEyebrow>
          <h2 id="manners-heading" className="display text-[clamp(2.4rem,4.6vw,4.25rem)]">
            Memory should be
            <span className="block text-[var(--accent-warm)]">reversible.</span>
          </h2>
          <p className="mt-5 text-[var(--muted)] md:text-lg">
            Mike rewrites your pages as your life changes. So he keeps a note of every change he
            makes, in words you can actually read, and any of them can be put back.
          </p>
          <div className="mt-8 grid gap-4">
            {MANNERS.map((item) => (
              <article key={item.title} className="manner-block border-t border-[var(--border-subtle)] pt-4">
                <h3 className="text-[var(--foreground)]">{item.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-[#0E0E10] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
          <article className="border-b border-[rgba(255,255,255,0.06)] p-6" aria-label="Sam's page">
            <div className="flex items-center justify-between gap-4">
              <h3 className="display text-3xl text-[#F5F5F2]">Sam</h3>
              <p className="grid text-right text-[0.65rem] uppercase tracking-[0.16em] text-[var(--accent)]">
                {VERSION_LABELS.map((label, index) => (
                  <span
                    key={label}
                    className={`version-label [grid-area:1/1] ${index > 0 ? "hidden story:block" : ""}`}
                    aria-hidden={index > 0 ? true : undefined}
                  >
                    {label}
                  </span>
                ))}
              </p>
            </div>
            <div className="mt-4 space-y-1.5">
              {PAGE_LINES.map((text) => (
                <p key={text} className="version-line text-[#C8C8C4]">
                  {text}
                </p>
              ))}
            </div>
          </article>

          <div className="p-6">
            <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">
              History · every change in plain words
            </p>
            <div className="history-list relative mt-4 pl-6">
              <span className="history-line absolute bottom-3 left-[0.3rem] top-3 w-px origin-top bg-[var(--border)]" aria-hidden="true" />
              <ol className="m-0 list-none space-y-1 p-0" aria-label="Page history for Sam">
                {HISTORY.map((item, index) => (
                  <li key={item.when} className="history-item relative -ml-3 rounded-xl px-3 py-3">
                    <span
                      className="absolute -left-[0.95rem] top-[1.15rem] h-2 w-2 rounded-full border border-[var(--foreground)] bg-[var(--background)]"
                      aria-hidden="true"
                    />
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">{item.when}</p>
                      {index < HISTORY.length - 1 ? (
                        <button
                          type="button"
                          className="history-restore shrink-0 text-xs text-[var(--accent-warm)] underline-offset-4 hover:underline"
                          onClick={() => setRestored(index)}
                          aria-label={`Restore the version before ${item.when}`}
                        >
                          {restored === index ? "Restored" : "Restore"}
                        </button>
                      ) : null}
                    </div>
                    <p className="mt-1 text-[#E8E8E4]">
                      <span className="text-[var(--muted)]">{item.verb}: </span>
                      {item.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-3 min-h-5 text-xs text-[var(--muted)]" role="status">
              {restored !== null
                ? "Demo only. In the app, this would put Sam's page back to the version before that change."
                : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
