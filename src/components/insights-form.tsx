"use client";

import { useMemo, useState } from "react";
import { signByName, type SignProfile } from "@/lib/astrology";
import {
  computeNatalChart,
  localBirthToUtc,
  type NatalChart,
  type Placement,
} from "@/lib/natal";
import { searchCities, type UsCity, labelOf } from "@/data/us-cities";

type PlacementKind = "Rising" | "Sun" | "Moon";

interface FrameCopy {
  eyebrow: string;
  question: string; // what this placement answers for the stylist
}

const FRAMES: Record<PlacementKind, FrameCopy> = {
  Rising: {
    eyebrow: "Rising — how they walk in",
    question:
      "First impression, the persona the chair sees before the real person shows up. Open the appointment to this.",
  },
  Sun: {
    eyebrow: "Sun — what they want to express",
    question:
      "Core identity, the look they're trying to grow into. Style direction lives here.",
  },
  Moon: {
    eyebrow: "Moon — what they actually need",
    question:
      "Inner read, the emotional weather underneath the small talk. This is what makes them rebook (or not).",
  },
};

export function InsightsForm() {
  // Sun-only fields (the original quick mode)
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState(""); // YYYY-MM-DD from <input type="date">
  // Trinity-mode fields
  const [time, setTime] = useState(""); // HH:MM
  const [cityQuery, setCityQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<UsCity | null>(null);

  const citySuggestions = useMemo(() => {
    if (selectedCity && cityQuery === labelOf(selectedCity)) return [];
    return searchCities(cityQuery, 8);
  }, [cityQuery, selectedCity]);

  const parsedDate = useMemo(() => parseISODate(date), [date]);
  const parsedTime = useMemo(() => parseHHMM(time), [time]);
  const haveTrinity = !!(parsedDate && parsedTime && selectedCity);

  const result = useMemo(() => {
    if (!parsedDate) return null;
    if (haveTrinity) {
      const utc = localBirthToUtc({
        year: parsedDate.year,
        month: parsedDate.month,
        day: parsedDate.day,
        hour: parsedTime!.hour,
        minute: parsedTime!.minute,
        tz: selectedCity!.tz,
      });
      if (!utc) return null;
      const chart = computeNatalChart({
        utcDate: utc,
        lat: selectedCity!.lat,
        lon: selectedCity!.lon,
      });
      return { kind: "trinity" as const, chart };
    }
    // Sun-only fallback: noon UTC of the given date is plenty for sign assignment
    const utc = new Date(Date.UTC(parsedDate.year, parsedDate.month - 1, parsedDate.day, 12, 0));
    const chart = computeNatalChart({ utcDate: utc, lat: 0, lon: 0 });
    return { kind: "sun" as const, chart };
  }, [parsedDate, parsedTime, selectedCity, haveTrinity]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10">
      <form
        className="space-y-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Client Insights form"
      >
        <div>
          <label htmlFor="clientName" className="field-label">
            Client name{" "}
            <span className="text-clay/70 normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="field"
            placeholder="e.g. Marcy"
          />
        </div>

        <div>
          <label htmlFor="bday" className="field-label">Birthday</label>
          <input
            id="bday"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="field"
            max="2030-12-31"
            min="1900-01-01"
          />
        </div>

        <fieldset className="space-y-6 pt-2 border-t border-clay/20">
          <legend className="eyebrow pt-4">
            For Moon + Rising — needs birth time + place
          </legend>

          <div>
            <label htmlFor="bt" className="field-label">
              Time of birth{" "}
              <span className="text-clay/70 normal-case tracking-normal">
                (24-hour, e.g. 03:14)
              </span>
            </label>
            <input
              id="bt"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="field"
            />
          </div>

          <div className="relative">
            <label htmlFor="city" className="field-label">City of birth</label>
            <input
              id="city"
              value={cityQuery}
              onChange={(e) => {
                setCityQuery(e.target.value);
                setSelectedCity(null);
              }}
              autoComplete="off"
              className="field"
              placeholder="Start typing — e.g. Dallas, TX"
            />
            {citySuggestions.length > 0 && (
              <ul
                role="listbox"
                className="absolute z-10 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-pearl border border-clay/30 shadow-sm"
              >
                {citySuggestions.map((c) => (
                  <li
                    key={`${c.city}-${c.state}-${c.lat}`}
                    role="option"
                    aria-selected={false}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setSelectedCity(c);
                      setCityQuery(labelOf(c));
                    }}
                    className="px-3 py-2 cursor-pointer text-sm text-ink hover:bg-bone/60"
                  >
                    <span className="font-medium">{c.city}, {c.state}</span>
                    <span className="ml-2 text-burnt text-xs">{c.tz}</span>
                  </li>
                ))}
              </ul>
            )}
            {selectedCity && (
              <p className="mt-2 text-xs text-burnt">
                ✓ {labelOf(selectedCity)} · {selectedCity.tz} · ({selectedCity.lat.toFixed(2)}, {selectedCity.lon.toFixed(2)})
              </p>
            )}
            {!selectedCity && cityQuery.length > 1 && citySuggestions.length === 0 && (
              <p className="mt-2 text-xs text-accent">
                Not in the curated list — try the nearest big city.
              </p>
            )}
          </div>
        </fieldset>

        <p className="text-xs text-burnt pt-2">
          Nothing is saved. The chart is computed in your browser.
        </p>
      </form>

      <div className="min-h-[24rem]">
        {!result ? (
          <EmptyState />
        ) : result.kind === "trinity" ? (
          <TrinityView chart={result.chart} clientName={clientName} />
        ) : (
          <PartialView chart={result.chart} clientName={clientName} />
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex items-center justify-center border border-dashed border-clay/40 p-8">
      <p className="font-serif text-2xl text-clay text-center max-w-sm leading-snug">
        Enter a birthday to get the Sun sign — add time and city for the full Rising / Sun / Moon read.
      </p>
    </div>
  );
}

/** Sun-only: birthday given but no time/place yet. */
function PartialView({ chart, clientName }: { chart: NatalChart; clientName: string }) {
  const profile = signByName(chart.sun.sign);
  if (!profile) return null;
  return (
    <div className="space-y-4">
      <PlacementCard kind="Sun" placement={chart.sun} profile={profile} clientName={clientName} />
      <p className="text-xs text-burnt italic px-1">
        Add birth time and city of birth above to get the Rising and Moon — the full chair read.
      </p>
    </div>
  );
}

/** Full trinity: Rising / Sun / Moon stacked in stylist-priority order. */
function TrinityView({ chart, clientName }: { chart: NatalChart; clientName: string }) {
  const risingProfile = signByName(chart.rising.sign);
  const sunProfile = signByName(chart.sun.sign);
  const moonProfile = signByName(chart.moon.sign);

  return (
    <div className="space-y-4">
      <TrinityHeader chart={chart} clientName={clientName} />
      {risingProfile && (
        <PlacementCard kind="Rising" placement={chart.rising} profile={risingProfile} clientName={clientName} />
      )}
      {sunProfile && (
        <PlacementCard kind="Sun" placement={chart.sun} profile={sunProfile} clientName={clientName} />
      )}
      {moonProfile && (
        <PlacementCard kind="Moon" placement={chart.moon} profile={moonProfile} clientName={clientName} />
      )}
    </div>
  );
}

/** Three-line summary at the top — the "holy trinity" at a glance. */
function TrinityHeader({ chart, clientName }: { chart: NatalChart; clientName: string }) {
  const rp = signByName(chart.rising.sign);
  const sp = signByName(chart.sun.sign);
  const mp = signByName(chart.moon.sign);

  const masc = [rp, sp, mp].filter((s) => s?.polarity === "Masculine").length;
  const fem = [rp, sp, mp].filter((s) => s?.polarity === "Feminine").length;

  let polarityRead = "";
  if (masc === 3) polarityRead = "Mostly outward — projects, declares, decides quickly.";
  else if (fem === 3) polarityRead = "Mostly inward — receives, absorbs, processes privately.";
  else if (masc > fem) polarityRead = "Leans outward — the surface reads bolder than the inside.";
  else polarityRead = "Leans inward — soft surface over a more decisive core, or vice versa.";

  return (
    <article className="fade-in border border-clay/30 bg-bone/40 p-6">
      <p className="eyebrow">
        {clientName ? `${clientName} — at a glance` : "At a glance"}
      </p>
      <h2 className="mt-2 text-3xl">
        Rising {chart.rising.sign} {rp?.symbol} · Sun {chart.sun.sign} {sp?.symbol} · Moon {chart.moon.sign} {mp?.symbol}
      </h2>
      <p className="mt-3 text-burnt leading-relaxed">{polarityRead}</p>
    </article>
  );
}

/** A single placement card — Rising, Sun, or Moon — using the same SignProfile data. */
function PlacementCard({
  kind,
  placement,
  profile,
  clientName,
}: {
  kind: PlacementKind;
  placement: Placement;
  profile: SignProfile;
  clientName: string;
}) {
  const frame = FRAMES[kind];
  return (
    <article className="fade-in border border-clay/30 bg-pearl p-7">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="eyebrow">{frame.eyebrow}</p>
          <h3 className="mt-2 text-3xl text-ink">
            {profile.name} <span className="text-clay">{placement.formatted.split(" ").slice(1).join(" ")}</span>
          </h3>
        </div>
        <span className="font-serif text-5xl text-accent leading-none">{profile.symbol}</span>
      </div>

      <div className="mt-2 flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-burnt">
        <Chip>{profile.element}</Chip>
        <Chip>{profile.modality}</Chip>
        <Chip accent>{profile.polarity}</Chip>
        <Chip>ruled by {profile.rulingPlanet}</Chip>
      </div>

      <p className="mt-5 text-sm text-burnt italic leading-relaxed">
        {frame.question}
      </p>

      <p className="mt-4 text-lg text-ink leading-snug">{profile.vibe}</p>

      {kind === "Rising" && (
        <>
          <Section title="Open with" items={profile.conversationStarters} />
          <Section title="First-impression cues" items={profile.chairTips.slice(0, 2)} />
        </>
      )}

      {kind === "Sun" && (
        <>
          <Section title="Talk about" items={profile.conversationStarters} />
          <Section title="At the chair" items={profile.chairTips} />
          <div className="mt-6 pt-5 border-t border-clay/20">
            <p className="eyebrow">Rebook cadence</p>
            <p className="mt-2 text-ink">{profile.rebookCadence}</p>
          </div>
        </>
      )}

      {kind === "Moon" && (
        <>
          <Section title="What they need from you" items={profile.chairTips.slice(0, 2)} />
          <Section title="Skip" items={profile.avoid} />
        </>
      )}
    </article>
  );
}

function Chip({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={
        "px-2 py-0.5 border " +
        (accent
          ? "border-accent/50 text-accent"
          : "border-clay/40 text-burnt")
      }
    >
      {children}
    </span>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-6">
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

// ─── parsing helpers ───

function parseISODate(s: string): { year: number; month: number; day: number } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const year = +m[1], month = +m[2], day = +m[3];
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return { year, month, day };
}

function parseHHMM(s: string): { hour: number; minute: number } | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(s);
  if (!m) return null;
  const hour = +m[1], minute = +m[2];
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
  return { hour, minute };
}
