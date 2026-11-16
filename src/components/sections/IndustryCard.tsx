import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Industry } from "@/lib/industries";
import { industryPhotos } from "@/lib/industry-photos";
import { productBySlug } from "@/lib/products";
import { cn } from "@/lib/utils";

/** Industry photograph with its product detail chip. Falls back to abstract art if no photograph is listed. */
export function IndustryVisual({ industry, className, large }: { industry: Industry; className?: string; large?: boolean }) {
  const [a, b] = industry.tint;
  const Icon = industry.icon;
  const photo = industryPhotos[industry.slug];
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)` }}>
      {photo ? (
        <>
          <Image src={photo.src} alt={photo.alt} fill quality={90} priority={large} sizes={large ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"} className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-violet-950/30 via-transparent to-transparent" />
        </>
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgb(255_255_255/0.35),transparent_45%)]" />
          <div aria-hidden className="hairline-grid absolute inset-0 opacity-40 mix-blend-overlay" />
          <Icon aria-hidden strokeWidth={0.6} className={cn("absolute text-white/25 transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-3", large ? "-right-10 -bottom-16 size-[420px]" : "-right-6 -bottom-10 size-56")} />
        </>
      )}
      <div className={cn("absolute rounded-2xl bg-white/90 shadow-lift backdrop-blur", large ? "bottom-10 left-10 px-5 py-4" : "bottom-5 left-5 px-3.5 py-2.5")}>
        <p className={cn("font-medium text-ink", large ? "text-[15px]" : "text-[12px]")}>{industry.chip}</p>
      </div>
    </div>
  );
}

export function IndustryCard({ industry, className }: { industry: Industry; className?: string }) {
  return (
    <Link href={`/industries/${industry.slug}`} className={cn("group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-lift", className)}>
      <IndustryVisual industry={industry} className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2.5">
          <industry.icon className="size-5 text-violet-700" strokeWidth={1.8} />
          <h3 className="text-[19px] font-semibold tracking-tight">{industry.name}</h3>
        </div>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{industry.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {industry.modules.map((m) => (
            <li key={m} className="rounded-full bg-violet-50 px-2.5 py-1 text-[11.5px] text-violet-800">{productBySlug(m)?.name.replace(" & Bookkeeping", "").replace(" Management", "")}</li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-violet-700">
          Explore solution <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
