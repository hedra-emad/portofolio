import type { ReactNode } from "react";

/**
 * A placeholder for content only Hedra can write.
 *
 * Deliberately loud. The failure mode this guards against is a scaffold that
 * looks finished — plausible filler that survives to production because nobody
 * noticed it was filler. This cannot be mistaken for content: it is the only
 * element on the site that breaks the palette.
 *
 * It also fails the build in CI. `npm run check:todos` greps for this component
 * and exits non-zero if any remain, so the site cannot deploy with one on the
 * page.
 */
export function Todo({
  who = "Hedra",
  children,
}: {
  who?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-6 rounded-[12px] border border-dashed border-[#f0b429] bg-[rgba(240,180,41,0.06)] p-5">
      <p className="mb-2 font-mono text-[0.8125rem] font-medium text-[#f6c65b]">
        todo — {who.toLowerCase()} writes this
      </p>
      <div className="text-text-sub max-w-measure text-[0.95rem]">
        {children}
      </div>
    </div>
  );
}
