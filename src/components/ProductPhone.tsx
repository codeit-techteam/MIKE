"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type ChatMessage = {
  role: "user" | "mike";
  text: string;
};

const SCRIPT: ChatMessage[] = [
  {
    role: "user",
    text: "what was that restaurant Sam took me to?",
  },
  {
    role: "mike",
    text: "Naru, in Bandra. You had the miso cod on 28 August and said it was the best thing you'd eaten all year.",
  },
  {
    role: "user",
    text: "how much do i owe him for it?",
  },
  {
    role: "mike",
    text: "₹2,400. He paid for both of you that night.",
  },
  {
    role: "user",
    text: "did i ever pay the flat deposit?",
  },
  {
    role: "mike",
    text: "You told me it was paid when you mentioned Suresh, but I don't have the amount or the date. Want me to note them down?",
  },
];

function MikeMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <defs>
        <linearGradient id="mike-mark" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7DD3FC" />
          <stop offset="0.45" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#F9A8D4" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#mike-mark)" opacity="0.22" />
      <path
        d="M16 6c4.2 3.2 6.8 6.4 6.8 10.2A6.8 6.8 0 0 1 16 23c-4.2-3.2-6.8-6.4-6.8-10.2A6.8 6.8 0 0 1 16 6Z"
        fill="none"
        stroke="url(#mike-mark)"
        strokeWidth="1.6"
      />
      <path
        d="M16 9.2c2.6 2 4.2 4 4.2 6.3A4.2 4.2 0 0 1 16 19.7c-2.6-2-4.2-4-4.2-6.3A4.2 4.2 0 0 1 16 9.2Z"
        fill="none"
        stroke="url(#mike-mark)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function IconDump({ active = false }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M4 14v3.5A2.5 2.5 0 0 0 6.5 20h11a2.5 2.5 0 0 0 2.5-2.5V14"
        stroke={active ? "#8EA2FF" : "#8A8A8A"}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 4v11M8.5 11.5 12 15l3.5-3.5"
        stroke={active ? "#8EA2FF" : "#8A8A8A"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWiki() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M5 6.5h4.2c1.2 0 2.2.7 2.8 1.7.6-1 1.6-1.7 2.8-1.7H19V18h-4.2c-1.2 0-2.2.4-2.8 1.1-.6-.7-1.6-1.1-2.8-1.1H5V6.5Z"
        stroke="#8A8A8A"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" stroke="#8A8A8A" strokeWidth="1.5" />
      <path
        d="M12 3.5v2.2M12 18.3v2.2M4.8 7.2l1.9 1.1M17.3 15.7l1.9 1.1M4.8 16.8l1.9-1.1M17.3 8.3l1.9-1.1"
        stroke="#8A8A8A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMic() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect x="9" y="3.5" width="6" height="10" rx="3" fill="white" />
      <path
        d="M6.5 11a5.5 5.5 0 0 0 11 0M12 16.5V20"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function streamText(
  el: HTMLElement,
  fullText: string,
  onTick: () => void
): gsap.core.Tween {
  const state = { chars: 0 };
  el.textContent = "";

  return gsap.to(state, {
    chars: fullText.length,
    duration: Math.min(2.8, Math.max(0.9, fullText.length * 0.022)),
    ease: "none",
    onUpdate: () => {
      const next = Math.floor(state.chars);
      el.textContent = fullText.slice(0, next);
      onTick();
    },
  });
}

export function ProductPhone() {
  const rootRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      const thread = threadRef.current;
      if (!root || !thread) return;

      const reduced = prefersReducedMotion();
      const q = gsap.utils.selector(root);
      const items = q(".msg-item") as HTMLElement[];
      const texts = q(".msg-stream") as HTMLElement[];
      const typing = q(".msg-typing")[0] as HTMLElement | undefined;
      const floatCards = q(".float-card");
      const floatMotion = q(".float-motion");
      let revealed = 0;

      const scrollThread = () => {
        thread.scrollTop = thread.scrollHeight;
      };

      const fadeOlder = () => {
        for (let i = 0; i < revealed; i += 1) {
          const item = items[i];
          if (!item) continue;
          const rect = item.getBoundingClientRect();
          const threadRect = thread.getBoundingClientRect();
          const topGap = rect.top - threadRect.top;
          if (topGap < 8) {
            gsap.to(item, { opacity: 0.28, duration: 0.25, overwrite: "auto" });
          } else if (topGap < 36) {
            gsap.to(item, { opacity: 0.55, duration: 0.25, overwrite: "auto" });
          } else {
            gsap.to(item, { opacity: 1, duration: 0.25, overwrite: "auto" });
          }
        }
      };

      if (reduced) {
        items.forEach((item, index) => {
          gsap.set(item, { opacity: 1, y: 0 });
          if (texts[index]) texts[index].textContent = SCRIPT[index]?.text ?? "";
        });
        if (typing) gsap.set(typing, { autoAlpha: 0 });
        gsap.set(floatCards, { opacity: 1, y: 0 });
        scrollThread();
        return;
      }

      gsap.set(items, { opacity: 0, y: 14 });
      texts.forEach((el) => {
        el.textContent = "";
      });
      if (typing) gsap.set(typing, { autoAlpha: 0, y: 6 });
      gsap.set(floatCards, { opacity: 0, y: 14 });

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.4,
        defaults: { ease: "power3.out" },
      });

      SCRIPT.forEach((message, index) => {
        const item = items[index];
        const textEl = texts[index];
        if (!item || !textEl) return;

        if (message.role === "user") {
          tl.call(
            () => {
              textEl.textContent = message.text;
              revealed = index + 1;
            },
            undefined,
            index === 0 ? 0.35 : "+=0.55"
          )
            .to(item, { opacity: 1, y: 0, duration: 0.32 })
            .call(() => {
              scrollThread();
              fadeOlder();
            });
          return;
        }

        // Mike: typing indicator, then character stream
        if (typing) {
          tl.set(typing, { y: 6 })
            .to(typing, { autoAlpha: 1, y: 0, duration: 0.22 }, "+=0.28")
            .call(scrollThread)
            .to(typing, { autoAlpha: 0, y: -3, duration: 0.18 }, "+=0.55");
        }

        tl.set(item, { opacity: 0, y: 10 })
          .call(() => {
            textEl.textContent = "";
            revealed = index + 1;
          })
          .to(item, { opacity: 1, y: 0, duration: 0.28 })
          .add(
            streamText(textEl, message.text, () => {
              scrollThread();
              fadeOlder();
            })
          )
          .call(() => {
            scrollThread();
            fadeOlder();
          });

        // Bring float cards in as related answers land
        if (index === 1) {
          tl.to(floatCards[0], { opacity: 1, y: 0, duration: 0.5 }, "-=0.4");
        }
        if (index === 3) {
          tl.to(floatCards[1], { opacity: 1, y: 0, duration: 0.5 }, "-=0.35");
        }
        if (index === 5) {
          tl.to(floatCards[2], { opacity: 1, y: 0, duration: 0.5 }, "-=0.35");
        }
      });

      tl.to({}, { duration: 2.4 })
        .to([...items, ...floatCards], {
          opacity: 0,
          duration: 0.45,
          stagger: 0.03,
          ease: "power2.in",
        })
        .set(items, { y: 14 })
        .set(floatCards, { y: 14 })
        .call(() => {
          revealed = 0;
          texts.forEach((el) => {
            el.textContent = "";
          });
          thread.scrollTop = 0;
        });

      const loops: gsap.core.Animation[] = [tl];
      floatMotion.forEach((el: Element, index: number) => {
        loops.push(
          gsap.to(el, {
            y: index % 2 === 0 ? -8 : 10,
            duration: 3.1 + index * 0.35,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          })
        );
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => loops.forEach((loop) => (self.isActive ? loop.resume() : loop.pause())),
      });
    },
    { scope: rootRef }
  );

  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      <p className="sr-only">
        Example of Mike on iPhone answering questions about a dinner at Naru, an amount owed to Sam,
        and a flat deposit.
      </p>
      <div ref={rootRef} className="relative" aria-hidden="true">
      <div className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(142,162,255,0.1),transparent_65%)]" />

      <div className="float-card absolute -left-2 top-16 z-20 hidden w-[11.5rem] opacity-0 sm:block md:-left-10">
        <div className="float-motion rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">Page</p>
          <p className="mt-1 text-sm text-[var(--foreground)]">Naru</p>
          <p className="mt-1 text-xs text-[var(--muted)]">Bandra · Miso cod</p>
        </div>
      </div>

      <div className="float-card absolute -right-1 top-36 z-20 hidden w-40 opacity-0 sm:block md:-right-8">
        <div className="float-motion rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">Sam</p>
          <p className="mt-1 text-sm text-[var(--foreground)]">You owe ₹2,400</p>
          <p className="mt-1 text-xs text-[var(--muted)]">Dinner · 28 Aug</p>
        </div>
      </div>

      <div className="float-card absolute bottom-24 left-0 z-20 hidden w-44 opacity-0 sm:block md:-left-12">
        <div className="float-motion rounded-2xl border border-[var(--border)] bg-[var(--surface-high)] p-3">
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-dim)]">Page</p>
          <p className="mt-1 text-sm text-[var(--foreground)]">Flat deposit</p>
          <p className="mt-1 text-xs text-[var(--muted)]">Paid · amount unknown</p>
        </div>
      </div>

      <div className="relative mx-auto aspect-[9/19] w-[min(100%,19rem)] overflow-hidden rounded-[2.35rem] border border-[rgba(255,255,255,0.12)] bg-[#0B0B0D] shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
        <div className="absolute inset-x-[30%] top-3 z-20 h-[1.35rem] rounded-full bg-black" />

        <div className="flex h-full flex-col pt-11">
          <div className="flex items-center gap-2 px-4 pb-3">
            <MikeMark />
            <p className="font-display text-[1.35rem] leading-none tracking-tight text-[#F4F4F1]">
              Mike
            </p>
          </div>

          <div className="relative min-h-0 flex-1">
            <div
              ref={threadRef}
              className="absolute inset-0 space-y-3 overflow-hidden px-3.5 pb-2"
            >
              {SCRIPT.map((message) => (
                <div
                  key={message.text}
                  className={`msg-item max-w-[90%] ${message.role === "user" ? "ml-auto" : ""}`}
                >
                  <div
                    className={`rounded-[1.15rem] px-3.5 py-3 text-[0.8rem] leading-snug ${
                      message.role === "user"
                        ? "bg-[#2A3148] text-[#F2F2F0]"
                        : "border border-[rgba(255,255,255,0.08)] bg-[#171717] text-[#E8E8E6]"
                    }`}
                  >
                    <span className="msg-stream" />
                  </div>
                </div>
              ))}
            </div>

            <div className="msg-typing pointer-events-none absolute bottom-3 left-3.5 flex items-center gap-1 rounded-[1.15rem] border border-[rgba(255,255,255,0.08)] bg-[#171717] px-3.5 py-3">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8A8A8A]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8A8A8A] [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8A8A8A] [animation-delay:300ms]" />
            </div>
          </div>

          <div className="border-t border-[rgba(255,255,255,0.06)] bg-[#0B0B0D] px-3 pb-3 pt-2">
            <div className="flex items-center gap-2">
              <div className="flex min-h-11 flex-1 items-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[#141414] px-4">
                <span className="text-[0.85rem] text-[#6F6F6F]">Message</span>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8EA2FF]">
                <IconMic />
              </div>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-1 pb-1 pt-1">
              <div className="text-center">
                <IconDump active />
                <p className="mt-0.5 text-[0.62rem] text-[#8EA2FF]">Dump</p>
              </div>
              <div className="text-center">
                <IconWiki />
                <p className="mt-0.5 text-[0.62rem] text-[#8A8A8A]">Wiki</p>
              </div>
              <div className="text-center">
                <IconSettings />
                <p className="mt-0.5 text-[0.62rem] text-[#8A8A8A]">Settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
