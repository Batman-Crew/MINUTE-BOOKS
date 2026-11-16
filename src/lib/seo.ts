import type { Metadata } from "next";
import { site } from "./site";

export function pageMeta({ title, description, path = "/" }: { title: string; description: string; path?: string }): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} · Minute Books`, description, url, siteName: site.name, locale: site.locale, type: "website" },
    twitter: { card: "summary_large_image", title: `${title} · Minute Books`, description },
  };
}
