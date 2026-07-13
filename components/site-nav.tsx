"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SITE } from "@/lib/site";

/**
 * The only client component in the shell. `usePathname` is what buys the active
 * state, and an active state cannot be derived on the server for a static page.
 * Scoping the directive to the nav — rather than to the whole header — keeps
 * the hydrated surface down to three links.
 *
 * The nav is set in mono: it is navigation apparatus, not argument, and on this
 * site that distinction is carried by the typeface.
 */
export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="flex items-center gap-6">
        {SITE.nav.map((item) => {
          const target = item.href.split("#")[0] ?? "/";
          const isActive =
            target === "/" ? pathname === "/" : pathname.startsWith(target);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`label hover:text-accent transition-colors ${
                  isActive ? "text-accent" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
