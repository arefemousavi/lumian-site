"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import ParticleScene from "@/components/ui/ParticleScene";

const subtitle = ["Design", "Web", "Data", "AI"];
const stack = ["Next.js", "TypeScript", "React", "Node", "Python"];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(".hero-line", {
        clipPath: "inset(0 100% 0 0)",
        yPercent: 14,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out",
      });
      tl.from(
        ".hero-fade",
        { y: 22, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" },
        "-=0.5",
      );
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col items-center overflow-hidden"
    >
      {/* 3D particle scene */}
      <ParticleScene />

      {/* depth vignettes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 42%, transparent 40%, var(--background) 92%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
      />

      {/* top copy */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-32 text-center sm:pt-36">
        <span className="hero-fade mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
          A five-person software studio
        </span>

        <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="hero-line block py-1">We engineer</span>
          <span className="hero-line block py-1 text-gradient">
            digital systems.
          </span>
        </h1>

        <p className="hero-fade mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm uppercase tracking-[0.25em] text-muted">
          {subtitle.map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              {i > 0 && <span className="text-muted/40">·</span>}
              {s}
            </span>
          ))}
        </p>
      </div>

      {/* bottom toolbar */}
      <div className="relative z-10 mb-12 mt-auto w-full px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-border bg-surface/50 px-5 py-4 backdrop-blur-md sm:flex-row sm:gap-6">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            Built with
          </span>
          <div className="flex flex-1 flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {stack.map((s) => (
              <span key={s} className="text-sm text-foreground/80">
                {s}
              </span>
            ))}
          </div>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-muted lg:block">
            30+ shipped
          </span>
          <Button href="#contact" className="px-5 py-2 text-sm">
            Start a project
          </Button>
        </div>
      </div>
    </section>
  );
}
