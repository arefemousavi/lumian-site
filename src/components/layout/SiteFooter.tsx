"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/i18n/LanguageProvider";
import LogoMark from "@/components/ui/LogoMark";

export default function SiteFooter() {
  const { t } = useLang();
  const f = t.footer;

  const columns = [
    {
      heading: f.services,
      links: [
        { label: f.links.web, href: "/#services" },
        { label: f.links.data, href: "/#services" },
        { label: f.links.scraping, href: "/#services" },
        { label: f.links.automation, href: "/#services" },
      ],
    },
    {
      heading: f.studio,
      links: [
        { label: f.links.work, href: "/works" },
        { label: f.links.team, href: "/#team" },
        { label: f.links.contact, href: "/#contact" },
      ],
    },
    {
      heading: f.legal,
      links: [
        { label: f.links.terms, href: "/#" },
        { label: f.links.privacy, href: "/#" },
      ],
    },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-[#0a0908] pt-28 sm:pt-40">
      {/* glowing ridge artwork — full width, natural aspect, anchored bottom */}
      <Image
        src="/images/footer.webp"
        alt=""
        aria-hidden
        width={2560}
        height={550}
        sizes="100vw"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-auto w-full select-none"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0a0908] via-[#0a0908]/60 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-12">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div className="max-w-sm">
              <Link
                href="/"
                className="flex items-center gap-2.5 font-[var(--font-display)] text-lg font-bold tracking-[0.15em]"
              >
                <LogoMark className="h-8 w-8" size={32} />
                <span className="uppercase text-foreground">{t.brand}</span>
              </Link>
              <p className="mt-5 text-sm leading-relaxed text-muted">{f.desc}</p>
              <div className="mt-6 flex items-center gap-3 text-muted">
                <Social
                  label="LinkedIn"
                  href="https://www.linkedin.com/company/lumian-team/"
                >
                  <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 22 10.5 22 14v7h-4v-6.2c0-1.5-.03-3.4-2.07-3.4-2.07 0-2.39 1.6-2.39 3.3V21H9V9Z" />
                </Social>
                <Social label="Email" href="mailto:lumian.team@gmail.com">
                  <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6Zm-2 0-8 5-8-5h16Zm0 12H4V8l8 5 8-5v10Z" />
                </Social>
              </div>
            </div>

            {/* link columns: 2-up on mobile, flow into the parent grid on md+ */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:contents">
              {columns.map((col) => (
                <div key={col.heading}>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted/70">
                    {col.heading}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center gap-2 border-t border-white/5 pt-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm text-foreground/80">{f.status}</span>
          </div>
        </div>

        <p className="py-16 text-center text-xs uppercase tracking-[0.35em] text-muted/60">
          © MMXXVI — Lumian. {f.rights}
        </p>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] transition-colors hover:border-white/25 hover:text-foreground"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        {children}
      </svg>
    </a>
  );
}
