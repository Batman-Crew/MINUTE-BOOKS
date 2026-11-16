"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { products } from "@/lib/products";
import { BrowserWindow } from "@/components/ui/Devices";
import { ModuleScreen } from "@/components/mockups/registry";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

const tabLabels: Record<string, string> = {
  "smart-pos": "POS", inventory: "Inventory", accounting: "Accounting", gst: "GST",
  payroll: "Payroll", crm: "CRM", purchase: "Purchase", analytics: "Insights", "school-management": "School", "college-management": "College",
};

export function InteractiveShowcase() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const p = products[i];

  return (
    <section className="relative overflow-hidden bg-mist py-28 lg:py-36">
      <div aria-hidden className="dot-grid absolute inset-0 mask-fade-y opacity-60" />
      <div className="container-x relative">
        <SectionHeading
          align="center"
          eyebrow="Try it yourself"
          title="Explore the platform, module by module."
          accent="module by module."
          sub="Pick a product to see its workspace. Every module opens into the same connected system."
        />

        <Reveal delay={0.1}>
          <LayoutGroup>
            <div role="tablist" aria-label="Minute Books modules" className="no-scrollbar mx-auto mt-12 flex max-w-full gap-1 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-soft ring-1 ring-line lg:w-fit">
              {products.map((x, idx) => (
                <button
                  key={x.slug}
                  role="tab"
                  aria-selected={i === idx}
                  aria-controls="showcase-panel"
                  onClick={() => { setI(idx); track("showcase_select", { module: x.slug }); }}
                  className={cn("relative flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13.5px] transition-colors", i === idx ? "text-white" : "text-ink-2 hover:text-ink")}
                >
                  {i === idx && <motion.span layoutId="tab-bg" className="absolute inset-0 rounded-xl bg-violet-700 shadow-[0_8px_20px_-8px_rgb(101_39_208/0.9)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <x.icon className="relative size-4" strokeWidth={1.8} />
                  <span className="relative whitespace-nowrap">{tabLabels[x.slug] ?? x.name}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </Reveal>

        <div id="showcase-panel" role="tabpanel" className="relative mt-12 grid items-start gap-8 lg:grid-cols-[1fr_340px]">
          <div className="relative">
            <BrowserWindow url={p.slug === "restoconnect" ? "RestoConnect · Kitchen" : `Minute Books · ${p.name}`}>
              <div className="relative aspect-[1280/800]">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={p.slug}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.99 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ModuleScreen mockup={p.mockup} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </BrowserWindow>
            <p className="mt-3 text-center text-[11px] text-ink-faint">
              {p.mockup === "restoconnect" ? "RestoConnect product screenshot · demo venue data" : "Illustrative interface · sample data"}
            </p>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.aside
              key={p.slug}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-white p-7 shadow-lift ring-1 ring-line"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-violet-700 text-white"><p.icon className="size-5" /></span>
              <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.14em] text-violet-700">{p.name}</p>
              <h3 className="mt-2 text-[24px] font-semibold leading-tight">{p.headline}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">{p.short}</p>
              <ul className="mt-5 space-y-2.5">
                {p.capabilities.slice(0, 5).map((c) => (
                  <li key={c} className="flex items-center gap-2.5 text-[14px] text-ink-2">
                    <span className="flex size-5 items-center justify-center rounded-full bg-violet-50"><Check className="size-3 text-violet-700" /></span>
                    {c}
                  </li>
                ))}
              </ul>
              <Link href={`/products/${p.slug}`} className="group mt-7 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-violet-700">
                See {p.name} <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.aside>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
