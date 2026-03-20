import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const priceId = process.env.STRIPE_PRICE_ID;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export async function POST() {
  if (!priceId || !siteUrl) {
    return NextResponse.json(
      { error: "Stripe price ID or site URL missing." },
      { status: 500 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer_creation: "if_required",
      allow_promotion_codes: true,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return NextResponse.json(
      { error: "Unable to start checkout right now." },
      { status: 500 }
    );
  }
}
