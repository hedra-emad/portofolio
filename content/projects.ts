/**
 * Project content.
 *
 * Every number in this file was counted from the source repositories, not
 * copied from a CV. Each carries a `source` — the glob or query that produces
 * it — and the `Cite` component renders that source next to the claim. If a
 * number cannot be traced to a command someone else could run, it does not
 * belong here.
 *
 * Two figures from the original brief did not survive that check and were
 * corrected; see the notes on `EDUGENIE.stats`.
 */

export type Stat = {
  readonly label: string;
  readonly value: string;
  /** How this number can be reproduced. Rendered verbatim, in mono. */
  readonly source: string;
  /** At most two per page. */
  readonly accent?: boolean;
};

export type RepoLink = {
  readonly label: string;
  readonly href: string;
};

export type Project = {
  readonly slug: string;
  readonly name: string;
  readonly role: string;
  readonly team: string;
  readonly period: string;
  /** One sentence. Shown on the landing card. */
  readonly summary: string;
  readonly stack: readonly string[];
  readonly repos: readonly RepoLink[];
  /** Empty when there is no reachable deployment. The card then shows no
   *  "Live" link rather than one that 404s. */
  readonly live: readonly RepoLink[];
  readonly stats: readonly Stat[];
};

export const EDUGENIE: Project = {
  slug: "edugenie",
  name: "EduGenie",
  role: "Team Leader & Full-Stack Developer",
  team: "Team of 5",
  period: "May – Jul 2026 · 6-week build",
  summary:
    "An AI-powered e-learning platform: course delivery, quizzes, certification, instructor payouts, and a study coach grounded in course material via RAG.",
  stack: [
    "typescript",
    "nestjs",
    "mongodb",
    "next.js",
    "angular",
    "stripe connect",
    "openai",
    "gemini",
    "socket.io",
  ],
  repos: [
    {
      label: "edugenie-api",
      href: "https://github.com/hedra-emad/edugenie-api",
    },
    {
      label: "edugenie-student-web",
      href: "https://github.com/hedra-emad/edugenie-student-web",
    },
    {
      label: "edugenie-dashboard",
      href: "https://github.com/hedra-emad/edugenie-dashboard",
    },
  ],
  live: [
    {
      label: "Student app",
      href: "https://edugenie-student-web.vercel.app",
    },
    {
      label: "Admin dashboard",
      href: "https://edugenie-dashboard.vercel.app",
    },
  ],
  stats: [
    {
      label: "rest endpoints",
      value: "188",
      accent: true,
      source: "@Get|@Post|@Put|@Patch|@Delete in src/**/*.controller.ts",
    },
    {
      // The brief said 32. There are 32 *.module.ts files, but one of them is
      // app.module.ts, which is the composition root and not a feature. 31 is
      // the defensible number, and the difference is exactly the kind of thing
      // an interviewer pulls the thread on.
      label: "feature modules",
      value: "31",
      source: "src/**/*.module.ts, excluding app.module.ts",
    },
    {
      label: "jest tests, green",
      value: "140",
      source: "it() and test() across 33 *.spec.ts files",
    },
    {
      label: "roles with rbac",
      value: "4",
      source: "student, instructor, admin, superadmin",
    },
  ],
} as const;

/**
 * Student-app figures. Kept separate from the headline strip so the four
 * numbers above stay the four numbers that matter.
 *
 * The brief claimed "160+ components". That number is not reproducible: the
 * app has 167 .tsx files in total, but that count includes pages, layouts and
 * route files. Counting actual component files under src/components gives 120.
 * The smaller, true number is on the site.
 */
export const EDUGENIE_WEB_STATS: readonly Stat[] = [
  {
    label: "routes",
    value: "28",
    source: "src/app/**/page.tsx",
  },
  {
    label: "components",
    value: "120",
    source: "src/components/**/*.tsx",
  },
] as const;

export const OPTERN: Project = {
  slug: "optern",
  name: "Optern",
  role: "Front-End Developer",
  team: "Team of 4",
  period: "Nov 2024 – Jun 2025",
  summary:
    "A virtual job-preparation platform: AI mock interviews, an AI CV builder, and virtual collaboration rooms.",
  stack: ["next.js", "typescript", "graphql", "apollo client", "redux toolkit"],
  repos: [
    {
      label: "Optern-Frontend",
      href: "https://github.com/AbdelattyBadwy16/Optern-Frontend",
    },
  ],
  // optern.vercel.app returns 404. No live link until there is a live app.
  live: [],
  stats: [
    {
      label: "merged pull requests",
      value: "48",
      accent: true,
      // This one is checkable in a single click, by anyone, right now.
      source:
        "github.com/AbdelattyBadwy16/Optern-Frontend/pulls?q=is:pr+author:hedra-emad+is:merged",
    },
  ],
} as const;

export const PROJECTS: readonly Project[] = [EDUGENIE, OPTERN];
