import Link from "next/link";

import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { BACKGROUND, SKILL_GROUPS } from "@/content/cv";
import { EDUGENIE, PROJECTS } from "@/content/projects";
import { SITE } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero. No "welcome to my portfolio", no typewriter, no illustration.
          The strongest claim Hedra has is the first thing on the page. */}
      <Container as="section" className="py-(--spacing-section)">
        <h1>{SITE.name}</h1>
        <p className="text-text-muted mt-5 text-[1.375rem] leading-snug">
          {SITE.role}
        </p>
        <p className="max-w-measure mt-8">
          I led a 5-developer team to build EduGenie, an AI-powered e-learning
          platform: a NestJS backend of{" "}
          <span className="text-accent font-medium">188 REST endpoints</span>, a
          RAG pipeline, and Stripe Connect payments — designed, built and
          deployed in six weeks.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href={`/projects/${EDUGENIE.slug}`} className="btn btn-primary">
            View EduGenie
          </Link>
          {SITE.links.github !== null && (
            <a
              href={SITE.links.github}
              target="_blank"
              rel="me noopener noreferrer"
              className="btn btn-secondary"
            >
              GitHub
            </a>
          )}
        </div>
      </Container>

      <Section number="01" title="Selected work" id="work">
        <div className="grid gap-16 md:grid-cols-2 md:gap-10">
          {PROJECTS.map((project) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section number="02" title="Skills">
        <p className="text-text-muted max-w-measure">
          Grouped by how well I actually know them. The second group is the
          honest one — I have shipped with all of it and would not claim to have
          mastered any of it.
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <div key={group.level} className="border-border border-t pt-5">
              <h3 className="text-[1.125rem]">{group.level}</h3>
              <p className="label mt-2 normal-case">{group.note}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="tag">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section number="03" title="Background">
        <ul className="border-border border-t">
          {BACKGROUND.map((entry) => (
            <li
              key={entry.title}
              className="border-border flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b py-5"
            >
              <span className="font-medium">{entry.title}</span>
              <span className="text-text-muted mr-auto">{entry.detail}</span>
              {entry.period !== "" && (
                <span className="label">{entry.period}</span>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section number="04" title="Contact">
        <p className="max-w-measure">
          Open to full-stack and backend roles. The fastest way to reach me is
          email — it is a real address and I read it.
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {SITE.links.email !== null && (
            <li>
              <a href={`mailto:${SITE.links.email}`} className="link">
                {SITE.links.email}
              </a>
            </li>
          )}
          {SITE.links.github !== null && (
            <li>
              <a
                href={SITE.links.github}
                target="_blank"
                rel="me noopener noreferrer"
                className="link"
              >
                GitHub
              </a>
            </li>
          )}
          {SITE.links.linkedin !== null && (
            <li>
              <a
                href={SITE.links.linkedin}
                target="_blank"
                rel="me noopener noreferrer"
                className="link"
              >
                LinkedIn
              </a>
            </li>
          )}
          <li>
            <a href="/cv" className="link">
              Download CV (PDF)
            </a>
          </li>
        </ul>
      </Section>
    </>
  );
}
