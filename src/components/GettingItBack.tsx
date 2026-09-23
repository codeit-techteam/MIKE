"use client";

import { useRef } from "react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { gsap, MOTION_CONDITIONS, offsetWithin, registerGsap, useGSAP } from "@/lib/gsap";

const MESSAGES = [
  { role: "you", text: "What do I owe Sam?" },
  { role: "mike", text: "₹2,400." },
  { role: "you", text: "Where was that restaurant?" },
  { role: "mike", text: "Naru, Bandra. The miso cod." },
  { role: "you", text: "When does the car insurance renew?" },
  { role: "mike", text: "14 November." },
] as const;

export function GettingItBack() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const lead = q(".ask-lead");
      const words = q(".ask-word");
      const giant = q(".ask-giant");
      const body = q(".ask-body");
      const viewport = q(".ask-viewport")[0] as HTMLElement | undefined;
      const thread = q(".ask-thread")[0] as HTMLElement | undefined;
      const messages = q(".ask-msg") as HTMLElement[];
      if (!viewport || !thread) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_CONDITIONS, (context) => {
        const { story } = context.conditions as { story: boolean };

        if (!story) {
          gsap.fromTo(
            words,
            { yPercent: 100 },
            {
              yPercent: 0,
              stagger: 0.12,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: giant[0], start: "top 85%", toggleActions: "play none none reverse" },
            }
          );
          gsap.fromTo(
            messages,
            { opacity: 0, y: 16, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.12,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: { trigger: thread, start: "top 80%", toggleActions: "play none none reverse" },
            }
          );
          return;
        }

        gsap.fromTo(
          lead,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 70%", end: "top 30%", scrub: 0.6 },
          }
        );
        gsap.fromTo(
          words,
          { yPercent: 100 },
          {
            yPercent: 0,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: { trigger: root, start: "top 55%", end: "top top", scrub: 0.6 },
          }
        );

        // Keep the newest message in view once the thread outgrows its window.
        const shiftFor = (k: number) => {
          const msg = messages[k];
          const bottom = offsetWithin(msg, thread).y + msg.offsetHeight;
          return -Math.max(0, bottom - viewport.clientHeight + 8);
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=260%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to({}, { duration: 0.6 })
          .to(giant, { yPercent: -30, scale: 0.9, opacity: 0, duration: 1.2, ease: "power2.inOut" }, 0.6)
          .fromTo(
            lead,
            { opacity: 1, y: 0 },
            { opacity: 0, y: -20, duration: 0.6, immediateRender: false },
            0.6
          )
          .fromTo(
            body,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power2.out" },
            1.2
          );

        messages.forEach((msg, k) => {
          const at = 2.4 + k * 0.7;
          tl.fromTo(
            msg,
            { opacity: 0, y: 16, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power2.out" },
            at
          ).to(thread, { y: () => shiftFor(k), duration: 0.45, ease: "power2.inOut" }, at);
        });

        tl.to({}, { duration: 1 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      id="ask"
      ref={rootRef}
      className="story-chapter relative border-t border-[var(--border-subtle)] py-[var(--section-spacing)] story:h-screen story:overflow-hidden story:py-0"
      aria-labelledby="ask-heading"
    >
      <div className="container relative story:h-full story:pb-10 story:pt-24">
        <div className="ask-giant text-center story:pointer-events-none story:absolute story:inset-x-0 story:top-1/2 story:-translate-y-1/2">
          <p className="ask-lead text-[var(--muted)] md:text-xl">You don&apos;t need to browse it.</p>
          <h2
            id="ask-heading"
            className="display mt-2 text-[clamp(4.5rem,15vw,13.5rem)] leading-[0.95] text-[var(--foreground)]"
          >
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span className="ask-word inline-block">Just</span>
            </span>{" "}
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span className="ask-word inline-block text-[var(--accent-warm)]">ask.</span>
            </span>
          </h2>
        </div>

        <div className="mt-14 grid items-center gap-10 story:absolute story:inset-x-0 story:bottom-10 story:top-24 story:mt-0 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="ask-body max-w-md">
            <SectionEyebrow>Getting it back</SectionEyebrow>
            <p className="display text-[clamp(1.9rem,3.2vw,2.75rem)] text-[var(--foreground)]">
              Ask the way you&apos;d ask a friend who was there.
            </p>
            <p className="mt-5 text-[var(--muted)] md:text-lg">
              No folders to remember, no search words to guess. Mike answers from the things you told
              him, and usually adds the part you&apos;d forgotten. When your pages hold no answer, he
              says so instead of inventing one.
            </p>
          </div>

          <div className="ask-body overflow-hidden rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-[#0E0E10] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2.5 border-b border-[rgba(255,255,255,0.06)] px-5 py-4">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              <p className="font-display text-xl leading-none text-[#F4F4F1]">Mike</p>
              <p className="ml-auto text-xs text-[var(--muted-dim)]">Answers from your pages</p>
            </div>
            <div className="ask-viewport relative story:h-[min(20rem,38vh)] story:overflow-hidden">
              <ol
                className="ask-thread m-0 flex list-none flex-col gap-3 p-5"
                aria-label="Example conversation with Mike"
              >
                {MESSAGES.map((message) => (
                  <li
                    key={message.text}
                    className={`ask-msg max-w-[80%] ${message.role === "you" ? "self-end" : "self-start"}`}
                  >
                    <span className="sr-only">{message.role === "you" ? "You: " : "Mike: "}</span>
                    <p
                      className={`rounded-[1.15rem] px-4 py-3 ${
                        message.role === "you"
                          ? "rounded-br-md bg-[#2A3148] text-[#F2F2F0]"
                          : "rounded-bl-md border border-[rgba(255,255,255,0.08)] bg-[#171719] text-[#E8E8E6]"
                      }`}
                    >
                      {message.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
