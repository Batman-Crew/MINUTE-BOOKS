import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { productBySlug } from "@/lib/products";
import { BrowserWindow, Laptop, SampleTag } from "@/components/ui/Devices";
import { ModuleScreen } from "@/components/mockups/registry";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem, TextReveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";

function Headline({ p, dark, compact }: { p: Product; dark?: boolean; compact?: boolean }) {
  return (
    <h1 className={`${compact ? "text-[clamp(2.4rem,4.2vw,3.6rem)]" : "text-[clamp(2.5rem,5.6vw,4.8rem)]"} font-semibold leading-[1] ${dark ? "text-white" : ""}`}>
      <TextReveal text={p.headline} accent={p.accent} accentClassName={dark ? "serif-accent text-gradient-light pr-1" : undefined} />
    </h1>
  );
}

function Actions({ p, dark, center }: { p: Product; dark?: boolean; center?: boolean }) {
  return (
    <Reveal delay={0.25} className={`mt-9 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      <ButtonLink href={`/demo?product=${p.slug}`} size="lg" variant={dark ? "light" : "primary"} arrow>Book a Demo</ButtonLink>
      <ButtonLink href="/products" size="lg" variant={dark ? "outline-light" : "secondary"}>All products</ButtonLink>
    </Reveal>
  );
}

/** Text left, device right. */
function SplitHero({ p }: { p: Product }) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(900px_500px_at_85%_0%,#efe8ff,transparent_65%)] pb-20 pt-36">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Reveal><Eyebrow>{p.eyebrow}</Eyebrow></Reveal>
          <div className="mt-6"><Headline p={p} compact /></div>
          <Reveal delay={0.15}><p className="mt-6 max-w-lg text-[18px] leading-relaxed text-ink-muted">{p.sub}</p></Reveal>
          <Actions p={p} />
        </div>
        <Reveal delay={0.2}>
          <Laptop><ModuleScreen mockup={p.mockup} priority /></Laptop>
          <SampleTag />
        </Reveal>
      </div>
    </section>
  );
}

/** Centred copy with the product rising out of the fold. */
function CenteredHero({ p }: { p: Product }) {
  return (
    <section className="relative overflow-hidden bg-mist pt-36">
      <div aria-hidden className="hairline-grid absolute inset-0 mask-fade-b" />
      <div className="container-x relative text-center">
        <Reveal><Eyebrow>{p.eyebrow}</Eyebrow></Reveal>
        <div className="mx-auto mt-6 max-w-4xl"><Headline p={p} /></div>
        <Reveal delay={0.15}><p className="mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-muted">{p.sub}</p></Reveal>
        <Actions p={p} center />
        <Reveal delay={0.3} className="mx-auto mt-16 max-w-5xl">
          <BrowserWindow url={`Minute Books · ${p.name}`} className="rounded-b-none"><ModuleScreen mockup={p.mockup} priority /></BrowserWindow>
        </Reveal>
      </div>
    </section>
  );
}

/** Dark, full-bleed product stage. */
function ImmersiveHero({ p }: { p: Product }) {
  return (
    <section className="relative isolate overflow-hidden bg-violet-950 pb-24 pt-36 noise">
      <div aria-hidden className="absolute left-1/2 top-[-20%] -z-10 h-[800px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.5),transparent)]" />
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <Reveal><Eyebrow dark>{p.eyebrow}</Eyebrow></Reveal>
            <div className="mt-6"><Headline p={p} dark /></div>
          </div>
          <div>
            <Reveal delay={0.15}><p className="text-[17px] leading-relaxed text-violet-100/75">{p.sub}</p></Reveal>
            <Actions p={p} dark />
          </div>
        </div>
        <Reveal delay={0.25} className="mt-16">
          <BrowserWindow dark url={`Minute Books · ${p.name}`}><ModuleScreen mockup={p.mockup} priority /></BrowserWindow>
          <SampleTag dark />
        </Reveal>
      </div>
    </section>
  );
}

/** Oversized type, then an offset device beside the capability list. */
function EditorialHero({ p }: { p: Product }) {
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-36">
      <div className="container-x">
        <Reveal><Eyebrow>{p.eyebrow}</Eyebrow></Reveal>
        <div className="mt-6 max-w-5xl"><Headline p={p} /></div>
        <div className="mt-12 grid gap-12 lg:grid-cols-[0.6fr_1.4fr]">
          <div>
            <Reveal delay={0.15}><p className="text-[17px] leading-relaxed text-ink-muted">{p.sub}</p></Reveal>
            <Actions p={p} />
          </div>
          <Reveal delay={0.2} className="min-[1600px]:-mr-28">
            <BrowserWindow url={`Minute Books · ${p.name}`}><ModuleScreen mockup={p.mockup} priority /></BrowserWindow>
            <SampleTag />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const heroes = { split: SplitHero, centered: CenteredHero, immersive: ImmersiveHero, editorial: EditorialHero };

export function ProductCapabilities({ p }: { p: Product }) {
  return (
    <section className="border-y border-line bg-white py-8">
      <ul className="container-x flex flex-wrap justify-center gap-x-7 gap-y-3">
        {p.capabilities.map((c) => (
          <li key={c} className="flex items-center gap-2 text-[14px] text-ink-2"><Check className="size-4 text-violet-600" />{c}</li>
        ))}
      </ul>
      {p.note && <p className="container-x mt-5 text-center text-[12.5px] text-ink-muted">{p.note}</p>}
    </section>
  );
}

export function ProductFeatures({ p }: { p: Product }) {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="What it does" title={`Inside ${p.name}.`} />
        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
          {p.features.map((f) => (
            <StaggerItem key={f.title} className="bg-white p-8">
              <f.icon className="size-6 text-violet-700" strokeWidth={1.7} />
              <h3 className="mt-5 text-[18px] font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{f.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function ProductUseCases({ p }: { p: Product }) {
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow="Where it fits" title="Made for how you work." accent="how you work." />
        <ul className="divide-y divide-line-strong/70">
          {p.useCases.map((u) => (
            <li key={u.title} className="grid gap-1 py-6 first:pt-0 sm:grid-cols-[220px_1fr]">
              <h3 className="text-[18px] font-semibold tracking-tight">{u.title}</h3>
              <p className="text-[15.5px] leading-relaxed text-ink-muted">{u.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProductRelated({ p }: { p: Product }) {
  return (
    <section className="bg-white py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Connected to" title="Works with the rest of Minute Books." accent="the rest of Minute Books." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {p.related.map((slug) => {
            const r = productBySlug(slug);
            if (!r) return null;
            return (
              <Link key={slug} href={`/products/${slug}`} className="group rounded-3xl p-7 ring-1 ring-line transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <r.icon className="size-6 text-violet-700" strokeWidth={1.7} />
                <h3 className="mt-5 text-[18px] font-semibold tracking-tight">{r.name}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-muted">{r.short}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-violet-700">Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProductPage({ p }: { p: Product }) {
  const H = heroes[p.hero];
  return (
    <>
      <H p={p} />
      <ProductCapabilities p={p} />
      <ProductFeatures p={p} />
      <ProductUseCases p={p} />
      <ProductRelated p={p} />
      <FinalCTA />
    </>
  );
}
