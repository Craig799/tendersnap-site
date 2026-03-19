import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const leadsTable = process.env.SUPABASE_LEADS_TABLE ?? "leads";

const supabaseClient =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export async function POST(request: Request) {
  const { email, niche } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email address is required." }, { status: 400 });
  }

  if (!supabaseClient) {
    return NextResponse.json(
      {
        message:
          "We received your submission. Lead capture will sync once Supabase credentials are added.",
      },
      { status: 202 }
    );
  }

  const { error } = await supabaseClient.from(leadsTable).insert({
    email,
    niche,
    source: "landing-page",
    created_at: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.json(
      { error: error.message ?? "Unable to store lead right now." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "All set — welcome to TenderSnap." });
}
