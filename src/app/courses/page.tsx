import type { Metadata } from "next";
import Link from "next/link";
import { COURSES } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Courses",
  description: "Practical courses for working stylists.",
};

export default function CoursesIndexPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <p className="eyebrow">Courses</p>
      <h1 className="mt-4">For the work the schools didn't cover.</h1>
      <p className="mt-6 text-lg text-burnt leading-relaxed max-w-readable">
        Short, useful courses on the parts of stylist work that don't fit on
        the certification exam. Built by working stylists, tested in real
        chairs, priced like we know what tips look like.
      </p>

      <div className="mt-16 divide-y divide-clay/20 border-y border-clay/20">
        {COURSES.map((course, i) => (
          <Link
            key={course.slug}
            href={`/courses/${course.slug}`}
            className="no-underline group grid grid-cols-[5rem_1fr_auto] items-baseline gap-6 py-10 hover:bg-bone/40 transition-colors -mx-6 px-6"
          >
            <span className="font-serif text-clay text-lg tracking-tightest">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="eyebrow text-burnt">{course.level} · {course.lessons.length} lessons</p>
              <h3 className="mt-2 text-3xl text-ink group-hover:text-accent transition-colors">
                {course.title}
              </h3>
              <p className="mt-2 text-burnt max-w-readable leading-relaxed">
                {course.tagline}
              </p>
            </div>
            <span className="text-burnt group-hover:text-accent transition-colors text-sm">
              Read →
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-12 text-sm text-burnt italic">
        Preview only — lessons in the prototype are short excerpts. The full
        cohort opens to waitlist members first.
      </p>
    </section>
  );
}
