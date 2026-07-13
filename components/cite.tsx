import type { ReactNode } from "react";

/**
 * The citation line.
 *
 * The brief's first principle is that every claim on this site is verifiable in
 * one click, and that the site has to survive "how much of this did AI write?".
 * A promise in the copy does not survive that question. A visible, repeated
 * apparatus does.
 *
 * So the claim and its evidence are one component: a mono, muted line hung off
 * a hairline, naming the file, glob, or link the number came from. It is the
 * only device on the site that appears in every section, and it is the reason
 * the mono family exists here — the grotesque makes the argument, the mono
 * shows the receipts.
 *
 * It is deliberately not decorative: remove it and the page loses meaning,
 * which is the test the brief sets for every element.
 */
export function Cite({
  source,
  href,
  children,
}: {
  /** A repo path, glob, or short provenance note. Shown verbatim, in mono. */
  source: string;
  /** Optional — when the source is reachable, the citation is the click. */
  href?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-border mt-4 border-l pl-4">
      {children}
      <p className="label normal-case">
        {href === undefined ? (
          source
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {source}
          </a>
        )}
      </p>
    </div>
  );
}
