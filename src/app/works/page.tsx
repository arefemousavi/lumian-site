import type { Metadata } from "next";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import ResizableNavbar from "@/components/nav/ResizableNavbar";
import HeroParallax, { type Product } from "@/components/work/HeroParallax";
import SiteFooter from "@/components/layout/SiteFooter";

// Real project shots (more coming later) — repeated to fill the 3 rows.
const projectShots: Product[] = [
  { title: "Vakil", thumbnail: "/images/projects/vakil.png" },
  { title: "Tennis", thumbnail: "/images/projects/tennis.png" },
  { title: "Salamatab", thumbnail: "/images/projects/salamatab.png" },
  { title: "Rahdari", thumbnail: "/images/projects/rahdari.png" },
  { title: "Pishfactor", thumbnail: "/images/projects/pishfactor.png" },
];
const products: Product[] = Array.from(
  { length: 15 },
  (_, i) => projectShots[i % projectShots.length],
);

export const metadata: Metadata = {
  title: "Work — Lumian",
  description:
    "Selected products, platforms, and data systems engineered by Lumian.",
};

export default function WorksPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0a0908] text-foreground">
        <ResizableNavbar />
        <main>
          <HeroParallax products={products} />
        </main>
        <SiteFooter />
      </div>
    </LanguageProvider>
  );
}
