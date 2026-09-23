"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import { NAV_LINKS } from "@/lib/constants";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) {
        gsap.set(headerRef.current, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.15 }
      );
    },
    { scope: headerRef }
  );

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-[padding,background-color,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? "border-b border-[rgba(255,255,255,0.07)] bg-[rgba(5,5,5,0.78)] py-3 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <div className="container relative flex items-center justify-between gap-6">
          <Link
            href="/"
            className="relative z-10 font-display text-2xl tracking-tight text-[var(--foreground)]"
            aria-label="Mike home"
          >
            Mike
          </Link>

          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) =>
              link.href.startsWith("/") && !link.href.startsWith("/#") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <div className="relative z-10 hidden md:block">
            <a
              href="/#access"
              className="inline-flex min-h-10 items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide"
              style={{ backgroundColor: "#F5F5F2", color: "#050505" }}
            >
              Ask for a build
            </a>
          </div>

          <button
            type="button"
            className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">Menu</span>
            <span
              className={`absolute h-px w-4 bg-[var(--foreground)] transition-transform ${
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              className={`absolute h-px w-4 bg-[var(--foreground)] transition-transform ${
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
