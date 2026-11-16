"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { LayoutGrid, Settings2, Link2, ChartNoAxesCombined } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { icon: LayoutGrid, t: "Choose your business solution.", d: "Tell us how you operate. Pick the modules that fit — add more whenever you need them." },
  { icon: Settings2, t: "Set up your business.", d: "Your company, tax details, items, branches and opening balances, configured with you." },
  { icon: Link2, t: "Connect your daily operations.", d: "Billing, stock, purchasing and payroll start flowing into one system." },
  { icon: ChartNoAxesCombined, t: "Understand and grow your business.", d: "Reports and dashboards show what's working, so you can act on it." },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="relative bg-mist py-28 lg:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow="How it works" title="From first conversation to clear numbers." accent="clear numbers." sub="Four steps, with people to help you through each one." />
        </div>
        <div ref={ref} className="relative">
          <div aria-hidden className="absolute bottom-6 left-[27px] top-6 w-px bg-line-strong" />
          <motion.div aria-hidden style={{ scaleY }} className="absolute bottom-6 left-[26px] top-6 w-[3px] origin-top rounded-full bg-gradient-to-b from-violet-500 to-violet-800" />
          <ol className="space-y-5">
            {steps.map((s, i) => (
              <li key={s.t}>
                <Reveal className="relative flex gap-6">
                  <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white text-violet-700 shadow-soft ring-1 ring-line">
                    <s.icon className="size-6" strokeWidth={1.7} />
                  </span>
                  <div className="flex-1 rounded-3xl bg-white p-7 ring-1 ring-line">
                    <p className="font-mono text-[12px] text-violet-700">Step {i + 1}</p>
                    <h3 className="mt-2 text-[22px] font-semibold leading-tight">{s.t}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{s.d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
