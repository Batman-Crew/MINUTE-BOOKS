import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { emailConfigured, sendLeadEmail } from "@/lib/lead-email";

/**
 * Lead capture for the contact and demo forms.
 * Each valid submission is emailed (SMTP_USER + SMTP_PASS) and/or POSTed as JSON (LEAD_WEBHOOK_URL); see .env.example.
 * Success is only reported once at least one of them has really accepted the lead. Otherwise the API returns
 * an error and the form sends visitors to the email address, so a lead is never silently lost.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // per-instance; use a shared store if running several instances

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > 8192) return NextResponse.json({ error: "Message is too long." }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // honeypot: pretend success so bots don't retry
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const lead = {
    type: body.type === "demo" ? "demo" : "contact",
    name: str(body.name, 120),
    company: str(body.company, 160),
    email: str(body.email, 200),
    phone: str(body.phone, 30),
    product: str(body.product, 60),
    industry: str(body.industry, 60),
    message: str(body.message, 2000),
    source: site.url,
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name) return NextResponse.json({ error: "Please enter your name." }, { status: 422 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });

  const url = process.env.LEAD_WEBHOOK_URL;
  const deliveries: Promise<void>[] = [];
  if (emailConfigured()) deliveries.push(sendLeadEmail(lead));
  if (url) deliveries.push(postToWebhook(url, lead));

  if (deliveries.length === 0) {
    console.error("[lead] no delivery configured (set SMTP_USER and SMTP_PASS, or LEAD_WEBHOOK_URL); submission rejected");
    return NextResponse.json({ error: "Our form is temporarily unavailable." }, { status: 503 });
  }

  const results = await Promise.allSettled(deliveries);
  for (const r of results) {
    if (r.status === "rejected") console.error("[lead] delivery failed:", r.reason instanceof Error ? r.reason.message : r.reason);
  }
  if (!results.some((r) => r.status === "fulfilled")) {
    return NextResponse.json({ error: "We couldn't send your message." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

async function postToWebhook(url: string, lead: Record<string, string>) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.LEAD_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.LEAD_WEBHOOK_SECRET } : {}),
    },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`webhook responded ${res.status}`);
}
