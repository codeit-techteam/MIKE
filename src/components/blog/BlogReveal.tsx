"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

/** Subtle fade/translate for blog sections. */
export function BlogReveal({
  children,
  className = "",
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        rootRef.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
