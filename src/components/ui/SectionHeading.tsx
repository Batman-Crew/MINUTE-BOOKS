import { cn } from "@/lib/utils";
import { Reveal, TextReveal } from "./Reveal";

export function Eyebrow({ children, className, dark }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-medium uppercase tracking-[0.14em]",
        dark ? "bg-white/8 text-violet-200 ring-1 ring-white/12" : "bg-violet-50 text-violet-700 ring-1 ring-violet-100",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", dark ? "bg-violet-300" : "bg-violet-600")} />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow, title, accent, sub, align = "left", dark, className, as: H = "h2",
}: {
  eyebrow?: string; title: string; accent?: string; sub?: string; align?: "left" | "center";
  dark?: boolean; className?: string; as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <H className={cn("mt-5 text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.02]", dark ? "text-white" : "text-ink")}>
        <TextReveal text={title} accent={accent} accentClassName={dark ? "serif-accent text-gradient-light pr-1" : undefined} />
      </H>
      {sub && (
        <Reveal delay={0.15}>
          <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-violet-100/75" : "text-ink-muted", align === "center" && "mx-auto max-w-2xl")}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
