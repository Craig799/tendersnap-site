import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import { getStripeClient } from "@/lib/stripe";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const leadsTable = process.env.SUPABASE_LEADS_TABLE ?? "leads";
const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM_EMAIL ?? "TenderSnap <support@tendersnap.com.au>";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tendersnap.com.au";

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
    : null;

type LeadRecord = {
  id: string;
  email: string;
  metadata: Record<string, unknown> | null;
};

type Metadata = {
  niches?: string[];
  regions?: string[];
  notes?: string;
  manageToken?: string;
  stripeSessionId?: string;
  stripeCustomerId?: string | null;
};

function isValidEmail(value: string) {
  return /.+@.+\..+/.test(value);
}

function normaliseMetadata(value: Record<string, unknown> | null): Metadata {
  return value && typeof value === "object" ? (value as Metadata) : {};
}

async function sendConfirmationEmail({
  email,
  niches,
  regions,
}: {
  email: string;
  niches: string[];
  regions: string[];
}) {
  if (!resendApiKey) return;

  const subject = "TenderSnap filters received";
  const html = `
    <p>Thanks for setting up your TenderSnap filters.</p>
    <p><strong>Niches:</strong> ${niches.length ? niches.join(', ') : 'Not specified'}</p>
    <p><strong>Regions:</strong> ${regions.length ? regions.join(', ') : 'Not specified'}</p>
    <p>We’ll confirm once alerts are live (usually within 24 hours). If anything looks wrong just reply to this email.</p>
    <p>— The TenderSnap team</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: resendFrom, to: email, subject, html }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({} as Record<string, unknown>));
    const message = (errorBody as { message?: string }).message || "Resend API rejected the request.";
    throw new Error(message);
  }
}

async function upsertCustomerLead({
  email,
  displayNiche,
  niches,
  regions,
  notes,
  manageToken,
  stripeSessionId,
  stripeCustomerId,
  existing,
}: {
  email: string;
  displayNiche: string;
  niches: string[];
  regions: string[];
  notes: string;
  manageToken: string;
  stripeSessionId: string;
  stripeCustomerId: string | null;
  existing?: LeadRecord | null;
}) {
  let record = existing;
  if (!record) {
    const { data } = await supabase!
      .from(leadsTable)
      .select("id, metadata")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle<LeadRecord>();
    record = data ?? null;
  }

  const metadata: Metadata = {
    ...(record ? normaliseMetadata(record.metadata) : {}),
    niches,
    regions,
    notes,
    manageToken,
    stripeSessionId,
    stripeCustomerId,
  };

  if (record) {
    const { error } = await supabase!
      .from(leadsTable)
      .update({
        email,
        niche: displayNiche,
        status: "customer",
        source: "checkout",
        metadata,
      })
      .eq("id", record.id);

    if (error) {
      throw new Error(error.message || "Unable to save filters.");
    }
  } else {
    const { error } = await supabase!
      .from(leadsTable)
      .insert({
        email,
        niche: displayNiche,
        status: "customer",
        source: "checkout",
        metadata,
        created_at: new Date().toISOString(),
      });

    if (error) {
      throw new Error(error.message || "Unable to save filters.");
    }
  }
}

async function updateByManageToken({
  manageToken,
  displayNiche,
  niches,
  regions,
  notes,
}: {
  manageToken: string;
  displayNiche: string;
  niches: string[];
  regions: string[];
  notes: string;
}) {
  const { data: existing } = await supabase!
    .from(leadsTable)
    .select("id, metadata, email")
    .eq("metadata->>manageToken", manageToken)
    .maybeSingle<LeadRecord>();

  if (!existing) {
    throw new Error("Link not found. Please request a new manage link.");
  }

  const metadata: Metadata = {
    ...normaliseMetadata(existing.metadata),
    niches,
    regions,
    notes,
    manageToken,
  };

  const { error } = await supabase!
    .from(leadsTable)
    .update({
      niche: displayNiche,
      metadata,
    })
    .eq("id", existing.id);

  if (error) {
    throw new Error(error.message || "Unable to update filters right now.");
  }

  return existing.email;
}

export async function POST(request: Request) {
  if (!supabase) {
    return NextResponse.json({ error: "Supabase credentials missing." }, { status: 500 });
  }

  const body = await request.json();
  const {
    email,
    niches = [],
    regions = [],
    notes = "",
    stripeSessionId,
    manageToken: incomingToken,
  } = body;

  const { data: existingByEmail } = await supabase
    .from(leadsTable)
    .select("id, metadata, email")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<LeadRecord>();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }
  if (!Array.isArray(niches) || !niches.length) {
    return NextResponse.json({ error: "Pick at least one niche." }, { status: 400 });
  }
  if (!Array.isArray(regions)) {
    return NextResponse.json({ error: "Regions must be an array." }, { status: 400 });
  }

  const displayNiche = niches.join(", ");

  try {
    if (incomingToken) {
      await updateByManageToken({
        manageToken: incomingToken,
        displayNiche,
        niches,
        regions,
        notes,
      });
      return NextResponse.json({
        message: "Filters updated.",
        manageToken: incomingToken,
      });
    }

    if (!stripeSessionId) {
      if (existingByEmail) {
        const currentMetadata = normaliseMetadata(existingByEmail.metadata);
        const fallbackToken = currentMetadata.manageToken ?? randomUUID();
        const mergedMetadata: Metadata = {
          ...currentMetadata,
          niches,
          regions,
          notes,
          manageToken: fallbackToken,
        };
        const { error } = await supabase!
          .from(leadsTable)
          .update({ niche: displayNiche, metadata: mergedMetadata })
          .eq("id", existingByEmail.id);
        if (error) {
          throw new Error(error.message || "Unable to update filters right now.");
        }

        try {
          await sendConfirmationEmail({ email, niches, regions });
        } catch (emailError) {
          console.warn("Onboarding email failed", emailError);
        }

        return NextResponse.json({ message: "Filters saved.", manageToken: fallbackToken });
      }

      return NextResponse.json(
        { error: "Missing checkout session. Please complete checkout first." },
        { status: 400 }
      );
    }

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);
    const stripeCustomerId = typeof session.customer === "string" ? session.customer : null;
    const manageToken = randomUUID();

    await upsertCustomerLead({
      email,
      displayNiche,
      niches,
      regions,
      notes,
      manageToken,
      stripeSessionId,
      stripeCustomerId,
      existing: existingByEmail,
    });

    try {
      await sendConfirmationEmail({ email, niches, regions });
    } catch (emailError) {
      console.warn("Onboarding email failed", emailError);
    }

    return NextResponse.json({
      message: "Filters saved. Check your inbox for confirmation.",
      manageToken,
      portalHint: `${siteUrl}/manage/${manageToken}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save filters right now.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
