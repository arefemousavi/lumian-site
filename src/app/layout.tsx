import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumian | Software Development Company",
  description:
    "Lumian designs and builds scalable software products, intelligent platforms, and premium digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
