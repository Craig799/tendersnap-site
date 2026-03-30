import NicheOnboardingForm from "@/components/niche-onboarding-form";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
    : null;

type Metadata = {
  niches?: string[];
  regions?: string[];
  notes?: string;
  manageToken?: string;
};

type ManagePageProps = {
  params: Promise<{ token: string }>;
};

export default async function ManagePage({ params }: ManagePageProps) {
  const resolvedParams = await params;
  const token = resolvedParams.token;
  console.log("[manage] params", resolvedParams);
  if (!supabase) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-16 text-white">
        <p>Supabase credentials are missing. Please configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.</p>
      </main>
    );
  }

  const { data, error } = await supabase
    .from("leads")
    .select("email, metadata")
    .eq("metadata->>manageToken", token)
    .maybeSingle<{ email: string; metadata: Metadata | null }>();

  console.log("[manage] token", JSON.stringify(token), { found: Boolean(data), error });

  if (!data) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-16 text-white">
        <section className="rounded-3xl border border-white/15 bg-white/5 p-8 shadow-glow">
          <h1 className="text-3xl font-semibold">Link expired or invalid</h1>
          <p className="mt-2 text-sm text-white/70">
            This manage link isn’t valid anymore. Please contact <a href="mailto:support@tendersnap.com.au" className="underline">support@tendersnap.com.au</a> and we’ll send you a fresh one.
          </p>
          <Link href="/" className="mt-6 inline-flex w-fit rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#020F2C]">
            Back to TenderSnap
          </Link>
        </section>
      </main>
    );
  }

  const metadata = data.metadata || {};

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-4 py-16 text-white">
      <section className="space-y-4 rounded-3xl border border-white/15 bg-white/5 p-8 shadow-glow">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Update filters</p>
        <h1 className="text-4xl font-semibold">Adjust your TenderSnap alerts</h1>
        <p className="text-sm text-white/70">
          Any changes you make here replace your current filters immediately. Bookmark this page or use the link in your confirmation email to return anytime.
        </p>
      </section>
      <NicheOnboardingForm
        email={data.email}
        manageToken={metadata.manageToken ?? token}
        initialNiches={metadata.niches ?? []}
        initialRegions={metadata.regions ?? []}
        initialNotes={metadata.notes ?? ""}
      />
    </main>
  );
}
