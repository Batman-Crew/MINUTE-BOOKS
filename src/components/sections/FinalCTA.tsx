import { Mail, Globe } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { TextReveal, Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-violet-700 via-violet-800 to-violet-950 py-28 text-center text-white noise lg:py-40">
      <div aria-hidden className="absolute left-1/2 top-[-30%] -z-10 size-[800px] -translate-x-1/2 rounded-full bg-violet-400/30 blur-[120px]" />
      <div className="container-x">
        <h2 className="mx-auto max-w-4xl text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1]">
          <TextReveal text="Your Business Deserves a Smarter System." accent="a Smarter System." accentClassName="serif-accent text-gradient-light pr-1" />
        </h2>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-[18px] leading-relaxed text-violet-100/80">Discover how Minute Books can simplify the way you manage your business.</p>
        </Reveal>
        <Reveal delay={0.25} className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/demo" variant="light" size="lg" arrow>Book a Demo</ButtonLink>
          <ButtonLink href="/products" variant="outline-light" size="lg">Explore Products</ButtonLink>
          <ButtonLink href="/contact" variant="outline-light" size="lg">Contact Our Team</ButtonLink>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-2 text-[14px] text-violet-100/75">
          <a href={site.url} className="inline-flex items-center gap-2 hover:text-white"><Globe className="size-4" />www.minutebooks.in</a>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-white"><Mail className="size-4" />{site.email}</a>
        </Reveal>
      </div>
    </section>
  );
}
