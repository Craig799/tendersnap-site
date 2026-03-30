"use client";

import { useState } from "react";
import { ExternalLink, MapPin, Calendar, DollarSign, X } from "lucide-react";

type Tender = {
  id: string;
  title: string;
  agency?: string | null;
  deadline?: string | null;
  value?: string | null;
  location?: string | null;
  description?: string | null;
  requirements?: string[];
  link?: string | null;
  tag?: string | null;
};

const fallbackRequirements = ["See tender brief for requirements"];

export default function TenderGallery({ tenders }: { tenders: Tender[] }) {
  const [activeTender, setActiveTender] = useState<Tender | null>(null);

  const formatDeadline = (deadline?: string | null) => deadline ?? "TBA";
  const formatValue = (value?: string | null) => value ?? "Details on portal";
  const formatLocation = (location?: string | null) => location ?? "Location TBA";
  const formatAgency = (agency?: string | null) => agency ?? "Government agency";
  const formatLink = (link?: string | null) => link ?? "#";
  const requirementList = (reqs?: string[]) => (reqs && reqs.length ? reqs : fallbackRequirements);

  return (
    <div className="relative">
      <div className="grid gap-6 md:grid-cols-3">
        {tenders.map((tender) => (
          <article
            key={tender.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className="flex items-center justify-between text-white/80">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                {tender.tag ?? "Live"}
              </span>
              <span className="text-xs font-semibold">Due {formatDeadline(tender.deadline)}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">{tender.title}</h3>
            <p className="mt-2 text-sm text-white/70">
              {formatAgency(tender.agency)} · {formatLocation(tender.location)}
            </p>
            <p className="mt-4 text-sm text-white/80">{tender.description ?? "Full brief available via the portal."}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-white/70">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white">
                <MapPin size={14} /> {formatLocation(tender.location)}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white">
                <DollarSign size={14} /> {formatValue(tender.value)}
              </span>
            </div>
            <button
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-brand-navy"
              onClick={() => setActiveTender(tender)}
            >
              View example
              <ExternalLink size={16} />
            </button>
          </article>
        ))}
      </div>

      {activeTender && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/90 p-4 backdrop-blur">
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl">
            <button
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white hover:text-brand-navy"
              onClick={() => setActiveTender(null)}
              aria-label="Close tender example"
            >
              <X size={18} />
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Tender snapshot
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {activeTender.title}
            </h3>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} /> {formatLocation(activeTender.location)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar size={16} /> Due {formatDeadline(activeTender.deadline)}
              </span>
              <span className="inline-flex items-center gap-2">
                <DollarSign size={16} /> {formatValue(activeTender.value)}
              </span>
            </div>
            <p className="mt-4 text-base text-white/80">
              {activeTender.description ?? "See the linked portal for the full description."}
            </p>
            <div className="mt-6">
              <p className="text-sm font-semibold text-white">Key requirements</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
                {requirementList(activeTender.requirements).map((req) => (
                  <li key={req}>{req}</li>
                ))}
              </ul>
            </div>
            <a
              href={formatLink(activeTender.link)}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy/80"
            >
              Open full tender
              <ExternalLink size={16} />
            </a>
            <p className="mt-3 break-all text-xs text-white/70">
              Source:{" "}
              <a href={formatLink(activeTender.link)} target="_blank" rel="noreferrer" className="underline">
                {formatLink(activeTender.link)}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
