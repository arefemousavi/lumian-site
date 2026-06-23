"use client";

/* ============================================================================
   INSTALL (already in package.json — for reference):
     npm i three @react-three/fiber @react-three/drei @react-three/postprocessing
     npm i gsap lenis
   ============================================================================ */

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import WorksWithBar from "./WorksWithBar";
import useScrollScene from "@/hooks/useScrollScene";
import { useLang } from "@/i18n/LanguageProvider";

// The WebGL scene is lazy + client-only, and never server-rendered.
const GravityScene = dynamic(() => import("./GravityScene"), { ssr: false });

export default function Hero() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  // Plain mutable ref the 3D scene reads each frame — never React state.
  const progress = useRef(0);

  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(true);

  // client-only environment checks (avoids any hydration mismatch)
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 768px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setIsMobile(mq.matches);
      setReduced(rm.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    rm.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      rm.removeEventListener("change", sync);
    };
  }, []);

  // pause the render loop when the hero is scrolled out of view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Phase 1: static scene — scroll-pin disabled (kept wired for a later phase).
  useScrollScene({
    trigger: sectionRef,
    overlay: overlayRef,
    progress,
    enabled: false,
  });

  return (
    <section ref={sectionRef} className="hero">
      <div className="hero__scene">
        {mounted && !reduced ? (
          <GravityScene
            progress={progress}
            active={active}
            reduced={reduced}
            isMobile={isMobile}
          />
        ) : (
          // static, animation-free fallback (reduced-motion / SSR)
          <div className="hero__fallback" aria-hidden />
        )}
      </div>

      <div className="hero__vignette" aria-hidden />
      {/* soft scrim behind the copy so it stays readable over the bright grid */}
      <div className="hero__scrim" aria-hidden />

      <div ref={overlayRef} className="hero__overlay">
        <motion.span
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero__eyebrow-dot" />
          {t.hero.badge}
        </motion.span>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.hero.title1}
          <br />
          <span className="hero__title-accent">{t.hero.title2}</span>
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.hero.subtitle}
        </motion.p>
      </div>

      <WorksWithBar />
    </section>
  );
}
