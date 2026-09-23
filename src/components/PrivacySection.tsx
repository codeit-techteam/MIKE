"use client";

import { useRef } from "react";
import Link from "next/link";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

const ON_DEVICE = [
  { title: "Your Mike memory", body: "Messages, pages, history and documents are stored on your iPhone." },
  { title: "Private details", body: "Held on the device and never included in anything sent off the phone." },
];

const OFF_DEVICE = [
  {
    title: "AI processing",
    body: "What you send can pass through Mike's server to the AI model Mike uses. Nothing you send is used to train a model.",
  },
  {
    title: "Dictation",
    body: "Deepgram by default, or Apple's on-device speech recognition if you switch it off in Settings.",
  },
];

export function PrivacySection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(rootRef);

      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: q(".privacy-diagram")[0], start: "top 75%", once: true },
        })
        .fromTo(q(".privacy-phone"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo(q(".privacy-link-line"), { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, duration: 0.7 }, "-=0.2")
        .fromTo(q(".privacy-external"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, "-=0.3");
    },
    { scope: rootRef }
  );

  return (
    <section
      id="privacy"
      ref={rootRef}
      className="section relative border-t border-[var(--border-subtle)]"
      aria-labelledby="privacy-heading"
    >
      <div className="container grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
        <div className="max-w-md">
          <SectionEyebrow>Privacy</SectionEyebrow>
          <h2 id="privacy-heading" className="display text-[clamp(2.4rem,4.6vw,4.25rem)]">
            Your memory is yours.
          </h2>
          <p className="mt-5 text-[var(--muted)] md:text-lg">
            Mike holds the details of your life, so you should know exactly where they sit and what
            touches them.
          </p>
          <p className="mt-6">
            <Link href="/privacy" className="text-[var(--accent-warm)] underline-offset-4 hover:underline">
              Read the Privacy Policy
            </Link>
          </p>
        </div>

        <div className="privacy-diagram grid items-center gap-0 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)]">
          <div className="privacy-phone rounded-[2rem] border border-[rgba(255,255,255,0.12)] bg-[#0E0E10] p-3">
            <div className="rounded-[1.5rem] border border-[rgba(255,255,255,0.06)] bg-[#121214] p-5">
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--accent)]">On your iPhone</p>
              <ul className="mt-4 list-none space-y-4 p-0">
                {ON_DEVICE.map((item) => (
                  <li key={item.title}>
                    <p className="text-[var(--foreground)]">{item.title}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex h-10 items-center justify-center md:h-full" aria-hidden="true">
            <span className="privacy-link-line block h-full w-px origin-top border-l border-dashed border-[rgba(255,255,255,0.18)] md:h-px md:w-full md:origin-left md:border-l-0 md:border-t" />
          </div>

          <ul className="m-0 list-none space-y-3 p-0">
            {OFF_DEVICE.map((item) => (
              <li
                key={item.title}
                className="privacy-external rounded-[1.1rem] border border-dashed border-[rgba(255,255,255,0.14)] p-4"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">{item.title}</p>
                <p className="mt-1.5 text-sm text-[var(--muted)]">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
