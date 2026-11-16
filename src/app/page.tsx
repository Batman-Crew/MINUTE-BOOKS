import { Hero } from "@/components/sections/Hero";
import { ProductChapters } from "@/components/sections/ProductChapters";
import { RestoSpotlight } from "@/components/sections/RestoSpotlight";
import { InteractiveShowcase } from "@/components/sections/InteractiveShowcase";
import { EcosystemGrid } from "@/components/sections/EcosystemGrid";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { WhyConnected } from "@/components/sections/WhyConnected";
import { SolsAI } from "@/components/sections/SolsAI";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Comparison } from "@/components/sections/Comparison";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductChapters />
      <RestoSpotlight />
      <InteractiveShowcase />
      <EcosystemGrid />
      <IndustriesSection />
      <WhyConnected />
      <SolsAI />
      <HowItWorks />
      <Comparison />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
