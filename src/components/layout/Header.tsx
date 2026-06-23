import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { navigation } from "@/data/navigation";
import { BRAND_NAME } from "@/lib/constants";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-surface-2 text-sm text-foreground">
              L
            </span>
            <span className="text-foreground">{BRAND_NAME}</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
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

          <Button href="#contact" className="px-5 py-2 text-sm">
            Get in touch
          </Button>
        </div>
      </Container>
    </header>
  );
}
