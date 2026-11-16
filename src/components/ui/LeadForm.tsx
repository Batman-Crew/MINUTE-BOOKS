"use client";

import { useState } from "react";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { Button } from "./Button";
import { products } from "@/lib/products";
import { industries } from "@/lib/industries";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

const field = "mt-1.5 h-12 w-full rounded-xl bg-white px-4 text-[15px] text-ink ring-1 ring-line-strong outline-none transition-shadow placeholder:text-ink-faint focus:ring-2 focus:ring-violet-600";

export function LeadForm({ type, product, industry }: { type: "contact" | "demo"; product?: string; industry?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget));
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, type }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "failed");
      setState("sent");
      track(type === "demo" ? "demo_requested" : "contact_sent", { product: String(data.product || "") });
    } catch (err) {
      setError(err instanceof Error && err.message !== "failed" ? err.message : "We couldn't send your message.");
      setState("error");
    }
  }

  if (state === "sent")
    return (
      <div role="status" className="rounded-3xl bg-violet-50 p-10 text-center ring-1 ring-violet-100">
        <CircleCheck className="mx-auto size-10 text-violet-700" />
        <h2 className="mt-4 text-[24px] font-semibold">Thank you. We&apos;ve got your message.</h2>
        <p className="mt-2 text-ink-muted">Our team will get back to you using the details you shared.</p>
      </div>
    );

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-3xl bg-white p-7 shadow-lift ring-1 ring-line sm:grid-cols-2 sm:p-9">
      <label className="text-[14px] font-medium">Your name<input required name="name" maxLength={120} autoComplete="name" className={field} /></label>
      <label className="text-[14px] font-medium">Business name<input name="company" maxLength={160} autoComplete="organization" className={field} /></label>
      <label className="text-[14px] font-medium">Email<input required type="email" name="email" maxLength={200} autoComplete="email" className={field} /></label>
      <label className="text-[14px] font-medium">Phone<input type="tel" name="phone" maxLength={30} autoComplete="tel" className={field} /></label>
      {type === "demo" && (
        <>
          <label className="text-[14px] font-medium">Product of interest
            <select name="product" defaultValue={product ?? ""} className={field}>
              <option value="">Not sure yet</option>
              {products.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
            </select>
          </label>
          <label className="text-[14px] font-medium">Industry
            <select name="industry" defaultValue={industry ?? ""} className={field}>
              <option value="">Select</option>
              {industries.map((i) => <option key={i.slug} value={i.slug}>{i.name}</option>)}
            </select>
          </label>
        </>
      )}
      <label className="text-[14px] font-medium sm:col-span-2">{type === "demo" ? "Anything we should know?" : "How can we help?"}
        <textarea name="message" required={type === "contact"} maxLength={2000} rows={4} className={`${field} h-auto py-3`} />
      </label>
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] size-px" />
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={state === "sending"} className="w-full sm:w-auto">
          {state === "sending" && <LoaderCircle className="size-4 animate-spin" />}
          {type === "demo" ? "Request my demo" : "Send message"}
        </Button>
        {state === "error" && (
          <p role="alert" className="mt-3 text-[14px] text-bad">
            {error} Please email us at <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
