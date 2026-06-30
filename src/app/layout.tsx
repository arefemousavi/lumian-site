import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// IRANSansX (variable) — the Persian face, applied when the site is in فارسی.
const iranSans = localFont({
  src: "../fonts/IRANSansXV.woff2",
  weight: "100 900",
  variable: "--font-fa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumian — Software & Data Studio",
  description:
    "Lumian is a software & data studio. We build fast websites and apps, turn raw data into insight, and run reliable web-scraping & automation — end to end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${iranSans.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
