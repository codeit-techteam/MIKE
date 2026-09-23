"use client";

import { useRef } from "react";
import Link from "next/link";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { gsap, MOTION_CONDITIONS, registerGsap, useGSAP } from "@/lib/gsap";

const STEPS = [
  { label: "Text", body: "Typed in a hurry, the way you'd text a friend." },
  { label: "Voice", body: "Hold to talk, say it, let go." },
  { label: "Link", body: "A link, a photo, a PDF. Mike sits in the share sheet." },
  { label: "Document", body: "Kept whole on your phone, exactly as it came." },
];

const WAVE = [0.35, 0.6, 0.9, 0.5, 0.75, 1, 0.55, 0.8, 0.4, 0.95, 0.65, 0.3, 0.7, 0.9, 0.45, 0.6, 0.85, 0.5, 0.35, 0.7, 0.55, 0.9, 0.4, 0.6];

const FILED = ["Naru", "Mum's medicines", "The car"];

function MikeMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="rgba(200,196,255,0.14)" />
      <path
        d="M16 6c4.2 3.2 6.8 6.4 6.8 10.2A6.8 6.8 0 0 1 16 23c-4.2-3.2-6.8-6.4-6.8-10.2A6.8 6.8 0 0 1 16 6Z"
        fill="none"
        stroke="#C8C4FF"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function HowItWorks() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const steps = q(".capture-step");
      const scenes = q(".capture-scene");
      const bars = q(".wave-bar");
      const transcript = q(".voice-transcript");
      const inbox = q(".capture-inbox");
      const filed = q(".capture-filed");

      const mm = gsap.matchMedia();

      mm.add(MOTION_CONDITIONS, (context) => {
        const { story } = context.conditions as { story: boolean };

        if (!story) {
          gsap.fromTo(
            [...scenes, ...inbox, ...filed],
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: q(".capture-stage")[0],
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
          return;
        }

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=260%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        gsap.set(scenes, { opacity: 0, y: 40, scale: 0.98 });
        gsap.set(steps, { opacity: 0.35 });
        gsap.set(filed, { opacity: 0, y: 12 });

        // Each input arrives, is read, then drops into Mike.
        const SCENE_LENGTH = 2.2;
        scenes.forEach((scene, i) => {
          const at = 0.2 + i * SCENE_LENGTH;
          tl.to(steps[i], { opacity: 1, duration: 0.3 }, at)
            .to(scene, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }, at)
            .to(
              scene,
              { opacity: 0, y: 150, scale: 0.7, duration: 0.6, ease: "power2.in" },
              at + SCENE_LENGTH - 0.6
            )
            .to(inbox, { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1 }, at + SCENE_LENGTH - 0.1)
            .to(steps[i], { opacity: 0.35, duration: 0.3 }, at + SCENE_LENGTH - 0.3);

          if (i === 1) {
            tl.fromTo(
              bars,
              { scaleY: 0.15 },
              {
                scaleY: (j: number) => WAVE[j],
                duration: 0.5,
                stagger: { each: 0.02, from: "center" },
                ease: "power2.out",
              },
              at + 0.3
            )
              .to(bars, { scaleY: 0.08, opacity: 0.4, duration: 0.4, stagger: 0.01 }, at + 1)
              .fromTo(transcript, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, at + 1.1);
          }
        });

        const end = 0.2 + scenes.length * SCENE_LENGTH;
        tl.to(steps, { opacity: 1, duration: 0.4 }, end)
          .to(filed, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" }, end)
          .to({}, { duration: 0.8 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      id="how"
      ref={rootRef}
      className="story-chapter relative border-t border-[var(--border-subtle)] py-[var(--section-spacing)] story:flex story:h-screen story:items-center story:overflow-hidden story:py-0 story:pt-16"
      aria-labelledby="how-heading"
    >
      <div className="container grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 id="how-heading" className="display text-[clamp(2.4rem,4.6vw,4.25rem)]">
            Send Mike anything
            <span className="block text-[var(--accent-warm)]">worth remembering.</span>
          </h2>
          <p className="mt-5 text-[var(--muted)] md:text-lg">
            Say it once. No folders, no tags, no deciding where things go. Mike takes each message
            alongside everything he already knows about you, and puts it where it belongs.
          </p>

          <ol className="mt-8 grid list-none gap-1 p-0 sm:grid-cols-2" aria-label="Ways to send Mike something">
            {STEPS.map((step, index) => (
              <li key={step.label} className="capture-step border-t border-[var(--border-subtle)] py-3 pr-4">
                <p className="flex items-baseline gap-2 text-[var(--foreground)]">
                  <span className="text-[0.65rem] tabular-nums text-[var(--muted-dim)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step.label}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">{step.body}</p>
              </li>
            ))}
          </ol>

          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/how-it-works" className="text-[var(--accent-warm)] underline-offset-4 hover:underline">
              How Mike works
            </Link>
            <Link href="/features" className="text-[var(--accent-warm)] underline-offset-4 hover:underline">
              Explore Mike&apos;s features
            </Link>
          </p>
        </div>

        <div
          className="capture-stage relative flex flex-col gap-4 rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-[#0E0E10] p-5 story:h-[min(34rem,64vh)] story:gap-0 story:p-6"
          aria-label="Examples of things sent to Mike"
          role="group"
        >
          <div className="flex flex-col gap-4 story:relative story:flex-1">
            <div className="capture-scene story:absolute story:inset-x-0 story:top-[18%]">
              <p className="mb-2 text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">Text</p>
              <p className="ml-auto w-fit max-w-[85%] rounded-[1.15rem] rounded-br-md bg-[#2A3148] px-4 py-3 text-[#F2F2F0]">
                You should try the miso cod at Naru.
              </p>
            </div>

            <div className="capture-scene story:absolute story:inset-x-0 story:top-[14%]">
              <p className="mb-2 text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">Voice</p>
              <div className="rounded-[1.15rem] border border-[rgba(255,255,255,0.08)] bg-[#161618] px-4 py-4">
                <div className="flex h-10 items-center justify-center gap-[3px]" aria-hidden="true">
                  {WAVE.map((height, index) => (
                    <span
                      key={index}
                      className="wave-bar block h-full w-[3px] origin-center rounded-full bg-[var(--accent)]"
                      style={{ transform: `scaleY(${height})` }}
                    />
                  ))}
                </div>
                <p className="voice-transcript mt-3 text-[#E8E8E6]">
                  &ldquo;Remind me that Mum&apos;s medicine is morning and night.&rdquo;
                </p>
              </div>
            </div>

            <div className="capture-scene story:absolute story:inset-x-0 story:top-[16%]">
              <p className="mb-2 text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">
                Shared from Safari
              </p>
              <div className="flex items-center gap-4 rounded-[1.15rem] border border-[rgba(255,255,255,0.08)] bg-[#161618] p-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[rgba(232,228,217,0.08)] text-[var(--accent-warm)]" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-[#F0F0EC]">Naru, Bandra — menu</span>
                  <span className="mt-0.5 block text-sm text-[var(--muted)]">A link, saved without retyping</span>
                </span>
              </div>
            </div>

            <div className="capture-scene story:absolute story:inset-x-0 story:top-[16%]">
              <p className="mb-2 text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">
                Shared from Files
              </p>
              <div className="flex items-center gap-4 rounded-[1.15rem] border border-[rgba(255,255,255,0.08)] bg-[#161618] p-4">
                <span className="flex h-14 w-11 shrink-0 flex-col justify-end rounded-md border border-[rgba(255,255,255,0.14)] bg-[#1C1C1F] p-1.5" aria-hidden="true">
                  <span className="text-[0.55rem] font-semibold tracking-wide text-[var(--accent)]">PDF</span>
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[#F0F0EC]">car-insurance-2026.pdf</span>
                  <span className="mt-0.5 block text-sm text-[var(--muted)]">Kept whole on your phone</span>
                </span>
              </div>
            </div>
          </div>

          <div className="capture-inbox mt-2 flex items-center gap-3 rounded-full border border-[rgba(200,196,255,0.2)] bg-[#141417] px-4 py-3 shadow-[0_0_60px_rgba(200,196,255,0.08)]">
            <MikeMark />
            <span className="font-display text-xl leading-none text-[#F4F4F1]">Mike</span>
            <span className="ml-auto text-xs text-[var(--muted-dim)]">One place for all of it</span>
          </div>

          <ul className="mt-4 flex list-none flex-wrap items-center gap-2 p-0" aria-label="Pages Mike filed these into">
            <li className="capture-filed text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">Filed into</li>
            {FILED.map((page) => (
              <li
                key={page}
                className="capture-filed rounded-full border border-[rgba(255,255,255,0.1)] px-3 py-1 text-xs text-[#D8D8D4]"
              >
                {page}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
