"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { industries } from "@/lib/industries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { IndustryCard } from "./IndustryCard";

/** Horizontal, scroll-driven industry rail on desktop; a simple swipe row on touch. */
export function IndustriesSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rail = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const measure = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth + 64));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);
  const x = useTransform(scrollYProgress, [0.08, 0.92], [0, -dist]);

  return (
    <>
      {/* desktop: pinned horizontal scroll */}
      <section ref={ref} className="relative hidden h-[300vh] bg-white lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="container-x flex items-end justify-between gap-10">
            <SectionHeading eyebrow="Industries we serve" title="Built for the way your industry works." accent="your industry works." />
            <ButtonLink href="/industries" variant="secondary" arrow className="mb-2 shrink-0">All industries</ButtonLink>
          </div>
          <motion.div ref={rail} style={{ x }} className="mt-12 flex w-max gap-5 pl-[max(1.25rem,calc((100vw-1240px)/2+2rem))]">
            {industries.map((ind) => (
              <div key={ind.slug} className="w-[340px] shrink-0">
                <IndustryCard industry={ind} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* mobile / tablet */}
      <section className="bg-white py-24 lg:hidden">
        <div className="container-x">
          <SectionHeading eyebrow="Industries we serve" title="Built for the way your industry works." accent="your industry works." />
        </div>
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8">
          {industries.map((ind) => (
            <div key={ind.slug} className="w-[82vw] max-w-[340px] shrink-0 snap-start">
              <IndustryCard industry={ind} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
