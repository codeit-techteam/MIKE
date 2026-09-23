import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Must stay in sync with the `story` custom variant in globals.css, which switches
 * chapters from their stacked layout into pinned, full-viewport scenes.
 */
export const STORY_MQ =
  "(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";

/** Smaller screens with motion allowed: no pinning, short scroll-linked reveals. */
export const LITE_MQ =
  "(prefers-reduced-motion: no-preference) and (max-width: 1023px), (prefers-reduced-motion: no-preference) and (max-height: 639px)";

export const MOTION_CONDITIONS = { story: STORY_MQ, lite: LITE_MQ } as const;

/** Layout offset of `el` relative to `ancestor`, ignoring CSS transforms. */
export function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

export { gsap, useGSAP, ScrollTrigger };
