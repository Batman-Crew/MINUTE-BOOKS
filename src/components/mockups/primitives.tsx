import {
  LayoutDashboard, ScanBarcode, Boxes, BookOpenCheck, ReceiptIndianRupee, UsersRound, Handshake,
  ShoppingCart, ChartNoAxesCombined, Search, Bell, ChevronDown, GraduationCap, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export { ScaleToFit } from "./ScaleToFit";

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

const nav: { key: string; icon: LucideIcon; label: string }[] = [
  { key: "home", icon: LayoutDashboard, label: "Home" },
  { key: "pos", icon: ScanBarcode, label: "POS" },
  { key: "inventory", icon: Boxes, label: "Stock" },
  { key: "accounting", icon: BookOpenCheck, label: "Accounts" },
  { key: "gst", icon: ReceiptIndianRupee, label: "GST" },
  { key: "payroll", icon: UsersRound, label: "People" },
  { key: "crm", icon: Handshake, label: "CRM" },
  { key: "purchase", icon: ShoppingCart, label: "Buying" },
  { key: "analytics", icon: ChartNoAxesCombined, label: "Insights" },
  { key: "education", icon: GraduationCap, label: "Campus" },
];

/** Desktop app chrome at 1280×800. */
export function AppShell({ active, title, subtitle, actions, children }: { active: string; title: string; subtitle?: string; actions?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex h-[800px] w-[1280px] bg-[#f7f6fb] font-sans text-ink">
      <aside className="flex w-[84px] flex-col items-center gap-1 bg-violet-950 py-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/minutebooks-mark-white.png" alt="" className="mb-5 h-8 w-auto" />
        {nav.map((n) => (
          <div key={n.key} className={cn("flex w-[68px] flex-col items-center gap-1 rounded-xl py-2.5 text-[10.5px]", n.key === active ? "bg-violet-600 text-white shadow-[0_8px_20px_-6px_rgb(124_58_237/0.8)]" : "text-violet-200/60")}>
            <n.icon className="size-[18px]" strokeWidth={1.8} />
            {n.label}
          </div>
        ))}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[64px] items-center gap-4 border-b border-line bg-white px-7">
          <div className="flex h-9 w-[340px] items-center gap-2 rounded-lg bg-mist px-3 text-[13px] text-ink-faint ring-1 ring-line">
            <Search className="size-4" /> Search invoices, items, customers…
            <span className="ml-auto rounded bg-white px-1.5 text-[10px] ring-1 ring-line">⌘K</span>
          </div>
          <div className="ml-auto flex items-center gap-2 rounded-lg px-2 py-1 text-[13px] text-ink-2 ring-1 ring-line">
            <span className="size-2 rounded-full bg-good" /> Main Branch <ChevronDown className="size-3.5 text-ink-faint" />
          </div>
          <Bell className="size-[18px] text-ink-muted" />
          <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-800 text-[13px] font-semibold text-white">SB</div>
        </header>
        <div className="flex items-end justify-between px-7 pb-4 pt-6">
          <div>
            <h3 className="text-[22px] font-semibold tracking-tight">{title}</h3>
            {subtitle && <p className="mt-0.5 text-[13px] text-ink-muted">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">{actions}</div>
        </div>
        <div className="min-h-0 flex-1 px-7 pb-7">{children}</div>
      </div>
    </div>
  );
}

export function Card({ className, children, title, right }: { className?: string; children: React.ReactNode; title?: string; right?: React.ReactNode }) {
  return (
    <div className={cn("rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgb(15_11_45/0.04)] ring-1 ring-line", className)}>
      {title && (
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[13px] font-medium text-ink-2">{title}</p>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

export function Kpi({ label, value, delta, up = true, className }: { label: string; value: string; delta?: string; up?: boolean; className?: string }) {
  return (
    <Card className={className}>
      <p className="text-[12px] text-ink-muted">{label}</p>
      <p className="mt-1.5 text-[24px] font-semibold tracking-tight tabular-nums">{value}</p>
      {delta && (
        <p className={cn("mt-1 text-[11.5px] font-medium", up ? "text-good" : "text-bad")}>
          {up ? "▲" : "▼"} {delta} <span className="font-normal text-ink-faint">vs last week</span>
        </p>
      )}
    </Card>
  );
}

export function Pill({ children, tone = "violet" }: { children: React.ReactNode; tone?: "violet" | "good" | "warn" | "bad" | "gray" }) {
  const t = {
    violet: "bg-violet-50 text-violet-700",
    good: "bg-green-50 text-good",
    warn: "bg-amber-50 text-warn",
    bad: "bg-orange-50 text-bad",
    gray: "bg-mist text-ink-muted",
  }[tone];
  return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium", t)}>{children}</span>;
}

export function PrimaryBtn({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex h-9 items-center rounded-lg bg-violet-700 px-4 text-[13px] font-medium text-white shadow-[0_6px_16px_-6px_rgb(101_39_208/0.8)]">{children}</span>;
}
export function GhostBtn({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex h-9 items-center rounded-lg bg-white px-4 text-[13px] font-medium text-ink-2 ring-1 ring-line">{children}</span>;
}

/* ───────────── Charts (single-hue magnitude; thin marks; recessive grid) ───────────── */

function path(points: number[], w: number, h: number, max: number) {
  const step = w / (points.length - 1);
  return points.map((p, i) => `${i ? "L" : "M"}${(i * step).toFixed(1)},${(h - (p / max) * h).toFixed(1)}`).join(" ");
}

export function AreaChart({ data, labels, width = 620, height = 200, id = "a", compare }: { data: number[]; labels?: string[]; width?: number; height?: number; id?: string; compare?: number[] }) {
  const max = Math.max(...data, ...(compare ?? [])) * 1.15;
  const d = path(data, width, height, max);
  const lastX = width, lastY = height - (data[data.length - 1] / max) * height;
  return (
    <svg width={width} height={height + 22} viewBox={`0 0 ${width} ${height + 22}`} className="overflow-visible">
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7c3aed" stopOpacity="0.22" />
          <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1="0" x2={width} y1={height * f} y2={height * f} stroke="#ece9f5" strokeDasharray={f === 1 ? "0" : "3 4"} />
      ))}
      {compare && <path d={path(compare, width, height, max)} fill="none" stroke="#c3b0fe" strokeWidth="2" strokeDasharray="4 4" />}
      <path d={`${d} L${width},${height} L0,${height} Z`} fill={`url(#g-${id})`} />
      <path d={d} fill="none" stroke="#6d28d9" strokeWidth="2.25" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lastX} cy={lastY} r="5" fill="#6d28d9" stroke="white" strokeWidth="2.5" />
      {labels?.map((l, i) => (
        <text key={l} x={(i * width) / (labels.length - 1)} y={height + 18} fontSize="10.5" fill="#8d8aa6" textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"}>
          {l}
        </text>
      ))}
    </svg>
  );
}

export function Bars({ data, labels, width = 300, height = 140, highlight }: { data: number[]; labels?: string[]; width?: number; height?: number; highlight?: number }) {
  const max = Math.max(...data) * 1.1;
  const gap = 2 + width / data.length / 3;
  const bw = width / data.length - gap;
  return (
    <svg width={width} height={height + 20} viewBox={`0 0 ${width} ${height + 20}`}>
      <line x1="0" x2={width} y1={height} y2={height} stroke="#e9e6f5" />
      {data.map((v, i) => {
        const h = (v / max) * height;
        const x = i * (bw + gap) + gap / 2;
        return (
          <g key={i}>
            <path
              d={`M${x},${height} L${x},${height - h + 4} Q${x},${height - h} ${x + 4},${height - h} L${x + bw - 4},${height - h} Q${x + bw},${height - h} ${x + bw},${height - h + 4} L${x + bw},${height} Z`}
              fill={highlight === undefined || highlight === i ? "#6d28d9" : "#ddd2ff"}
            />
            {labels && <text x={x + bw / 2} y={height + 15} fontSize="10" fill="#8d8aa6" textAnchor="middle">{labels[i]}</text>}
          </g>
        );
      })}
    </svg>
  );
}

const SERIES = ["#6d28d9", "#0d9488", "#d97706", "#db2777"];

export function Donut({ parts, size = 140, stroke = 18, center }: { parts: { label: string; value: number }[]; size?: number; stroke?: number; center?: React.ReactNode }) {
  const total = parts.reduce((s, p) => s + p.value, 0);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const lengths = parts.map((p) => (p.value / total) * c);
  const offsets = lengths.map((_, i) => lengths.slice(0, i).reduce((s, l) => s + l, 0));
  return (
    <div className="flex items-center gap-5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {parts.map((p, i) => (
            <circle key={p.label} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={SERIES[i]} strokeWidth={stroke}
              strokeDasharray={`${Math.max(lengths[i] - 3, 0)} ${c}`} strokeDashoffset={-offsets[i]} />
          ))}
        </svg>
        {center && <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{center}</div>}
      </div>
      <ul className="space-y-2">
        {parts.map((p, i) => (
          <li key={p.label} className="flex items-center gap-2 text-[12px] text-ink-2">
            <span className="size-2.5 rounded-[3px]" style={{ background: SERIES[i] }} />
            {p.label}
            <span className="ml-auto pl-3 tabular-nums text-ink-muted">{Math.round((p.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Spark({ data, width = 90, height = 28, color = "#6d28d9" }: { data: number[]; width?: number; height?: number; color?: string }) {
  const max = Math.max(...data) * 1.1;
  return (
    <svg width={width} height={height}>
      <path d={path(data, width, height, max)} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Meter({ value, tone = "violet" }: { value: number; tone?: "violet" | "warn" | "bad" }) {
  const c = { violet: "bg-violet-600", warn: "bg-warn", bad: "bg-bad" }[tone];
  return (
    <div className="h-1.5 w-full rounded-full bg-violet-50">
      <div className={cn("h-full rounded-full", c)} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}
