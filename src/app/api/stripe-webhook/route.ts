import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  if (!webhookSecret) {
    return NextResponse.json({ error: "Missing webhook secret" }, { status: 500 });
  }

  const signature = headers().get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  const payload = await request.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        console.info("Checkout completed", event.data.object);
        break;
      case "invoice.paid":
        console.info("Invoice paid", event.data.object);
        break;
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        console.info("Subscription change", event.data.object);
        break;
      default:
        console.info(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Webhook handler error", error);
    return NextResponse.json({ error: "Webhook handler failure" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
