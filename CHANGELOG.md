# TenderSnap Changelog & Change Requests

I’ll log every change request here (date + source + checklist) before touching code, then update the same section with what shipped. This file stays in git so the brief and the implementation notes never get separated again.

> Add the next request under a `## YYYY-MM-DD – Short Label` heading.

## 2026-03-20 – Mobile polish & copy tweaks
- [x] Remove hero badge "WA tender intelligence, human tone"
- [x] Center hero headline
- [x] Center hero subhead
- [x] Center pricing + cancel line
- [x] Make first form button text visible (brand blue background)
- [x] Remove "Thanks for your interest" line under form
- [x] Center text in the two stats tiles
- [x] Remove "Preview" label above hero card
- [x] Add "?" to "Why TenderSnap"
- [x] Rename "Smart scraping" → "Smart searching"
- [x] Update smart-searching body copy
- [x] Add comma after "briefs"
- [x] Remove "Founding price" label, center $29/mo
- [x] Update price blurb copy
- [x] Change bullet to "Real human support"
- [x] Change "Real data from last week's scrape" → "search"
- [x] Fix gallery modal button text + show tender link
- [x] Update FAQ intro text/location
- [x] FAQ1 answer tweak (coverage)
- [x] FAQ2 answer tweak (frequency)
- [x] FAQ3 answer tweak (pricing sentence)
- [x] FAQ4 answer tweak (signup flow)
- [x] Remove "Final call" label + center headline
- [x] Update final subhead copy
- [x] Make final CTA button text visible (blue background)
- [x] Trim final disclaimer to "No spam. Unsubscribe anytime"

## 2026-03-20 – Logo & footer details
- [x] Add logo between hero headline and subhead with balanced spacing
- [x] Make both lead-form buttons white with blue text
- [x] Drop logo in footer (smaller) and append ABN 92256927605

## 2026-03-20 – Logo v2 & button contrast
- [x] Swap hero/footer logos to tendersnap-logo-2.svg
- [x] Force white CTA buttons with brand-blue text
- [x] Rescale hero logo (7x) and footer logo (5x)
- [x] Swap to trimmed tendersnap-logo-3.svg
- [x] Tighten spacing around hero/footer logos

## 2026-03-20 – SEO & privacy improvements
- [x] Add FAQ + organization structured data and social share image
- [x] Publish tender pain points section with WA niches list
- [x] Standardise contact links to support@tendersnap.com.au
- [x] Add dedicated privacy/terms page and link in footer

## 2026-03-20 – Stripe checkout foundation
- [x] Added Stripe SDK plus checkout + webhook API routes with test credentials
- [x] Introduced a Checkout CTA on the hero and created a success page placeholder
- [x] Stored live vs test Stripe env files for future cutover
