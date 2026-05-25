/**
 * Course content for the prototype. In production this becomes a CMS / DB.
 * For now: hand-authored, fully typed, easy to extend.
 */

export interface Lesson {
  slug: string;
  title: string;
  durationMinutes: number;
  body: string; // light markdown — paragraphs separated by blank lines
}

export interface Course {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  level: "Foundations" | "Working stylist" | "Salon owner";
  lessons: Lesson[];
}

export const COURSES: Course[] = [
  {
    slug: "behind-the-chair-foundations",
    title: "Behind the Chair: Foundations",
    tagline: "What to do when your client tells you something hard.",
    description:
      "A short, plain-language course on the conversations that show up at the chair — and how to hold them without taking them home with you.",
    level: "Foundations",
    lessons: [
      {
        slug: "you-are-not-a-therapist",
        title: "You are not their therapist. You are something else.",
        durationMinutes: 7,
        body: `Most clients don't have a regular therapist. They have you.

That's a real responsibility, but it's not the same job. Your job isn't to fix what they bring you. It's to receive it without flinching, hold the room, and finish the service.

In this lesson we'll cover three boundaries that protect you and serve the client:

The first is the **information boundary** — what they tell you stays at the chair, full stop.

The second is the **emotional boundary** — you can witness their thing without absorbing it.

The third is the **time boundary** — the appointment ends when the appointment ends, and that's okay.`,
      },
      {
        slug: "the-three-second-pause",
        title: "The three-second pause.",
        durationMinutes: 5,
        body: `When a client tells you something heavy — a diagnosis, a breakup, a death — your instinct is to fill the silence.

Don't.

Count three seconds. Then say one true sentence. Not a fix. Not a deflection. Just one true thing, like *"I'm so sorry. That's a lot to carry."*

The pause does most of the work. They needed to be heard, not solved.`,
      },
      {
        slug: "what-to-say-when-someone-mentions-suicide",
        title: "What to say when a client mentions suicide.",
        durationMinutes: 9,
        body: `This is the lesson nobody wants to need, and the one we get the most messages about.

If a client tells you they're thinking about ending their life — directly or sideways — there is a script that works, and we're going to walk through it.

We'll also cover when to keep cutting, when to pause, and the one phone number every stylist in the U.S. should have memorized: **988**.

This lesson is paired with a downloadable card you can keep at your station.`,
      },
    ],
  },
  {
    slug: "client-astrology-for-stylists",
    title: "Client Astrology for Stylists",
    tagline: "Read the room faster. Build relationships that rebook themselves.",
    description:
      "Twelve short modules — one per sign — on what makes each client tick and how to talk to them so they want to come back.",
    level: "Working stylist",
    lessons: [
      {
        slug: "why-this-works",
        title: "Why this works (and what it isn't).",
        durationMinutes: 6,
        body: `This isn't fortune-telling. It's a shortcut.

Astrology gives you a framework — twelve archetypes — for sorting first impressions. You're already doing this; you're just doing it ad hoc. A framework makes you faster and more consistent.

Use it as a hypothesis, never a verdict. The client in your chair will always tell you more than their sun sign will.`,
      },
      {
        slug: "fire-signs-at-the-chair",
        title: "Fire signs: Aries, Leo, Sagittarius.",
        durationMinutes: 12,
        body: `Fire wants momentum.

Aries wants the cut to happen *now*. Leo wants the cut to be *seen*. Sagittarius wants the cut to be *low-maintenance* because they're leaving for somewhere in three weeks.

We'll walk through opening lines, mid-appointment check-ins, and the rebook script that works for each of them.`,
      },
      {
        slug: "earth-signs-at-the-chair",
        title: "Earth signs: Taurus, Virgo, Capricorn.",
        durationMinutes: 12,
        body: `Earth wants the chair to be a *system* that works.

Taurus needs comfort. Virgo needs the plan up front. Capricorn needs the clock respected.

These are your most loyal clients once you nail the operational stuff.`,
      },
      {
        slug: "air-signs-at-the-chair",
        title: "Air signs: Gemini, Libra, Aquarius.",
        durationMinutes: 12,
        body: `Air wants the conversation to be the appointment.

Gemini wants options. Libra wants you to weigh in. Aquarius wants you to do something nobody else is doing.

Talk first, scissors second.`,
      },
      {
        slug: "water-signs-at-the-chair",
        title: "Water signs: Cancer, Scorpio, Pisces.",
        durationMinutes: 12,
        body: `Water wants the room to feel safe.

Cancer wants you to remember their dog's name. Scorpio wants you to keep their secrets. Pisces wants the lighting to be right.

These clients build the slowest relationships, and they keep them the longest.`,
      },
    ],
  },
  {
    slug: "your-chair-your-business",
    title: "Your chair, your business.",
    tagline: "Booth-renting, pricing, and treating your station like a P&L.",
    description:
      "The non-technical course they didn't teach you in school. Pricing, retention, taxes-for-stylists basics, and the spreadsheet that runs your week.",
    level: "Salon owner",
    lessons: [
      {
        slug: "the-rebook-rate-that-changes-everything",
        title: "The rebook rate that changes everything.",
        durationMinutes: 10,
        body: `One number tells you almost everything about your business: the percentage of clients who book their next appointment before they leave the chair.

Industry average sits in the 30s. Stylists who clear 65% are running a different business — even if their cut prices are the same.

This lesson covers the script, the timing, and the one operational change that moves the number the most.`,
      },
      {
        slug: "price-like-a-professional",
        title: "Price like a professional, not a beginner.",
        durationMinutes: 9,
        body: `If you haven't raised prices in 18 months, you've taken a pay cut.

We'll walk through the math — how to calculate your true hourly, how to phase a price increase so existing clients don't churn, and the email template that softens the announcement.`,
      },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}
