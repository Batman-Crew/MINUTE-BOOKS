# Minute Books website

Marketing site for www.minutebooks.in. Next.js 16, TypeScript, Tailwind CSS 4, Framer Motion, Lenis.

It is separate from the lead platform in the parent folder and shares no code or database with it.

## Run

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run lint
npm run build
```

## Where things live

| Change | File |
|---|---|
| Contact details | `src/lib/site.ts` |
| Product copy and features | `src/lib/products.ts` |
| Industry copy | `src/lib/industries.ts` |
| Industry photos and their licence credits | `src/lib/industry-photos.ts` |
| Testimonials | `src/lib/testimonials.ts` |
| Design tokens | `src/app/globals.css` |
| Product interface mockups | `src/components/mockups/` |

## Forms

Both forms post to `src/app/api/lead/route.ts`, which validates the input, applies a honeypot and a rate limit, then delivers the lead by email (`SMTP_USER` and `SMTP_PASS`, to `LEAD_EMAIL_TO` or the site's email address) and/or as JSON to `LEAD_WEBHOOK_URL`. For Gmail, `SMTP_PASS` must be an App Password. Visitors only see success once a delivery is accepted; otherwise they get an error with the email address, so no enquiry is silently lost. Set these variables on the host too, not only in `.env.local`. The rate limit is held in memory per server instance.

## Analytics

Set `NEXT_PUBLIC_ANALYTICS_PROVIDER` (`plausible` or `ga4`) and `NEXT_PUBLIC_ANALYTICS_ID`. Conversions are sent through `track()` in `src/lib/analytics.ts`.

## Deploy

Needs Node 20.9 or newer. The build downloads Google Fonts, so it needs network access.

**Vercel:** import the repository, set the root directory to `website`, add the environment variables, then point `www.minutebooks.in` at it.

**Hetzner or your own server:** follow [DEPLOY.md](DEPLOY.md) step by step. In short:

```bash
npm ci
npm run build
PORT=3000 npm start    # run behind HTTPS with nginx or similar, under a process manager
```

Set `NEXT_PUBLIC_SITE_URL` and the analytics variables before building, because they are compiled in. Then work through [ASSETS.md](ASSETS.md).
