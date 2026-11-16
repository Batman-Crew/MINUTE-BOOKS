import { cn } from "@/lib/utils";

/** Aluminium laptop. Children fill a 16:10 screen. */
export function Laptop({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative mx-auto w-[88%] rounded-t-[18px] bg-gradient-to-b from-[#2b2840] to-[#14121f] p-[1.6%] pb-[2.2%] shadow-device ring-1 ring-black/40">
        <div className="absolute left-1/2 top-[0.7%] size-[5px] -translate-x-1/2 rounded-full bg-[#3a3650]" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-white">{children}</div>
      </div>
      <div className="relative mx-auto h-[14px] w-full rounded-b-[14px] bg-gradient-to-b from-[#e7e5ef] via-[#cfcbdc] to-[#a9a4bb] shadow-[0_30px_50px_-20px_rgb(46_16_101/0.55)]">
        <div className="absolute left-1/2 top-0 h-[5px] w-[14%] -translate-x-1/2 rounded-b-[8px] bg-[#b6b1c7]" />
      </div>
    </div>
  );
}

/** Modern phone with dynamic island. Children fill a ~19.5:9 screen. */
export function Phone({ children, className, dark = true }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <div
      className={cn(
        "relative rounded-[2.6rem] p-[7px] shadow-device ring-1",
        dark ? "bg-gradient-to-b from-[#2d2a3f] to-[#121019] ring-black/50" : "bg-gradient-to-b from-[#f4f2fa] to-[#d9d5e6] ring-black/10",
        className,
      )}
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.15rem] bg-white">
        {children}
        <div className="pointer-events-none absolute left-1/2 top-[1.4%] h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

/** Tablet in landscape. */
export function Tablet({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative rounded-[1.6rem] bg-gradient-to-b from-[#2d2a3f] to-[#121019] p-[1.2%] shadow-device ring-1 ring-black/50", className)}>
      <div className="relative aspect-[1500/1042] overflow-hidden rounded-[1.05rem] bg-white">{children}</div>
    </div>
  );
}

/** Desktop browser window chrome. */
export function BrowserWindow({
  children, className, url = "Minute Books", dark,
}: { children: React.ReactNode; className?: string; url?: string; dark?: boolean }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl shadow-device ring-1", dark ? "bg-[#1b1630] ring-white/10" : "bg-white ring-line-strong/70", className)}>
      <div className={cn("flex items-center gap-2 border-b px-4 py-2.5", dark ? "border-white/10" : "border-line bg-mist")}>
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <div className={cn("mx-auto flex h-6 w-1/2 max-w-xs items-center justify-center rounded-md text-[10px]", dark ? "bg-white/5 text-white/50" : "bg-white text-ink-faint ring-1 ring-line")}>
          {url}
        </div>
        <span className="w-12" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/** Honest labelling for coded interface previews and demo screenshots. */
export function SampleTag({ children = "Illustrative interface · sample data", className, dark }: { children?: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <p className={cn("mt-4 text-center text-[11px] tracking-wide", dark ? "text-violet-200/50" : "text-ink-faint", className)}>{children}</p>
  );
}
