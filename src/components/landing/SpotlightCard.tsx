"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

/**
 * Dark glass card with a cursor-following spotlight highlight.
 * The spotlight position is written to CSS custom properties so the
 * heavy visual work stays in CSS (see landing.css).
 */
export default function SpotlightCard({
  title,
  description,
  icon,
  index = 0,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      className="feature-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="feature-card__spotlight" aria-hidden />
      <div className="feature-card__body">
        <div className="feature-card__icon">{icon}</div>
        <h3 className="feature-card__title">{title}</h3>
        <p className="feature-card__desc">{description}</p>
      </div>
    </motion.div>
  );
}
