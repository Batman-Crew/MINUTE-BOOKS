import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, productBySlug } from "@/lib/products";
import { ProductPage } from "@/components/product/ProductPage";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.filter((p) => p.slug !== "restoconnect").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return {};
  return pageMeta({ title: p.name, description: p.short, path: `/products/${p.slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();
  return <ProductPage p={p} />;
}
