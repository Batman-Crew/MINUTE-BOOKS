import { ArrowUpRight, Building2, CircleCheck, Package, TriangleAlert } from "lucide-react";
import { AppShell, AreaChart, Card, Kpi, Meter, Pill, PrimaryBtn, GhostBtn, inr, Spark } from "./primitives";

const week = [182, 214, 196, 248, 231, 286, 274, 318, 296, 342, 331, 388, 362, 412];

/** The hero "whole business" dashboard. All figures are fictional sample data. */
export function DashboardMock() {
  return (
    <AppShell
      active="home"
      title="Good evening, Sample Store"
      subtitle="Here's how the business is doing today · Sample data"
      actions={<><GhostBtn>This week</GhostBtn><PrimaryBtn>+ New invoice</PrimaryBtn></>}
    >
      <div className="grid h-full grid-cols-12 grid-rows-[auto_1fr_auto] gap-4">
        <Kpi className="col-span-3" label="Sales today" value={inr(84250)} delta="12.4%" />
        <Kpi className="col-span-3" label="Revenue · this month" value={inr(1842600)} delta="8.1%" />
        <Kpi className="col-span-3" label="Gross profit" value={inr(412380)} delta="5.6%" />
        <Kpi className="col-span-3" label="Orders" value="1,284" delta="3.2%" />

        <Card className="col-span-8" title="Sales overview" right={<span className="flex items-center gap-3 text-[11px] text-ink-muted"><span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded bg-violet-700" />This period</span><span className="flex items-center gap-1.5"><span className="h-0.5 w-4 border-t-2 border-dashed border-violet-300" />Last period</span></span>}>
          <AreaChart id="dash" width={700} height={230} data={week} compare={week.map((v, i) => v * 0.82 + (i % 3) * 8)} labels={["1 Oct", "4 Oct", "7 Oct", "10 Oct", "14 Oct"]} />
        </Card>

        <Card className="col-span-4" title="Branch performance">
          <ul className="space-y-4">
            {[["Main Branch", 92, 812400], ["Anna Nagar", 74, 596300], ["Velachery", 58, 433900]].map(([b, p, v]) => (
              <li key={b as string}>
                <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                  <span className="flex items-center gap-2 text-ink-2"><Building2 className="size-3.5 text-ink-faint" />{b}</span>
                  <span className="tabular-nums text-ink-muted">{inr(v as number)}</span>
                </div>
                <Meter value={p as number} />
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-xl bg-violet-50 p-3 text-[12px] text-violet-800">
            <p className="font-medium">Insight</p>
            <p className="mt-0.5 text-violet-800/80">Anna Nagar weekend sales are trending above weekdays.</p>
          </div>
        </Card>

        <Card className="col-span-5" title="Inventory insights" right={<Pill tone="warn">6 low stock</Pill>}>
          <ul className="space-y-2.5 text-[12.5px]">
            {[["Basmati Rice 5kg", "12 left", "warn"], ["Filter Coffee 500g", "In stock", "good"], ["Sunflower Oil 1L", "4 left", "bad"]].map(([n, s, t]) => (
              <li key={n} className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-mist"><Package className="size-4 text-ink-muted" /></span>
                <span className="text-ink-2">{n}</span>
                <span className="ml-auto"><Pill tone={t as "warn" | "good" | "bad"}>{t === "good" ? <CircleCheck className="mr-1 size-3" /> : <TriangleAlert className="mr-1 size-3" />}{s}</Pill></span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="col-span-4" title="Recent customers">
          <ul className="space-y-2.5 text-[12.5px]">
            {[["Customer A", 4820], ["Customer B", 12950], ["Customer C", 2310]].map(([n, v], i) => (
              <li key={n as string} className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-200 to-violet-400 text-[11px] font-semibold text-violet-900">{String.fromCharCode(65 + i)}</span>
                <span className="text-ink-2">{n}</span>
                <span className="ml-auto tabular-nums text-ink-muted">{inr(v as number)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="col-span-3" title="Cash & bank">
          <p className="text-[22px] font-semibold tabular-nums tracking-tight">{inr(624180)}</p>
          <div className="mt-2 flex items-center justify-between">
            <Spark data={[40, 46, 44, 52, 50, 61, 58, 66]} />
            <span className="flex items-center text-[11.5px] font-medium text-good"><ArrowUpRight className="size-3.5" />Healthy</span>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

/** Mobile owner app view (390×844 design). */
export function MobileMock() {
  return (
    <div className="h-[844px] w-[390px] bg-[#f7f6fb] font-sans text-ink">
      <div className="bg-gradient-to-br from-violet-800 via-violet-700 to-violet-600 px-6 pb-20 pt-16 text-white">
        <div className="flex items-center justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/minutebooks-mark-white.png" alt="" className="h-7 w-auto" />
          <span className="rounded-full bg-white/15 px-3 py-1 text-[12px]">Main Branch</span>
        </div>
        <p className="mt-8 text-[14px] text-violet-100/80">Today&apos;s sales</p>
        <p className="mt-1 text-[38px] font-semibold tracking-tight">{inr(84250)}</p>
        <p className="mt-1 text-[13px] text-violet-100/80">▲ 12.4% vs last Thursday</p>
      </div>
      <div className="-mt-12 space-y-3 px-4">
        <div className="grid grid-cols-2 gap-3">
          {[["Orders", "142"], ["Avg. bill", inr(593)], ["Profit", inr(19840)], ["Low stock", "6 items"]].map(([l, v]) => (
            <div key={l} className="rounded-2xl bg-white p-4 shadow-[0_6px_20px_-10px_rgb(46_16_101/0.25)] ring-1 ring-line">
              <p className="text-[12px] text-ink-muted">{l}</p>
              <p className="mt-1 text-[19px] font-semibold tabular-nums">{v}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
          <p className="mb-2 text-[13px] font-medium">This week</p>
          <AreaChart id="m" width={326} height={110} data={[18, 22, 19, 26, 24, 31, 34]} labels={["Fri", "Sun", "Tue", "Thu"]} />
        </div>
        <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
          <p className="mb-3 text-[13px] font-medium">Latest activity</p>
          {[["Payment received", "UPI · " + inr(2480), "good"], ["Stock updated", "Filter Coffee +40", "violet"], ["Invoice created", "INV-2041", "gray"]].map(([t, s, tone]) => (
            <div key={t} className="flex items-center gap-3 border-t border-line py-2.5 first:border-0 first:pt-0">
              <span className={`size-2 rounded-full ${tone === "good" ? "bg-good" : tone === "violet" ? "bg-violet-600" : "bg-ink-faint"}`} />
              <div className="text-[13px]"><p className="font-medium">{t}</p><p className="text-[12px] text-ink-muted">{s}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
