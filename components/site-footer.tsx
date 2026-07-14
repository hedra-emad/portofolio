import { SITE } from "@/lib/site";

/**
 * The slim global footer — copyright and a one-line positioning, on every
 * route. The landing page carries the rich `#contact` block above this; on a
 * case-study route this bar is the footer on its own.
 */
export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="max-w-wide mx-auto flex flex-wrap items-center justify-between gap-4 px-[clamp(20px,5vw,72px)] py-7">
        <span className="text-text-dim font-mono text-[13px]">
          © {new Date().getFullYear()} {SITE.name}
        </span>
        <span className="text-text-dim font-mono text-[13px]">
          Full-Stack · TypeScript · AI Engineering
        </span>
      </div>
    </footer>
  );
}
