import type { Metadata } from "next";

import { ProjectHeader } from "@/components/project-header";
import { Section } from "@/components/section";
import { StatStrip } from "@/components/stat-strip";
import { Todo } from "@/components/todo";
import { OPTERN } from "@/content/projects";

export const metadata: Metadata = {
  title: "Optern",
  description:
    "A virtual job-preparation platform — AI mock interviews, an AI CV builder, and collaboration rooms. 48 merged pull requests, Next.js and GraphQL, team of 4.",
};

export default function OpternPage() {
  return (
    <>
      <ProjectHeader project={OPTERN} />

      <Section number="01" title="What it is">
        <p className="max-w-measure">
          A virtual job-preparation platform: AI mock interviews, an AI CV
          builder, and virtual collaboration rooms where teams run a workspace
          and a sprint board together.
        </p>
      </Section>

      <Section number="02" title="What I built">
        <p className="max-w-measure">
          Front-end developer in a team of four. I shipped 48 merged pull
          requests covering the blog module, the user profile, notifications,
          the full authentication flow, and the collaboration-room features —
          room creation, join requests, the workspace, and the sprint boards.
        </p>
        <p className="max-w-measure mt-6">
          It is a Next.js and TypeScript front end talking to a GraphQL API
          through Apollo Client, with Redux Toolkit for client state, laid out
          in a domain / application / infrastructure / presentation
          architecture.
        </p>
        <div className="mt-10">
          <StatStrip stats={OPTERN.stats} />
        </div>
        <p className="text-text-muted max-w-measure mt-6">
          That number is a link. It opens the merged-PR search on the team
          repository, filtered to my username — the count is GitHub&rsquo;s, not
          mine.
        </p>
      </Section>

      <Section number="03" title="Engineering decision">
        <p className="text-text-muted max-w-measure">
          One is enough here. The obvious candidate is the layered architecture:
          a domain / application / infrastructure / presentation split is a
          heavy structure for a front end, and it is the decision a reviewer
          would question first.
        </p>
        <Todo>
          Pick one decision and write it as: the problem, the options, what you
          chose, the trade-off you accepted. Candidates — why a layered
          domain/application/infrastructure/presentation architecture in a
          front-end app, and what it cost in ceremony for what it bought in
          testability; or why Redux Toolkit alongside Apollo Client, given that
          Apollo already has a cache, and where you drew the line between server
          state and client state. Include a real snippet from the repository.
          150–250 words.
        </Todo>
      </Section>
    </>
  );
}
