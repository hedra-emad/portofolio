export type Stat = {
  /** Mono, lowercase, sits above the number. */
  readonly label: string;
  readonly value: string;
  /** The accent is rationed: at most two numbers on any page carry it. */
  readonly accent?: boolean;
  /** Where this number can be checked. See `Cite`. */
  readonly source?: string;
};

/**
 * A row, not a set of cards. Hairline dividers, no shadows, no fills — the
 * numbers are the only thing with weight.
 */
export function StatStrip({ stats }: { stats: readonly Stat[] }) {
  return (
    <dl className="border-border grid grid-cols-2 border-t md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border-border border-r border-b p-5 last:border-r-0"
        >
          <dt className="label">{stat.label}</dt>
          <dd
            className={`mt-2 text-[2rem] leading-none font-medium tracking-tight ${
              stat.accent === true ? "text-accent" : "text-text"
            }`}
          >
            {stat.value}
          </dd>
          {stat.source !== undefined && (
            <p className="label mt-3 normal-case">{stat.source}</p>
          )}
        </div>
      ))}
    </dl>
  );
}
