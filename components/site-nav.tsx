"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SITE } from "@/lib/site";

/**
 * The only client component in the shell. `usePathname` gives the active state
 * on the case-study routes, which cannot be derived on the server for a static
 * page. Scoping the directive to the nav keeps the hydrated surface to a few
 * links. Set in mono — this is navigation apparatus, not argument.
 */
export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="flex items-center gap-[clamp(14px,2.4vw,34px)] font-mono text-[14px]">
        {SITE.nav.map((item) => {
          const target = item.href.split("#")[0] ?? "/";
          const isActive =
            pathname !== "/" && target !== "/" && pathname.startsWith(target);

          if (item.cta === true) {
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-accent rounded-[8px] border border-[rgba(20,184,166,0.4)] bg-[rgba(20,184,166,0.08)] px-[16px] py-[8px] transition-colors hover:border-[rgba(20,184,166,0.7)] hover:bg-[rgba(20,184,166,0.16)]"
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`hover:text-accent transition-colors ${
                  isActive ? "text-accent" : "text-text-muted"
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
