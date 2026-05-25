import Link from "next/link";

const links = [
  { href: "/client-insights", label: "Client Insights" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  return (
    <header className="border-b border-clay/20 bg-pearl/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="no-underline group flex items-baseline gap-2"
          aria-label="Hairstrology home"
        >
          <span className="font-serif text-2xl tracking-tightest text-ink leading-none">
            Hairstrology
          </span>
          <span className="hidden sm:inline text-xs uppercase tracking-[0.18em] text-burnt">
            the chair is a community
          </span>
        </Link>

        <nav className="flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="no-underline text-sm text-burnt hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/waitlist" className="btn-primary text-xs">
            Join the waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
