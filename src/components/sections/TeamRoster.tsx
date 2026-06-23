"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";

// Placeholder names — swap in the real team whenever you like.
const members = [
  { name: "Ehsan Mousavi", initials: "EM" },
  { name: "Aref Mousavi", initials: "AM" },
  { name: "Sara Karimi", initials: "SK" },
  { name: "Nima Tehrani", initials: "NT" },
  { name: "Dorsa Ahmadi", initials: "DA" },
];

export default function TeamRoster() {
  const { t } = useLang();
  const tp = t.teamPage;

  return (
    <section className="relative px-6 pt-36 pb-24 sm:pt-44">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#FFA63D]">
          {tp.eyebrow}
        </p>
        <h1 className="mt-3 font-[var(--font-display)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {tp.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
          {tp.lead}
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        {members.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 2) * 0.06 }}
            className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#0d0b09] p-5 transition-colors hover:border-white/20 sm:p-6"
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] font-[var(--font-display)] text-lg font-bold text-foreground">
              {m.initials}
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {m.name}
              </h3>
              <p className="mt-0.5 text-sm text-[#FFA63D]/90">
                {t.team.roles[i]}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {tp.bios[i]}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-3">
        <a
          href="mailto:lumian.team@gmail.com"
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0a0908] transition-transform hover:-translate-y-0.5"
        >
          {t.cta.primary}
        </a>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-white/30"
        >
          {tp.back}
        </Link>
      </div>
    </section>
  );
}
