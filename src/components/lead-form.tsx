"use client";

import { useState } from "react";

const defaultMessage = "";

type Status = "idle" | "loading" | "success" | "error";

export default function LeadForm() {
  const [email, setEmail] = useState("");
  const [niche, setNiche] = useState("All construction & services");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState(defaultMessage);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("Adding you to the shortlist…");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, niche }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to subscribe right now.");
      }

      setStatus("success");
      setMessage(data.message || "You're on the TenderSnap list.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again in a moment."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 shadow-glow sm:grid-cols-[1fr_200px_190px]"
    >
      <label className="text-xs font-semibold uppercase tracking-wide text-white/70">
        Work email
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@business.com.au"
          className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/50 focus:border-white focus:outline-none"
        />
      </label>
      <label className="text-xs font-semibold uppercase tracking-wide text-white/70">
        Focus niche
        <select
          value={niche}
          onChange={(event) => setNiche(event.target.value)}
          className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-white focus:outline-none"
        >
          <option className="text-black">All construction & services</option>
          <option className="text-black">Landscaping & grounds</option>
          <option className="text-black">IT & digital</option>
          <option className="text-black">Professional services</option>
          <option className="text-black">Maintenance & FM</option>
        </select>
      </label>
      <div className="flex flex-col justify-end">
        <span className="text-xs font-semibold uppercase tracking-wide text-transparent">
          Submit
        </span>
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#020F2C] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Adding…" : "Start catching tenders"}
        </button>
      </div>
      {message && (
        <p
          className={`text-xs font-medium sm:col-span-3 ${
            status === "error" ? "text-white" : "text-white/70"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
