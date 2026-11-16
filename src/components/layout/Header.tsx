"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight, LogIn } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav } from "@/lib/site";
import { products, additionalModules } from "@/lib/products";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus on navigation
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMega(false);
    setMobile(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setMega(false), setMobile(false));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const openMega = () => { clearTimeout(closeTimer.current); setMega(true); };
  const closeMega = () => { closeTimer.current = setTimeout(() => setMega(false), 120); };
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink focus:shadow-lift">
        Skip to content
      </a>
      <div className={cn("transition-[padding] duration-500", scrolled ? "pt-2" : "pt-4")}>
        <div
          className={cn(
            "container-x glass flex h-16 max-w-[1200px] items-center gap-6 rounded-2xl ring-1 ring-line/80 transition-shadow duration-500",
            scrolled || mega ? "shadow-[0_1px_0_rgb(255_255_255/0.6)_inset,0_10px_40px_-14px_rgb(46_16_101/0.25)]" : "shadow-soft",
          )}
        >
          <Link href="/" aria-label="Minute Books home" className="shrink-0">
            <Logo priority className="h-7 sm:h-8" />
          </Link>

          <nav aria-label="Primary" className="ml-4 hidden items-center gap-1 lg:flex">
            {mainNav.map((item) =>
              "mega" in item && item.mega ? (
                <div key={item.href} onMouseEnter={openMega} onMouseLeave={closeMega} className="relative">
                  <button
                    type="button"
                    aria-expanded={mega}
                    aria-controls="mega-products"
                    onClick={() => setMega((v) => !v)}
                    className={cn("flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] transition-colors", isActive(item.href) || mega ? "text-violet-700" : "text-ink-2 hover:text-ink")}
                  >
                    {item.label}
                    <ChevronDown className={cn("size-3.5 transition-transform duration-300", mega && "rotate-180")} />
                  </button>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("relative rounded-full px-3.5 py-2 text-[14px] transition-colors", isActive(item.href) ? "text-violet-700" : "text-ink-2 hover:text-ink")}
                >
                  {item.label}
                  {isActive(item.href) && <motion.span layoutId="nav-dot" className="absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-1 rounded-full bg-violet-600" />}
                </Link>
              ),
            )}
          </nav>

          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <Link href="/login" className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[14px] text-ink-2 hover:text-ink">
              <LogIn className="size-4" /> Login
            </Link>
            <ButtonLink href="/demo" onClick={() => track("cta_click", { location: "header", cta: "book_demo" })}>Book a Demo</ButtonLink>
          </div>

          <button
            type="button"
            className="ml-auto flex size-10 items-center justify-center rounded-full ring-1 ring-line lg:hidden"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            onClick={() => setMobile((v) => !v)}
          >
            {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Products mega menu */}
      <AnimatePresence>
        {mega && (
          <motion.div
            id="mega-products"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            initial={{ opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="container-x absolute inset-x-0 top-[calc(100%+6px)] hidden max-w-[1200px] lg:block"
          >
            <div className="grid grid-cols-[1fr_300px] overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-line">
              <div className="grid grid-cols-3 gap-1 p-4">
                {products.map((p) => (
                  <Link key={p.slug} href={`/products/${p.slug}`} className="group flex gap-3 rounded-2xl p-3 transition-colors hover:bg-violet-25">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700 ring-1 ring-violet-100 transition-colors group-hover:bg-violet-700 group-hover:text-white">
                      <p.icon className="size-[18px]" strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="flex items-center gap-1 text-[14px] font-medium text-ink">
                        {p.name}
                        {p.slug === "restoconnect" && <span className="rounded-full bg-violet-100 px-1.5 text-[10px] font-semibold uppercase tracking-wide text-violet-700">QR</span>}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-muted">{p.short}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <div className="relative flex flex-col overflow-hidden bg-violet-950 p-6 text-white noise">
                <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-violet-500/40 blur-3xl" />
                <p className="relative text-[12px] uppercase tracking-[0.14em] text-violet-300">The ecosystem</p>
                <p className="relative mt-2 text-[20px] font-semibold leading-tight tracking-tight">One platform.<br />Every part of your business.</p>
                <ul className="relative mt-4 space-y-1.5 text-[13px] text-violet-100/75">
                  {additionalModules.slice(0, 5).map((m) => <li key={m.name}>{m.name}</li>)}
                </ul>
                <Link href="/products" className="relative mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-white">
                  Explore all products <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 -z-10 overflow-y-auto bg-white px-5 pb-10 pt-24 lg:hidden"
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="space-y-1">
              {mainNav.filter((n) => !("mega" in n)).map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * i }}>
                  <Link href={item.href} className="block rounded-xl px-3 py-3 text-[22px] font-medium tracking-tight">{item.label}</Link>
                </motion.div>
              ))}
            </nav>
            <p className="mt-8 px-3 text-[12px] uppercase tracking-[0.14em] text-ink-faint">Products</p>
            <div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
              {products.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="flex items-center gap-3 rounded-xl px-3 py-2.5">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-violet-50 text-violet-700"><p.icon className="size-4" /></span>
                  <span className="text-[15px]">{p.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <ButtonLink href="/login" variant="secondary" size="lg">Login</ButtonLink>
              <ButtonLink href="/demo" size="lg">Book a Demo</ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
