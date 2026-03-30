import { NextResponse } from "next/server";

export async function GET() {
  const secret = process.env.STRIPE_SECRET_KEY;
  const publishable = process.env.STRIPE_PUBLISHABLE_KEY;

  return NextResponse.json({
    stripeSecretPrefix: secret ? secret.slice(0, 7) : null,
    stripePublishablePrefix: publishable ? publishable.slice(0, 7) : null,
  });
}
