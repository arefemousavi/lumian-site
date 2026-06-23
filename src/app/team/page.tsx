import type { Metadata } from "next";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import ResizableNavbar from "@/components/nav/ResizableNavbar";
import TeamRoster from "@/components/sections/TeamRoster";
import SiteFooter from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Team — Lumian",
  description:
    "Meet Lumian — a senior, hands-on software & data studio. The people who design and build your project are the people you talk to.",
};

export default function TeamPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0a0908] text-foreground">
        <ResizableNavbar />
        <main>
          <TeamRoster />
        </main>
        <SiteFooter />
      </div>
    </LanguageProvider>
  );
}
