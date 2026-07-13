"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Fade + 8px translate, 300ms, once. The whole motion vocabulary of the site.
 *
 * The hidden state lives in CSS, gated on `scripting: enabled` and
 * `prefers-reduced-motion: no-preference` (see globals.css). That gate is the
 * whole point: with JavaScript off, or with reduced motion requested, the
 * element is never hidden in the first place — so there is no way for this
 * component to leave content invisible if the observer never fires. Scroll
 * reveals that hide with an inline style and un-hide in a `useEffect` fail
 * exactly that way.
 */
export function Reveal({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: "div" | "section" | "li";
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (node === null || revealed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal=""
      data-revealed={revealed ? "true" : "false"}
      className={className}
    >
      {children}
    </Tag>
  );
}
