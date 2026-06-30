"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";
import AnimatedTooltip from "@/components/ui/AnimatedTooltip";

const initials = ["AM", "AP", "MS", "MH", "SM", "RF"];
const names = [
  "Arefe Mousavi",
  "Aref Pourhashemi",
  "Mahdie Saffar",
  "Mehran Hatami",
  "Shirin Mohebi",
  "Reyhane Firouzi",
];

export default function TeamSection() {
  const { t } = useLang();
  const people = names.map((name, i) => ({
    name,
    role: t.team.roles[i],
    initials: initials[i],
  }));
  return (
    <section id="team" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-xs font-medium uppercase tracking-[0.25em] text-[#FFA63D]"
        >
          {t.team.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.05 }}
          className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          {t.team.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted"
        >
          {t.team.lead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.12 }}
          className="mt-10"
        >
          <AnimatedTooltip items={people} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.18 }}
          className="mt-10"
        >
          <Link
            href="/team"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-white/30 hover:bg-white/[0.07]"
          >
            {t.team.cta}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl-flip">
              <path
                d="M5 12h14m0 0-6-6m6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
