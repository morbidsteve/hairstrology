import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Who built Hairstrology and why.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-readable px-6 py-20">
      <p className="eyebrow">About</p>
      <h1 className="mt-4">Why this exists.</h1>

      <div className="mt-10 space-y-6 text-lg text-burnt leading-relaxed">
        <p>
          Hairstrology started in the slow months — when the salons closed and
          the work disappeared and there was, finally, time to read. Kristina
          spent that year going deep on astrology, on psychology, on the
          patterns that show up in a chair when you've been doing this for
          twenty years.
        </p>

        <p>
          When the chairs filled back up, the work had changed. Clients didn't
          just want a cut — they wanted to be heard. Stylists, who had never
          been trained for that part of the job, became the place people went
          to process the worst year of their lives.
        </p>

        <p>
          That work is real. It deserves real tools, a real community, and a
          real way to talk about it. That's what we're building here.
        </p>

        <p>
          Hairstrology is for stylists who are tired of being treated like they
          chose the simpler path — by clients, by family, by every cocktail
          party where someone with a law degree asks <em>what do you actually
          do</em>. We're the people whose job is half craft and half care. This
          is a place to compare notes.
        </p>
      </div>

      <hr className="my-14" />

      <p className="eyebrow">The promise</p>
      <h2 className="mt-3">No mysticism, no pyramid scheme, no upsell.</h2>
      <div className="mt-6 space-y-5 text-burnt leading-relaxed">
        <p>
          The astrology is a framework, not a forecast. The community is a
          place to compare notes, not a place to be sold MLM products. The
          courses are practical, taught by working stylists, and priced like
          we know you're paying with tip money.
        </p>
        <p>
          If we get this right, your chair will feel a little less heavy at
          the end of the day. That's the whole goal.
        </p>
      </div>
    </article>
  );
}
