import type { Metadata } from "next";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description: "Be one of the first stylists in Hairstrology.",
};

export default function WaitlistPage() {
  return (
    <section className="mx-auto max-w-readable px-6 py-20">
      <p className="eyebrow">The waitlist</p>
      <h1 className="mt-4">A seat at the chair.</h1>
      <p className="mt-6 text-lg text-burnt leading-relaxed">
        We're opening the first cohort in small batches so we can learn what
        actually helps. Tell us a little about yourself and we'll be in touch
        when your seat is ready.
      </p>

      <div className="mt-12">
        <WaitlistForm fullForm />
      </div>
    </section>
  );
}
