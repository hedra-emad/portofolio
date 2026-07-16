import type { ReactNode } from "react";

import { Container } from "@/components/container";

type SectionProps = {
  /** Section number within its case study — `03.1`, `04.2`. Order is meaningful
   *  read top to bottom, and the dotted form nests it under the project's
   *  top-level number on the single-page site. */
  number: string;
  title: string;
  id?: string;
  children: ReactNode;
};

/**
 * A numbered case-study section: `// 01 — architecture` in mono teal above the
 * h2, matching the landing page's eyebrow.
 *
 * An `h2`: the project name (ProjectHeader) is the page's `h1`, so its sections
 * nest one level below it.
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
