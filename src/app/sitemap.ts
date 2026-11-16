import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { industries } from "@/lib/industries";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about", "/products", "/solutions", "/industries", "/technology", "/contact", "/demo", "/credits",
    ...products.map((p) => `/products/${p.slug}`), ...industries.map((i) => `/industries/${i.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p === "/" ? "" : p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
