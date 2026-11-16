"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products, additionalModules } from "@/lib/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Bento grid of every product plus the wider module set, with a cursor-follow glow. */
export function EcosystemGrid({ heading = true }: { heading?: boolean }) {
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <section className="relative bg-white py-28 lg:py-32">
      <div className="container-x">
        {heading && (
          <SectionHeading
            eyebrow="Everything connected"
            title="A complete system, not a collection of apps."
            accent="not a collection of apps."
            sub="Start with the module you need today. Add more as you grow — they already speak the same language."
          />
        )}
        <Stagger className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-6", heading && "mt-16")}>
          {products.map((p, i) => (
            <StaggerItem key={p.slug} className={cn(i < 2 ? "lg:col-span-3" : i === products.length - 1 ? "sm:col-span-2 lg:col-span-2" : "lg:col-span-2")}>
              <Link
                href={`/products/${p.slug}`}
                onPointerMove={onMove}
                className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-line transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_var(--x)_var(--y),rgb(139_92_246/0.12),transparent_60%)]" />
                <div className="relative flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-700 ring-1 ring-violet-100 transition-all duration-500 group-hover:bg-violet-700 group-hover:text-white group-hover:ring-violet-700">
                    <p.icon className="size-[22px]" strokeWidth={1.7} />
                  </span>
                  <span className="rounded-full bg-mist px-2.5 py-1 text-[11px] text-ink-muted ring-1 ring-line">{p.category}</span>
                </div>
                <h3 className="relative mt-auto pt-10 text-[20px] font-semibold tracking-tight">{p.name}</h3>
                <p className="relative mt-1.5 text-[14px] leading-relaxed text-ink-muted">{p.short}</p>
                <ArrowUpRight className="absolute bottom-7 right-7 size-5 text-ink-faint opacity-0 transition-all duration-500 group-hover:text-violet-700 group-hover:opacity-100" />
              </Link>
            </StaggerItem>
          ))}
          <StaggerItem className="sm:col-span-2 lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl bg-violet-950 p-7 text-white noise sm:p-9">
              <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-violet-600/40 blur-3xl" />
              <p className="relative text-[12px] uppercase tracking-[0.14em] text-violet-300">Also part of the platform</p>
              <ul className="relative mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
                {additionalModules.map((m) => (
                  <li key={m.name}>
                    <Link href={m.href} className="group flex items-start gap-3">
                      <m.icon className="mt-0.5 size-5 shrink-0 text-violet-300 transition-colors group-hover:text-white" strokeWidth={1.7} />
                      <span>
                        <span className="block text-[14px] font-medium text-white">{m.name}</span>
                        <span className="block text-[12.5px] text-violet-100/55">{m.body}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
