import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhyConnected } from "@/components/sections/WhyConnected";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Comparison } from "@/components/sections/Comparison";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Solutions", description: "Replace disconnected spreadsheets and manual processes with one connected business platform.", path: "/solutions" });

export default function Page() {
  return (
    <>
      <section className="bg-[radial-gradient(900px_400px_at_50%_0%,#efe8ff,transparent_70%)] pt-40">
        <div className="container-x">
          <SectionHeading as="h1" align="center" eyebrow="Solutions" title="One system for the way your business really runs." accent="really runs." />
        </div>
      </section>
      <WhyConnected />
      <Comparison />
      <HowItWorks />
      <FinalCTA />
    </>
  );
}
