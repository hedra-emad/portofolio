/**
 * Skills and background, transcribed from Hedra's CV and the design mock.
 * Nothing is added that he did not list — in particular Angular, which
 * EduGenie's admin dashboard is written in, stays absent from the skills. The
 * case study says so, because the case study describes history; the skills list
 * advertises what he would take a job doing, and that is a different claim.
 */

export type SkillGroup = {
  /** `dot` selects the accent colour of the group's marker and tag tint. */
  readonly level: string;
  readonly dot: "teal" | "blue" | "ai" | "neutral";
  readonly skills: readonly string[];
};

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    level: "Proficient",
    dot: "teal",
    skills: [
      "TypeScript",
      "JavaScript (ES6+)",
      "Node.js",
      "NestJS",
      "Express.js",
      "React.js",
      "Next.js",
      "MongoDB & Mongoose",
      "REST API Design",
      "Jest",
      "Git & GitHub",
    ],
  },
  {
    level: "Working Knowledge",
    dot: "blue",
    skills: [
      "GraphQL",
      "SQL Server",
      "Redux Toolkit",
      "TanStack Query",
      "Tailwind CSS",
      "Socket.IO",
      "Stripe API",
      "Vercel · Railway",
    ],
  },
  {
    level: "AI Engineering",
    dot: "ai",
    skills: [
      "RAG",
      "Embeddings",
      "Semantic Search",
      "OpenAI API",
      "Google Gemini API",
      "Prompt Engineering",
    ],
  },
  {
    level: "Practices",
    dot: "neutral",
    skills: [
      "RBAC",
      "JWT",
      "OAuth 2.0",
      "Secure Coding",
      "Swagger",
      "Code Review",
      "Agile / Scrum",
      "ESLint · Prettier",
    ],
  },
] as const;

export type BackgroundEntry = {
  readonly period: string;
  readonly title: string;
  readonly detail: string;
  /** Timeline marker colour. */
  readonly dot: "teal" | "blue" | "neutral";
};

export const BACKGROUND: readonly BackgroundEntry[] = [
  {
    period: "2025 – 2026 · 618 hours",
    title: "ITI Intensive Code Camp",
    detail:
      "Full-Stack Web & Generative AI using MERN — TypeScript, React, Next.js, NestJS, GraphQL, MongoDB, unit testing, secure coding and GenAI development. Information Technology Institute (ITI).",
    dot: "teal",
  },
  {
    period: "Aug 2022 – May 2023 · 9 months",
    title: "Route Academy — Full-Stack Diploma",
    detail:
      "Intensive diploma covering front-end and back-end web fundamentals, databases, and hands-on project work.",
    dot: "blue",
  },
  {
    period: "Oct 2021 – Jul 2025",
    title: "B.Sc. Computer Science & IT",
    detail:
      "Faculty of Computers and Information — Qena, South Valley University.",
    dot: "neutral",
  },
] as const;
