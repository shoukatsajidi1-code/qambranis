# Qambranis

Production website for Qambranis, a handmade cultural dupatta brand working with women artisans in interior Sindh.

## Local development

```bash
npm install
npm run dev
```

## Contact form setup

The contact form posts to `/api/contact` and sends through Brevo. Add these private environment variables in **Vercel → Project → Settings → Environment Variables** for Production, Preview and Development as required:

- `BREVO_API_KEY`
- `CONTACT_TO_EMAIL` (normally `info@qambranis.com`)
- `CONTACT_FROM_EMAIL` (must be a sender/domain verified in Brevo)

Never commit the actual Brevo API key to GitHub. After saving the variables, redeploy the latest production deployment.

## Deployment

The `main` branch deploys automatically to Vercel. Primary URL: `https://www.qambranis.com`.
