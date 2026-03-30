import Link from "next/link";
import NicheOnboardingForm from "@/components/niche-onboarding-form";
import BillingPortalButton from "@/components/billing-portal-button";
import { getStripeClient } from "@/lib/stripe";

type SuccessPageProps = {
  searchParams: { session_id?: string };
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  let prefillEmail: string | undefined;
  let stripeSessionId: string | undefined;

  if (searchParams.session_id) {
    try {
      const stripe = getStripeClient();
      const session = await stripe.checkout.sessions.retrieve(searchParams.session_id);
      prefillEmail = session.customer_details?.email ?? undefined;
      stripeSessionId = session.id;
    } catch (error) {
      console.warn("Unable to retrieve checkout session", error);
    }
  }

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
          When your alerts are live we’ll confirm via email. Need anything sooner? Reply directly to the confirmation email or message <a className="underline" href="mailto:support@tendersnap.com.au">support@tendersnap.com.au</a> with your filters.
        </p>
        <Link
          href="/"
          className="inline-flex w-fit items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#020F2C]"
        >
          Return to homepage
        </Link>
      </section>
      <NicheOnboardingForm email={prefillEmail} stripeSessionId={stripeSessionId} />
      <section className="space-y-4 rounded-3xl border border-white/15 bg-white/5 p-6 text-sm text-white/80 shadow-glow">
        <p>
          You’ll receive your first tender alerts within the next 24 hours. If nothing hits your inbox,
          check spam or email <a className="underline" href="mailto:support@tendersnap.com.au">support@tendersnap.com.au</a>.
        </p>
        {stripeSessionId && (
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Manage subscription</p>
            <BillingPortalButton sessionId={stripeSessionId} />
          </div>
        )}
      </section>
    </main>
  );
}
