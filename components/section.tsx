import type { ReactNode } from "react";

import { Container } from "@/components/container";

type SectionProps = {
  /** Two digits: `01`, `02`. Order is meaningful on a case study read top to
   *  bottom, so numbering it is information, not ornament. */
  number: string;
  title: string;
  id?: string;
  children: ReactNode;
};

/**
 * A numbered case-study section: `// 01 — architecture` in mono teal above the
 * h2, matching the landing page's eyebrow.
 *
 * The eyebrow is `aria-hidden`: it restates the h2, which is the intended
 * visual device, but a screen reader announcing the number then the heading is
 * noise. Sighted readers get the label; assistive tech gets one clean heading.
 */
export function Section({ number, title, id, children }: SectionProps) {
  return (
    <section
      id={id}
      className="border-border scroll-mt-24 border-t py-(--spacing-section)"
    >
      <Container>
        <p className="eyebrow mb-3" aria-hidden>
          {"// "}
          {number} — {title.toLowerCase()}
        </p>
        <h2>{title}</h2>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}
