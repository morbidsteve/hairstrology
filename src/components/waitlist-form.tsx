"use client";

import { useState } from "react";

interface Props {
  /** When true, includes optional fields (name, role, years, zip). */
  fullForm?: boolean;
}

export function WaitlistForm({ fullForm = false }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong.");
      }
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "ok") {
    return (
      <div className="fade-in border border-clay/30 px-6 py-8 bg-bone/40">
        <p className="eyebrow text-accent">You're on the list.</p>
        <h3 className="mt-2 text-2xl">Welcome — we'll be in touch.</h3>
        <p className="mt-3 text-burnt">
          We'll send a short note when the first cohort opens up. Until then,
          poke around the <a href="/courses" className="text-ink">courses</a>{" "}
          and the <a href="/client-insights" className="text-ink">Client Insights</a> tool.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {fullForm && (
        <div>
          <label htmlFor="name" className="field-label">Your name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Kristina"
            className="field"
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="field-label">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@yoursalon.com"
          className="field"
        />
      </div>

      {fullForm && (
        <>
          <div>
            <label htmlFor="role" className="field-label">You are a…</label>
            <select id="role" name="role" className="field appearance-none">
              <option value="">Choose one</option>
              <option value="stylist">Working stylist</option>
              <option value="salon owner">Salon owner / booth renter</option>
              <option value="student">Stylist in school</option>
              <option value="other">Something else</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="yearsBehindChair" className="field-label">Years behind the chair</label>
              <input
                id="yearsBehindChair"
                name="yearsBehindChair"
                type="number"
                min={0}
                max={70}
                placeholder="12"
                className="field"
              />
            </div>
            <div>
              <label htmlFor="zip" className="field-label">ZIP / postal code</label>
              <input
                id="zip"
                name="zip"
                type="text"
                autoComplete="postal-code"
                placeholder="73301"
                className="field"
              />
            </div>
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full md:w-auto disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Join the waitlist"}
      </button>

      {status === "error" && (
        <p className="text-sm text-accent">{error}</p>
      )}

      <p className="text-xs text-burnt">
        One email when the cohort opens. No spam, no resale of your address.
      </p>
    </form>
  );
}
