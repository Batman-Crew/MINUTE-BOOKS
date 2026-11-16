import Image from "next/image";
import { Check, QrCode, ChefHat, Search, CircleDot, CreditCard, Star, ShieldCheck, DatabaseBackup, FileWarning, Palette, Radio, CopyCheck } from "lucide-react";
import { productBySlug } from "@/lib/products";
import { Phone, Tablet, BrowserWindow, SampleTag } from "@/components/ui/Devices";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem, TextReveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ProductRelated } from "@/components/product/ProductPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "RestoConnect — QR Ordering",
  description: "QR table ordering for restaurants, cafés, cinemas and food courts. No app for guests, a live kitchen screen, GST bills and English and Tamil support.",
  path: "/products/restoconnect",
});

const R = "/products/restoconnect";
const p = productBySlug("restoconnect")!;

const flow = [
  { icon: QrCode, t: "Scan", d: "Scan the table QR. No app, no sign-up.", who: "Guest" },
  { icon: Search, t: "Order", d: "Browse photos, pick a size, place the order.", who: "Guest" },
  { icon: ChefHat, t: "Cook", d: "The kitchen screen lights up with a sound alert.", who: "Kitchen" },
  { icon: CircleDot, t: "Track", d: "Sent, preparing, ready, served. Live on the phone.", who: "Guest" },
  { icon: CreditCard, t: "Pay", d: "A GST bill. Pay online or at the counter.", who: "Guest" },
  { icon: Star, t: "Rate", d: "A receipt, an invoice number and a star rating.", who: "Guest" },
];

const reliability = [
  { icon: Radio, t: "Live by default", d: "Kitchen and phones update in real time." },
  { icon: CopyCheck, t: "Safe against double orders", d: "A lost reply can never place an order twice." },
  { icon: DatabaseBackup, t: "Automatic backups", d: "A full backup every 3 hours. The newest 10 are kept." },
  { icon: FileWarning, t: "Error log for owners", d: "Every problem is recorded and visible in the admin area." },
  { icon: ShieldCheck, t: "Role-based sign-in", d: "Owner and kitchen roles. Guests never need an account." },
  { icon: Palette, t: "Your brand, your colours", d: "White-label look for every venue." },
];

