"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

export function BlogHero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const items = rootRef.current?.querySelectorAll(".blog-hero-anim");
      if (!items?.length) return;
      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.05,
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <header ref={rootRef} className="border-b border-[var(--border-subtle)] pb-14">
      <p className="blog-hero-anim eyebrow">Blog</p>
      <h1 className="blog-hero-anim display mt-2 max-w-[18ch] text-[clamp(2.75rem,8vw,5.25rem)] tracking-tight">
        Thinking about memory, personal AI and the things worth remembering.
      </h1>
      <p className="blog-hero-anim mt-6 max-w-[36rem] text-[clamp(1.05rem,2.2vw,1.25rem)] leading-relaxed text-[var(--muted)]">
        Notes, ideas and practical thinking from Mike AI.
      </p>
    </header>
  );
}
