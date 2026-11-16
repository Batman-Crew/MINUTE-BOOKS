import { Check, Minus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/brand/Logo";

const rows = [
  ["Disconnected spreadsheets", "Connected business operations"],
  ["Multiple separate applications", "Centralized information"],
  ["Manual stock tracking", "Real-time inventory visibility"],
  ["Limited reporting", "Business analytics"],
  ["Repetitive data entry", "Reduced repetitive work"],
];

export function Comparison() {
  return (
    <section className="bg-white py-28 lg:py-36">
      <div className="container-x">
        <SectionHeading align="center" eyebrow="A better way to work" title="Leave the patchwork behind." accent="the patchwork behind." sub="What changes when your business runs on one connected system instead of spreadsheets and manual processes." />
        <Reveal className="mx-auto mt-14 max-w-4xl">
          <div className="grid overflow-hidden rounded-3xl ring-1 ring-line md:grid-cols-2">
            <div className="bg-mist p-7 sm:p-9">
              <h3 className="text-[15px] font-medium text-ink-muted">Traditional approach</h3>
              <ul className="mt-5">
                {rows.map(([before]) => (
                  <li key={before} className="flex items-center gap-3 border-t border-line py-4 text-[15.5px] text-ink-muted">
                    <Minus className="size-4 shrink-0 text-ink-faint" />{before}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden bg-violet-800 p-7 text-white sm:p-9">
              <div aria-hidden className="absolute -right-20 -top-20 size-72 rounded-full bg-violet-500/50 blur-3xl" />
              <h3 className="relative flex items-center gap-2.5 text-[15px] font-medium"><LogoMark variant="white" className="h-5" />With Minute Books</h3>
              <ul className="relative mt-5">
                {rows.map(([, after]) => (
                  <li key={after} className="flex items-center gap-3 border-t border-white/15 py-4 text-[15.5px] font-medium">
                    <Check className="size-4 shrink-0 text-violet-200" />{after}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