export default function Page() {
  return (
    <>
      {/* hero: phones fan out of a dark stage */}
      <section className="relative isolate overflow-hidden bg-violet-950 pb-0 pt-36 text-white noise">
        <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-[800px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.5),transparent)]" />
        <div className="container-x text-center">
          <Reveal className="flex justify-center"><Image src={`${R}/logo.png`} alt="RestoConnect" width={1100} height={703} priority className="h-20 w-auto rounded-2xl bg-white p-2.5" /></Reveal>
          <h1 className="mx-auto mt-8 max-w-4xl text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.95]">
            <TextReveal text={p.headline} accent={p.accent} accentClassName="serif-accent text-gradient-light pr-1" />
          </h1>
          <Reveal delay={0.15}><p className="mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-violet-100/75">{p.sub}</p></Reveal>
          <Reveal delay={0.25} className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/demo?product=restoconnect" size="lg" variant="light" arrow>Book a Demo</ButtonLink>
            <ButtonLink href="#flow" size="lg" variant="outline-light">See how it works</ButtonLink>
          </Reveal>
          <Reveal delay={0.3} className="mx-auto mt-16 flex max-w-4xl items-end justify-center gap-3 sm:gap-6">
            {[["guest-table", "Guest landing on their table", "translate-y-20"], ["guest-menu", "Photo menu", "translate-y-6"], ["guest-order-tracking", "Live order tracking", "translate-y-14"], ["guest-bill", "Bill ready to pay", "translate-y-28 max-sm:hidden"]].map(([f, alt, cls]) => (
              <Phone key={f} className={`w-1/3 max-w-[230px] sm:w-1/4 ${cls}`}>
                <Image src={`${R}/${f}.webp`} alt={alt} fill sizes="230px" className="object-cover" />
              </Phone>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 border-b border-line bg-white py-7">
        <ul className="container-x flex flex-wrap justify-center gap-x-6 gap-y-3">
          {p.capabilities.map((c) => <li key={c} className="flex items-center gap-2 text-[14px] text-ink-2"><Check className="size-4 text-violet-600" />{c}</li>)}
        </ul>
      </section>

      <section id="flow" className="bg-white py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="The workflow" title="From scan to paid in six steps." accent="six steps." sub="Tables share one bill. Staff can take payment at the counter. Everything updates live." />
          <Stagger as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {flow.map((s, i) => (
              <StaggerItem as="li" key={s.t} className="rounded-3xl bg-mist p-6 ring-1 ring-line">
                <div className="flex items-center justify-between"><s.icon className="size-5 text-violet-700" /><span className="font-mono text-[12px] text-ink-faint">{i + 1}</span></div>
                <h3 className="mt-5 text-[19px] font-semibold tracking-tight">{s.t}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">{s.d}</p>
                <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.12em] text-violet-700">{s.who}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-mist py-24 lg:py-32">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal>
            <BrowserWindow url="restoconnect · kitchen">
              <Image src={`${R}/desktop-kitchen.webp`} alt="RestoConnect kitchen screen with a live order queue" width={1700} height={1133} sizes="(min-width:1024px) 60vw, 100vw" className="h-auto w-full" />
            </BrowserWindow>
          </Reveal>
          <div>
            <SectionHeading eyebrow="For the kitchen" title="Every order, the moment it's placed." accent="the moment it's placed." />
            <ul className="mt-6 space-y-3 text-[15.5px] text-ink-muted">
              {["Live queue with wait timers", "Group by table or by dish", "Item-wise Start and Ready", "Sound alert for new orders", "Pause orders, mark dishes out of stock"].map((x) => <li key={x} className="flex gap-2.5"><Check className="mt-1 size-4 text-violet-600" />{x}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionHeading eyebrow="For staff" title="Built for touch, not a mouse." accent="touch, not a mouse." sub="A staff web app and an Android staff app, with a tablet layout that keeps the list on the left and the order on the right." />
          </div>
          <div className="relative pb-10">
            <Reveal><Tablet className="w-[88%]"><Image src={`${R}/tablet-orders.webp`} alt="Staff app on a tablet" fill sizes="(min-width:1024px) 50vw, 90vw" className="object-cover" /></Tablet></Reveal>
            <Reveal delay={0.15} className="absolute bottom-0 right-0 w-[26%] min-w-[110px]"><Phone><Image src={`${R}/staff-home.webp`} alt="Staff app home screen" fill sizes="200px" className="object-cover" /></Phone></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-violet-950 py-24 text-white lg:py-32">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading dark eyebrow="Languages" title="English and தமிழ், one tap apart." sub="Switch instantly, with no reload. Carts and typed text stay, and the choice is remembered on each phone. Dishes can carry Tamil names, typed once." />
            <Reveal delay={0.2} className="mt-7"><Eyebrow dark>Live in minutes, not days</Eyebrow>
              <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-violet-100/70">A guided setup creates your restaurant, your tables and their QR codes, then starts you off with a menu.</p>
            </Reveal>
          </div>
          <Reveal className="flex justify-center gap-4">
            {[["guest-menu-tamil", "Guest menu in Tamil"], ["onboard-tables", "Guided setup: choosing tables and QR codes"], ["onboard-brand", "Guided setup: brand colours"]].map(([f, alt], i) => (
              <Phone key={f} className={`w-1/3 max-w-[200px] ${i === 1 ? "-translate-y-6" : ""}`}><Image src={`${R}/${f}.webp`} alt={alt} fill sizes="200px" className="object-cover" /></Phone>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Reports and control" title="Know how the day went." accent="the day went." sub="Revenue by day, bills, average bill and tax collected. Unpaid dues and walk-out alerts. Export to CSV for your accountant." />
          <Reveal className="mt-12"><BrowserWindow url="restoconnect · reports"><Image src={`${R}/desktop-reports.webp`} alt="RestoConnect reports screen" width={1700} height={1133} sizes="100vw" className="h-auto w-full" /></BrowserWindow>
            <SampleTag>RestoConnect product screenshots · demo venue data</SampleTag>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Where it works" title="Made for every kind of venue." accent="every kind of venue." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.useCases.map((u) => <Reveal key={u.title} className="rounded-3xl bg-white p-7 ring-1 ring-line"><h3 className="text-[18px] font-semibold tracking-tight">{u.title}</h3><p className="mt-1.5 text-[14.5px] text-ink-muted">{u.body}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Reliable and secure" title="Built to keep running on a busy night." accent="a busy night." />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {reliability.map((r) => <div key={r.t}><r.icon className="size-6 text-violet-700" strokeWidth={1.7} /><h3 className="mt-4 text-[17px] font-semibold tracking-tight">{r.t}</h3><p className="mt-1 text-[14.5px] text-ink-muted">{r.d}</p></div>)}
          </div>
        </div>
      </section>

      <ProductRelated p={p} />
      <FinalCTA />
    </>
  );
}
