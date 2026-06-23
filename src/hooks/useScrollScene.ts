"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

type Options = {
  /** the hero <section> that gets pinned */
  trigger: RefObject<HTMLElement | null>;
  /** the text column that parallaxes/fades out */
  overlay: RefObject<HTMLElement | null>;
  /** plain mutable ref the 3D scene reads each frame (never React state) */
  progress: RefObject<number>;
  /** how far (in viewport heights) the pin scrubs over */
  distance?: number;
  /** disabled for reduced-motion / SSR — no Lenis, no pin */
  enabled?: boolean;
};

/**
 * Wires Lenis smooth-scroll to a single pinned ScrollTrigger.
 *
 * The trigger writes a normalised 0→1 value into `progress.current` on every
 * update — the Three.js scene reads that ref inside useFrame, so nothing here
 * causes a React re-render per frame. The same scrubbed timeline also
 * parallaxes/fades the headline overlay and hands off to the next section.
 */
export default function useScrollScene({
  trigger,
  overlay,
  progress,
  distance = 2.2,
  enabled = true,
}: Options) {
  useEffect(() => {
    if (!enabled || !trigger.current) return;

    // --- Lenis smooth scrolling, driven by GSAP's ticker ---
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // One scrubbed, pinned timeline = the single source of progress.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger.current!,
          start: "top top",
          end: `+=${distance * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        },
      });

      // Headline parallaxes up and fades as we dive into the depth.
      if (overlay.current) {
        tl.to(
          overlay.current,
          { yPercent: -34, opacity: 0, ease: "none" },
          0,
        );
      }
    }, trigger);

    return () => {
      ctx.revert();
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [enabled, trigger, overlay, progress, distance]);
}
