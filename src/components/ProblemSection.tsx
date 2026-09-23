"use client";

import { useRef, type CSSProperties } from "react";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import type { WikiIconName } from "@/components/wiki/data";
import { WikiIcon } from "@/components/wiki/icons";
import {
  gsap,
  MOTION_CONDITIONS,
  offsetWithin,
  registerGsap,
  useGSAP,
} from "@/lib/gsap";

type Note = {
  raw: string;
  filed: string;
  page: string;
  x: string;
  y: string;
  rotate: number;
};

const NOTES: Note[] = [
  { raw: "Sam owes me ₹2,400.", filed: "You owe him ₹2,400.", page: "sam", x: "3%", y: "6%", rotate: -3 },
  { raw: "Naru — Bandra.", filed: "Bandra.", page: "naru", x: "40%", y: "2%", rotate: 2 },
  { raw: "Send the document tomorrow.", filed: "Send the document, tomorrow.", page: "todo", x: "68%", y: "9%", rotate: -2 },
  { raw: "That restaurant Sam found.", filed: "Sam's find.", page: "naru", x: "14%", y: "22%", rotate: 1.5 },
  { raw: "Call Mum tonight.", filed: "Call her tonight.", page: "mum", x: "5%", y: "76%", rotate: 2.5 },
  { raw: "Parking: P3 / 41.", filed: "Parked P3, bay 41.", page: "car", x: "38%", y: "86%", rotate: -1.5 },
  { raw: "Insurance renews 14 November.", filed: "Insurance renews 14 November.", page: "car", x: "64%", y: "78%", rotate: 3 },
];

const PAGES: { id: string; title: string; icon: WikiIconName }[] = [
  { id: "sam", title: "Sam", icon: "person" },
  { id: "naru", title: "Naru", icon: "restaurant" },
  { id: "car", title: "The car", icon: "car" },
  { id: "mum", title: "Mum", icon: "heart" },
  { id: "todo", title: "To-dos", icon: "check" },
];

/** Bubble padding + border, so a landed note's text sits exactly on its filed line. */
const BUBBLE_INSET = { x: 17, y: 11 };

