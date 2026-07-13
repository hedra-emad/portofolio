import type { Stat } from "@/content/projects";

/**
 * A row, not a set of cards. Hairline dividers, no shadows, no fills — the
 * numbers are the only thing carrying weight.
 *
 * Every stat prints its own source underneath, in mono. That is the citation
 * line applied to the numbers: the claim and the command that reproduces it are
 * the same object, so "188 endpoints" is not something a reader has to take on
 * trust.
 */
export function StatStrip({ stats }: { stats: readonly Stat[] }) {
  return (
    <dl className="border-border grid grid-cols-1 border-t sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border-border flex flex-col border-r border-b p-5 last:border-r-0"
        >
          <dt className="label">{stat.label}</dt>
          <dd
            className={`mt-2 text-[2rem] leading-none font-medium tracking-tight ${
              stat.accent === true ? "text-accent" : "text-text"
            }`}
          >
            {stat.value}
          </dd>
          <p className="label border-border mt-4 border-l pt-0 pl-3 normal-case">
            {stat.source}
          </p>
        </div>
      ))}
    </dl>
  );
}
