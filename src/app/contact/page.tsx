import { Mail, Phone, Globe } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/ui/LeadForm";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Contact", description: "Talk to the Minute Books team.", path: "/contact" });

export default function Page() {
  const items = [
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: "Phone", value: site.phone, href: site.phoneHref },
    { icon: Globe, label: "Website", value: "www.minutebooks.in", href: site.url },
  ];
  return (
    <section className="bg-[radial-gradient(900px_500px_at_10%_0%,#efe8ff,transparent_65%)] pb-28 pt-40">
      <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading as="h1" eyebrow="Contact" title="Let's talk about your business." accent="your business." sub="Questions about a product, pricing or getting started? Send us a note." />
          <ul className="mt-10 space-y-5">
            {items.map((i) => (
              <li key={i.label}>
                <a href={i.href} className="group flex items-center gap-4">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-700 ring-1 ring-violet-100"><i.icon className="size-5" /></span>
                  <span><span className="block text-[13px] text-ink-muted">{i.label}</span><span className="block text-[16px] font-medium group-hover:text-violet-700">{i.value}</span></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <LeadForm type="contact" />
      </div>
    </section>
  );
}
