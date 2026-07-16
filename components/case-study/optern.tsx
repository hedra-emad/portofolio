import { CodeSample } from "@/components/code-sample";
import { ProjectHeader } from "@/components/project-header";
import { Section } from "@/components/section";
import { StatStrip } from "@/components/stat-strip";
import { OPTERN } from "@/content/projects";

const REPO = "https://github.com/hedra-emad/Optern-Frontend/blob/master";

/**
 * The Optern case study, rendered inline as section `04` of the single-page
 * site. Its internal sections are numbered `04.x`.
 */
export function OpternCaseStudy() {
  return (
    <section id="optern" className="scroll-mt-24">
      <ProjectHeader project={OPTERN} number="04" />

      <Section number="04.1" title="What it is">
        <p className="max-w-measure">
          A virtual job-preparation platform: AI mock interviews, an AI CV
          builder, and virtual collaboration rooms where teams run a workspace
          and a sprint board together.
        </p>
      </Section>

      <Section number="04.2" title="What I built">
        <p className="max-w-measure">
          Front-end developer in a team of four. I shipped 48 merged pull
          requests covering the blog module, the user profile, notifications,
          the full authentication flow, and the collaboration-room features —
          room creation, join requests, the workspace, and the sprint boards.
        </p>
        <p className="max-w-measure mt-6">
          It is a Next.js and TypeScript front end talking to a REST backend
          through a hand-rolled <code>HttpClient</code>, with Redux Toolkit for
          state, laid out in a domain / application / infrastructure /
          presentation architecture.
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

      <Section number="04.3" title="Engineering decision">
        <p className="text-text-muted max-w-measure">
          One is enough here. The obvious candidate is the layered architecture:
          a domain / application / infrastructure / presentation split is a
          heavy structure for a front end, and it is the decision a reviewer
          would question first.
        </p>
        <p className="max-w-measure mt-6">
          The problem: Optern is a large front end — rooms, workspaces, sprint
          boards, posts, profiles, auth — over a REST backend. Left flat, that
          becomes the usual mess: fetch calls scattered through components, URLs
          hard-coded in JSX, response shapes redefined in every file. The
          conventional Next.js answer lets components fetch directly and keeps
          types local — fast to start, but every backend change means hunting
          through components. I went the other way: a domain / application /
          infrastructure / presentation split, each layer depending only inward.{" "}
          <code>domain</code> holds framework-free entities and enums;{" "}
          <code>infrastructure</code> owns all server I/O behind a single{" "}
          <code>HttpClient</code> and per-entity API classes;{" "}
          <code>application</code> is the Redux Toolkit slices, typed against
          the domain entities; <code>presentation</code> is the components.
        </p>
        <CodeSample
          path="src/application/root.state.ts"
          href={`${REPO}/src/application/root.state.ts`}
          code={`import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user.slice";
import postsReducer from "./slice/posts.slice";
import settingReducer from "./slice/setting.slice";
import roomsReducer from "./slice/room.slice";
import workspaceReducer from "./slice/workspace.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postsReducer,
    setting: settingReducer,
    rooms: roomsReducer,
    workspace: workspaceReducer,
  },
});
export default store;`}
        />
        <p className="max-w-measure mt-6">
          The line I drew: <code>infrastructure</code> fetches and maps,{" "}
          <code>application</code> holds, <code>presentation</code> renders. A
          component never fetches directly and never sees a raw response shape —
          it dispatches to a slice or calls an API class. The trade-off is real
          ceremony: one feature touches four folders where a flat approach needs
          one file, a genuine cost in speed on a six-week build. What it bought:
          the backend contract lives in one layer, so an API change is one edit
          and not a repo-wide hunt; domain types are defined once, so state
          cannot silently drift from the model; and with I/O isolated behind{" "}
          <code>HttpClient</code>, the fetch mechanism can be swapped or mocked
          for tests without touching the UI. On a team of four, everyone knowing
          which folder a change belongs in was worth the extra files.
        </p>
      </Section>
    </section>
  );
}
