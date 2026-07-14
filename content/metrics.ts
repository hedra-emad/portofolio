/**
 * Hero metrics — the counters under the fold.
 *
 * The design suffixed 188 and 618 with "+". Both were verified as exact (188
 * endpoints counted from the controllers; 618 is the ITI programme's stated
 * hours), so the "+" is dropped — claiming "more than 188" when it is exactly
 * 188 is the kind of small inflation this whole site exists to avoid. The AI
 * metric keeps its "+": there are at least two providers (OpenAI, Gemini)
 * behind the RAG pipeline.
 */

export type Metric = {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
  readonly color: "teal" | "blue";
};

export const METRICS: readonly Metric[] = [
  {
    value: 188,
    suffix: "",
    label: "REST endpoints architected",
    color: "teal",
  },
  { value: 5, suffix: "", label: "developer team led", color: "blue" },
  {
    value: 618,
    suffix: "",
    label: "hours of ITI intensive coding",
    color: "teal",
  },
  {
    value: 2,
    suffix: "+",
    label: "major AI integrations · RAG, OpenAI, Gemini",
    color: "blue",
  },
] as const;
