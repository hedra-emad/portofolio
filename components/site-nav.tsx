"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { SITE } from "@/lib/site";

/**
 * The only client component in the shell. `usePathname` gives the active state
 * on the case-study routes, which cannot be derived on the server for a static
 * page. Scoping the directive to the nav keeps the hydrated surface to a few
 * links. Set in mono — this is navigation apparatus, not argument.
 *
 * Two layouts, one link list: an inline row from `md` up, and a hamburger that
 * toggles a stacked panel below it on phones, where five mono items would
 * otherwise crowd the logo off the bar.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // The panel closes on any item click (each mobile link calls setOpen(false)),
  // which covers every navigation the panel can trigger.

  const linkClass = (isActive: boolean, cta?: boolean) => {
    if (cta === true) {
      return "text-accent rounded-[8px] border border-[rgba(20,184,166,0.4)] bg-[rgba(20,184,166,0.08)] px-[16px] py-[8px] transition-colors hover:border-[rgba(20,184,166,0.7)] hover:bg-[rgba(20,184,166,0.16)]";
    }
    return `hover:text-accent transition-colors ${
      isActive ? "text-accent" : "text-text-muted"
    }`;
  };

  const items = SITE.nav.map((item) => {
    const target = item.href.split("#")[0] ?? "/";
    const isActive =
      pathname !== "/" && target !== "/" && pathname.startsWith(target);
    return { item, isActive };
  });

  return (
    <nav aria-label="Primary" className="relative">
      {/* Desktop: inline row */}
      <ul className="hidden items-center gap-[clamp(14px,2.4vw,34px)] font-mono text-[14px] md:flex">
        {items.map(({ item, isActive }) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive && item.cta !== true ? "page" : undefined}
              className={linkClass(isActive, item.cta)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile: hamburger toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="text-text-sub hover:text-accent border-border bg-surface flex size-[42px] items-center justify-center rounded-[10px] border transition-colors hover:border-[rgba(20,184,166,0.5)] md:hidden"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Mobile: stacked panel */}
      {open && (
        <ul
          id="mobile-nav"
          className="border-border bg-surface absolute top-full right-0 z-50 mt-3 flex w-[min(72vw,240px)] flex-col gap-1 rounded-[12px] border p-2 font-mono text-[15px] shadow-[0_16px_40px_-12px_rgba(15,23,42,0.25)]"
        >
          {items.map(({ item, isActive }) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={
                  isActive && item.cta !== true ? "page" : undefined
                }
                className={
                  item.cta === true
                    ? "text-accent block rounded-[8px] border border-[rgba(20,184,166,0.4)] bg-[rgba(20,184,166,0.08)] px-3 py-2 text-center transition-colors"
                    : `hover:text-accent block rounded-[8px] px-3 py-2 transition-colors ${
                        isActive
                          ? "text-accent bg-[rgba(20,184,166,0.06)]"
                          : "text-text-muted"
                      }`
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
