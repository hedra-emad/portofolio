import { Container } from "@/components/container";
import type { Project } from "@/content/projects";

/**
 * Role, team, dates and every link, above the fold. A recruiter reading a case
 * study wants to know what this person did and where the code is before they
 * commit to the prose.
 *
 * The case studies live inline on the single-page site, so the project name is
 * an `h2` (a major page section), not an `h1` — the hero owns the page's one
 * `h1`. When a `number` is passed it renders the same `// 03 — case study`
 * eyebrow the landing sections use, so the whole page reads as one sequence.
 */
export function ProjectHeader({
  project,
  number,
}: {
  project: Project;
  number?: string;
}) {
  return (
    <Container as="header" className="py-(--spacing-section)">
      {number === undefined ? (
        <p className="label mb-6">case study</p>
      ) : (
        <p className="eyebrow mb-4" aria-hidden>
          {"// "}
          {number} — case study
        </p>
      )}
      <h2 className="text-[length:var(--text-display)] tracking-[-0.035em]">
        {project.name}
      </h2>

      <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
        <div>
          <dt className="label">role</dt>
          <dd className="mt-1 font-medium">{project.role}</dd>
        </div>
        <div>
          <dt className="label">team</dt>
          <dd className="mt-1 font-medium">{project.team}</dd>
        </div>
        <div>
          <dt className="label">when</dt>
          <dd className="mt-1 font-medium">{project.period}</dd>
        </div>
      </dl>

      <p className="max-w-measure mt-8">{project.summary}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="tag">
            {tech}
          </li>
        ))}
      </ul>

      <div className="border-border mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t pt-6">
        {project.live.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {link.label} — live
          </a>
        ))}
        {project.repos.map((repo) => (
          <a
            key={repo.href}
            href={repo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="label hover:text-accent transition-colors"
          >
            {repo.label}
          </a>
        ))}
      </div>
    </Container>
  );
}
