"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { products, type Product } from "@/lib/products";
import { Laptop } from "@/components/ui/Devices";
import { ModuleScreen } from "@/components/mockups/registry";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/** Server and desktop render no inline visuals, so desktop never mounts the phone-only mockups. */
const desktopQuery = "(min-width: 1024px)";
function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => { const m = window.matchMedia(desktopQuery); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); },
    () => window.matchMedia(desktopQuery).matches,
    () => true,
  );
}

/**
 * The product ecosystem as a scroll story: copy scrolls on the left while a single
 * laptop on the right transforms into each Minute Books module.
 */
export function ProductChapters() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const p = products[active];

  return (
    <section id="ecosystem" className="relative overflow-x-clip bg-white py-28 lg:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="The Minute Books ecosystem"
          title="One platform. Every business. Smarter operations."
          accent="Smarter operations."
          sub="Eleven connected products that share one database — so a sale at the counter updates stock, books, GST and dashboards in the same moment."
        />

        <div className="relative mt-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            {products.map((prod, i) => (
              <Chapter key={prod.slug} product={prod} index={i} active={active === i} onActive={() => setActive(i)} />
            ))}
          </div>

          {/* sticky transforming device (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-260px)]">
              <div className="relative">
                <div aria-hidden className="absolute -inset-10 -z-10 rounded-[48px] bg-[radial-gradient(closest-side,#ede6ff,transparent)]" />
                <div className="mb-5 flex items-center gap-1.5">
                  {products.map((x, i) => (
                    <span key={x.slug} className={cn("h-1 rounded-full transition-all duration-500", i === active ? "w-8 bg-violet-700" : "w-3 bg-violet-200")} />
                  ))}
                  <span className="ml-3 font-mono text-[11px] text-ink-faint">
                    {String(active + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="[perspective:2000px]">
                  <Laptop>
                    <AnimatePresence initial={false} mode="popLayout">
                      <motion.div
                        key={p.slug}
                        className="absolute inset-0"
                        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04, filter: "blur(8px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, filter: "blur(6px)" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <ModuleScreen mockup={p.mockup} />
                      </motion.div>
                    </AnimatePresence>
                  </Laptop>
                </div>
                <p className="mt-6 text-center text-[11px] text-ink-faint">
                  {p.mockup === "restoconnect" ? "RestoConnect product screenshot · demo venue data" : "Illustrative interface · sample data"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapter({ product, index, active, onActive }: { product: Product; index: number; active: boolean; onActive: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const isDesktop = useIsDesktop();
  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <div ref={ref} className="flex min-h-[auto] flex-col justify-center border-t border-line py-12 first:border-0 lg:min-h-[78vh] lg:border-0 lg:py-0">
      <motion.div
        animate={{ opacity: active ? 1 : 0.28 }}
        transition={{ duration: 0.5 }}
        className="max-lg:!opacity-100"
      >
        <div className="flex items-center gap-3">
          <span className={cn("flex size-11 items-center justify-center rounded-2xl ring-1 transition-colors duration-500", active ? "bg-violet-700 text-white ring-violet-700" : "bg-violet-50 text-violet-700 ring-violet-100")}>
            <product.icon className="size-5" strokeWidth={1.8} />
          </span>
          <span className="font-mono text-[12px] text-ink-faint">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-violet-700">{product.name}</span>
        </div>
        <h3 className="mt-6 text-[clamp(1.8rem,3.2vw,2.75rem)] font-semibold leading-[1.05]">
          {product.headline.replace(product.accent ?? "", "")}
          {product.accent && <span className="serif-accent text-gradient pr-1">{product.accent}</span>}
        </h3>
        <p className="mt-4 max-w-md text-[16.5px] leading-relaxed text-ink-muted">{product.sub}</p>
        <ul className="mt-6 flex max-w-md flex-wrap gap-2">
          {product.capabilities.slice(0, 6).map((c) => (
            <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-[12.5px] text-ink-2 ring-1 ring-line">
              <Check className="size-3.5 text-violet-600" />{c}
            </li>
          ))}
        </ul>
        <Link href={`/products/${product.slug}`} className="group mt-7 inline-flex items-center gap-1.5 text-[15px] font-medium text-violet-700">
          Explore {product.name}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* inline visual on small screens */}
        {!isDesktop && (
          <div className="mt-8">
            <Laptop><div className="absolute inset-0"><ModuleScreen mockup={product.mockup} /></div></Laptop>
          </div>
        )}
      </motion.div>
    </div>
  );
}
