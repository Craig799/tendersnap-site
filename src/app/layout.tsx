import type { Metadata } from "next";
import { Sora, Work_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TenderSnap — Never miss the tenders built for you",
  description:
    "WA-built tender intelligence with instant filtering, action-ready summaries, and alerts that match your niche.",
  openGraph: {
    title: "TenderSnap",
    description:
      "Never miss government tenders in your niche. Smart scraping, instant filtering, and action-ready summaries.",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${workSans.variable}`}>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
