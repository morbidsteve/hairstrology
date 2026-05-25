import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-clay/20 bg-pearl">
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl text-ink tracking-tightest">
            Hairstrology
          </p>
          <p className="mt-3 text-sm text-burnt max-w-sm leading-relaxed">
            A community and course platform for working stylists — built by a
            stylist for the people who have done the job long enough to know
            the chair is half the work.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/client-insights" className="no-underline text-ink hover:text-accent">Client Insights tool</Link></li>
            <li><Link href="/courses" className="no-underline text-ink hover:text-accent">Courses</Link></li>
            <li><Link href="/about" className="no-underline text-ink hover:text-accent">About</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">Get involved</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/waitlist" className="no-underline text-ink hover:text-accent">Join the waitlist</Link></li>
            <li><a href="mailto:hello@hairstrology.local" className="no-underline text-ink hover:text-accent">Email us</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-clay/15">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-burnt">
            © {new Date().getFullYear()} Hairstrology. A prototype — content,
            voice, and design subject to change.
          </p>
          <p className="text-xs text-burnt">
            Made with care. Not a substitute for a real therapist or a real natal chart.
          </p>
        </div>
      </div>
    </footer>
  );
}
