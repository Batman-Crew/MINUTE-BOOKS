import Link from "next/link";
import { Mail, Globe, Phone } from "lucide-react";
import { LogoLockup } from "@/components/brand/Logo";
import { products } from "@/lib/products";
import { industries } from "@/lib/industries";
import { site } from "@/lib/site";

const company = [
  { label: "About Minute Books", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Technology & SOLS AI", href: "/technology" },
  { label: "Contact", href: "/contact" },
  { label: "Book a Demo", href: "/demo" },
  { label: "Login", href: "/login" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-violet-950 text-violet-100/70 noise">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 size-[520px] rounded-full bg-violet-700/25 blur-[120px]" />
      <div className="container-x relative grid gap-12 py-20 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <LogoLockup variant="white" className="w-44" />
          <p className="mt-6 max-w-xs text-[14px] leading-relaxed">
            One connected platform for billing, POS, inventory, accounting, GST, payroll, CRM and business intelligence.
          </p>
          <ul className="mt-6 space-y-2.5 text-[14px]">
            <li><a className="inline-flex items-center gap-2 hover:text-white" href={`mailto:${site.email}`}><Mail className="size-4" />{site.email}</a></li>
            <li><a className="inline-flex items-center gap-2 hover:text-white" href={site.phoneHref}><Phone className="size-4" />{site.phone}</a></li>
            <li><a className="inline-flex items-center gap-2 hover:text-white" href={site.url}><Globe className="size-4" />www.minutebooks.in</a></li>
          </ul>
        </div>
        <FooterCol title="Products" links={products.map((p) => ({ label: p.name, href: `/products/${p.slug}` }))} />
        <FooterCol title="Industries" links={industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` }))} />
        <FooterCol title="Company" links={company} />
      </div>
      <div className="container-x relative flex flex-col gap-3 border-t border-white/10 py-8 text-[12.5px] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Minute Books. All rights reserved.</p>
        <Link href="/credits" className="transition-colors hover:text-white">Photo credits</Link>
        <p className="tracking-[0.2em] text-violet-200/60">ONE PLATFORM · EVERY BUSINESS · SMARTER OPERATIONS</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white">{title}</p>
      <ul className="mt-5 space-y-2.5 text-[14px]">
        {links.map((l) => (
          <li key={l.href}><Link href={l.href} className="transition-colors hover:text-white">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
