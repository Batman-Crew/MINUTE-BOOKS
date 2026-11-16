/**
 * Verified company information only. Do not add contact details, partner names,
 * customer counts or certifications here unless the company has confirmed them.
 */
export const site = {
  name: "Minute Books",
  legalName: "Minute Books",
  tagline: "Accounting made simple.",
  description:
    "Minute Books is an all-in-one business management platform — billing, POS, inventory, accounting, GST, payroll, CRM and business intelligence in one connected system.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.minutebooks.in").replace(/\/$/, ""),
  email: "minutebooksofficial@gmail.com",
  /** Taken from the company's own marketing material (Downloads/Minute_Books_1254x1254.png). Confirm before launch. */
  phone: "+91 63748 10499",
  phoneHref: "tel:+916374810499",
  locale: "en_IN",
};

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", mega: true },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
