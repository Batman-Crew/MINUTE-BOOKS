"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BrainCircuit, Lightbulb, Radar, Sparkles, Workflow } from "lucide-react";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem, TextReveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/brand/Logo";

/** None of these are shipped features yet. Move an item to "Available" only once it is verified in the product. */
export const aiInitiatives = [
  { icon: Lightbulb, t: "Intelligent business insights", d: "Plain-language explanations of what changed in your numbers." },
  { icon: Workflow, t: "Automated workflows", d: "Routine steps handled for you, with your approval." },
  { icon: BrainCircuit, t: "AI-assisted analysis", d: "Ask questions of your business data and get answers." },
  { icon: Sparkles, t: "Business recommendations", d: "Suggestions for reordering, pricing and follow-ups." },
  { icon: Radar, t: "Operational intelligence", d: "Early signals across branches, stock and cash." },
];

/** Replace the text wordmark with the official SOLS AI logo when supplied (see ASSETS.md). */
export function SolsWordmark({ className }: { className?: string }) {
  return <span className={`font-semibold tracking-[0.08em] text-white ${className ?? ""}`}>SOLS AI</span>;
}

export function SolsAI({ showCta = true }: { showCta?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden bg-[#0d0524] py-28 text-white noise lg:py-36">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="hairline-grid absolute inset-0 opacity-30 mask-radial" />
        <motion.div
          className="absolute left-1/2 top-1/2 size-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,#6527d0,#a78bfa,#2e1065,#8b5cf6,#6527d0)] opacity-30 blur-[90px]"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 36, ease: "linear", repeat: Infinity }}
        />
      </div>
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><Eyebrow dark>Technology partnership</Eyebrow></Reveal>
          <Reveal delay={0.05} className="mt-8 flex items-center justify-center gap-5">
            <LogoMark variant="white" className="h-10" />
            <span aria-hidden className="text-[22px] font-light text-violet-300">×</span>
            <SolsWordmark className="text-[22px]" />
          </Reveal>
          <h2 className="mt-8 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.02]">
            <TextReveal text="Business Software Meets Intelligent Technology." accent="Intelligent Technology." accentClassName="serif-accent text-gradient-light pr-1" />
          </h2>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-violet-100/75">
              Bringing smarter technology and AI-powered possibilities to business management.
            </p>
          </Reveal>
        </div>
        <Stagger className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {aiInitiatives.map((a) => (
            <StaggerItem key={a.t} className="glass-dark rounded-2xl p-5 ring-1 ring-white/10">
              <a.icon className="size-5 text-violet-300" strokeWidth={1.7} />
              <p className="mt-4 text-[15px] font-medium leading-snug">{a.t}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-violet-100/60">{a.d}</p>
              <p className="mt-4 inline-block rounded-full bg-white/8 px-2.5 py-0.5 text-[11px] text-violet-200 ring-1 ring-white/10">Upcoming</p>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-8 text-center text-[12.5px] text-violet-200/55">Technology initiatives in development, not currently available features.</p>
        {showCta && (
          <Reveal className="mt-8 flex justify-center">
            <ButtonLink href="/technology" variant="outline-light" arrow>About the partnership</ButtonLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}
