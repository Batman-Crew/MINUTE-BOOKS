"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { QrCode, ChefHat, Receipt, Languages } from "lucide-react";
import { Phone, Tablet } from "@/components/ui/Devices";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TextReveal, Reveal } from "@/components/ui/Reveal";

const steps = [
  { icon: QrCode, t: "Scan", d: "No app, no sign-up." },
  { icon: ChefHat, t: "Cook", d: "Kitchen sees it instantly." },
  { icon: Receipt, t: "Pay", d: "GST bill, online or counter." },
  { icon: Languages, t: "English · தமிழ்", d: "One tap apart." },
];

export function RestoSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [140, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -120]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-violet-950 py-28 text-white noise lg:py-36">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.45),transparent)] blur-2xl" />
        <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgb(249_115_22/0.18),transparent)]" />
      </div>
      <div className="container-x grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Reveal className="flex items-center gap-3">
            <Image src="/products/restoconnect/logo.png" alt="RestoConnect" width={1100} height={703} className="h-12 w-auto rounded-lg bg-white p-1.5" />
            <Eyebrow dark>Featured product</Eyebrow>
          </Reveal>
          <h2 className="mt-7 text-[clamp(2.4rem,5.4vw,4.4rem)] font-semibold leading-[0.98]">
            <TextReveal text="One QR. Every Table." accent="Every Table." accentClassName="serif-accent text-gradient-light pr-1" />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-violet-100/75">
              RestoConnect is Minute Books&apos; QR ordering platform for restaurants, cafés, cinemas and food courts. Guests order and pay from their own phone. The kitchen sees every order the moment it&apos;s placed.
            </p>
          </Reveal>
          <div className="mt-9 grid max-w-lg grid-cols-2 gap-3">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={0.1 + i * 0.06}>
                <div className="flex h-full gap-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
                  <s.icon className="mt-0.5 size-5 shrink-0 text-violet-300" />
                  <div><p className="text-[14px] font-medium">{s.t}</p><p className="text-[13px] text-violet-100/60">{s.d}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/products/restoconnect" variant="light" size="lg" arrow>Discover RestoConnect</ButtonLink>
            <ButtonLink href="/demo?product=restoconnect" variant="outline-light" size="lg">Book a demo</ButtonLink>
          </Reveal>
          <p className="mt-5 text-[11px] text-violet-200/50">RestoConnect product screenshots · demo venue data</p>
        </div>

        <div className="relative h-[560px] sm:h-[640px]">
          <motion.div style={{ y: y1 }} className="absolute right-0 top-6 w-[82%]">
            <Tablet>
              <Image src="/products/restoconnect/tablet-orders.webp" alt="RestoConnect staff app on a tablet with live table orders" fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover" />
            </Tablet>
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[34%] min-w-[140px]">
            <Phone>
              <Image src="/products/restoconnect/guest-menu.webp" alt="RestoConnect guest menu on a phone" fill sizes="240px" className="object-cover" />
            </Phone>
          </motion.div>
          <motion.div style={{ y: y3 }} className="absolute bottom-10 left-[38%] w-[30%] min-w-[130px]">
            <Phone>
              <Image src="/products/restoconnect/guest-order-tracking.webp" alt="Guest tracking their order status live" fill sizes="220px" className="object-cover" />
            </Phone>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
