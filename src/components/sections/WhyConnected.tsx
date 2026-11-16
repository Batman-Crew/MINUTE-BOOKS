"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  FileSpreadsheet, NotebookPen, Receipt, Calculator, Banknote, UsersRound, Boxes, MessageSquare,
  Link2, Hand, Eye, PackageCheck, LayoutGrid, Building2, Lightbulb, Smartphone,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/brand/Logo";

const tools = [
  { icon: FileSpreadsheet, label: "Sales spreadsheet", from: [-420, -170, -14] },
  { icon: NotebookPen, label: "Stock register", from: [380, -200, 11] },
  { icon: Receipt, label: "Separate billing app", from: [-470, 130, 9] },
  { icon: Calculator, label: "Manual GST working", from: [440, 150, -12] },
  { icon: Banknote, label: "Bank statements", from: [-180, 250, -7] },
  { icon: UsersRound, label: "Payroll sheet", from: [210, 260, 15] },
  { icon: Boxes, label: "Godown notebook", from: [-240, -270, 8] },
  { icon: MessageSquare, label: "Orders on chat", from: [170, -290, -10] },
] as const;

const benefits = [
  { icon: Link2, t: "One connected platform", d: "Billing, stock, books and people on one database." },
  { icon: Hand, t: "Less manual work", d: "Enter it once. It flows everywhere it's needed." },
  { icon: Eye, t: "Better financial visibility", d: "Profit, cash and dues — always current." },
  { icon: PackageCheck, t: "Smarter inventory", d: "Stock that moves with every sale and purchase." },
  { icon: LayoutGrid, t: "Organised operations", d: "Every document linked to the one before it." },
  { icon: Building2, t: "Multi-branch support", d: "Every location, one system, one view." },
  { icon: Lightbulb, t: "Business insights", d: "Dashboards that reflect the whole business." },
  { icon: Smartphone, t: "Mobile accessibility", d: "Check the business from your phone." },
];

export function WhyConnected() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "center 0.5"] });

  return (
    <section className="relative overflow-hidden bg-white py-28 lg:py-36">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Why Minute Books"
          title="Everything Connected. Everything Clear."
          accent="Everything Clear."
          sub="Most businesses run on a patchwork of notebooks, spreadsheets and separate apps. Minute Books brings them into one system."
        />

        <div ref={ref} className="relative mx-auto mt-16 aspect-[5/3] w-full max-w-[1000px]">
          <Rings progress={scrollYProgress} />
          <Core progress={scrollYProgress} />
          {tools.map((t, i) => (
            <Tool key={t.label} index={i} {...t} progress={scrollYProgress} />
          ))}
        </div>

        <Stagger className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <StaggerItem key={b.t} className="bg-white p-7">
              <b.icon className="size-5 text-violet-700" strokeWidth={1.8} />
              <p className="mt-4 text-[16px] font-semibold tracking-tight">{b.t}</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-muted">{b.d}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Core({ progress }: { progress: MotionValue<number> }) {
  const scale = useTransform(progress, [0.4, 1], [0.6, 1]);
  const opacity = useTransform(progress, [0.35, 0.8], [0, 1]);
  const glow = useTransform(progress, [0.6, 1], [0, 1]);
  return (
    <motion.div style={{ scale, opacity }} className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
      <motion.div style={{ opacity: glow }} className="absolute -inset-16 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.35),transparent)]" />
      <div className="relative flex size-20 flex-col items-center justify-center rounded-2xl bg-white shadow-lift ring-1 ring-violet-100 sm:size-44 sm:rounded-[2rem]">
        <LogoMark className="h-9 sm:h-16" />
        <p className="mt-2 hidden text-[11px] font-semibold tracking-[0.18em] text-ink sm:block">MINUTE BOOKS</p>
      </div>
    </motion.div>
  );
}

function Rings({ progress }: { progress: MotionValue<number> }) {
  const o = useTransform(progress, [0.5, 1], [0, 1]);
  return (
    <motion.svg style={{ opacity: o }} aria-hidden className="absolute inset-0 h-full w-full" viewBox="-500 -300 1000 600" preserveAspectRatio="xMidYMid meet">
      <circle r="230" fill="none" stroke="#ddd2ff" strokeDasharray="2 6" />
      <circle r="150" fill="none" stroke="#eee8ff" />
      {tools.map((_, i) => {
        const a = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
        return <line key={i} x1="0" y1="0" x2={Math.cos(a) * 230} y2={Math.sin(a) * 230} stroke="#c3b0fe" strokeWidth="1.25" className="flow-dash" />;
      })}
    </motion.svg>
  );
}

function Tool({ icon: Icon, label, from, index, progress }: { icon: React.ElementType; label: string; from: readonly [number, number, number]; index: number; progress: MotionValue<number> }) {
  const a = (index / tools.length) * Math.PI * 2 - Math.PI / 2;
  // positions are expressed in the 1000×600 design space and scaled with the container
  const tx = Math.cos(a) * 230, ty = Math.sin(a) * 230;
  const px = useTransform(progress, [0, 1], [from[0] / 10, tx / 10]);
  const py = useTransform(progress, [0, 1], [from[1] / 6, ty / 6]);
  const left = useMotionTemplate`calc(50% + ${px}%)`;
  const top = useMotionTemplate`calc(50% + ${py}%)`;
  const rotate = useTransform(progress, [0, 1], [from[2], 0]);
  const bg = useTransform(progress, [0.7, 1], ["#fff7ed", "#ffffff"]);
  const labelOpacity = useTransform(progress, [0, 0.6, 0.9], [1, 1, 0.85]);
  return (
    <motion.div style={{ left, top, rotate }} className="absolute z-20 size-0">
      <motion.div style={{ backgroundColor: bg }} className="w-max -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 whitespace-nowrap rounded-2xl px-3 py-2.5 shadow-soft ring-1 ring-line">
        <Icon className="size-4 shrink-0 text-violet-700" strokeWidth={1.8} />
        <motion.span style={{ opacity: labelOpacity }} className="hidden text-[12.5px] font-medium text-ink-2 sm:inline">{label}</motion.span>
      </motion.div>
    </motion.div>
  );
}
