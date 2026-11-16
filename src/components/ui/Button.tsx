import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-[transform,background-color,box-shadow,color] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-violet-700 text-white shadow-[0_1px_0_rgb(255_255_255/0.25)_inset,0_10px_30px_-10px_rgb(101_39_208/0.7)] hover:bg-violet-800 hover:shadow-[0_1px_0_rgb(255_255_255/0.25)_inset,0_14px_36px_-10px_rgb(101_39_208/0.8)]",
  secondary: "bg-white text-ink ring-1 ring-line-strong hover:ring-violet-300 hover:bg-violet-25 shadow-soft",
  ghost: "text-ink hover:bg-violet-50",
  light: "bg-white text-violet-900 hover:bg-violet-50 shadow-[0_10px_30px_-10px_rgb(0_0_0/0.4)]",
  "outline-light": "text-white ring-1 ring-white/30 hover:ring-white/60 hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-[15px]",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({ href, children, variant = "primary", size = "md", arrow, className, onClick }: Props) {
  const external = /^https?:|^mailto:|^tel:/.test(href);
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
    </>
  );
  const cls = cn(base, variants[variant], sizes[size], className);
  if (external)
    return (
      <a href={href} className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  return (
    <Link href={href} className={cls} onClick={onClick}>
      {inner}
    </Link>
  );
}

export function Button({
  variant = "primary", size = "md", className, children, ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
