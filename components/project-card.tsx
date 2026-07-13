import Link from "next/link";

import type { Project } from "@/content/projects";

/**
 * Screenshots are not in yet, so the media slot is an explicit, labelled empty
 * frame rather than a stock image or a gradient. An honest gap reads better
 * than a decorative lie.
 */
function MediaSlot({ name }: { name: string }) {
  return (
    <div className="border-border bg-surface flex aspect-16/10 items-center justify-center border">
      <p className="label">screenshot pending — {name.toLowerCase()}</p>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col">
      <Link
        href={`/projects/${project.slug}`}
        className="group block"
        aria-label={`${project.name} case study`}
      >
        <MediaSlot name={project.name} />
        <h3 className="group-hover:text-accent mt-5 transition-colors">
          {project.name}
        </h3>
      </Link>

      <p className="label mt-2">
        {project.role} · {project.period}
      </p>

      <p className="text-text-muted max-w-measure mt-3">{project.summary}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="tag">
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <Link href={`/projects/${project.slug}`} className="link">
          Read the case study
        </Link>
        {project.live.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {link.label}
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
    </article>
  );
}
