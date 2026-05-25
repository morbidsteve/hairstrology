import type { Metadata } from "next";
import { InsightsForm } from "@/components/insights-form";

export const metadata: Metadata = {
  title: "Client Insights",
  description:
    "Enter a client's birthday and get a short, plain-language read on how to talk to them — what they want from the chair, what to avoid, and how often they'll rebook.",
};

export default function ClientInsightsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <p className="eyebrow">Client Insights</p>
      <h1 className="mt-4">Read the room faster.</h1>
      <p className="mt-6 text-lg text-burnt leading-relaxed max-w-readable">
        Enter a client's birthday. You'll get a one-screen summary of how they
        tend to show up at the chair, what to talk about, what to skip, and
        roughly when they'll want to come back. It's a framework, not a
        forecast — use it as a starting place, never as a verdict.
      </p>

      <div className="mt-12">
        <InsightsForm />
      </div>

      <hr className="my-16" />

      <details className="group">
        <summary className="cursor-pointer text-sm uppercase tracking-[0.16em] text-burnt hover:text-ink">
          A note on the astrology
        </summary>
        <div className="mt-4 text-burnt leading-relaxed text-sm space-y-3">
          <p>
            This uses tropical sun signs — the most common Western system, and
            the one most clients are familiar with. It is intentionally a
            simplification: a real natal chart involves time and place of
            birth and a lot more than the sun.
          </p>
          <p>
            For the chair, the simplification is usually enough. The point is
            to give you a faster first read so you can ask better questions.
          </p>
        </div>
      </details>
    </section>
  );
}
