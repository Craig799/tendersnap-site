"use client";

import { useState } from "react";

export default function BillingPortalButton({ sessionId }: { sessionId?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (!sessionId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/billing-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to open billing portal.");
      }

      window.location.href = data.url as string;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to open billing portal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading || !sessionId}
        className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Opening portal…" : "Manage billing / cancel"}
      </button>
      {error && <p className="text-xs text-red-200">{error}</p>}
      {!sessionId && (
        <p className="text-xs text-white/60">
          (Billing link available right after checkout.)
        </p>
      )}
    </div>
  );
}
