import Link from "next/link";
import { WaitlistForm } from "@/components/waitlist-form";

export default function HomePage() {
  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="border-b border-clay/20">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <p className="eyebrow">A community for working stylists</p>

          <h1 className="display mt-6 text-ink text-[3.25rem] md:text-[5.5rem] max-w-4xl">
            The chair is half<br className="hidden md:block" /> the work.
          </h1>

          <p className="mt-8 max-w-readable text-lg md:text-xl text-burnt leading-relaxed">
            Hairstrology is a quiet place on the internet for stylists who came
            back from the shutdown and realized the job had changed. Clients
            tell us things now. Some of them are heavy. The schools didn't
            teach this part — so we're teaching each other.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/client-insights" className="btn-primary">
              Try the Client Insights tool
            </Link>
            <Link href="/courses" className="btn-secondary">
              Browse the courses
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── Three pillars ───────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="eyebrow">What's inside</p>
        <h2 className="mt-4 max-w-3xl">
          Three things every stylist already does — finally written down.
        </h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-12">
          <Pillar
            number="01"
            title="Conversations behind the chair."
            body="What to say when a client tells you about a divorce, a diagnosis, or a moment they're not sure they'll come back from. Short, plain-language modules from working stylists."
          />
          <Pillar
            number="02"
            title="Client astrology, applied."
            body="A framework — not a forecast — for reading the room faster. Birthday in, conversation starters and rebook cadence out. Skeptics welcome."
          />
          <Pillar
            number="03"
            title="Your chair, your business."
            body="Pricing, rebook rates, the tax stuff nobody covered in school. Treat your station like the small business it already is."
          />
        </div>
      </section>

      {/* ───────────── Manifesto / quote ───────────── */}
      <section className="bg-bone border-y border-clay/20">
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
          <p className="eyebrow">A note</p>
          <blockquote className="mt-6 display text-3xl md:text-5xl text-ink">
            “When the salons opened back up, the clients didn't just want a
            haircut. They wanted to tell someone.”
          </blockquote>
          <p className="mt-8 text-sm text-burnt uppercase tracking-[0.18em]">
            — Kristina, founder
          </p>
        </div>
      </section>

      {/* ───────────── Waitlist ───────────── */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <p className="eyebrow text-center">Be early</p>
        <h2 className="mt-4 text-center">
          Join the waitlist.
        </h2>
        <p className="mt-4 text-center text-burnt max-w-readable mx-auto">
          We're rolling out the first courses to a small group of stylists. Get
          on the list and we'll let you know when your seat is ready.
        </p>

        <div className="mt-10">
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}

function Pillar({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="font-serif text-sm text-accent tracking-tightest">
        {number}
      </p>
      <h3 className="mt-3 text-2xl">{title}</h3>
      <p className="mt-3 text-burnt leading-relaxed">{body}</p>
    </div>
  );
}
