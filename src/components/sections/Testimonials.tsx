import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { testimonials, type Testimonial } from "@/lib/testimonials";

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-line">
      <Quote className="size-6 text-violet-300" />
      <blockquote className="mt-4 flex-1 text-[16px] leading-relaxed text-ink-2">{t.quote}</blockquote>
      <figcaption className="mt-6 border-t border-line pt-4 text-[14px]">
        <p className="font-medium">{t.name}</p>
        <p className="text-ink-muted">{t.role} · {t.company}</p>
      </figcaption>
      {t.placeholder && <p className="mt-3 w-fit rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-warn">Placeholder: not a real testimonial</p>}
    </figure>
  );
}

export function Testimonials() {
  return (
    <section className="bg-mist py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Customer experience" title="In our customers' words." accent="customers' words." />
        <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => <StaggerItem key={i}><TestimonialCard t={t} /></StaggerItem>)}
        </Stagger>
      </div>
    </section>
  );
}
