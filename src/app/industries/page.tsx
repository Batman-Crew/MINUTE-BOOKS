import { industries } from "@/lib/industries";
import { IndustryCard } from "@/components/sections/IndustryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Industries", description: "Minute Books for restaurants, retail, supermarkets, medical shops, salons, wholesale, manufacturing, garments, electronics and automobile businesses.", path: "/industries" });

export default function Page() {
  return (
    <>
      <section className="pb-24 pt-40">
        <div className="container-x">
          <SectionHeading as="h1" eyebrow="Industries" title="Built for the way your industry works." accent="your industry works." sub="The same connected platform, set up around the realities of your trade." />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => <StaggerItem key={i.slug}><IndustryCard industry={i} /></StaggerItem>)}
          </Stagger>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
