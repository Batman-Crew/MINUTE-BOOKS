"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { CircleCheck, Smartphone, PackageCheck, Lightbulb, TrendingUp } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Laptop, Phone } from "@/components/ui/Devices";
import { ScaleToFit } from "@/components/mockups/primitives";
import { DashboardMock, MobileMock } from "@/components/mockups/DashboardMock";
import { track } from "@/lib/analytics";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const devY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -170]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // gentle pointer-driven 3D tilt
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -2]), { stiffness: 80, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, -4]), { stiffness: 80, damping: 20 });
  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const lines = ["RUN YOUR BUSINESS.", "NOT YOUR PAPERWORK."];

  return (
    <section ref={ref} onPointerMove={onMove} className="relative isolate min-h-[100svh] overflow-hidden pb-20 pt-32 lg:pt-36">
      {/* lighting */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_75%_10%,#efe8ff_0%,transparent_60%),radial-gradient(900px_500px_at_0%_100%,#f6f1ff_0%,transparent_60%)]" />
        <div className="hairline-grid absolute inset-0 mask-radial opacity-70" />
        <motion.div
          className="absolute right-[-10%] top-[8%] h-[620px] w-[620px] rounded-full bg-[conic-gradient(from_120deg,#8b5cf6,#c4b5fd,#6527d0,#a78bfa,#8b5cf6)] opacity-35 blur-[110px]"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-4">
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 min-w-0">
          {/* Entrance is CSS-only so the copy paints before hydration, even on slow phones. */}
          <p className="rise inline-flex items-center gap-2 rounded-full bg-white/80 py-1 pl-1 pr-3 text-[13px] text-ink-2 shadow-soft ring-1 ring-line">
            <span className="rounded-full bg-violet-700 px-2 py-0.5 text-[11px] font-medium text-white">New</span>
            RestoConnect QR ordering is here
          </p>

          {/* Sized from the column, not the viewport: the longest line is ~10.85em wide, so 9cqi always fits. */}
          <div className="@container mt-7">
            <h1 className="font-display text-[length:min(9cqi,4.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              {lines.map((l, i) => (
                <span key={l} className="block overflow-hidden whitespace-nowrap pb-[0.06em]">
                  <span className={i === 1 ? "rise-line block text-gradient" : "rise-line block"} style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
                    {l}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          <p className="rise mt-7 max-w-[520px] text-[18px] leading-relaxed text-ink-muted" style={{ animationDelay: "0.35s" }}>
            Everything your business needs to operate smarter. Billing, inventory, accounting, GST, payroll, and business intelligence — all in one connected platform.
          </p>

          <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "0.45s" }}>
            <ButtonLink href="/products" size="lg" arrow onClick={() => track("cta_click", { location: "hero", cta: "explore_products" })}>
              Explore Our Products
            </ButtonLink>
            <ButtonLink href="/demo" size="lg" variant="secondary" onClick={() => track("cta_click", { location: "hero", cta: "book_demo" })}>
              Book a Demo
            </ButtonLink>
          </div>

          <ul className="rise mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-ink-muted" style={{ animationDelay: "0.6s" }}>
            {["GST-ready invoicing", "Multi-branch", "Works on mobile"].map((t) => (
              <li key={t} className="flex items-center gap-1.5"><CircleCheck className="size-4 text-violet-600" />{t}</li>
            ))}
          </ul>
        </motion.div>

        {/* devices */}
        <div className="relative min-w-0 [perspective:1800px]">
          <motion.div
            style={{ y: devY, rotateX: rx, rotateY: ry }}
            initial={reduce ? false : { opacity: 0, y: 60, rotateX: 18 }}
            animate={{ opacity: 1, y: 0, rotateX: 6 }}
            transition={{ duration: 1.4, ease, delay: 0.2 }}
            className="relative [transform-style:preserve-3d] lg:-mr-24 xl:-mr-40"
          >
            <Laptop>
              <ScaleToFit><DashboardMock /></ScaleToFit>
            </Laptop>
          </motion.div>

          <motion.div
            style={{ y: phoneY }}
            initial={reduce ? false : { opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.45 }}
            className="absolute -bottom-10 left-[-4%] w-[27%] min-w-[118px] sm:left-0"
          >
            <Phone>
              <ScaleToFit width={390} height={844}><MobileMock /></ScaleToFit>
            </Phone>
          </motion.div>

          {/* floating UI panels */}
          <FloatCard className="right-[2%] top-[-6%] lg:right-[-6%]" delay={0.9} float={0}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-green-50 text-good"><CircleCheck className="size-[18px]" /></span>
            <span><span className="block text-[12.5px] font-medium">Payment received</span><span className="block text-[11.5px] text-ink-muted">UPI · ₹2,480 · INV-2041</span></span>
          </FloatCard>
          <FloatCard className="left-[8%] top-[-12%] hidden sm:flex" delay={1.05} float={1.5}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-violet-50 text-violet-700"><TrendingUp className="size-[18px]" /></span>
            <span><span className="block text-[12.5px] font-medium">New sale · Counter 2</span><span className="block text-[11.5px] text-ink-muted">3 items · ₹1,140</span></span>
          </FloatCard>
          <FloatCard className="bottom-[14%] right-[-2%] hidden md:flex lg:right-[-10%]" delay={1.2} float={3}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-warn"><PackageCheck className="size-[18px]" /></span>
            <span><span className="block text-[12.5px] font-medium">Stock updated</span><span className="block text-[11.5px] text-ink-muted">Filter Coffee · +40 units</span></span>
          </FloatCard>
          <FloatCard className="bottom-[-12%] left-[30%] hidden sm:flex" delay={1.35} float={2}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-violet-700 text-white"><Lightbulb className="size-[18px]" /></span>
            <span><span className="block text-[12.5px] font-medium">Insight</span><span className="block text-[11.5px] text-ink-muted">Weekend sales up at Anna Nagar</span></span>
          </FloatCard>
        </div>
      </div>

      <p className="container-x relative mt-24 flex items-center justify-end gap-1.5 text-[11px] text-ink-faint">
        <Smartphone className="size-3" /> Illustrative interfaces with sample data
      </p>
    </section>
  );
}

function FloatCard({ children, className, delay, float }: { children: React.ReactNode; className?: string; delay: number; float: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      initial={reduce ? false : { opacity: 0, scale: 0.9, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay }}
      className={`absolute z-20 flex ${className}`}
    >
      <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-3.5 py-3 shadow-lift ring-1 ring-line backdrop-blur-xl animate-float" style={{ animationDelay: `${float}s` }}>
        {children}
      </div>
    </motion.div>
  );
}
