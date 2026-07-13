"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SITE } from "@/lib/site";

/**
 * The only client component in the shell. `usePathname` is what buys the active
 * state, and an active state cannot be derived on the server for a static page.
 * Scoping it to the nav — instead of marking the whole header `"use client"` —
 * keeps the hydrated surface to a handful of links.
 */
export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="flex items-center gap-6 text-sm">
        {SITE.nav.map((item) => {
          const target = item.href.split("#")[0] ?? "/";
          const isActive =
            target === "/" ? pathname === "/" : pathname.startsWith(target);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`hover:text-accent transition-colors ${
                  isActive ? "text-accent" : "text-fg-muted"
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
