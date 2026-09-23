"use client";

import { useRef } from "react";
import { CTAButton } from "@/components/CTAButton";
import { SITE } from "@/lib/constants";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

export function Coda() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(rootRef);

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", end: "center 55%", scrub: 0.6 },
        })
        .fromTo(q(".coda-line"), { yPercent: 105 }, { yPercent: 0, stagger: 0.25, duration: 1 })
        .fromTo(q(".coda-mark"), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.6)
        .fromTo(q(".coda-cta"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8 }, 0.8);
    },
    { scope: rootRef }
  );

  return (
    <section id="coda" ref={rootRef} className="relative py-[clamp(6rem,16vw,12rem)]" aria-labelledby="coda-heading">
      <div className="container text-center">
        <p className="coda-mark font-display text-2xl tracking-tight text-[var(--muted)]">Mike</p>
        <h2 id="coda-heading" className="mt-6 text-[clamp(2.6rem,7vw,6.5rem)] leading-[1.02]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="coda-line block font-medium tracking-[-0.035em]">Text it and forget it.</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="coda-line display block text-[var(--accent-warm)]">Mike won&apos;t.</span>
          </span>
        </h2>
        <div className="coda-cta mt-10 flex justify-center">
          <CTAButton href={SITE.mailto}>Ask for a build</CTAButton>
        </div>
      </div>
    </section>
  );
}
