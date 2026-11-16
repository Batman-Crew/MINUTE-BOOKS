"use client";

import { Button } from "@/components/ui/Button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-5 pt-24 text-center">
      <h1 className="text-[36px] font-semibold">Something went wrong.</h1>
      <p className="mt-2 text-ink-muted">Please try again.</p>
      <Button onClick={reset} className="mt-7">Try again</Button>
    </section>
  );
}
