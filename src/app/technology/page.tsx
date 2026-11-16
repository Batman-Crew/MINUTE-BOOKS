import { SectionHeading } from "@/components/ui/SectionHeading";
import { SolsAI } from "@/components/sections/SolsAI";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Technology & SOLS AI", description: "Minute Books and SOLS AI are working together to bring smarter technology to business management.", path: "/technology" });

const today = [
  ["One shared database", "Every module reads and writes the same records, so reports reflect the whole business."],
  ["Works in the browser", "Use Minute Books from a desktop, a tablet or a phone."],
  ["Roles and permissions", "Give each person access to what their work needs."],
];

export default function Page() {
  return (
    <>
      <section className="pb-20 pt-40">
        <div className="container-x">
          <SectionHeading as="h1" eyebrow="Technology" title="A connected core, and what we're building next." accent="what we're building next." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {today.map(([t, d]) => <Reveal key={t} className="rounded-3xl bg-mist p-7 ring-1 ring-line"><p className="text-[12px] font-medium uppercase tracking-[0.12em] text-violet-700">Available today</p><h2 className="mt-3 text-[20px] font-semibold">{t}</h2><p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{d}</p></Reveal>)}
          </div>
        </div>
      </section>
      <SolsAI showCta={false} />
      <FinalCTA />
    </>
  );
}
