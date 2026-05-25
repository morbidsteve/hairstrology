import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-readable px-6 py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4">Nothing on this page.</h1>
      <p className="mt-6 text-burnt leading-relaxed">
        That link doesn't lead anywhere yet. Head back to the home page or
        look at the courses.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <Link href="/" className="btn-primary">Home</Link>
        <Link href="/courses" className="btn-secondary">Browse courses</Link>
      </div>
    </section>
  );
}
