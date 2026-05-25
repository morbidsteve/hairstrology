"use client";

import { useMemo, useState } from "react";
import { sunSignFor, type SignProfile } from "@/lib/astrology";

export function InsightsForm() {
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");

  const sign = useMemo(() => {
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    if (!m || !d) return null;
    return sunSignFor(m, d);
  }, [month, day]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10">
      <form
        className="space-y-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Client Insights form"
      >
        <div>
          <label htmlFor="clientName" className="field-label">Client name <span className="text-clay/70 normal-case tracking-normal">(optional)</span></label>
          <input
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="field"
            placeholder="e.g. Marcy"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="month" className="field-label">Birth month</label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="field appearance-none"
            >
              <option value="">Month</option>
              {MONTHS.map((m, i) => (
                <option key={m} value={i + 1}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="day" className="field-label">Day</label>
            <input
              id="day"
              type="number"
              min={1}
              max={31}
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="field"
              placeholder="DD"
            />
          </div>
        </div>

        <p className="text-xs text-burnt">
          Nothing is saved. The read happens in your browser.
        </p>
      </form>

      <div className="min-h-[24rem]">
        {sign ? (
          <SignCard sign={sign} clientName={clientName} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex items-center justify-center border border-dashed border-clay/40 p-8">
      <p className="font-serif text-2xl text-clay text-center max-w-sm leading-snug">
        Enter a month and a day and we'll give you a read.
      </p>
    </div>
  );
}

function SignCard({ sign, clientName }: { sign: SignProfile; clientName: string }) {
  return (
    <article className="fade-in border border-clay/30 bg-bone/40 p-8">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="eyebrow">
            {clientName ? `${clientName} — ${sign.dateRange}` : sign.dateRange}
          </p>
          <h2 className="mt-2 text-4xl">{sign.name}</h2>
        </div>
        <span className="font-serif text-6xl text-accent leading-none">{sign.symbol}</span>
      </div>

      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-burnt">
        {sign.element} · {sign.modality} · ruled by {sign.rulingPlanet}
      </p>

      <p className="mt-6 text-lg text-ink leading-snug">
        {sign.vibe}
      </p>

      <Section title="Talk about" items={sign.conversationStarters} />
      <Section title="Skip" items={sign.avoid} />
      <Section title="At the chair" items={sign.chairTips} />

      <div className="mt-8 pt-6 border-t border-clay/20">
        <p className="eyebrow">Rebook cadence</p>
        <p className="mt-2 text-ink">{sign.rebookCadence}</p>
      </div>
    </article>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-8">
      <p className="eyebrow">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="text-ink leading-relaxed pl-5 relative before:absolute before:left-0 before:top-[0.9rem] before:w-2 before:h-px before:bg-accent"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
