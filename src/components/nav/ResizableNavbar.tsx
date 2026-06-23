"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useLang } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import LogoMark from "@/components/ui/LogoMark";

/**
 * A resizable, scroll-aware site navbar. On scroll it condenses into a
 * centered frosted pill; on mobile it collapses into a toggle menu.
 */

type NavKey = "services" | "work" | "team";
const NAV_ITEMS: { key: NavKey; href: string }[] = [
  { key: "services", href: "/#services" },
  { key: "work", href: "/works" },
  { key: "team", href: "/team" },
];

function Logo() {
  const { t } = useLang();
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center gap-2 text-sm font-semibold text-foreground"
    >
      <LogoMark className="h-8 w-8" size={32} />
      <span className="font-[var(--font-display)] tracking-tight">
        {t.brand}
      </span>
    </Link>
  );
}

function CTAButton({ className }: { className?: string }) {
  const { t } = useLang();
  return (
    <Link
      href="/#contact"
      className={cn(
        "relative z-20 inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold",
        "bg-white text-[#0a0908]",
        "shadow-[0_2px_12px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-white/90",
        className,
      )}
    >
      {t.nav.cta}
    </Link>
  );
}

export default function ResizableNavbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  return (
    <div className="fixed inset-x-0 top-0 z-50 w-full">
      {/* ---------- Desktop ---------- */}
      <motion.nav
        animate={{
          width: scrolled ? "52%" : "100%",
          y: scrolled ? 14 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 50 }}
        style={{ minWidth: scrolled ? "760px" : undefined }}
        className={cn(
          "relative z-[60] mx-auto hidden max-w-7xl items-center justify-between lg:flex",
          scrolled
            ? "rounded-full border border-white/10 bg-[rgba(16,14,12,0.72)] px-4 py-2.5 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
            : "border-0 bg-transparent px-6 py-5",
        )}
      >
        <Logo />
        <NavLinks />
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <CTAButton />
        </div>
      </motion.nav>

      {/* ---------- Mobile ---------- */}
      <div
        className={cn(
          "mx-3 mt-3 flex items-center justify-between rounded-2xl px-4 py-3 lg:hidden",
          scrolled
            ? "border border-white/10 bg-[rgba(16,14,12,0.75)] backdrop-blur-xl"
            : "border border-transparent bg-transparent",
        )}
      >
        <Logo />
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="relative z-20 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-foreground"
          >
            <span className="text-lg leading-none">{open ? "✕" : "≡"}</span>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute inset-x-3 top-16 z-50 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[rgba(16,14,12,0.96)] p-3 backdrop-blur-xl"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {t.nav[item.key]}
                </Link>
              ))}
              <CTAButton className="mt-2 w-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function NavLinks() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { t } = useLang();

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 text-sm"
    >
      {NAV_ITEMS.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          onMouseEnter={() => setHovered(i)}
          className="relative px-4 py-2 text-muted transition-colors hover:text-foreground"
        >
          {hovered === i && (
            <motion.span
              layoutId="nav-hover"
              className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          {t.nav[item.key]}
        </Link>
      ))}
    </div>
  );
}
