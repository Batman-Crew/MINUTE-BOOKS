import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { LogoLockup } from "@/components/brand/Logo";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "About", description: "Minute Books is an all-in-one business management platform that simplifies business operations.", path: "/about" });

const values = [
  ["Simple first", "Accounting made simple is more than a tagline. If a daily task feels complicated, we treat that as our problem to solve."],
  ["Connected by design", "One system, one set of records. Information entered once should reach everywhere it's needed."],
  ["Honest numbers", "Business owners deserve clear figures they can trust, without waiting for month-end."],
  ["Built for how India does business", "GST, multi-branch operations, and languages your team and customers use."],
];

export default function Page() {
  return (
    <>
      <section className="pb-20 pt-40">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionHeading as="h1" eyebrow="About Minute Books" title="Business software that gets out of your way." accent="gets out of your way." sub="Minute Books is an all-in-one business management platform that brings billing, POS, inventory, accounting, GST, payroll, customer management and business intelligence together." />
          <Reveal delay={0.2} className="flex justify-center"><LogoLockup className="w-72" /></Reveal>
        </div>
      </section>
      <section className="bg-violet-950 py-28 text-white">
        <div className="container-x">
          <p className="max-w-4xl text-[clamp(1.7rem,3.6vw,3rem)] font-medium leading-[1.15] tracking-[-0.03em]">
            Most businesses don&apos;t need more software. They need <span className="serif-accent text-gradient-light">one system</span> that connects the work they already do.
          </p>
        </div>
      </section>
      <section className="py-28">
        <div className="container-x">
          <SectionHeading eyebrow="What we believe" title="What guides the product." />
          <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
            {values.map(([t, d]) => <StaggerItem key={t} className="rounded-3xl bg-mist p-8 ring-1 ring-line"><h3 className="text-[21px] font-semibold tracking-tight">{t}</h3><p className="mt-2 text-[15.5px] leading-relaxed text-ink-muted">{d}</p></StaggerItem>)}
          </Stagger>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
