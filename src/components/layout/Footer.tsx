import Container from "@/components/ui/Container";
import { BRAND_NAME } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-lg font-semibold text-foreground">{BRAND_NAME}</p>
          <p className="text-sm text-muted">
            &copy; {year} {BRAND_NAME}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
