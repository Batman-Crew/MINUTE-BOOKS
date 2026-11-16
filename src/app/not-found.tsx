import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="font-mono text-[14px] text-violet-700">404</p>
      <h1 className="mt-3 text-[40px] font-semibold">This page isn&apos;t in the books.</h1>
      <p className="mt-2 text-ink-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <ButtonLink href="/" className="mt-7">Back to home</ButtonLink>
    </section>
  );
}
