"use client";

import { useLang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/** Compact EN / فا pill toggle. */
export default function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-xs",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        className={cn(
          "rounded-full px-2.5 py-1 font-medium transition-colors",
          lang === "en"
            ? "bg-white text-[#0a0908]"
            : "text-muted hover:text-foreground",
        )}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("fa")}
        className={cn(
          "rounded-full px-2.5 py-1 font-medium transition-colors",
          lang === "fa"
            ? "bg-white text-[#0a0908]"
            : "text-muted hover:text-foreground",
        )}
        aria-pressed={lang === "fa"}
      >
        فا
      </button>
    </div>
  );
}
