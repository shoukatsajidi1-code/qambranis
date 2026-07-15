# Qambranis Release 2.7 — Search & Analytics Launch

## Vercel environment variables

Add these in **Vercel → Project → Settings → Environment Variables** and redeploy:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — your GA4 Measurement ID, for example `G-ABC1234567`.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — optional Google Search Console HTML-tag token. Domain verification through Cloudflare DNS remains the preferred option and does not require this variable.

Keep the existing Brevo contact variables unchanged.

## Analytics events

After a visitor accepts optional analytics, the site records:

- `view_item`
- `add_to_cart`
- `begin_checkout`
- `purchase_intent` (WhatsApp order hand-off; not a completed online payment)
- `generate_lead` (successful contact-form delivery)
- `contact` (WhatsApp clicks)

Analytics is not loaded until the visitor chooses **Allow analytics**. Declining stores only the preference locally in the browser.

## Search Console

The canonical domain is `https://www.qambranis.com`.

Submit:

- `https://www.qambranis.com/sitemap.xml`

The sitemap and robots route are included in the application.
