/**
 * Skills and background, transcribed from Hedra's CV. Nothing is added here
 * that is not on the CV — in particular Angular, which EduGenie's admin
 * dashboard is written in, is deliberately absent. The case study says so,
 * because the case study describes history; the skills list advertises what he
 * would take a job doing, and that is a different claim.
 */

export type SkillGroup = {
  /** The honesty of these labels is the feature. A senior engineer reads
   *  "working knowledge" as maturity, and reads an undifferentiated wall of
   *  twenty logos as noise. */
  readonly level: string;
  readonly note: string;
  readonly skills: readonly string[];
};

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    level: "Proficient",
    note: "Used daily, across projects, without reaching for docs.",
    skills: [
      "TypeScript",
      "JavaScript (ES6+)",
      "Node.js",
      "NestJS",
      "Express.js",
      "React.js",
      "Next.js",
      "MongoDB & Mongoose",
      "REST API design",
      "Jest",
      "Git",
    ],
  },
  {
    level: "Working knowledge",
    note: "Shipped with, productive in, still learning the depths.",
    skills: [
      "GraphQL & Apollo",
      "SQL Server",
      "Redux Toolkit",
      "TanStack Query",
      "Tailwind",
      "Socket.IO",
      "Stripe API",
      "Vercel / Railway",
    ],
  },
  {
    level: "AI engineering",
    note: "The parts of EduGenie I owned personally.",
    skills: [
      "RAG",
      "Embeddings & semantic search",
      "OpenAI API",
      "Google Gemini API",
      "Prompt engineering",
    ],
  },
] as const;

export type BackgroundEntry = {
  readonly title: string;
  readonly detail: string;
  readonly period: string;
};

export const BACKGROUND: readonly BackgroundEntry[] = [
  {
    title: "ITI Intensive Code Camp",
    detail: "618 hours — MERN stack and generative AI",
    period: "",
  },
  {
    title: "B.Sc. Computer Science",
    detail: "South Valley University",
    period: "2021 – 2025",
  },
  {
    title: "Route Academy Full-Stack Diploma",
    detail: "9 months",
    period: "",
  },
] as const;
