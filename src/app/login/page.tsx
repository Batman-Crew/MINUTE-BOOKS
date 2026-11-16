"use client";

import { useState } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

/** Each customer signs in on their own workspace address, so this page sends them there. */
export default function Page() {
  const [error, setError] = useState("");
  function go(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = String(new FormData(e.currentTarget).get("workspace") || "").trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
    if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(raw)) return setError("Enter your full workspace address, for example yourcompany.example.com.");
    window.location.href = `https://${raw}/login`;
  }
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-mist px-5 pb-20 pt-36">
      <form onSubmit={go} className="w-full max-w-md rounded-3xl bg-white p-9 shadow-lift ring-1 ring-line">
        <LogoMark className="h-10" />
        <h1 className="mt-6 text-[26px] font-semibold">Sign in to your workspace</h1>
        <p className="mt-1.5 text-[15px] text-ink-muted">Enter the address of your Minute Books workspace.</p>
        <label className="mt-6 block text-[14px] font-medium">Workspace address
          <input name="workspace" required autoComplete="url" spellCheck={false} aria-invalid={!!error} className="mt-1.5 h-12 w-full rounded-xl px-4 text-[15px] ring-1 ring-line-strong outline-none focus:ring-2 focus:ring-violet-600" />
        </label>
        {error && <p role="alert" className="mt-2 text-[13.5px] text-bad">{error}</p>}
        <Button type="submit" size="lg" className="mt-5 w-full">Continue</Button>
      </form>
    </section>
  );
}
