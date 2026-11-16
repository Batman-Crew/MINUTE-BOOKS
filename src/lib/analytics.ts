/**
 * Analytics integration point. Provider is chosen with NEXT_PUBLIC_ANALYTICS_PROVIDER
 * ("plausible" | "ga4"); the script tag is injected by <Analytics /> in the root layout.
 * Call track() for meaningful conversions only (demo booked, contact sent, CTA clicks).
 */
type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Props }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, props?: Props) {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(event, props ? { props } : undefined);
    window.gtag?.("event", event, props);
  } catch {
    /* analytics must never break the UI */
  }
  if (process.env.NODE_ENV === "development") console.debug("[track]", event, props ?? "");
}
