import type { ReactNode } from "react";

import { Container } from "@/components/container";

type SectionProps = {
  /** Two digits, zero-padded: `01`, `02`. Order carries meaning here — the
   *  landing page is a sequence a recruiter reads top to bottom, so numbering
   *  it is information, not ornament. */
  number: string;
  title: string;
  id?: string;
  children: ReactNode;
};

/**
 * A numbered section: `01 / selected work` in mono above the h2.
 *
 * The eyebrow is `aria-hidden` on purpose. It restates the h2, which is the
 * Swiss editorial device the brief asks for — but a screen reader announcing
 * "01 slash selected work, heading, Selected work" is noise. Sighted readers
 * get the label; assistive tech gets one clean heading.
 */
export function Section({ number, title, id, children }: SectionProps) {
  return (
    <section id={id} className="border-border border-t py-(--spacing-section)">
      <Container>
        <p className="label mb-4" aria-hidden>
          {number} / {title.toLowerCase()}
        </p>
        <h2>{title}</h2>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}
