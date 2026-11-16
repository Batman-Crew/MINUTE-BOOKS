import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Minus } from "lucide-react";
import { industries, industryBySlug } from "@/lib/industries";
import { productBySlug } from "@/lib/products";
import { IndustryVisual } from "@/components/sections/IndustryCard";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => industries.map((i) => ({ slug: i.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = industryBySlug(slug);
  return i ? pageMeta({ title: i.name, description: i.description, path: `/industries/${i.slug}` }) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = industryBySlug(slug);
  if (!i) notFound();
  return (
    <>
      <section className="pb-16 pt-36">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal><Eyebrow>{i.name}</Eyebrow></Reveal>
            <h1 className="mt-6 text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1.02]"><TextReveal text={i.headline} /></h1>
            <Reveal delay={0.15}><p className="mt-6 max-w-lg text-[18px] leading-relaxed text-ink-muted">{i.description}</p></Reveal>
            <Reveal delay={0.25} className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={`/demo?industry=${i.slug}`} size="lg" arrow>Book a Demo</ButtonLink>
              <ButtonLink href="/industries" size="lg" variant="secondary">All industries</ButtonLink>
            </Reveal>
          </div>
          <Reveal delay={0.2}><IndustryVisual industry={i} large className="group aspect-[5/4] rounded-3xl shadow-lift" /></Reveal>
        </div>
      </section>
      <section className="bg-mist py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="The everyday problems" title="Sound familiar?" />
            <ul className="mt-7 space-y-3">
              {i.challenges.map((c) => <li key={c} className="flex gap-3 text-[15.5px] text-ink-muted"><Minus className="mt-1 size-4 shrink-0 text-ink-faint" />{c}</li>)}
            </ul>
          </div>
          <div className="grid gap-4">
            {i.outcomes.map((o) => (
              <Reveal key={o.title} className="rounded-3xl bg-white p-7 ring-1 ring-line">
                <h3 className="text-[19px] font-semibold tracking-tight">{o.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">{o.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Recommended modules" title="Your starting set." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {i.modules.map((m) => {
              const p = productBySlug(m);
              if (!p) return null;
              return (
                <Link key={m} href={`/products/${m}`} className="group rounded-3xl p-6 ring-1 ring-line transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <p.icon className="size-6 text-violet-700" strokeWidth={1.7} />
                  <h3 className="mt-4 text-[17px] font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">{p.short}</p>
                  <ArrowRight className="mt-3 size-4 text-violet-700 transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
