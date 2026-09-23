"use client";

import { useRef } from "react";
import Link from "next/link";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { WikiPanel } from "./WikiPanel";
import { gsap, MOTION_CONDITIONS, registerGsap, useGSAP } from "@/lib/gsap";

export function WikiSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const panel = q(".wiki-panel")[0] as HTMLElement | undefined;
      const rows = q(".wiki-row") as HTMLElement[];
      const icons = q(".wiki-row-icon");
      const samRow = rows.find((row) => row.dataset.page === "sam");
      const introLines = q(".wiki-line-inner");
      const introRest = q(".wiki-intro-rest");
      const intro = q(".wiki-intro");
      const living = q(".wiki-living");
      const page = q(".sam-page")[0] as HTMLElement | undefined;
      const pageContent = q(".sam-page-content");
      const incoming = q(".sam-incoming");
      const update = q(".sam-update");
      const badge = q(".sam-badge");
      if (!panel || !samRow || !page) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_CONDITIONS, (context) => {
        const { story } = context.conditions as { story: boolean };

        if (!story) {
          gsap.fromTo(
            rows,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.07,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: { trigger: panel, start: "top 80%", toggleActions: "play none none reverse" },
            }
          );
          gsap
            .timeline({
              scrollTrigger: { trigger: page, start: "top 80%", toggleActions: "play none none reverse" },
            })
            .fromTo(incoming, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
            .fromTo(update, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, "+=0.2")
            .fromTo(badge, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.2");
          return;
        }

        gsap.fromTo(
          [...introLines],
          { yPercent: 105 },
          {
            yPercent: 0,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: root, start: "top 75%", end: "top 15%", scrub: 0.6 },
          }
        );
        gsap.fromTo(
          [...introRest, panel],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 65%", end: "top 10%", scrub: 0.6 },
          }
        );

        const rowClip = () => {
          const top = samRow.offsetTop;
          const bottom = panel.offsetHeight - top - samRow.offsetHeight;
          return `inset(${top}px 0px ${bottom}px 0px round 14px)`;
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=320%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.set(living, { opacity: 0, y: 30 });
        gsap.set(page, { autoAlpha: 0 });

        // The wiki assembles itself, one page at a time.
        rows.forEach((row, i) => {
          const at = 0.2 + i * 0.5;
          tl.fromTo(
            row,
            { opacity: 0, y: 18, scaleX: 0.97, transformOrigin: "left center" },
            { opacity: 1, y: 0, scaleX: 1, duration: 0.6, ease: "power2.out" },
            at
          ).fromTo(
            icons[i],
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
            at + 0.15
          );
        });

        // Then one page opens and keeps up with the news.
        tl.to(intro, { opacity: 0, y: -30, duration: 0.45, ease: "power2.in" }, 3.4)
          .to(living, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 3.95)
          .to(samRow, { backgroundColor: "rgba(200,196,255,0.07)", duration: 0.4 }, 3.6)
          .set(page, { autoAlpha: 1 }, 4.1)
          .fromTo(
            page,
            { clipPath: rowClip },
            { clipPath: "inset(0px 0px 0px 0px round 22px)", duration: 0.9, ease: "power2.inOut" },
            4.1
          )
          .fromTo(
            pageContent,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
            4.6
          )
          .fromTo(
            incoming,
            { opacity: 0, y: 40, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out" },
            5.4
          )
          .to(incoming, { opacity: 0, y: -24, scale: 0.94, duration: 0.6, ease: "power2.in" }, 6.5)
          .fromTo(
            update,
            { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" },
            { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power2.out" },
            6.8
          )
          .fromTo(
            update,
            { backgroundColor: "rgba(200,196,255,0.16)" },
            { backgroundColor: "rgba(200,196,255,0)", duration: 1 },
            7.4
          )
          .fromTo(badge, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, 7.2)
          .to({}, { duration: 0.8 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      id="wiki"
      ref={rootRef}
      className="story-chapter relative border-t border-[var(--border-subtle)] py-[var(--section-spacing)] story:flex story:h-screen story:items-center story:overflow-hidden story:py-0 story:pt-16"
      aria-labelledby="wiki-heading"
    >
      <div className="container grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div className="grid gap-12 story:gap-0">
          <div className="wiki-intro max-w-xl story:[grid-area:1/1]">
            <div className="wiki-intro-rest">
              <SectionEyebrow>Your pages</SectionEyebrow>
            </div>
            <h2 id="wiki-heading" className="display text-[clamp(2.4rem,4.6vw,4.25rem)] text-[var(--foreground)]">
              <span className="block overflow-hidden pb-1">
                <span className="wiki-line-inner block">One page for every</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="wiki-line-inner block text-[var(--accent-warm)]">person, plan and thing.</span>
              </span>
            </h2>
            <p className="wiki-intro-rest mt-6 text-[var(--muted)] md:text-lg">
              Mike keeps a wiki about your life. Not a feed, not a pile of notes. A page for each
              thing that matters, which fills in as you mention it and stays current as it changes.
            </p>
            <p className="wiki-intro-rest mt-4 text-sm">
              <Link href="/ai-memory" className="text-[var(--accent-warm)] underline-offset-4 hover:underline">
                How Mike organizes AI memory
              </Link>
            </p>
          </div>

          <div className="wiki-living max-w-xl story:[grid-area:1/1] story:self-center">
            <SectionEyebrow>Living pages</SectionEyebrow>
            <h3 className="display text-[clamp(2.2rem,4.2vw,3.75rem)] text-[var(--foreground)]">
              Mike doesn&apos;t just remember what you said.
              <span className="mt-1 block text-[var(--accent-warm)]">He keeps it current.</span>
            </h3>
            <p className="mt-6 text-[var(--muted)] md:text-lg">
              Mention something new and the page it belongs to updates itself. A person, a place, a
              plan: each page grows with what you tell Mike, so what you get back is today&apos;s
              version, not an old note.
            </p>
          </div>
        </div>

        <div className="relative">
          <WikiPanel />

          <div
            className="sam-incoming mt-6 w-fit max-w-[85%] rounded-[1.15rem] border border-[rgba(255,255,255,0.1)] bg-[#1B1D26] px-5 py-3.5 shadow-[0_24px_60px_rgba(0,0,0,0.5)] story:absolute story:-left-10 story:bottom-[18%] story:z-20 story:mt-0"
          >
            <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">You, just now</p>
            <p className="mt-1.5 text-[var(--foreground)]">&ldquo;Sam is coming to dinner Friday.&rdquo;</p>
          </div>

          <article
            className="sam-page mt-4 rounded-[1.35rem] border border-[rgba(255,255,255,0.08)] bg-[#151518] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.45)] story:absolute story:inset-0 story:z-10 story:mt-0 story:p-8"
            aria-label="Example: Sam's page updating"
          >
            <div className="sam-page-content flex items-center justify-between gap-4">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#6F6F76]">
                Wiki · Person
              </p>
              <p className="sam-badge rounded-full border border-[rgba(200,196,255,0.28)] px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-[var(--accent)]">
                Updated just now
              </p>
            </div>
            <h4 className="sam-page-content display mt-3 text-[clamp(2.4rem,4vw,3.25rem)] text-[#F5F5F2]">Sam</h4>
            <div className="sam-page-content mt-5 space-y-2 border-t border-[rgba(255,255,255,0.06)] pt-5 text-[1.05rem] leading-relaxed">
              <p className="text-[#B0B0B0]">From college.</p>
              <p className="text-[#B0B0B0]">You owe him ₹2,400.</p>
              <p className="sam-update -mx-2 w-fit rounded-md px-2 text-[#F0F0EE]">Coming to dinner Friday.</p>
            </div>
            <div className="sam-page-content mt-8">
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[#6F6F76]">Related</p>
              <ul className="mt-2 flex list-none flex-wrap gap-2 p-0">
                {["College", "Naru", "₹2,400", "Friday dinner"].map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[rgba(255,255,255,0.08)] px-2.5 py-1 text-[0.72rem] text-[#A1A1A6]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="sam-page-content mt-8 text-xs text-[#6F6F76]">Demo page · not live data</p>
          </article>
        </div>
      </div>
    </section>
  );
}
