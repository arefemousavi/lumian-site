"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ThreeDMarquee from "./ThreeDMarquee";
import { useLang } from "@/i18n/LanguageProvider";

// Real project shots (more coming later) — repeated to fill the marquee.
const PROJECT_IMAGES = [
  "/images/projects/vakil.png",
  "/images/projects/tennis.png",
  "/images/projects/salamatab.png",
  "/images/projects/rahdari.png",
  "/images/projects/pishfactor.png",
];
const marqueeImages = Array.from(
  { length: 12 },
  (_, i) => PROJECT_IMAGES[i % PROJECT_IMAGES.length],
);

/**
 * Home-page "selected work" section: a 3D marquee of project thumbnails with a
 * CTA into the full /works page.
 */
export default function WorkShowcaseSection() {
  const { t } = useLang();
  return (
    <section id="work" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-xs font-medium uppercase tracking-[0.25em] text-[#FFA63D]"
        >
          {t.work.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.05 }}
          className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          {t.work.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-base leading-relaxed text-muted"
        >
          {t.work.lead}
        </motion.p>
      </div>

      <div className="mt-12 w-full overflow-hidden">
        <ThreeDMarquee images={marqueeImages} />
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/works"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-[#FFA63D]/40 hover:bg-[#FFA63D]/[0.06]"
        >
          {t.work.cta}
          <span className="transition-transform group-hover:translate-x-0.5 rtl-flip">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
