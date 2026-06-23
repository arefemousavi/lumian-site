import Link from "next/link";
import Container from "@/components/ui/Container";
import { navigation } from "@/data/navigation";
import { BRAND_NAME } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-14">
      <Container>
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-bold"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-surface-2 text-sm text-foreground">
              L
            </span>
            <span className="text-foreground">{BRAND_NAME}</span>
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <p className="text-sm text-muted">
            &copy; {year} {BRAND_NAME}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
