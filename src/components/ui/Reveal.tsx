"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/** Fades + lifts its child into view once. Respects reduced-motion. */
export function Reveal({
  children, className, delay = 0, y = 24, as = "div",
}: { children: React.ReactNode; className?: string; delay?: number; y?: number; as?: "div" | "li" | "section" | "span" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </M>
  );
}

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export function Stagger({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "ul" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M className={className} variants={container} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, margin: "-8% 0px" }}>
      {children}
    </M>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" }) {
  const M = motion[as];
  return (
    <M className={cn(className)} variants={item}>
      {children}
    </M>
  );
}

/** Word-by-word headline reveal. Text stays real text for SEO and screen readers. */
export function TextReveal({
  text, className, accent, delay = 0, accentClassName = "serif-accent text-gradient pr-1",
}: { text: string; className?: string; accent?: string; delay?: number; accentClassName?: string }) {
  const reduce = useReducedMotion();
  const idx = accent ? text.lastIndexOf(accent) : -1;
  const plain = idx >= 0 ? text.slice(0, idx) : text;
  const tokens: { w: string; accent: boolean }[] = [
    ...plain.split(/(\s+)/).filter(Boolean).map((w) => ({ w, accent: false })),
    ...(idx >= 0 ? accent!.split(/(\s+)/).filter(Boolean).map((w) => ({ w, accent: true })) : []),
  ];
  let n = 0;
  return (
    <span className={className}>
      {tokens.map((t, i) => {
        if (/^\s+$/.test(t.w)) return t.w.includes("\n") ? <br key={i} /> : " ";
        const d = delay + n++ * 0.055;
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className={cn("inline-block", t.accent && accentClassName)}
              initial={reduce ? false : { y: "105%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease, delay: d }}
            >
              {t.w}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
