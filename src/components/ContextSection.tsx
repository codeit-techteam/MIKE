"use client";

import { useRef, type CSSProperties } from "react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

/** Positions share the SVG's 1000 × 560 coordinate space. */
const CENTER = { x: 500, y: 280 };
const NODES = [
  { label: "College", detail: "Where you met", x: 250, y: 80 },
  { label: "₹2,400", detail: "He paid at Naru", x: 750, y: 80 },
  { label: "Naru", detail: "Bandra · his find", x: 850, y: 290 },
  { label: "Dinner Friday", detail: "Coming over", x: 750, y: 490 },
  { label: "Birthday", detail: "March", x: 250, y: 490 },
  { label: "Ceramics class", detail: "With Anita", x: 150, y: 290 },
];

function curve(x: number, y: number) {
  return `M${CENTER.x} ${CENTER.y} Q ${(CENTER.x + x) / 2} ${CENTER.y} ${x} ${y}`;
}

export function ContextSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const hub = q(".context-hub");
      const lines = q(".context-line");
      const nodes = q(".context-node");
      const dots = q(".context-dot");
      const labels = q(".context-label");

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q(".context-graph")[0],
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        });

        tl.fromTo(hub, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6 }, 0);
        nodes.forEach((node, i) => {
          const at = 0.4 + i * 0.35;
          tl.fromTo(lines[i], { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6 }, at)
            .fromTo(dots[i], { scale: 0 }, { scale: 1, duration: 0.25, ease: "back.out(3)" }, at + 0.5)
            .fromTo(
              labels[i],
              { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
              at + 0.6
            );
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          [...hub, ...nodes],
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: q(".context-graph")[0], start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      id="context"
      ref={rootRef}
      className="section relative border-t border-[var(--border-subtle)]"
      aria-labelledby="context-heading"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Context</SectionEyebrow>
          <h2 id="context-heading" className="display text-[clamp(2.4rem,4.6vw,4.25rem)]">
            Mike remembers the context,
            <span className="block text-[var(--accent-warm)]">not just the sentence.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[var(--muted)] md:text-lg">
            Sam isn&apos;t a line in a chat. He&apos;s someone from college who you owe ₹2,400, who
            found Naru, and who&apos;s coming to dinner on Friday. Mike keeps those threads together,
            so one question can pull on all of them.
          </p>
        </div>

        <div className="context-graph relative mx-auto mt-14 max-w-5xl md:mt-16 md:aspect-[1000/560]">
          <div className="absolute inset-0 hidden md:block" aria-hidden="true">
            <svg viewBox="0 0 1000 560" preserveAspectRatio="none" className="h-full w-full">
              {NODES.map((node) => (
                <path
                  key={node.label}
                  className="context-line"
                  d={curve(node.x, node.y)}
                  pathLength={1}
                  strokeDasharray="1"
                  fill="none"
                  stroke="rgba(200,196,255,0.28)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          </div>

          <article className="context-hub relative z-10 mx-auto w-full max-w-[15rem] rounded-[1.25rem] border border-[rgba(255,255,255,0.1)] bg-[#151518] p-5 text-center shadow-[0_24px_70px_rgba(0,0,0,0.5)] md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[var(--muted-dim)]">Page</p>
            <h3 className="display mt-1 text-4xl text-[#F5F5F2]">Sam</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">Six things, one person</p>
          </article>

          <ul className="mt-6 grid list-none grid-cols-2 gap-3 p-0 md:mt-0" aria-label="What Mike connects to Sam">
            {NODES.map((node) => {
              // The dot sits on the line's end; the label extends away from the hub.
              const side =
                node.x < CENTER.x
                  ? "md:ml-[5px] md:-translate-x-full md:flex-row-reverse md:text-right"
                  : "md:-ml-[5px]";
              return (
                <li
                  key={node.label}
                  className={`context-node rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-3 md:absolute md:left-[var(--x)] md:top-[var(--y)] md:flex md:-translate-y-1/2 md:items-center md:gap-3 md:border-0 md:bg-transparent md:p-0 ${side}`}
                  style={{ "--x": `${node.x / 10}%`, "--y": `${(node.y / 560) * 100}%` } as CSSProperties}
                >
                  <span
                    className="context-dot hidden h-2.5 w-2.5 shrink-0 rounded-full border border-[var(--accent)] bg-[var(--background)] md:block"
                    aria-hidden="true"
                  />
                  <span className="context-label block md:whitespace-nowrap">
                    <span className="block text-[var(--foreground)]">{node.label}</span>
                    <span className="block text-sm text-[var(--muted)]">{node.detail}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
