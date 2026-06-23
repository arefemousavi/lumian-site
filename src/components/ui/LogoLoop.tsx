"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type LogoItem = { node: ReactNode; title: string };

/**
 * Seamless, infinitely-scrolling logo strip (inspired by the reactbits
 * "logo loop"). Edges fade out via a CSS mask, and the animation pauses on
 * hover. Pure CSS animation — no JS per frame. Respects reduced-motion.
 */
export default function LogoLoop({
  logos,
  speed = 30,
  className,
}: {
  logos: LogoItem[];
  /** seconds for one full loop */
  speed?: number;
  className?: string;
}) {
  // Render enough copies that even a wide bar is fully covered, then the
  // track is two identical halves so translateX(-50%) loops seamlessly with
  // no empty gap behind the strip.
  const SETS = 4; // even → two matching halves
  const items = Array.from({ length: SETS }).flatMap(() => logos);

  return (
    <div
      // force LTR so the marquee fills + loops the same way under RTL pages
      dir="ltr"
      className={cn("logoloop", className)}
      style={{ "--logoloop-duration": `${speed}s` } as CSSProperties}
    >
      <div className="logoloop__track">
        {items.map((logo, i) => (
          <span
            key={i}
            className="logoloop__item"
            aria-hidden={i >= logos.length}
          >
            <span className="logoloop__chip">{logo.node}</span>
            <span className="logoloop__name">{logo.title}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
