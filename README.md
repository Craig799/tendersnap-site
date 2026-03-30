# TenderSnap Marketing Site

Purpose-built landing page for the TenderSnap launch. Built with Next.js App Router, Tailwind (v4), and a Supabase-ready email capture endpoint.

## Project structure

```
site/
├── src/app          # App Router entry + API route
├── src/components   # UI components (lead form, accordion, gallery)
├── public/          # Static assets
└── README.md        # You are here
```

## Prerequisites
- Node.js 20+
- npm (or any compatible package manager)
- Supabase project (optional, only needed once you want live lead capture)

## Install & develop
```bash
npm install
npm run dev
```
Visit http://localhost:3000 to preview. All sections are mobile-first and responsive.

## Production build
```bash
npm run build
npm run start # serves .next/ output
```
Deploy on any Node-compatible host (Vercel, Render, Fly, etc.).

## Environment variables
Create a `.env.local` file and add the following once your Supabase + Stripe projects are ready:
```
SUPABASE_URL="https://<your-project>.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"
SUPABASE_TENDERS_TABLE="tenders" # optional
SUPABASE_LEADS_TABLE="leads"      # optional

STRIPE_SECRET_KEY="sk_live_xxx"
STRIPE_PUBLISHABLE_KEY="pk_live_xxx"
STRIPE_PRICE_ID="price_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"
NEXT_PUBLIC_SITE_URL="https://www.tendersnap.com.au"

# Optional but recommended for onboarding emails
RESEND_API_KEY="re_xxx"
RESEND_FROM_EMAIL="TenderSnap <support@tendersnap.com.au>"
```
The API routes use these keys as follows:
- `src/app/api/subscribe/route.ts` (lead form) inserts `{ email, niche, source }` rows into Supabase. Without keys it returns a 202 so visitors still see a confirmation message.
- `src/app/api/onboarding/route.ts` (post-checkout filters) stores `{ email, niches[], regions[], notes }` inside `leads.metadata`. If `RESEND_API_KEY` is present it also sends a confirmation email via Resend.

## Deployment checklist
1. Set the env vars above in your hosting platform.
2. `npm run build` to validate locally.
3. Upload/commit the `/site` directory to your host or repo.
4. Point your domain’s A/AAAA/CNAME records at the host provider.

That’s it—once live, leads will flow straight into Supabase and the landing page is ready for campaigns.
