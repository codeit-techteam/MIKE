"use client";

import { useRef } from "react";
import { AskForBuildButton } from "@/components/build-access/AskForBuildButton";
import { CTAButton } from "@/components/CTAButton";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { SITE } from "@/lib/constants";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

export function BetaSection() {
  const rootRef = useRef<HTMLElement>(null);

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

  return (
    <section
      id="access"
      ref={rootRef}
      className="section border-t border-[var(--border-subtle)]"
      aria-labelledby="beta-heading"
    >
      <div className="container">
        <div className="beta-panel overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]">
          <div className="grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14 lg:p-14">
            <div>
              <SectionEyebrow>Private beta</SectionEyebrow>
              <h2 id="beta-heading" className="display text-[clamp(2.5rem,5vw,4.75rem)]">
                Try Mike before everyone else.
              </h2>
              <p className="mt-6 max-w-xl text-[var(--muted)] md:text-lg">
                Mike is currently in a small private test on iPhone. Join as a beta tester, tell
                us a little about yourself, then message Mike on WhatsApp to get started.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <AskForBuildButton />
                <CTAButton href="/how-it-works" variant="secondary">
                  Learn how Mike works
                </CTAButton>
              </div>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-5 inline-block text-sm text-[var(--muted)] underline-offset-4 hover:text-[var(--foreground)] hover:underline"
              >
                {SITE.email}
              </a>

              <p className="mt-4 text-sm text-[var(--muted-dim)]">Free while it&apos;s in testing.</p>
            </div>

            <div className="rounded-[1.35rem] border border-[var(--border)] bg-[var(--background)] p-6 md:p-8">
              <ol className="space-y-5">
                {[
                  {
                    step: "01",
                    title: "Your number",
                    body: "Your WhatsApp number, so Mike can reach you.",
                  },
                  {
                    step: "02",
                    title: "About you",
                    body: "Name and email so we can send your beta invite.",
                  },
                  {
                    step: "03",
                    title: "WhatsApp Mike",
                    body: "QR or one tap — chat opens with Hey Mike!",
                  },
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="font-mono text-xs tracking-wide text-[var(--muted-dim)]">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">{item.title}</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <AskForBuildButton className="mt-8 w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
