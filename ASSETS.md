# Minute Books website: assets and launch checklist

## Must be done before launch

| Item | Status | What is needed |
|---|---|---|
| Lead delivery | Needs Gmail App Password | Set `SMTP_PASS` to an App Password for minutebooksofficial@gmail.com, locally in `.env.local` and on the host. Until then the contact and demo forms show an error and direct visitors to email. |
| Testimonials | Placeholder cards are visible on the homepage | Add real, approved feedback in `src/lib/testimonials.ts`, or remove `<Testimonials />` from `src/app/page.tsx`. |
| SOLS AI logo | Missing, a plain text "SOLS AI" stands in | Supply the official logo, then replace `SolsWordmark` in `src/components/sections/SolsAI.tsx`. |
| SOLS AI partnership | Unverified wording | Confirm the partnership announcement is approved by both companies. |
| Phone number | Needs confirming | `+91 63748 10499` comes from a company poster, which also prints `www.minutebooks.com`, not `.in`. Confirm both in `src/lib/site.ts`. |
| Login | Assumption | `/login` assumes each customer has their own workspace address. Replace it if there is one central login URL. |

## Confirm these product claims

The site was written from the brief, the RestoConnect brochure, and the apps in the local codebase (ERPNext, HRMS, India Compliance). Those show what the software can do, not what is enabled for customers.

- GST: GSTR-1 and GSTR-3B reports, e-invoice and e-way bill workflows
- Payroll: PF and ESI through configurable salary components
- Inventory: batch and serial tracking
- Multi-branch and multi-company reporting
- Mobile: described as working in a phone browser. Say so if there is a native Minute Books app.
- RestoConnect: all details come from the product brochure

AI features are labelled "Upcoming" on purpose. Move one to available only after it has been verified in the product.

## Visual assets

| Asset | Status | Notes |
|---|---|---|
| Minute Books logo | Cut from a 1254px PNG | Replace `public/brand/*` with official vector files. The white versions and the horizontal nav logo were derived from the original pixels, so please approve them. |
| RestoConnect screenshots | Real product screenshots | Taken from the brochure and show a demo venue, captioned as such. |
| Other product screens | Coded illustrations with sample data | Replace with real screenshots if preferred. Register them in `src/components/mockups/registry.tsx`. |
| Industry photography | Stock photos in place | Twelve Pexels photos are live and listed on `/credits`. To replace one with your own, save it to `public/industries/` and edit `src/lib/industry-photos.ts`. Avoid identifiable people and visible brands. |
| School and College Management | Needs review | Features on `/products/school-management`, `/products/college-management`, `/industries/schools` and `/industries/colleges` are standard assumptions, not confirmed product facts. Correct them in `src/lib/products.ts` and `src/lib/industries.ts`. Mockups use sample data; replace with real screenshots when available. |
