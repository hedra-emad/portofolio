"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `value` once, when it first scrolls into view.
 *
 * Two correctness details the mock's version lacked:
 *  - It renders `value` as real text on the server, so the final number is in
 *    the HTML. With JavaScript off, or before hydration, a reader sees "188",
 *    not "0". The animation only ever counts up *to* a number already present.
 *  - It reads `prefers-reduced-motion` and skips straight to the final value if
 *    the reader asked for less motion.
 */
export function Counter({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (node === null) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    let raf = 0;
    let started = false;
    const DURATION = 1500;

    const run = (start: number) => {
      const tick = (now: number) => {
        const p = Math.min((now - start) / DURATION, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(value * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            setDisplay(0);
            requestAnimationFrame((t) => run(t));
            observer.disconnect();
          }
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
