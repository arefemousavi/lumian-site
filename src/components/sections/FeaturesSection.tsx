"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useLang } from "@/i18n/LanguageProvider";

const AMBER = "#FFA63D";

const visuals: ReactNode[] = [
  <BrowserVisual key="b" />,
  <DataVisual key="d" />,
  <FlowVisual key="f" />,
];

export default function FeaturesSection() {
  const { t } = useLang();
  const features = t.features.items.map((item, i) => ({
    title: item.title,
    description: item.desc,
    visual: visuals[i],
  }));
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-xs font-medium uppercase tracking-[0.25em]"
          style={{ color: AMBER }}
        >
          {t.features.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.05 }}
          className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          {t.features.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted"
        >
          {t.features.lead}
        </motion.p>
      </div>

      {/* mobile: horizontal swipe slider · desktop: 3-column bordered grid */}
      <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-1 [&::-webkit-scrollbar]:hidden sm:mt-16 md:mx-auto md:max-w-6xl md:grid md:grid-cols-3 md:gap-0 md:overflow-hidden md:rounded-3xl md:border md:border-white/10 md:bg-white/[0.02] md:px-0 md:pb-0">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1 }}
            className={`group w-[80%] shrink-0 snap-center p-6 max-md:rounded-2xl max-md:border max-md:border-white/10 max-md:bg-white/[0.03] md:w-auto md:shrink md:p-10 ${
              i < features.length - 1 ? "md:border-e md:border-white/12" : ""
            }`}
          >
            <div className="flex h-32 items-center justify-center sm:h-44">
              {f.visual}
            </div>
            <h3 className="mt-6 text-lg font-semibold text-foreground sm:mt-8 sm:text-xl">
              {f.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              {f.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- illustrations (CSS skeletons) ---------------- */

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-40 w-full max-w-[260px] overflow-hidden rounded-xl border border-white/10 bg-[#0d0b09] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:-translate-y-1">
      {children}
    </div>
  );
}

function Bar({ w, amber = false }: { w: string; amber?: boolean }) {
  return (
    <div
      className="h-2 rounded-full"
      style={{ width: w, background: amber ? AMBER : "rgba(255,255,255,0.12)" }}
    />
  );
}

// A faux browser window with code-ish skeleton lines.
function BrowserVisual() {
  return (
    <Panel>
      <div className="flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
      </div>
      <div className="mt-5 space-y-2.5">
        <Bar w="80%" />
        <Bar w="55%" />
        <Bar w="68%" />
        <Bar w="40%" />
        <Bar w="60%" />
      </div>
    </Panel>
  );
}

// A faux dashboard with animated bars + a sparkline.
function DataVisual() {
  const bars = [40, 70, 52, 88, 64, 78];
  return (
    <Panel>
      <div className="flex h-20 items-end justify-between gap-2">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: "easeOut" }}
            className="w-full rounded-sm"
            style={{
              background:
                i === 3 ? AMBER : "rgba(255,255,255,0.16)",
            }}
          />
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <Bar w="70%" />
        <Bar w="45%" />
      </div>
    </Panel>
  );
}

// A faux scrape→table flow.
function FlowVisual() {
  return (
    <Panel>
      <div className="flex items-center gap-3">
        {/* source page */}
        <div className="flex-1 space-y-1.5 rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
          <Bar w="80%" />
          <Bar w="60%" />
          <Bar w="70%" />
        </div>
        {/* arrow */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white/40">
          <path d="M4 12h15m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {/* extracted rows */}
        <div className="flex-1 space-y-1.5">
          {[0, 1, 2, 3].map((r) => (
            <div
              key={r}
              className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
              <span className="h-1.5 flex-1 rounded-full bg-white/15" />
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
