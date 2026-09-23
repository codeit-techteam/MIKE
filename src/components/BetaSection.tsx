"use client";

import { FormEvent, useRef, useState } from "react";
import { CTAButton } from "@/components/CTAButton";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { SITE } from "@/lib/constants";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

export function BetaSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [mailtoState, setMailtoState] = useState<"idle" | "opening">("idle");

  useGSAP(
    () => {
      registerGsap();
      const panel = rootRef.current?.querySelector(".beta-panel");
      if (!panel) return;

      if (prefersReducedMotion()) return;

      gsap.fromTo(
        panel,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
          },
        }
      );
    },
    { scope: rootRef }
  );

  const handleAsk = () => {
    setMailtoState("opening");
    window.location.href = SITE.mailto;
    window.setTimeout(() => setMailtoState("idle"), 2500);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Connect to a backend/email service when available.
    // Until then, fall back to mailto so interest still reaches the team.
    handleAsk();
  };

  return (
    <section
      id="access"
      ref={rootRef}
      className="section border-t border-[var(--border-subtle)]"
      aria-labelledby="beta-heading"
    >
      <div className="container">
        <div className="beta-panel overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]">
          <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="border-b border-[var(--border-subtle)] p-8 md:p-12 lg:border-b-0 lg:border-r">
              <SectionEyebrow>Private beta</SectionEyebrow>
              <h2 id="beta-heading" className="display text-[clamp(2.5rem,5vw,4.75rem)]">
                Try Mike before everyone else.
              </h2>
              <p className="mt-6 max-w-xl text-[var(--muted)] md:text-lg">
                Mike is currently in a small private test on iPhone. Ask for a build and we&apos;ll
                send you one. You&apos;ll be among the first to know when Mike is available on the
                App Store.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <CTAButton onClick={handleAsk}>Ask for a build</CTAButton>
                <CTAButton href="/how-it-works" variant="secondary">
                  Learn how Mike works
                </CTAButton>
              </div>
              <a
                href={SITE.mailto}
                className="mt-5 inline-block text-sm text-[var(--muted)] underline-offset-4 hover:text-[var(--foreground)] hover:underline"
              >
                {SITE.email}
              </a>

              <p className="mt-4 min-h-6 text-sm text-[var(--muted-dim)]" role="status" aria-live="polite">
                {mailtoState === "opening" ? "Your email app is opening." : "Free while it's in testing."}
              </p>
            </div>

            <div className="p-8 md:p-12">
              <p className="text-sm text-[var(--muted)]">
                Optional interest form — submissions open your email client until a backend is
                connected.
              </p>
              <form className="mt-6 space-y-4" onSubmit={handleFormSubmit} noValidate>
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--muted-dim)]">
                    Name
                  </span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="min-h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 text-[var(--foreground)] outline-none focus:border-[var(--accent-warm)]"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--muted-dim)]">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="min-h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 text-[var(--foreground)] outline-none focus:border-[var(--accent-warm)]"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--muted-dim)]">
                    Country
                  </span>
                  <select
                    name="country"
                    className="min-h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 text-[var(--foreground)] outline-none focus:border-[var(--accent-warm)]"
                    defaultValue="United States"
                  >
                    <option>United States</option>
                    <option>India</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--muted-dim)]">
                    iPhone model
                  </span>
                  <input
                    name="iphone"
                    type="text"
                    placeholder="e.g. iPhone 15 Pro"
                    className="min-h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 text-[var(--foreground)] outline-none focus:border-[var(--accent-warm)]"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--muted-dim)]">
                    How did you hear about Mike?
                  </span>
                  <input
                    name="source"
                    type="text"
                    className="min-h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 text-[var(--foreground)] outline-none focus:border-[var(--accent-warm)]"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--muted-dim)]">
                    What would you most like Mike to remember?
                  </span>
                  <textarea
                    name="intent"
                    rows={3}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none focus:border-[var(--accent-warm)]"
                  />
                </label>
                <CTAButton type="submit" className="w-full sm:w-auto">
                  Request beta access
                </CTAButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
