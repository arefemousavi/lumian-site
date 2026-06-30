"use client";

import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";

const EMAIL = "lumian.team@gmail.com";
const LINKEDIN = "https://www.linkedin.com/company/lumian-team/";

const avatars = ["AM", "AP", "MS", "MH", "SM", "RF"];

export default function CTASection() {
  const { t } = useLang();
  return (
    <section id="contact" className="relative px-6 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d0b09] px-7 py-14 sm:px-12 sm:py-16"
      >
        {/* faint glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 100% at 0% 0%, rgba(255,255,255,0.05), transparent 55%)",
          }}
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* left: heading + body + social proof */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#FFA63D]">
              {t.cta.eyebrow}
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              {t.cta.title}
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
              {t.cta.body}
            </p>

            {/* social proof */}
            <div className="mt-7 flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {avatars.map((a) => (
                  <span
                    key={a}
                    className="grid h-9 w-9 place-items-center rounded-full border border-[#0d0b09] bg-gradient-to-br from-white/20 to-white/5 text-[11px] font-semibold text-foreground"
                  >
                    {a}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-[#FFA63D]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <p className="mt-1 text-xs text-muted">{t.cta.trusted}</p>
              </div>
            </div>
          </div>

          {/* right: actions */}
          <div className="flex flex-col items-stretch gap-3 lg:items-end">
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0a0908] shadow-[0_2px_14px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5"
            >
              {t.cta.primary}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl-flip">
                <path d="M4 12h15m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-white/30 hover:bg-white/[0.06]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 22 10.5 22 14v7h-4v-6.2c0-1.5-.03-3.4-2.07-3.4-2.07 0-2.39 1.6-2.39 3.3V21H9V9Z" />
              </svg>
              {t.cta.linkedin}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="text-center text-xs text-muted transition-colors hover:text-foreground lg:text-right"
            >
              {EMAIL}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.9l-5.8 3.05 1.1-6.47L2.6 9.9l6.5-.95L12 2.5Z" />
    </svg>
  );
}
