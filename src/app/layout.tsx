import type { Metadata } from "next";
import Script from "next/script";
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

const siteUrl = "https://www.tendersnap.com.au";
const logoUrl = "/tendersnap-logo-3.svg";
const previewImage = "/preview.png";

const faqEntries = [
  {
    question: "Where do you source tenders?",
    answer:
      "We monitor all government portals from state to local. Each source is deduplicated so you don't see repeats.",
  },
  {
    question: "How often are alerts sent?",
    answer:
      "Alerts are sent daily, Monday to Friday. Depending on your niches you may receive five a day or one—it all depends on when tenders are released to the public.",
  },
  {
    question: "Can I track multiple niches?",
    answer:
      "Yes. Most customers monitor 2–4 niches (e.g., landscaping + FM). Pricing stays flat at $29/month.",
  },
  {
    question: "What happens after I sign up?",
    answer:
      "We send you a confirmation email with our support links, set up your filters, and you'll receive an email alert as soon as tenders are posted that fit your requirements.",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TenderSnap",
  url: siteUrl,
  logo: `${siteUrl}${logoUrl}`,
  email: "support@tendersnap.com.au",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AU",
    addressRegion: "WA",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqEntries.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "TenderSnap — Never miss the tenders built for you",
  description:
    "WA-built tender intelligence with instant filtering, action-ready summaries, and alerts that match your niche.",
  openGraph: {
    title: "TenderSnap",
    description:
      "Never miss government tenders in your niche. Smart searching, instant filtering, and action-ready summaries.",
    locale: "en_AU",
    type: "website",
    url: siteUrl,
    images: [previewImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "TenderSnap",
    description:
      "Never miss government tenders in your niche. Smart searching, instant filtering, and action-ready summaries.",
    images: [previewImage],
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
        <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(organizationSchema)}
        </Script>
        <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(faqSchema)}
        </Script>
      </body>
    </html>
  );
}
