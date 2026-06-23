"use client";

import { motion } from "framer-motion";
import {
  SiDjango,
  SiLaravel,
  SiNuxt,
  SiPython,
  SiReact,
  SiVuedotjs,
} from "react-icons/si";
import LogoLoop, { type LogoItem } from "@/components/ui/LogoLoop";
import { useLang } from "@/i18n/LanguageProvider";

// The stacks Lumian builds with — real brand logos, brand-tinted.
const logos: LogoItem[] = [
  { node: <SiPython color="#5A9FD4" />, title: "Python" },
  { node: <SiReact color="#61DAFB" />, title: "React" },
  { node: <SiVuedotjs color="#41B883" />, title: "Vue" },
  { node: <SiNuxt color="#00DC82" />, title: "Nuxt" },
  { node: <SiLaravel color="#FF2D20" />, title: "Laravel" },
  { node: <SiDjango color="#44B78B" />, title: "Django" },
];

/** Frosted "works with" bar with a paused-on-hover logo loop + soft glow. */
export default function WorksWithBar() {
  const { t } = useLang();
  return (
    // outer wrapper owns the centering so framer-motion's inline transform
    // (used for the entrance animation) can't clobber translateX(-50%).
    <div className="workswith-wrap">
      <motion.div
        className="workswith"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* soft halo behind the bar */}
        <div className="workswith__halo" aria-hidden />

        <span className="workswith__label">{t.hero.worksWith}</span>

        <div className="workswith__loop">
          <LogoLoop logos={logos} speed={26} />
        </div>

        <a href="/#contact" className="workswith__cta">
          {t.hero.worksCta}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl-flip">
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
    </div>
  );
}
