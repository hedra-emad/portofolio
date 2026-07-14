import Link from "next/link";

import { SiteNav } from "@/components/site-nav";

/**
 * Sticky rather than fixed: it stays pinned on scroll with the blur, but keeps
 * its place in flow, so no route has to reserve top padding to avoid being
 * hidden underneath it.
 */
export function SiteHeader() {
  return (
    <header className="border-border sticky top-0 z-50 border-b bg-[rgba(7,10,15,0.6)] backdrop-blur-xl">
      <div className="max-w-wide mx-auto flex items-center justify-between gap-6 px-[clamp(20px,5vw,72px)] py-[18px]">
        <Link
          href="/"
          className="font-display text-text-bright flex items-center gap-[10px] text-[18px] font-bold tracking-[-0.02em]"
        >
          <span
            aria-hidden
            className="bg-accent size-[10px] rounded-[2px] shadow-[0_0_12px_var(--accent)]"
          />
          Hedra<span className="text-accent">.</span>dev
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
