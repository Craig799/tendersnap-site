import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tendersnap.com.au";

export async function POST(request: Request) {
  const { sessionId } = await request.json();

  if (!sessionId) {
    return NextResponse.json({ error: "Missing checkout session." }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId as string);
    const customer = session.customer;

    if (!customer || typeof customer !== "string") {
      return NextResponse.json(
        { error: "Unable to find the Stripe customer for this session." },
        { status: 400 }
      );
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${siteUrl}/success?session_id=${sessionId}`,
    });

    return NextResponse.json({ url: portal.url });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Unable to open the billing portal right now.";
    console.error("Stripe billing portal error", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
