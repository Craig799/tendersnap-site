"use client";

import { useState } from "react";

interface CheckoutButtonProps {
  label?: string;
  size?: "default" | "lg";
}

export default function CheckoutButton({
  label = "Start subscription",
  size = "default",
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Unable to start checkout right now.");
      }

      const data = await response.json();
      if (data?.url) {
        window.location.href = data.url as string;
        return;
      }

      throw new Error("Missing checkout URL.");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const baseClasses =
    "rounded-2xl bg-white font-semibold text-[#020F2C] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70";
  const sizeClasses =
    size === "lg"
      ? "px-8 py-4 text-base"
      : "px-6 py-3 text-sm";

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`${baseClasses} ${sizeClasses}`}
      >
        {loading ? "Starting checkout…" : label}
      </button>
      {error && <p className="text-xs text-red-200">{error}</p>}
    </>
  );
}
