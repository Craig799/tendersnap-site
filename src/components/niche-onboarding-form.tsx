"use client";

import { useEffect, useState } from "react";

const nicheOptions = [
  "Building & Construction",
  "Civil & Roadworks",
  "Consultancy & Professional Services",
  "Electrical & ICT",
  "Environmental & Waste",
  "Facilities Maintenance",
  "Fleet & Transport",
  "Health & Community Services",
  "Landscaping & Parks",
  "Mechanical & Plant",
  "Utilities, Energy & Water",
  "Education & Training",
];

const regionOptions = [
  "WA",
  "NSW",
  "VIC",
  "QLD",
  "SA",
  "TAS",
  "ACT",
  "NT",
];

export default function NicheOnboardingForm({
  email: defaultEmail = "",
  stripeSessionId,
  manageToken,
  initialNiches = [],
  initialRegions = [],
  initialNotes = "",
}: {
  email?: string;
  stripeSessionId?: string;
  manageToken?: string;
  initialNiches?: string[];
  initialRegions?: string[];
  initialNotes?: string;
}) {
  const [email, setEmail] = useState(defaultEmail);
  const [selectedNiches, setSelectedNiches] = useState<string[]>(initialNiches);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(initialRegions);
  const [notes, setNotes] = useState(initialNotes);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [manageLink, setManageLink] = useState<string | null>(null);

  useEffect(() => {
    if (manageToken && typeof window !== "undefined") {
      setManageLink(`${window.location.origin}/manage/${manageToken}`);
    }
  }, [manageToken]);

  const toggleItem = (list: string[], value: string, setter: (items: string[]) => void) => {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setStatus("error");
      setMessage("Please add your email so we can match your account.");
      return;
    }
    if (!selectedNiches.length) {
      setStatus("error");
      setMessage("Pick at least one niche so we know what to watch.");
      return;
    }

    setStatus("loading");
    setMessage("Saving your filters…");

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          niches: selectedNiches,
          regions: selectedRegions,
          notes,
          stripeSessionId,
          manageToken,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to store your filters right now.");
      }

      setStatus("success");
      setMessage(data.message || "Filters saved. Check your inbox for confirmation.");
      if (data.manageToken && typeof window !== "undefined") {
        const link = `${window.location.origin}/manage/${data.manageToken}`;
        setManageLink(link);
      }
      if (!manageToken) {
        setSelectedNiches([]);
        setSelectedRegions([]);
        setNotes("");
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          Set your filters
        </p>
        <h2 className="text-3xl font-semibold">Tell us what to watch</h2>
        <p className="text-sm text-white/70">
          Pick every niche and region you care about—alerts stay unlimited. We’ll plug these into your account and confirm via email within 24 hours.
        </p>
      </div>

      <label className="block text-xs font-semibold uppercase tracking-wide text-white/70">
        Account email
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@business.com.au"
          className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/50 focus:border-white focus:outline-none"
        />
      </label>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
          Regions to monitor
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {regionOptions.map((region) => (
            <label key={region} className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={selectedRegions.includes(region)}
                onChange={() => toggleItem(selectedRegions, region, setSelectedRegions)}
                className="h-4 w-4 rounded border-white/30 bg-white/10 text-brand-navy focus:ring-white"
              />
              {region}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
          Niches to watch
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {nicheOptions.map((niche) => (
            <label key={niche} className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={selectedNiches.includes(niche)}
                onChange={() => toggleItem(selectedNiches, niche, setSelectedNiches)}
                className="h-4 w-4 rounded border-white/30 bg-white/10 text-brand-navy focus:ring-white"
              />
              {niche}
            </label>
          ))}
        </div>
      </div>

      <label className="block text-xs font-semibold uppercase tracking-wide text-white/70">
        Anything else we should know?
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Preferred councils, contract values, exclusions, etc."
          className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/50 focus:border-white focus:outline-none"
          rows={4}
        />
      </label>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#020F2C] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Saving…" : "Save my filters"}
        </button>
        {message && (
          <p className={`text-sm ${status === "error" ? "text-red-200" : "text-white/80"}`}>
            {message}
          </p>
        )}
      </div>
      {manageLink && (
        <p className="text-xs text-white/70">
          Bookmark this secure link to update your filters anytime:
          {" "}
          <a href={manageLink} className="underline" target="_blank" rel="noreferrer">
            {manageLink}
          </a>
        </p>
      )}
    </form>
  );
}
