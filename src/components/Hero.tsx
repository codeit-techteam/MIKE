"use client";

import { useRef } from "react";
import { CTAButton } from "@/components/CTAButton";
import { ProductPhone } from "@/components/ProductPhone";
import { MIKE_DEFINITION, SITE } from "@/lib/constants";
import {
  gsap,
  MOTION_CONDITIONS,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const reduced = prefersReducedMotion();
      const q = gsap.utils.selector(rootRef);

      if (reduced) {
        gsap.set(q(".hero-anim"), { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(q(".hero-bg"), { opacity: 0 }, { opacity: 1, duration: 1 })
        .fromTo(q(".hero-eyebrow"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .fromTo(
          q(".hero-line"),
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 },
          "-=0.35"
        )
        .fromTo(q(".hero-copy"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .fromTo(
          q(".hero-cta"),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.35"
        )
        .fromTo(q(".hero-note"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2")
        .fromTo(
          q(".hero-visual"),
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1 },
          "-=0.7"
        );

      // Scroll-out lives on wrappers so it never fights the load-in tweens above.
      const mm = gsap.matchMedia();
      mm.add(MOTION_CONDITIONS, (context) => {
        const { story } = context.conditions as { story: boolean };
        const exit = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        exit
          .to(q(".hero-text-wrap"), { y: story ? -90 : -40, opacity: 0.25 }, 0)
          .to(q(".hero-heading-wrap"), { scale: story ? 0.96 : 0.98, transformOrigin: "left top" }, 0)
          .to(q(".hero-visual-wrap"), { y: story ? -140 : -50, opacity: 0.4 }, 0);
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative overflow-hidden pb-16 pt-24 md:pb-20 md:pt-28"
      aria-labelledby="hero-heading"
    >
      <div className="hero-bg hero-anim pointer-events-none absolute inset-0 opacity-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(232,228,217,0.07),transparent_45%),radial-gradient(ellipse_at_80%_10%,rgba(200,196,255,0.05),transparent_40%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="container relative">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,26rem)] xl:gap-16">
          <div className="hero-text-wrap">
            <p className="hero-eyebrow hero-anim eyebrow opacity-0">
              Now on iPhone, in a small private test
            </p>

            <div className="hero-heading-wrap">
              <h1 id="hero-heading" className="text-balance">
                <span className="hero-line hero-anim block text-[clamp(2.4rem,5.8vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.035em] opacity-0 sm:whitespace-nowrap">
                  Text it and forget it.
                </span>
                <span className="hero-line hero-anim display mt-1 block text-[clamp(2.6rem,6.2vw,6rem)] text-[var(--accent-warm)] opacity-0 sm:whitespace-nowrap">
                  Mike won&apos;t.
                </span>
              </h1>
            </div>

            <p className="hero-copy hero-anim mt-5 max-w-xl text-base text-[var(--muted)] md:mt-6 md:text-lg opacity-0">
              {MIKE_DEFINITION}
            </p>
            <p className="hero-copy hero-anim mt-3 max-w-xl text-base text-[var(--muted)] md:text-lg opacity-0">
              Everything you&apos;d normally text yourself, send to Mike instead. He files it into
              pages about your life, and hands it straight back the moment you ask.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-8">
              <div className="hero-cta hero-anim opacity-0">
                <CTAButton href={SITE.mailto}>Ask for a build</CTAButton>
              </div>
              <div className="hero-cta hero-anim opacity-0">
                <CTAButton href="#how" variant="secondary">
                  See how it works
                </CTAButton>
              </div>
            </div>

            <p className="hero-note hero-anim mt-4 text-sm text-[var(--muted-dim)] opacity-0">
              Free while it&apos;s in testing.
            </p>
          </div>

          <div className="hero-visual-wrap mx-auto w-full max-w-[22rem] lg:mx-0 lg:mt-2 lg:max-w-none">
            <div className="hero-visual hero-anim opacity-0">
              <ProductPhone />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
