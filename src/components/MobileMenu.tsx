"use client";

import { useRef } from "react";
import Link from "next/link";
import { AskForBuildButton } from "@/components/build-access/AskForBuildButton";
import { NAV_LINKS } from "@/lib/constants";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const panel = panelRef.current;
      const items = listRef.current?.querySelectorAll("a, .menu-cta");
      if (!panel || !items) return;

      if (prefersReducedMotion()) {
        gsap.set(panel, {
          autoAlpha: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        });
        return;
      }

      if (open) {
        gsap.set(panel, { pointerEvents: "auto" });
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(panel, { autoAlpha: 1, duration: 0.35 })
          .fromTo(
            items,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, stagger: 0.06 },
            "-=0.15"
          );
      } else {
        gsap.to(panel, {
          autoAlpha: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(panel, { pointerEvents: "none" });
          },
        });
      }
    },
    { dependencies: [open], revertOnUpdate: true }
  );

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      className="fixed inset-0 z-40 flex flex-col bg-[var(--background)] px-6 pb-10 pt-24 opacity-0 pointer-events-none md:hidden"
      aria-hidden={!open}
    >
      <div ref={listRef} className="flex flex-1 flex-col gap-2">
        {NAV_LINKS.map((link) =>
          link.href.startsWith("/") && !link.href.startsWith("/#") ? (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="border-b border-[var(--border-subtle)] py-5 text-3xl tracking-tight text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="border-b border-[var(--border-subtle)] py-5 text-3xl tracking-tight text-[var(--foreground)]"
            >
              {link.label}
            </a>
          )
        )}
        <div className="menu-cta mt-8">
          <AskForBuildButton className="w-full" onClick={onClose}>
            Join as Beta Tester
          </AskForBuildButton>
        </div>
      </div>
    </div>
  );
}
