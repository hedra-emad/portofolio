import type { Stat } from "@/content/projects";

/**
 * The case-study stat row. Glass cards on the dark ground, hairline dividers in
 * the grid, the number in the display face.
 *
 * Every stat prints its own `source` underneath, in mono — the command or glob
 * that reproduces it. That citation is the reason the case studies survive the
 * redesign: "188 endpoints" is a claim a reader can check, not one they take on
 * trust.
 */
export function StatStrip({ stats }: { stats: readonly Stat[] }) {
  return (
    <dl className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="card flex flex-col p-[24px]">
          <dt className="label">{stat.label}</dt>
          <dd
            className={`font-display mt-[10px] text-[2rem] leading-none font-bold ${
              stat.accent === true ? "text-accent" : "text-text-bright"
            }`}
          >
            {stat.value}
          </dd>
          <p className="border-border text-text-dim mt-[16px] border-l pl-3 font-mono text-[12px] break-words">
            {stat.source}
          </p>
        </div>
      ))}
    </dl>
  );
}
