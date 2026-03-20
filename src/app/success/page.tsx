import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-4 py-16 text-white">
      <section className="space-y-4 rounded-3xl border border-white/15 bg-white/5 p-8 shadow-glow">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          You&rsquo;re in
        </p>
        <h1 className="text-4xl font-semibold text-white">Thanks for joining TenderSnap</h1>
        <p className="text-sm text-white/70">
          We’ve emailed your receipt and onboarding link. Tell us the regions and niches you want watched and we’ll start sending tailored summaries within 24 hours.
        </p>
        <p className="text-sm text-white/70">
          While we finish the automated onboarding, you can reply directly to the confirmation email or message <a className="underline" href="mailto:support@tendersnap.com.au">support@tendersnap.com.au</a> with your filters.
        </p>
        <Link
          href="/"
          className="inline-flex w-fit items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#020F2C]"
        >
          Return to homepage
        </Link>
      </section>
    </main>
  );
}
