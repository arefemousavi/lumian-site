"use client";

import { motion } from "framer-motion";

const tools = ["Design", "Web", "Data", "AI", "Cloud"];

/** Frosted-glass dock near the bottom of the hero (pure HTML/CSS). */
export default function GlassDockBar() {
  return (
    <motion.div
      className="dock"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="dock__label">Built with</span>

      <div className="dock__items">
        {tools.map((t) => (
          <span key={t} className="dock__item">
            {t}
          </span>
        ))}
      </div>

      <span className="dock__divider" aria-hidden />

      <a href="#contact" className="dock__cta">
        Start a project
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M7 17 17 7M9 7h8v8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </motion.div>
  );
}