export function ProblemSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const stage = q(".problem-stage")[0] as HTMLElement;
      const notes = q(".note") as HTMLElement[];
      const noteInners = q(".note-inner");
      const slots = q(".note-slot") as HTMLElement[];
      const cards = q(".page-card");
      const lead = q(".problem-lead");
      const resolve = q(".problem-resolve");

      const mm = gsap.matchMedia();

      mm.add(MOTION_CONDITIONS, (context) => {
        const { story } = context.conditions as { story: boolean };

        if (!story) {
          gsap.fromTo(
            noteInners,
            { opacity: 0, y: 24, rotation: (i: number) => NOTES[i].rotate },
            {
              opacity: 1,
              y: 0,
              rotation: 0,
              stagger: 0.08,
              ease: "none",
              scrollTrigger: {
                trigger: q(".problem-notes")[0],
                start: "top 85%",
                end: "bottom 65%",
                scrub: 0.5,
              },
            }
          );
          gsap.fromTo(
            [...resolve, ...cards],
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: q(".problem-organized")[0],
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
          return;
        }

        // Notes drift in as the chapter approaches, before the pin takes over.
        gsap.fromTo(
          noteInners,
          { opacity: 0, y: 70, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 90%", end: "top top", scrub: 0.6 },
          }
        );

        const slotFor = (i: number) => slots.find((slot) => slot.dataset.note === String(i));
        const delta = (i: number, axis: "x" | "y") => {
          const slot = slotFor(i);
          if (!slot) return 0;
          const from = offsetWithin(notes[i], stage);
          const to = offsetWithin(slot, stage);
          return to[axis] - from[axis] - BUBBLE_INSET[axis];
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          notes,
          { x: 0, y: 0, rotation: (i: number) => NOTES[i].rotate },
          {
            x: (i: number) => delta(i, "x"),
            y: (i: number) => delta(i, "y"),
            rotation: 0,
            duration: 2.2,
            stagger: 0.12,
            ease: "power2.inOut",
          },
          0.8
        )
          .fromTo(lead, { opacity: 1, y: 0 }, { opacity: 0, y: -50, duration: 1 }, 0.6)
          .fromTo(
            cards,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: "power2.out" },
            1.3
          )
          .fromTo(
            resolve,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power2.out" },
            1.8
          )
          .to({}, { duration: 1 }, 4.2);

        notes.forEach((note, i) => {
          const at = 2.9 + i * 0.12;
          tl.fromTo(note, { opacity: 1 }, { opacity: 0, duration: 0.4 }, at);
          const slot = slotFor(i);
          if (slot) tl.fromTo(slot, { opacity: 0 }, { opacity: 1, duration: 0.4 }, at);
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      id="problem"
      ref={rootRef}
      className="story-chapter relative border-t border-[var(--border-subtle)] py-[var(--section-spacing)] story:h-screen story:overflow-hidden story:py-0"
      aria-labelledby="problem-heading"
    >
      <div className="problem-stage container relative story:h-full story:pb-10 story:pt-24">
        <div className="problem-scatter story:pointer-events-none story:absolute story:inset-x-0 story:bottom-10 story:top-24 story:z-10">
          <div className="story:absolute story:inset-x-0 story:top-1/2 story:-translate-y-1/2">
            <div className="problem-lead mx-auto max-w-2xl text-center">
              <SectionEyebrow>The problem</SectionEyebrow>
              <h2 id="problem-heading" className="display text-[clamp(2.6rem,5.4vw,5rem)]">
                Your memory is everywhere.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[var(--muted)] md:text-lg">
                The restaurant someone raved about. The parking bay. The renewal date. It all goes
                into a chat with yourself, in the order it happened: the one order that never helps.
                Finding anything means remembering you saved it, then roughly when, then scrolling.
              </p>
            </div>
          </div>

          <ul
            className="problem-notes mx-auto mt-12 flex max-w-md list-none flex-col gap-3 p-0 story:mt-0 story:max-w-none"
            aria-label="Notes you might text yourself"
          >
            {NOTES.map((note, index) => (
              <li
                key={note.raw}
                className="note story:absolute story:left-[var(--x)] story:top-[var(--y)]"
                style={{ "--x": note.x, "--y": note.y, marginLeft: `${(index % 3) * 10}px` } as CSSProperties}
              >
                <span className="note-inner inline-block whitespace-nowrap rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[#161618] px-4 py-2.5 text-sm text-[#E8E8E6] shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
                  {note.raw}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="problem-organized mt-20 grid items-center gap-10 story:pointer-events-none story:absolute story:inset-x-0 story:bottom-10 story:top-24 story:mt-0 story:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] story:gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="max-w-md">
            <h3 className="problem-resolve display text-[clamp(2.2rem,4.2vw,3.75rem)] text-[var(--foreground)]">
              Mike turns the mess
              <span className="block text-[var(--accent-warm)]">into memory.</span>
            </h3>
            <p className="problem-resolve mt-5 text-[var(--muted)] md:text-lg">
              Every loose line lands on the page it belongs to, rewritten as a fact you can use
              instead of a message you&apos;ll never scroll back to.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {PAGES.map((page) => (
              <article
                key={page.id}
                className="page-card rounded-[1.1rem] last:odd:sm:col-span-2 border border-[rgba(255,255,255,0.08)] bg-[#151518] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              >
                <header className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-[0.55rem] bg-[rgba(200,196,255,0.12)] text-[rgba(200,196,255,0.9)]">
                    <WikiIcon name={page.icon} />
                  </span>
                  <h4 className="text-[0.95rem] font-medium text-[#F0F0EC]">{page.title}</h4>
                </header>
                <ul className="mt-3 list-none space-y-1.5 p-0 pl-[2.375rem]">
                  {NOTES.map((note, index) =>
                    note.page === page.id ? (
                      <li
                        key={note.raw}
                        className="note-slot text-sm leading-5 text-[#B0B0B0]"
                        data-note={index}
                      >
                        {note.filed}
                      </li>
                    ) : null
                  )}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
