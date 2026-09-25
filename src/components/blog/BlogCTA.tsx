"use client";

import { AskForBuildButton } from "@/components/build-access/AskForBuildButton";
import { SITE } from "@/lib/constants";

export function BlogCTA() {
  return (
    <section
      className="mt-20 border-t border-[var(--border-subtle)] pt-12"
      aria-labelledby="blog-cta-heading"
    >
      <p className="eyebrow">Try Mike</p>
      <h2
        id="blog-cta-heading"
        className="display mt-3 max-w-[16ch] text-[clamp(2rem,4.5vw,3rem)] tracking-tight"
      >
        Want to try Mike?
      </h2>
      <p className="mt-4 max-w-[34rem] text-[1.05rem] leading-relaxed text-[var(--muted)]">
        Mike is currently in a small private test on iPhone.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <AskForBuildButton />
        <a
          href={`mailto:${SITE.email}`}
          className="text-sm text-[var(--accent-warm)] underline-offset-4 hover:underline"
        >
          {SITE.email}
        </a>
      </div>
    </section>
  );
}
