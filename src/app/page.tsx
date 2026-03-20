import {
  Activity,
  BadgeCheck,
  BarChart3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import LeadForm from "@/components/lead-form";
import TenderGallery from "@/components/tender-gallery";
import FAQAccordion from "@/components/faq-accordion";
import Image from "next/image";

const valueProps = [
  {
    title: "Smart searching",
    body: "Purpose built crawlers search all state and council government portals daily and after major updates.",
    icon: Activity,
  },
  {
    title: "Instant filtering",
    body: "We map each tender to niche, value band, and region so you only see what fits.",
    icon: BarChart3,
  },
  {
    title: "Action-ready summaries",
    body: "Concise briefs, surface deadlines, key requirements, and contacts in one glance.",
    icon: ShieldCheck,
  },
];

const tenderExamples = [
  {
    id: "tender-1",
    title: "WA Health — Hospital courtyard refresh",
    agency: "Department of Health",
    deadline: "4 Apr",
    value: "$180k – $220k",
    location: "Perth Metro",
    description:
      "Design, supply, and install drought-tolerant landscaping plus shade structures across two courtyards.",
    requirements: [
      "Demonstrated hospital or health facility experience",
      "Genuine Indigenous participation plan",
      "24-month maintenance provision",
    ],
    link: "https://www.tenders.wa.gov.au",
    tag: "Landscaping",
  },
  {
    id: "tender-2",
    title: "WA Police — Fleet dash camera rollout",
    agency: "WA Police Force",
    deadline: "12 Apr",
    value: "$420k – $480k",
    location: "State-wide",
    description:
      "Supply, install, and integrate dash-mounted vision systems with live telematics across 180 vehicles.",
    requirements: [
      "Minimum ISO 27001 data handling",
      "Demonstrated CANBUS integrations",
      "24/7 support desk located in WA",
    ],
    link: "https://www.tenders.wa.gov.au",
    tag: "Technology",
  },
  {
    id: "tender-3",
    title: "City of Bunbury — Civic building FM partner",
    agency: "City of Bunbury",
    deadline: "22 Apr",
    value: "$1.1m",
    location: "South West",
    description:
      "Five-year integrated facilities contract covering HVAC, security, cleaning, and preventative maintenance.",
    requirements: [
      "Single pane of glass reporting",
      "Regional subcontractor engagement plan",
      "Evidence of 24/365 helpdesk",
    ],
    link: "https://www.tenders.wa.gov.au",
    tag: "Facilities",
  },
];

const faqs = [
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

const stats = [
  {
    label: "WA roots",
    value: "WA built, owned & operated",
    detail: ""
  },
  {
    label: "Coverage",
    value: "Covering all Government Tenders Australia wide",
    detail: ""
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-content flex-col gap-20 px-4 py-16 text-white lg:px-6 lg:py-24">
      <section className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-6">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-semibold sm:text-5xl">
              Only the government tenders you want sent straight to you
            </h1>
            <div className="flex justify-center py-4">
              <Image
                src="/tendersnap-logo-3.svg"
                alt="TenderSnap logo"
                width={1260}
                height={336}
                className="h-[21rem] w-auto max-w-full"
                priority
              />
            </div>
            <p className="text-lg text-white/80">
              TenderSnap is the simplest way to only see the government tenders you want. No complicated dashboards, human support and alerts that feel like a partner, not another feed.
            </p>
            <div className="space-y-1">
              <p className="text-4xl font-semibold">Only $29/mo</p>
              <p className="text-sm text-white/70">Cancel anytime · No lock-in</p>
            </div>
          </div>
          <LeadForm />
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  {stat.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[32px] border border-white/15 bg-white/5 p-8 shadow-glow backdrop-blur">
          <p className="mt-3 text-2xl font-semibold">
            Filters locked to your niche, value, and region.
          </p>
          <ul className="mt-6 space-y-4 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 text-white" />
              Fresh tenders sent to you as soon as they are released.
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="mt-0.5 h-5 w-5 text-white" />
              Instant filters for niche, value band, deadlines, and regions.
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-white" />
              Summaries highlight requirements, contacts, and risk notes.
            </li>
          </ul>
          <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-5 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              Sample alert
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <p className="text-lg font-semibold">
                Landscaping maintenance panel — South West
              </p>
              <p className="text-white/70">Budget: $250k ceiling</p>
              <p className="text-white/70">
                Description: Annual grounds maintenance & irrigation upgrades for civic sites.
              </p>
              <p className="text-white/70">Due: 28 Mar 2026</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          Why TenderSnap?
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {valueProps.map((value) => (
            <article
              key={value.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <value.icon className="h-10 w-10 text-white" />
              <h3 className="mt-4 text-xl font-semibold text-white">{value.title}</h3>
              <p className="mt-2 text-sm text-white/70">{value.body}</p>
            </article>
          ))}
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-center">
          <div className="mt-4 flex flex-col items-center gap-4">
            <p className="text-4xl font-semibold text-white">$29/mo</p>
            <p className="text-white/70">
              Why pay more for clunky systems, complicated dashboards, and delayed alerts? For less than $1 a day TenderSnap saves you time, and keeps it precise.
            </p>
          </div>
          <ul className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-white/70">
            <li>Unlimited niches & locations</li>
            <li>Cancel anytime, no setup fees</li>
            <li>Real human support</li>
          </ul>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Live feed
          </p>
          <h2 className="text-3xl font-semibold text-white">Recent tender snapshots</h2>
          <p className="text-sm text-white/70">
            Real data from last week’s search. Click to see the briefing-level detail your alerts include.
          </p>
        </div>
        <TenderGallery tenders={tenderExamples} />
      </section>

      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Built for operators
          </p>
          <blockquote className="mt-4 text-lg text-white/80">
            “TenderSnap trims hours off our morning ritual. Instead of combing five portals, we focus on three high-fit opportunities and get proposals out the door.”
          </blockquote>
          <p className="mt-4 font-semibold text-white">Sasha Turner</p>
          <p className="text-sm text-white/70">Director, TurnKey FM (Perth)</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Answers before you ask.</h2>
          <div className="mt-6">
            <FAQAccordion faqs={faqs} />
          </div>
          <p className="mt-4 text-sm text-white/70">
            Still unsure? Contact us at support@tendersnap.com.au and we’ll reply the same day.
          </p>
        </div>
      </section>

      <section className="rounded-[40px] border border-white/15 bg-white/10 p-10 shadow-glow">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white">
              Ready to snap up the right tenders?
            </h2>
            <p className="mt-3 text-white/70">
              We’ll personalise your filters and plug you into real alerts within 24 hours.
            </p>
          </div>
          <div className="space-y-4">
            <LeadForm />
            <p className="text-xs text-white/70">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-3 border-t border-white/10 pt-6 text-center text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
          <Image src="/tendersnap-logo-3.svg" alt="TenderSnap logo" width={600} height={160} className="h-[10rem] w-auto max-w-full" />
          <p>
            © {new Date().getFullYear()} TenderSnap. Built in Western Australia · ABN 92256927605
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <a href="mailto:hello@tendersnap.com" className="hover:text-white">
            Contact
          </a>
          <a href="#" className="hover:text-white">
            Privacy
          </a>
        </div>
      </footer>
    </main>
  );
}
