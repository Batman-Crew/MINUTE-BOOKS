import { Coffee, Salad, Croissant, CupSoda, Sandwich, Citrus, CakeSlice, Cookie, ScanBarcode, Minus, Plus, Printer, CreditCard, Banknote, Smartphone, TriangleAlert, Warehouse, FileCheck2, Truck, Download, CalendarDays, Phone, Building2 } from "lucide-react";
import { AppShell, AreaChart, Bars, Card, Donut, GhostBtn, Kpi, Meter, Pill, PrimaryBtn, inr, Spark } from "./primitives";
import { cn } from "@/lib/utils";

/* ───────── Smart POS ───────── */
const posItems = [
  ["Filter Coffee", 40, Coffee], ["Masala Dosa", 90, Salad], ["Veg Puff", 30, Croissant], ["Cold Coffee", 120, CupSoda],
  ["Paneer Roll", 140, Sandwich], ["Lemon Soda", 50, Citrus], ["Brownie", 110, CakeSlice], ["Samosa (2)", 40, Cookie],
] as const;

export function PosMock() {
  const cart = [["Filter Coffee", 2, 40], ["Masala Dosa", 1, 90], ["Brownie", 1, 110], ["Cold Coffee", 2, 120]] as const;
  const sub = cart.reduce((s, [, q, p]) => s + q * p, 0);
  const tax = Math.round(sub * 0.05);
  return (
    <AppShell active="pos" title="Counter 1" subtitle="POS session open since 9:02 AM · Sample data" actions={<><GhostBtn>Hold bill</GhostBtn><PrimaryBtn>Close session</PrimaryBtn></>}>
      <div className="grid h-full grid-cols-[1fr_380px] gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex h-12 items-center gap-3 rounded-xl bg-white px-4 text-[14px] text-ink-faint ring-2 ring-violet-500/60">
            <ScanBarcode className="size-5 text-violet-600" /> Scan barcode or search item…
            <span className="ml-auto rounded-md bg-violet-50 px-2 py-0.5 text-[11px] font-medium text-violet-700">Scanner ready</span>
          </div>
          <div className="flex gap-2 text-[12.5px]">
            {["All", "Beverages", "Breakfast", "Snacks", "Desserts"].map((c, i) => (
              <span key={c} className={cn("rounded-full px-3.5 py-1.5", i === 0 ? "bg-ink text-white" : "bg-white text-ink-2 ring-1 ring-line")}>{c}</span>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-4 gap-3">
            {posItems.map(([n, p, Icon], i) => (
              <div key={n} className={cn("flex flex-col rounded-2xl bg-white p-4 ring-1 ring-line", i === 0 && "ring-2 ring-violet-500")}>
                <span className="flex size-12 items-center justify-center rounded-xl bg-violet-50 text-violet-700"><Icon className="size-6" strokeWidth={1.6} /></span>
                <p className="mt-auto pt-3 text-[13.5px] font-medium">{n}</p>
                <p className="text-[13px] tabular-nums text-ink-muted">{inr(p)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-line">
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-semibold">Current bill</p>
            <Pill>Walk-in customer</Pill>
          </div>
          <ul className="mt-4 space-y-3">
            {cart.map(([n, q, p]) => (
              <li key={n} className="flex items-center gap-3 text-[13px]">
                <div className="flex-1"><p className="font-medium">{n}</p><p className="text-[12px] text-ink-faint">{inr(p)} each</p></div>
                <div className="flex items-center gap-2 rounded-lg bg-mist px-1.5 py-1">
                  <Minus className="size-3.5 text-ink-muted" /><span className="w-4 text-center tabular-nums">{q}</span><Plus className="size-3.5 text-ink-muted" />
                </div>
                <span className="w-16 text-right tabular-nums">{inr(q * p)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-1.5 border-t border-dashed border-line-strong pt-4 text-[13px]">
            <div className="flex justify-between text-ink-muted"><span>Subtotal</span><span className="tabular-nums">{inr(sub)}</span></div>
            <div className="flex justify-between text-ink-muted"><span>CGST 2.5% + SGST 2.5%</span><span className="tabular-nums">{inr(tax)}</span></div>
            <div className="flex justify-between pt-1 text-[18px] font-semibold"><span>Total</span><span className="tabular-nums">{inr(sub + tax)}</span></div>
          </div>
          <p className="mt-4 text-[12px] font-medium text-ink-muted">Split payment</p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-[12px]">
            {[[Banknote, "Cash", 200], [Smartphone, "UPI", sub + tax - 200], [CreditCard, "Card", 0]].map(([I, l, v]) => {
              const Icon = I as typeof Banknote;
              return (
                <div key={l as string} className={cn("rounded-xl p-2.5 ring-1", (v as number) > 0 ? "bg-violet-50 ring-violet-300" : "ring-line")}>
                  <Icon className="size-4 text-violet-700" />
                  <p className="mt-1 text-ink-2">{l as string}</p>
                  <p className="tabular-nums font-medium">{inr(v as number)}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-700 text-[14px] font-medium text-white">
            <Printer className="size-4" /> Pay & print receipt
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ───────── Inventory ───────── */
export function InventoryMock() {
  const rows = [
    ["Basmati Rice 5kg", "RICE-05", "Main Branch", 12, 40, "B-2210"],
    ["Sunflower Oil 1L", "OIL-01", "Anna Nagar", 4, 30, "B-1874"],
    ["Filter Coffee 500g", "COF-500", "Main Branch", 86, 25, "B-2291"],
    ["Toor Dal 1kg", "DAL-01", "Velachery", 54, 35, "B-2017"],
    ["Paracetamol 500mg", "MED-PCM", "Main Branch", 140, 60, "B-118"],
    ["Notebook A5", "STN-A5", "Godown", 320, 100, "—"],
  ] as const;
  return (
    <AppShell active="inventory" title="Stock" subtitle="All locations · updated live · Sample data" actions={<><GhostBtn>Stock transfer</GhostBtn><PrimaryBtn>+ Stock entry</PrimaryBtn></>}>
      <div className="grid h-full grid-cols-12 grid-rows-[auto_1fr] gap-4">
        <Kpi className="col-span-3" label="Stock value" value={inr(2846900)} />
        <Kpi className="col-span-3" label="Items in stock" value="1,942" />
        <Card className="col-span-3"><p className="text-[12px] text-ink-muted">Below reorder level</p><p className="mt-1.5 flex items-center gap-2 text-[24px] font-semibold"><TriangleAlert className="size-5 text-warn" />6</p><p className="mt-1 text-[11.5px] text-ink-faint">2 critical</p></Card>
        <Card className="col-span-3"><p className="text-[12px] text-ink-muted">Locations</p><p className="mt-1.5 flex items-center gap-2 text-[24px] font-semibold"><Warehouse className="size-5 text-violet-600" />4</p><p className="mt-1 text-[11.5px] text-ink-faint">3 branches · 1 godown</p></Card>
        <Card className="col-span-8 !p-0 overflow-hidden">
          <table className="w-full text-left text-[12.5px]">
            <thead className="bg-mist text-[11.5px] text-ink-muted">
              <tr>{["Item", "Location", "Batch", "In stock", "Reorder at", "Level"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map(([n, c, l, q, r, b]) => {
                const pct = Math.min(100, (q / (r * 2.5)) * 100);
                const tone = q < r * 0.3 ? "bad" : q < r ? "warn" : "violet";
                return (
                  <tr key={c} className="border-t border-line">
                    <td className="px-4 py-3"><p className="font-medium">{n}</p><p className="text-[11px] text-ink-faint">{c}</p></td>
                    <td className="px-4 py-3 text-ink-2">{l}</td>
                    <td className="px-4 py-3 font-mono text-[11.5px] text-ink-muted">{b}</td>
                    <td className="px-4 py-3 tabular-nums font-medium">{q}</td>
                    <td className="px-4 py-3 tabular-nums text-ink-muted">{r}</td>
                    <td className="w-36 px-4 py-3"><Meter value={pct} tone={tone as "violet" | "warn" | "bad"} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
        <div className="col-span-4 flex flex-col gap-4">
          <Card title="Stock movement · 7 days">
            <Bars width={300} height={110} data={[42, 58, 51, 66, 49, 72, 64]} labels={["M", "T", "W", "T", "F", "S", "S"]} highlight={5} />
          </Card>
          <Card title="Low-stock alerts" className="flex-1">
            {[["Sunflower Oil 1L", "4 left · Anna Nagar"], ["Basmati Rice 5kg", "12 left · Main"]].map(([n, s]) => (
              <div key={n} className="flex items-center gap-3 border-t border-line py-2.5 first:border-0 first:pt-0 text-[12.5px]">
                <TriangleAlert className="size-4 text-warn" />
                <div><p className="font-medium">{n}</p><p className="text-[11.5px] text-ink-muted">{s}</p></div>
                <span className="ml-auto rounded-md bg-violet-700 px-2 py-1 text-[11px] font-medium text-white">Reorder</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

/* ───────── Accounting ───────── */
export function AccountingMock() {
  const pl = [["Sales", 1842600, 0], ["Cost of goods sold", -1124300, 1], ["Gross profit", 718300, 2], ["Operating expenses", -305920, 1], ["Net profit", 412380, 2]] as const;
  return (
    <AppShell active="accounting" title="Financial overview" subtitle="FY 2026–27 · October · Sample data" actions={<><GhostBtn>Journal entry</GhostBtn><PrimaryBtn>Reconcile bank</PrimaryBtn></>}>
      <div className="grid h-full grid-cols-12 grid-rows-[auto_1fr] gap-4">
        <Kpi className="col-span-3" label="Net profit · month" value={inr(412380)} delta="5.6%" />
        <Kpi className="col-span-3" label="Receivables" value={inr(386400)} />
        <Kpi className="col-span-3" label="Payables" value={inr(214750)} />
        <Kpi className="col-span-3" label="Cash & bank" value={inr(624180)} />
        <Card className="col-span-5" title="Profit & loss" right={<Pill tone="gray">October</Pill>}>
          <ul className="text-[13px]">
            {pl.map(([l, v, k]) => (
              <li key={l} className={cn("flex justify-between py-2.5", k === 2 ? "border-t border-line font-semibold" : "text-ink-2")}>
                <span>{l}</span><span className={cn("tabular-nums", v < 0 && "text-ink-muted")}>{v < 0 ? `(${inr(-v)})` : inr(v)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3"><Meter value={22.4 * 3} /></div>
          <p className="mt-2 text-[11.5px] text-ink-muted">Net margin 22.4%</p>
        </Card>
        <div className="col-span-7 flex flex-col gap-4">
          <Card title="General ledger · recent entries">
            <table className="w-full text-[12.5px]">
              <thead className="text-[11px] text-ink-faint"><tr>{["Date", "Voucher", "Account", "Debit", "Credit"].map((h, i) => <th key={h} className={cn("pb-2 font-medium", i > 2 ? "text-right" : "text-left")}>{h}</th>)}</tr></thead>
              <tbody>
                {[["30 Oct", "SINV-2041", "Sales", "", 4820], ["30 Oct", "SINV-2041", "Debtors", 4820, ""], ["29 Oct", "PINV-0388", "Purchases", 18400, ""], ["29 Oct", "JV-0112", "Rent", 35000, ""], ["29 Oct", "PAY-0451", "HDFC Bank", "", 35000]].map(([d, v, a, dr, cr], i) => (
                  <tr key={i} className="border-t border-line">
                    <td className="py-2 text-ink-muted">{d}</td>
                    <td className="py-2 font-mono text-[11.5px] text-violet-700">{v}</td>
                    <td className="py-2">{a}</td>
                    <td className="py-2 text-right tabular-nums">{dr ? inr(dr as number) : "—"}</td>
                    <td className="py-2 text-right tabular-nums">{cr ? inr(cr as number) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card title="Bank reconciliation · HDFC Bank" className="flex-1" right={<Pill tone="good">38 of 41 matched</Pill>}>
            <Meter value={92} />
            <div className="mt-3 grid grid-cols-3 gap-3 text-[12px]">
              {[["Statement balance", inr(482610)], ["Book balance", inr(478110)], ["Unreconciled", inr(4500)]].map(([l, v]) => (
                <div key={l} className="rounded-xl bg-mist p-3"><p className="text-ink-muted">{l}</p><p className="mt-1 font-semibold tabular-nums">{v}</p></div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

/* ───────── GST ───────── */
export function GstMock() {
  return (
    <AppShell active="gst" title="GST summary" subtitle="October 2026 · GSTIN 33XXXXX1234X1ZX · Sample data" actions={<><GhostBtn><Download className="mr-1.5 size-3.5" />Export</GhostBtn><PrimaryBtn>View GSTR-1</PrimaryBtn></>}>
      <div className="grid h-full grid-cols-12 grid-rows-[auto_1fr] gap-4">
        <Kpi className="col-span-3" label="Output tax" value={inr(98420)} />
        <Kpi className="col-span-3" label="Input tax credit" value={inr(61280)} />
        <Kpi className="col-span-3" label="Net payable" value={inr(37140)} />
        <Card className="col-span-3"><p className="text-[12px] text-ink-muted">Return status</p><div className="mt-2 space-y-1.5 text-[12.5px]"><div className="flex justify-between"><span>GSTR-1</span><Pill tone="good">Data ready</Pill></div><div className="flex justify-between"><span>GSTR-3B</span><Pill tone="warn">Review</Pill></div></div></Card>
        <Card className="col-span-5" title="Tax breakdown">
          <Donut size={150} parts={[{ label: "CGST", value: 34210 }, { label: "SGST", value: 34210 }, { label: "IGST", value: 28400 }, { label: "Cess", value: 1600 }]} center={<><p className="text-[11px] text-ink-muted">Output</p><p className="text-[15px] font-semibold">{inr(98420)}</p></>} />
          <div className="mt-5 space-y-2 text-[12.5px]">
            {[["5%", 214800], ["12%", 386200], ["18%", 612400]].map(([r, v]) => (
              <div key={r as string} className="flex items-center gap-3"><span className="w-10 text-ink-muted">{r}</span><div className="flex-1"><Meter value={((v as number) / 612400) * 100} /></div><span className="w-24 text-right tabular-nums">{inr(v as number)}</span></div>
            ))}
          </div>
        </Card>
        <Card className="col-span-7 !p-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-5"><p className="text-[13px] font-medium text-ink-2">Recent invoices</p><Pill tone="gray">B2B · B2C</Pill></div>
          <table className="mt-3 w-full text-[12.5px]">
            <thead className="bg-mist text-[11px] text-ink-muted"><tr>{["Invoice", "Party", "Taxable", "GST", "E-invoice", "E-way bill"].map((h) => <th key={h} className="px-5 py-2.5 text-left font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {[["SINV-2041", "Customer A", 48200, 8676, "IRN generated", "Generated"], ["SINV-2040", "Customer B", 12600, 2268, "IRN generated", "—"], ["SINV-2039", "Walk-in (B2C)", 2310, 116, "Not required", "—"], ["SINV-2038", "Customer C", 86400, 15552, "Pending", "Pending"]].map(([i, p, t, g, e, w]) => (
                <tr key={i as string} className="border-t border-line">
                  <td className="px-5 py-3 font-mono text-[11.5px] text-violet-700">{i}</td>
                  <td className="px-5 py-3">{p}</td>
                  <td className="px-5 py-3 tabular-nums">{inr(t as number)}</td>
                  <td className="px-5 py-3 tabular-nums">{inr(g as number)}</td>
                  <td className="px-5 py-3"><Pill tone={e === "Pending" ? "warn" : e === "Not required" ? "gray" : "good"}>{e === "IRN generated" && <FileCheck2 className="mr-1 size-3" />}{e}</Pill></td>
                  <td className="px-5 py-3"><Pill tone={w === "Pending" ? "warn" : w === "—" ? "gray" : "good"}>{w === "Generated" && <Truck className="mr-1 size-3" />}{w}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </AppShell>
  );
}

/* ───────── Payroll ───────── */
export function PayrollMock() {
  const people = [["Employee 01", "Store Manager", 42000], ["Employee 02", "Cashier", 21500], ["Employee 03", "Chef", 28000], ["Employee 04", "Accountant", 34500], ["Employee 05", "Sales Executive", 24000]] as const;
  return (
    <AppShell active="payroll" title="Payroll · October 2026" subtitle="24 employees · 3 branches · Sample data" actions={<><GhostBtn>Salary structures</GhostBtn><PrimaryBtn>Submit payroll</PrimaryBtn></>}>
      <div className="grid h-full grid-cols-12 grid-rows-[auto_1fr] gap-4">
        <Kpi className="col-span-3" label="Gross pay" value={inr(684200)} />
        <Kpi className="col-span-3" label="Deductions" value={inr(58340)} />
        <Kpi className="col-span-3" label="Net pay" value={inr(625860)} />
        <Card className="col-span-3"><p className="text-[12px] text-ink-muted">Run progress</p><p className="mt-1.5 text-[24px] font-semibold">Step 3 / 4</p><div className="mt-2"><Meter value={75} /></div></Card>
        <Card className="col-span-7 !p-0 overflow-hidden">
          <table className="w-full text-[12.5px]">
            <thead className="bg-mist text-[11px] text-ink-muted"><tr>{["Employee", "Designation", "Gross", "Deductions", "Net", ""].map((h) => <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {people.map(([n, d, g], i) => (
                <tr key={n} className={cn("border-t border-line", i === 0 && "bg-violet-25")}>
                  <td className="px-5 py-3"><div className="flex items-center gap-2.5"><span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-200 to-violet-400 text-[11px] font-semibold text-violet-900">E{i + 1}</span><span className="font-medium">{n}</span></div></td>
                  <td className="px-5 py-3 text-ink-muted">{d}</td>
                  <td className="px-5 py-3 tabular-nums">{inr(g)}</td>
                  <td className="px-5 py-3 tabular-nums text-ink-muted">{inr(Math.round(g * 0.085))}</td>
                  <td className="px-5 py-3 tabular-nums font-medium">{inr(Math.round(g * 0.915))}</td>
                  <td className="px-5 py-3"><Pill tone="good">Ready</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card className="col-span-5">
          <div className="flex items-center justify-between">
            <div><p className="text-[11px] uppercase tracking-wider text-ink-faint">Payslip</p><p className="text-[16px] font-semibold">Employee 01 · Oct 2026</p></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/minutebooks-mark.png" alt="" className="h-7 w-auto" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-5 text-[12.5px]">
            <div>
              <p className="mb-2 font-medium text-ink-2">Earnings</p>
              {[["Basic", 21000], ["HRA", 10500], ["Special allowance", 10500]].map(([l, v]) => <div key={l} className="flex justify-between py-1 text-ink-muted"><span>{l}</span><span className="tabular-nums text-ink">{inr(v as number)}</span></div>)}
            </div>
            <div>
              <p className="mb-2 font-medium text-ink-2">Deductions</p>
              {[["PF (configured)", 2520], ["Professional tax", 208], ["TDS", 840]].map(([l, v]) => <div key={l} className="flex justify-between py-1 text-ink-muted"><span>{l}</span><span className="tabular-nums text-ink">{inr(v as number)}</span></div>)}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-violet-700 px-4 py-3 text-white"><span className="text-[13px]">Net pay</span><span className="text-[18px] font-semibold tabular-nums">{inr(38432)}</span></div>
          <p className="mt-3 text-[11.5px] text-ink-faint">Posted to accounts on submission · Salary payable</p>
        </Card>
      </div>
    </AppShell>
  );
}

/* ───────── CRM ───────── */
export function CrmMock() {
  const stages = [
    ["Lead", "bg-ink-faint", [["Sample Traders", 48000], ["Prospect 12", 22000], ["Prospect 18", 15500]]],
    ["Qualified", "bg-violet-400", [["Prospect 07", 86000], ["Prospect 21", 31000]]],
    ["Quotation", "bg-violet-600", [["Prospect 03", 124000], ["Prospect 15", 56000]]],
    ["Won", "bg-good", [["Customer B", 92000]]],
  ] as const;
  return (
    <AppShell active="crm" title="Sales pipeline" subtitle="Open opportunities · Sample data" actions={<><GhostBtn>Leads</GhostBtn><PrimaryBtn>+ New quotation</PrimaryBtn></>}>
      <div className="grid h-full grid-cols-[1fr_300px] gap-4">
        <div className="grid grid-cols-4 gap-3">
          {stages.map(([s, c, cards]) => (
            <div key={s} className="flex flex-col gap-3 rounded-2xl bg-white/60 p-3 ring-1 ring-line">
              <div className="flex items-center gap-2 px-1 text-[12.5px] font-medium"><span className={cn("size-2 rounded-full", c)} />{s}<span className="ml-auto text-ink-faint">{cards.length}</span></div>
              {cards.map(([n, v], i) => (
                <div key={n} className={cn("rounded-xl bg-white p-3.5 shadow-[0_1px_2px_rgb(15_11_45/0.05)] ring-1 ring-line", s === "Quotation" && i === 0 && "ring-2 ring-violet-500 shadow-[0_12px_30px_-12px_rgb(101_39_208/0.5)]")}>
                  <p className="text-[13px] font-medium">{n}</p>
                  <p className="mt-0.5 text-[12px] tabular-nums text-ink-muted">{inr(v)}</p>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-ink-faint"><CalendarDays className="size-3.5" /> Follow-up · {["Today", "Tomorrow", "Fri", "Mon"][(i + n.length) % 4]}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <Card title="Prospect 03">
            <div className="flex items-center gap-3 text-[12.5px]"><span className="flex size-10 items-center justify-center rounded-xl bg-violet-100"><Building2 className="size-5 text-violet-700" /></span><div><p className="font-medium">Wholesale · Chennai</p><p className="text-ink-muted">Quotation QTN-0214</p></div></div>
            <div className="mt-4 space-y-3 border-l-2 border-violet-100 pl-4 text-[12px]">
              {[["Quotation sent", "28 Oct"], ["Demo completed", "24 Oct"], ["Call · requirements", "21 Oct"], ["Lead created", "19 Oct"]].map(([t, d], i) => (
                <div key={t} className="relative"><span className={cn("absolute -left-[21px] top-1 size-2.5 rounded-full ring-2 ring-white", i === 0 ? "bg-violet-600" : "bg-violet-200")} /><p className="font-medium text-ink-2">{t}</p><p className="text-ink-faint">{d}</p></div>
              ))}
            </div>
          </Card>
          <Card title="Today's follow-ups" className="flex-1">
            {["Prospect 12", "Sample Traders"].map((n) => <div key={n} className="flex items-center gap-2.5 py-1.5 text-[12.5px]"><Phone className="size-3.5 text-violet-600" />{n}<Pill tone="violet">Call</Pill></div>)}
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

/* ───────── Purchase ───────── */
export function PurchaseMock() {
  return (
    <AppShell active="purchase" title="Purchasing" subtitle="Orders, receipts and supplier dues · Sample data" actions={<><GhostBtn>Suppliers</GhostBtn><PrimaryBtn>+ Purchase order</PrimaryBtn></>}>
      <div className="grid h-full grid-cols-12 grid-rows-[auto_1fr] gap-4">
        <Kpi className="col-span-4" label="Purchases · this month" value={inr(1124300)} />
        <Kpi className="col-span-4" label="Open purchase orders" value="9" />
        <Kpi className="col-span-4" label="Supplier outstanding" value={inr(214750)} />
        <Card className="col-span-7 !p-0 overflow-hidden">
          <table className="w-full text-[12.5px]">
            <thead className="bg-mist text-[11px] text-ink-muted"><tr>{["PO", "Supplier", "Items", "Amount", "Status"].map((h) => <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {[["PO-0388", "Supplier A", 14, 184200, "Received", "good"], ["PO-0389", "Supplier B", 6, 42600, "Partly received", "warn"], ["PO-0390", "Supplier C", 22, 268900, "To receive", "violet"], ["PO-0391", "Supplier A", 3, 18400, "Draft", "gray"], ["PO-0392", "Supplier D", 9, 76300, "To receive", "violet"]].map(([p, s, i, a, st, t]) => (
                <tr key={p as string} className="border-t border-line">
                  <td className="px-5 py-3 font-mono text-[11.5px] text-violet-700">{p}</td><td className="px-5 py-3">{s}</td><td className="px-5 py-3 tabular-nums text-ink-muted">{i}</td>
                  <td className="px-5 py-3 tabular-nums">{inr(a as number)}</td><td className="px-5 py-3"><Pill tone={t as "good"}>{st}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <div className="col-span-5 flex flex-col gap-4">
          <Card title="Supplier outstanding">
            {[["Supplier A", 98400, 8], ["Supplier C", 72150, 21], ["Supplier B", 44200, 34]].map(([s, v, d]) => (
              <div key={s as string} className="py-2 text-[12.5px]">
                <div className="mb-1.5 flex justify-between"><span>{s}</span><span className="tabular-nums">{inr(v as number)}</span></div>
                <div className="flex items-center gap-3"><Meter value={((v as number) / 98400) * 100} tone={(d as number) > 30 ? "warn" : "violet"} /><span className="w-20 shrink-0 text-right text-[11px] text-ink-faint">{d} days</span></div>
              </div>
            ))}
          </Card>
          <Card title="Purchases · 6 months" className="flex-1">
            <Bars width={420} height={100} data={[82, 96, 88, 104, 98, 112]} labels={["May", "Jun", "Jul", "Aug", "Sep", "Oct"]} highlight={5} />
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

/* ───────── Analytics ───────── */
export function AnalyticsMock() {
  return (
    <AppShell active="analytics" title="Business insights" subtitle="All branches · last 90 days · Sample data" actions={<><GhostBtn>90 days</GhostBtn><PrimaryBtn>Share report</PrimaryBtn></>}>
      <div className="grid h-full grid-cols-12 grid-rows-[auto_1fr_1fr] gap-4">
        {[["Revenue", inr(5284100), [30, 34, 33, 38, 41, 40, 46]], ["Gross margin", "38.9%", [36, 37, 37, 38, 38, 39, 39]], ["Repeat customers", "41%", [32, 34, 35, 37, 38, 40, 41]], ["Avg. bill value", inr(593), [520, 548, 540, 566, 571, 582, 593]]].map(([l, v, s]) => (
          <Card key={l as string} className="col-span-3">
            <p className="text-[12px] text-ink-muted">{l as string}</p>
            <div className="mt-1.5 flex items-end justify-between"><p className="text-[22px] font-semibold tabular-nums tracking-tight">{v as string}</p><Spark data={s as number[]} width={70} /></div>
          </Card>
        ))}
        <Card className="col-span-8 row-span-1" title="Revenue trend · weekly">
          <AreaChart id="an" width={700} height={150} data={[310, 342, 328, 366, 391, 374, 402, 436, 418, 452, 471, 498, 486]} labels={["Aug", "Sep", "Oct"]} />
        </Card>
        <Card className="col-span-4" title="Sales by channel">
          <Donut size={128} stroke={16} parts={[{ label: "Counter POS", value: 52 }, { label: "QR orders", value: 21 }, { label: "Wholesale", value: 19 }, { label: "Other", value: 8 }]} />
        </Card>
        <Card className="col-span-5" title="Top products by profit">
          {[["Filter Coffee 500g", 92], ["Basmati Rice 5kg", 78], ["Cold Coffee", 64], ["Paneer Roll", 51]].map(([n, v]) => (
            <div key={n as string} className="flex items-center gap-3 py-1.5 text-[12.5px]"><span className="w-36 truncate">{n}</span><div className="flex-1"><Meter value={v as number} /></div></div>
          ))}
        </Card>
        <Card className="col-span-7" title="Branch comparison · revenue (₹ lakh)">
          <div className="flex items-end gap-8">
            <Bars width={380} height={95} data={[28.4, 21.1, 15.6, 8.2]} labels={["Main", "Anna Nagar", "Velachery", "Online"]} highlight={0} />
            <div className="space-y-2 text-[12px] text-ink-muted"><p><span className="font-semibold text-ink">Main Branch</span> leads on revenue</p><p><span className="font-semibold text-ink">Anna Nagar</span> grows fastest</p></div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

/* ───────── School & College ───────── */
function EducationMock({ title, subtitle, action, group, kpis, students, schedule }: {
  title: string;
  subtitle: string;
  action: string;
  group: string;
  kpis: [string, string][];
  students: [string, string, number, "Paid" | "Part paid" | "Due"][];
  schedule: [string, string][];
}) {
  const tone = { Paid: "good", "Part paid": "warn", Due: "bad" } as const;
  return (
    <AppShell active="education" title={title} subtitle={subtitle} actions={<><GhostBtn>Attendance</GhostBtn><PrimaryBtn>{action}</PrimaryBtn></>}>
      <div className="grid h-full grid-cols-12 grid-rows-[auto_1fr] gap-4">
        {kpis.map(([label, value]) => <Kpi key={label} className="col-span-3" label={label} value={value} />)}
        <Card className="col-span-8 !p-0 overflow-hidden">
          <table className="w-full text-[12.5px]">
            <thead className="bg-mist text-[11px] text-ink-muted"><tr>{["Student", group, "Fee", "Status"].map((h) => <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {students.map(([name, cls, fee, status]) => (
                <tr key={name} className="border-t border-line">
                  <td className="px-5 py-3 font-medium">{name}</td>
                  <td className="px-5 py-3 text-ink-muted">{cls}</td>
                  <td className="px-5 py-3 tabular-nums">{inr(fee)}</td>
                  <td className="px-5 py-3"><Pill tone={tone[status]}>{status}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card className="col-span-4" title="Today">
          <div className="space-y-3 text-[12.5px]">
            {schedule.map(([time, item]) => (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-mist px-3 py-2.5">
                <span className="w-14 shrink-0 tabular-nums text-ink-muted">{time}</span>
                <span className="font-medium text-ink-2">{item}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

export function SchoolMock() {
  return (
    <EducationMock
      title="School overview"
      subtitle="Term 2 · Sample data"
      action="Collect fee"
      group="Class"
      kpis={[["Students", "842"], ["Present today", "94%"], ["Fees collected", inr(1845000)], ["Fees due", inr(236500)]]}
      students={[["Student 01", "Class 7-B", 18500, "Paid"], ["Student 02", "Class 4-A", 16200, "Part paid"], ["Student 03", "Class 10-C", 22400, "Paid"], ["Student 04", "Class 2-A", 14800, "Due"], ["Student 05", "Class 9-B", 21000, "Paid"], ["Student 06", "Class 6-A", 17600, "Paid"], ["Student 07", "Class 12-A", 24500, "Part paid"]]}
      schedule={[["09:00", "Morning attendance"], ["11:30", "Class 10 unit test"], ["14:00", "Fee reminders"], ["15:30", "Parent meeting"]]}
    />
  );
}

export function CollegeMock() {
  return (
    <EducationMock
      title="College overview"
      subtitle="Odd semester · Sample data"
      action="New admission"
      group="Course"
      kpis={[["Students", "2,460"], ["Attendance", "88%"], ["Fees collected", inr(9640000)], ["Fees due", inr(1275000)]]}
      students={[["Student 01", "B.Com · Sem 3", 42000, "Paid"], ["Student 02", "BCA · Sem 1", 48500, "Part paid"], ["Student 03", "B.Sc · Sem 5", 39000, "Paid"], ["Student 04", "MBA · Sem 1", 76000, "Due"], ["Student 05", "BA · Sem 3", 31500, "Paid"], ["Student 06", "M.Com · Sem 3", 44000, "Paid"], ["Student 07", "BBA · Sem 5", 46000, "Part paid"]]}
      schedule={[["09:30", "Internal exam · BCA"], ["11:00", "Department review"], ["14:00", "Admission interviews"], ["16:00", "Results upload"]]}
    />
  );
}
