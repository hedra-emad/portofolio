import type { Metadata } from "next";

import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Todo } from "@/components/todo";
import { BACKGROUND } from "@/content/cv";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hedra Emad Fawzy — full-stack developer working in TypeScript, NestJS, React and Next.js.",
};

export default function AboutPage() {
  return (
    <>
      <Container as="header" className="py-(--spacing-section)">
        <p className="label mb-6">about</p>
        <h1>{SITE.name}</h1>
      </Container>

      <Section number="01" title="Bio">
        <Todo>
          Two or three short paragraphs, first person. Why you build. What you
          want to work on next. What kind of team you want to join. Do not write
          a summary of your CV — the CV is one click away and says it better.
          Write the thing a CV cannot say.
        </Todo>
      </Section>

      <Section number="02" title="Background">
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

      <Section number="03" title="Elsewhere">
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
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
