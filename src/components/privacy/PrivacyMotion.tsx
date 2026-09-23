"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

type PrivacyMotionProps = {
  children: ReactNode;
};

export function PrivacyMotion({ children }: PrivacyMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;

      const reveals = root.querySelectorAll<HTMLElement>(".privacy-reveal");
      if (!reveals.length) return;

      if (prefersReducedMotion()) {
        gsap.set(reveals, { clearProps: "all" });
        return;
      }

      reveals.forEach((el) => {
        gsap.from(el, {
          y: 16,
          opacity: 0.35,
          duration: 0.65,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true,
          },
        });
      });
    },
    { scope: rootRef }
  );

  return <div ref={rootRef}>{children}</div>;
}
