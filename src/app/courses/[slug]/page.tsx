import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse } from "@/lib/courses";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const course = getCourse(params.slug);
  if (!course) return { title: "Course not found" };
  return {
    title: course.title,
    description: course.tagline,
  };
}

export default function CoursePage({ params }: PageProps) {
  const course = getCourse(params.slug);
  if (!course) notFound();

  const totalMinutes = course.lessons.reduce((sum, l) => sum + l.durationMinutes, 0);

  return (
    <article className="mx-auto max-w-4xl px-6 py-16 md:py-20">
      <Link href="/courses" className="eyebrow text-burnt hover:text-ink no-underline">
        ← All courses
      </Link>

      <p className="eyebrow mt-8">{course.level} · {course.lessons.length} lessons · ~{totalMinutes} min</p>
      <h1 className="mt-4">{course.title}</h1>
      <p className="mt-6 text-xl text-burnt max-w-readable leading-relaxed">
        {course.description}
      </p>

      <hr className="my-14" />

      <div className="space-y-12">
        {course.lessons.map((lesson, i) => (
          <section key={lesson.slug} className="grid grid-cols-1 md:grid-cols-[7rem_1fr] gap-6">
            <div>
              <p className="font-serif text-3xl text-accent tracking-tightest">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-burnt">
                {lesson.durationMinutes} min
              </p>
            </div>
            <div>
              <h2 className="text-3xl">{lesson.title}</h2>
              <div className="mt-4 space-y-4 text-lg text-burnt leading-relaxed">
                {lesson.body.split(/\n\n+/).map((para, idx) => (
                  <p
                    key={idx}
                    dangerouslySetInnerHTML={{ __html: renderInline(para) }}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <hr className="my-16" />

      <div className="bg-bone/60 border border-clay/20 p-8">
        <p className="eyebrow text-accent">Preview only</p>
        <h3 className="mt-2 text-2xl">Want the full course?</h3>
        <p className="mt-3 text-burnt">
          We're opening the first cohort soon. Join the waitlist and we'll
          let you know when seats are ready.
        </p>
        <Link href="/waitlist" className="btn-primary mt-6">
          Join the waitlist
        </Link>
      </div>
    </article>
  );
}

/** Tiny inline markdown: **bold** and *italic*. Enough for the prototype. */
function renderInline(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-ink">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}
