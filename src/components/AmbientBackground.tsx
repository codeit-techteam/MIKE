"use client";

import { useRef } from "react";
import { gsap, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Fixed backdrop shared by every chapter so the page reads as one continuous scene.
 * Mount after all chapters: its triggers depend on the pin spacing created above it.
 */
export function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      const glow = rootRef.current?.querySelector(".ambient-glow");
      if (!glow) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(glow, {
          yPercent: -14,
          xPercent: 3,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 1.2 },
        });

        const coda = document.getElementById("coda");
        if (coda) {
          gsap.to(glow, {
            opacity: 0.3,
            ease: "none",
            scrollTrigger: { trigger: coda, start: "top bottom", end: "top 25%", scrub: true },
          });
        }
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="ambient" aria-hidden="true">
      <div className="ambient-glow" />
      <div className="ambient-grain" />
    </div>
  );
}
