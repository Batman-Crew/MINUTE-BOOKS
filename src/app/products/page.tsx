import { EcosystemGrid } from "@/components/sections/EcosystemGrid";
import { InteractiveShowcase } from "@/components/sections/InteractiveShowcase";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Products", description: "POS, QR ordering, inventory, accounting, GST, payroll, CRM, purchasing and business intelligence in one connected platform.", path: "/products" });

export default function Page() {
  return (
    <>
      <section className="bg-[radial-gradient(900px_400px_at_50%_0%,#efe8ff,transparent_70%)] pb-4 pt-40">
        <div className="container-x">
          <SectionHeading as="h1" align="center" eyebrow="Products" title="One platform. Eleven connected products." accent="Eleven connected products." sub="Choose what you need today. Everything shares the same data, so adding a module never means starting over." />
        </div>
      </section>
      <EcosystemGrid heading={false} />
      <InteractiveShowcase />
      <FinalCTA />
    </>
  );
}
