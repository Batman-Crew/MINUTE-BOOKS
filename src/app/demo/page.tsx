import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/ui/LeadForm";
import { productBySlug } from "@/lib/products";
import { industryBySlug } from "@/lib/industries";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Book a Demo", description: "See Minute Books running with your kind of business.", path: "/demo" });

export default async function Page({ searchParams }: { searchParams: Promise<{ product?: string; industry?: string }> }) {
  const { product, industry } = await searchParams;
  const p = product ? productBySlug(product)?.slug : undefined;
  const i = industry ? industryBySlug(industry)?.slug : undefined;
  return (
    <section className="relative isolate overflow-hidden bg-violet-950 pb-28 pt-40 noise">
      <div aria-hidden className="absolute -left-40 top-0 -z-10 size-[700px] rounded-full bg-violet-600/40 blur-[120px]" />
      <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading as="h1" dark eyebrow="Book a demo" title="See it working for your business." accent="your business." sub="Tell us a little about how you operate, and we'll walk you through the parts that matter to you." />
          <ul className="mt-8 space-y-3 text-[15.5px] text-violet-100/80">
            {["A walkthrough shaped around your industry", "Answers to your billing, stock and GST questions", "A clear view of which modules you need"].map((x) => <li key={x} className="flex gap-2.5"><Check className="mt-1 size-4 text-violet-300" />{x}</li>)}
          </ul>
        </div>
        <LeadForm type="demo" product={p} industry={i} />
      </div>
    </section>
  );
}
