"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a cursor-following radial spotlight and an animated gradient border.
 * Inspired by the Aceternity / reactbits spotlight-card pattern.
 */
export default function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("card-glow group p-px", className)}
    >
      <div className="relative h-full rounded-[calc(1.25rem-1px)] bg-surface p-8">
        {/* cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx) var(--my), rgba(255,255,255,0.08), transparent 60%)",
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
