import nodemailer from "nodemailer";
import { site } from "@/lib/site";

type Lead = Record<string, string>;

export const emailConfigured = () => Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

const LABELS: [keyof Lead, string][] = [
  ["name", "Name"],
  ["company", "Company"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["product", "Product"],
  ["industry", "Industry"],
  ["message", "Message"],
];

/** Emails a lead to the Minute Books inbox. Replying to the email goes straight to the visitor. */
export async function sendLeadEmail(lead: Lead) {
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER!;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass: process.env.SMTP_PASS },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });

  const kind = lead.type === "demo" ? "demo request" : "enquiry";
  const who = [lead.name, lead.company].filter(Boolean).join(", ").replace(/\s+/g, " ");
  const details = LABELS.filter(([key]) => lead[key]).map(([key, label]) => `${label}: ${lead[key]}`);

  await transport.sendMail({
    from: { name: "Minute Books Website", address: user },
    to: process.env.LEAD_EMAIL_TO || site.email,
    replyTo: { name: lead.name.replace(/\s+/g, " "), address: lead.email },
    subject: `New ${kind}: ${who}`,
    text: [`New ${kind} from the website.`, "", ...details, "", `Received: ${lead.receivedAt}`].join("\n"),
  });
}
