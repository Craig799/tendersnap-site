import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Terms — TenderSnap",
  description:
    "How TenderSnap collects, stores, and protects customer information, plus the terms you agree to when using the service.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-16 text-white lg:px-0">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          Privacy & Terms
        </p>
        <h1 className="text-3xl font-semibold text-white">How we handle your data</h1>
        <p className="text-sm text-white/70">
          TenderSnap Pty Ltd (ABN 92256927605) provides tender intelligence services to Australian
          businesses. We collect only the information required to deliver alerts and support, we never
          sell your data, and you can opt out at any time by emailing
          <a href="mailto:support@tendersnap.com.au" className="ml-1 underline">support@tendersnap.com.au</a>.
        </p>
      </section>

      <section className="space-y-3 text-sm text-white/80">
        <h2 className="text-xl font-semibold text-white">Information we collect</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Contact details you submit via the lead form (name, email, business, niches).</li>
          <li>Basic usage analytics (pages visited, device/browser) to improve the site.</li>
          <li>Support conversations so we can follow up on onboarding or troubleshooting requests.</li>
        </ul>
      </section>

      <section className="space-y-3 text-sm text-white/80">
        <h2 className="text-xl font-semibold text-white">How we use it</h2>
        <p>
          We use your details to configure alert filters, send you tender summaries, invoice the
          subscription, and respond to support queries. Data is stored in Australian or trusted
          international infrastructure (Supabase, email, and payment providers) under standard
          security controls.
        </p>
      </section>

      <section className="space-y-3 text-sm text-white/80">
        <h2 className="text-xl font-semibold text-white">Your rights</h2>
        <p>You can request a copy or deletion of your data at any time:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Email <a className="underline" href="mailto:support@tendersnap.com.au">support@tendersnap.com.au</a> with the subject “Privacy request”.</li>
          <li>We’ll confirm identity, then export or erase the relevant records within 5 business days.</li>
          <li>Unsubscribing from alerts or cancelling the subscription immediately stops new messages.</li>
        </ul>
      </section>

      <section className="space-y-3 text-sm text-white/80">
        <h2 className="text-xl font-semibold text-white">Terms of use</h2>
        <p>
          By accessing TenderSnap you agree to use the data only for your organisation’s procurement
          planning, keep account credentials confidential, and comply with WA Government tender
          policies. We may update these terms as the product evolves; the revision date below tells
          you when the latest change was published.
        </p>
        <p className="text-white/60">Last updated: {new Date().toLocaleDateString("en-AU")}</p>
      </section>
    </main>
  );
}
