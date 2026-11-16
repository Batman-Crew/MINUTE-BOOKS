import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The original Minute Books logo. These files are cut from the supplied artwork
 * (public/brand/minutebooks-logo-original.png) without redrawing — replace them with
 * official vector files when available (see ASSETS.md).
 */
export function Logo({ variant = "color", className, priority }: { variant?: "color" | "white"; className?: string; priority?: boolean }) {
  return (
    <Image
      src={variant === "white" ? "/brand/minutebooks-nav-white.png" : "/brand/minutebooks-nav.png"}
      alt="Minute Books"
      width={516}
      height={96}
      priority={priority}
      className={cn("h-8 w-auto", className)}
    />
  );
}

export function LogoLockup({ variant = "color", className }: { variant?: "color" | "white"; className?: string }) {
  return (
    <Image
      src={variant === "white" ? "/brand/minutebooks-lockup-white.png" : "/brand/minutebooks-lockup.png"}
      alt="Minute Books — Accounting made simple"
      width={1027}
      height={712}
      className={cn("h-auto w-48", className)}
    />
  );
}

export function LogoMark({ variant = "color", className }: { variant?: "color" | "white"; className?: string }) {
  return (
    <Image
      src={variant === "white" ? "/brand/minutebooks-mark-white.png" : "/brand/minutebooks-mark.png"}
      alt=""
      width={590}
      height={510}
      className={cn("h-10 w-auto", className)}
    />
  );
}
