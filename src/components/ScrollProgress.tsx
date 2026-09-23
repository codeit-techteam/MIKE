"use client";

import { useRef, useState } from "react";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const CHAPTERS = [
  { id: "problem", label: "The problem" },
  { id: "how", label: "Capture" },
  { id: "wiki", label: "Wiki" },
  { id: "ask", label: "Ask" },
  { id: "context", label: "Context" },
  { id: "manners", label: "Good manners" },
  { id: "privacy", label: "Privacy" },
  { id: "access", label: "Try Mike" },
] as const;

/** Mount after all chapters so chapter positions include pin spacing. */
export function ScrollProgress() {
  const navRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      registerGsap();
      const nav = navRef.current;
      const fill = nav?.querySelector(".progress-fill");
      if (!nav || !fill) return;

      const reduced = prefersReducedMotion();
      const sections = CHAPTERS.map(({ id }) => document.getElementById(id));
      const first = sections[0];
      if (!first) return;

      gsap.set(nav, { autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: first,
        start: "top 60%",
        end: "max",
        onToggle: (self) =>
          gsap.to(nav, { autoAlpha: self.isActive ? 1 : 0, duration: reduced ? 0 : 0.4 }),
      });

      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: first, start: "top center", end: "max", scrub: true },
        }
      );

      sections.forEach((section, index) => {
        if (!section) return;
        const next = sections[index + 1];
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          ...(next ? { endTrigger: next, end: "top center" } : { end: "max" }),
          onToggle: (self) => {
            if (self.isActive) setActive(index);
          },
        });
      });
    },
    { scope: navRef }
  );

  const current = CHAPTERS[active];

  return (
    <nav
      ref={navRef}
      aria-label="Chapters"
      className="invisible fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 opacity-0 min-[1200px]:flex"
    >
      <p
        className="text-[0.62rem] uppercase tracking-[0.2em] text-[var(--muted-dim)] [writing-mode:vertical-rl]"
        aria-hidden="true"
      >
        <span className="text-[var(--accent-warm)] tabular-nums">
          {String(active + 1).padStart(2, "0")}
        </span>{" "}
        / {current.label}
      </p>

      <div className="relative">
        <span className="absolute inset-y-1 left-1/2 w-px -translate-x-1/2 bg-[rgba(255,255,255,0.08)]" />
        <span className="progress-fill absolute inset-y-1 left-1/2 w-px -translate-x-1/2 origin-top scale-y-0 bg-[var(--accent-warm)] opacity-60" />
        <ol className="relative m-0 flex list-none flex-col gap-3 p-0">
          {CHAPTERS.map((chapter, index) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                className="group flex h-4 w-4 items-center justify-center"
                aria-label={`${String(index + 1).padStart(2, "0")} ${chapter.label}`}
                aria-current={index === active ? "step" : undefined}
              >
                <span
                  className={`block rounded-full transition-[width,height,background-color] duration-300 ${
                    index === active
                      ? "h-2 w-2 bg-[var(--accent-warm)]"
                      : "h-1 w-1 bg-[var(--muted-dim)] group-hover:bg-[var(--foreground)]"
                  }`}
                />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
