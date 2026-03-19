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
Create a `.env.local` file and add the following once your Supabase project is ready:
```
SUPABASE_URL="https://<your-project>.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"
SUPABASE_LEADS_TABLE="leads" # optional, defaults to "leads"
```
The API route at `src/app/api/subscribe/route.ts` inserts rows with `{ email, niche, source }`. Until keys are provided the endpoint returns a 202 status with a friendly confirmation message so visitors still get feedback.

## Deployment checklist
1. Set the env vars above in your hosting platform.
2. `npm run build` to validate locally.
3. Upload/commit the `/site` directory to your host or repo.
4. Point your domain’s A/AAAA/CNAME records at the host provider.

That’s it—once live, leads will flow straight into Supabase and the landing page is ready for campaigns.
