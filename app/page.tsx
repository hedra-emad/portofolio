import type { Metadata } from "next";

import { Cite } from "@/components/cite";
import { Container, Grid } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { StatStrip, type Stat } from "@/components/stat-strip";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Design system",
  description: "Type scale, colour tokens, grid and components.",
};

const TYPE_SCALE = [
  {
    role: "Display",
    token: "--text-display",
    spec: "56 → 64px / 500 / -0.02em",
  },
  { role: "Heading 2", token: "--text-h2", spec: "32px / 500 / -0.015em" },
  { role: "Heading 3", token: "--text-h3", spec: "22px / 500 / -0.01em" },
  { role: "Body", token: "--text-body", spec: "18px / 400 / 1.7" },
  { role: "Caption", token: "--text-caption", spec: "14px / 400" },
  { role: "Mono label", token: "--text-label", spec: "13px / 400 / 0.02em" },
] as const;

const SWATCHES = [
  { token: "--bg", value: "#FAFAF8", use: "page", contrast: null },
  { token: "--surface", value: "#FFFFFF", use: "cards, code", contrast: null },
  {
    token: "--text",
    value: "#111111",
    use: "body, headings",
    contrast: "18.07:1",
  },
  {
    token: "--text-muted",
    value: "#5F5E5A",
    use: "metadata",
    contrast: "6.21:1",
  },
  { token: "--border", value: "#E3E1DA", use: "hairlines", contrast: null },
  {
    token: "--accent",
    value: "#0F6E56",
    use: "links, key numbers",
    contrast: "5.94:1",
  },
] as const;

/* Real numbers, from PORTFOLIO_BRIEF.md §5.4 — every one verifiable from the
   EduGenie repo. Shown here because a component demo built on invented data is
   a component demo you cannot trust. */
const DEMO_STATS: readonly Stat[] = [
  { label: "rest endpoints", value: "188", accent: true },
  { label: "feature modules", value: "32" },
  { label: "jest tests, green", value: "140" },
  { label: "week build, team of 5", value: "6" },
];

const TAGS = ["typescript", "nestjs", "next.js", "mongodb", "stripe", "rag"];

export default function DesignSystemPage() {
  return (
    <>
      <Container className="py-(--spacing-section)">
        <p className="label mb-6">phase 1 / specimen</p>
        <h1>Design system</h1>
        <p className="text-text-muted max-w-measure mt-8">
          Swiss editorial grid, light only. Two families: Inter Tight carries
          the argument, IBM Plex Mono carries the apparatus — section numbers,
          stat labels, dates, tags, file paths, code. Keeping those two
          registers strictly separate is what makes the page read as engineered
          rather than arranged. This route becomes the landing page in phase 2.
        </p>
      </Container>

      <Section number="01" title="Grid">
        <p className="text-text-muted max-w-measure">
          Twelve columns at 1152px, four on a phone. Every block declares a
          span; nothing floats. The columns below are drawn only to prove they
          exist — they are never drawn on the real pages.
        </p>
        <Grid className="mt-8">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="border-border bg-surface h-16 border"
              aria-hidden
            />
          ))}
        </Grid>
      </Section>

      <Section number="02" title="Type">
        <ul className="border-border border-t">
          {TYPE_SCALE.map((step) => (
            <li
              key={step.token}
              className="border-border flex flex-wrap items-baseline justify-between gap-4 border-b py-6"
            >
              <span
                className="font-medium"
                style={{
                  fontSize: `var(${step.token})`,
                  letterSpacing:
                    step.token === "--text-display" ? "-0.02em" : "-0.01em",
                  lineHeight: 1.15,
                }}
              >
                {step.role}
              </span>
              <span className="label">{step.spec}</span>
            </li>
          ))}
        </ul>

        <div className="max-w-measure mt-12">
          <h3>Prose sits at 68 characters</h3>
          <p className="mt-4">
            Body copy is 18px with a line-height of 1.7 and a measure capped at
            68 characters. That cap is why this column stops well short of the
            page edge: past roughly 75 characters the eye loses its place on the
            return sweep, and an over-long line is the single most common
            failure of layouts that call themselves minimal. Two weights on this
            site, 400 and 500 — never 600 or 700, because a bold grotesque at
            display size reads as shouting.
          </p>
          <p className="mt-6">
            Links are the accent with a 1px underline —{" "}
            <a href="#main" className="link">
              like this one
            </a>{" "}
            — because colour on its own is not an accessible way to mark a link.
            Sentence case everywhere. Mono labels are lowercase.
          </p>
        </div>
      </Section>

      <Section number="03" title="Colour">
        <p className="text-text-muted max-w-measure">
          Every ratio below was computed against the page background rather than
          eyeballed. The weakest pairing on the site is the accent at 5.94:1,
          past the 4.5:1 AA threshold for body text at any size. Light only: one
          well-executed theme, and a whole class of contrast bugs that cannot
          occur.
        </p>
        <ul className="border-border mt-8 grid border-t sm:grid-cols-2 lg:grid-cols-3">
          {SWATCHES.map((swatch) => (
            <li
              key={swatch.token}
              className="border-border flex items-center gap-4 border-r border-b p-5"
            >
              <span
                aria-hidden
                className="border-border size-10 shrink-0 border"
                style={{ backgroundColor: swatch.value }}
              />
              <span className="min-w-0">
                <span className="label block normal-case">{swatch.token}</span>
                <span className="label block">
                  {swatch.value} · {swatch.use}
                  {swatch.contrast === null ? "" : ` · ${swatch.contrast}`}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section number="04" title="Components">
        <h3>Stat strip</h3>
        <p className="text-text-muted max-w-measure mt-3">
          A row, not cards. Mono label above, number below, hairline dividers,
          no shadows. The accent is rationed to at most two numbers per page.
        </p>
        <div className="mt-6">
          <StatStrip stats={DEMO_STATS} />
        </div>

        <h3 className="mt-14">Citation line</h3>
        <p className="text-text-muted max-w-measure mt-3">
          The brief&rsquo;s first principle is that every claim here is
          verifiable in one click, and that the site has to survive{" "}
          <em>&ldquo;how much of this did AI write?&rdquo;</em>. A sentence
          promising that does not survive the question; a visible, repeated
          apparatus does. So a claim and its evidence are one component — hung
          off a hairline, in mono, naming the file or link it came from.
        </p>
        <Cite
          source="github.com/hedra-emad"
          href={SITE.links.github ?? undefined}
        >
          <p className="max-w-measure">
            188 REST endpoints across 32 feature modules.
          </p>
        </Cite>

        <h3 className="mt-14">Tech tags</h3>
        <ul className="mt-6 flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>

        <h3 className="mt-14">Code</h3>
        <p className="text-text-muted max-w-measure mt-3">
          Evidence, not a light show. Surface background, 1px hairline, 4px
          radius, no syntax circus. Code breaks out of the 68ch measure because
          it is not prose.
        </p>
        <pre className="code-block mt-6">
          <code>{`export function chunk(text: string, maxChars = 1800, overlap = 250) {
  // Sentence-aware windows. Never cuts mid-sentence, because an embedding
  // of half a sentence represents half a thought.
}`}</code>
        </pre>

        <h3 className="mt-14">Actions</h3>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a href="#main" className="btn btn-primary">
            View EduGenie
          </a>
          <a href="#main" className="btn btn-secondary">
            GitHub
          </a>
        </div>
      </Section>

      <Section number="05" title="Motion">
        <p className="text-text-muted max-w-measure">
          Fade and an 8px translate, 300ms, once. That is the entire vocabulary.
          The hidden state is gated in CSS on{" "}
          <code className="text-[0.9em]">scripting: enabled</code> and{" "}
          <code className="text-[0.9em]">prefers-reduced-motion</code>, so a
          reader with JavaScript off or reduced motion on is never shown a blank
          column waiting for an observer that will not fire.
        </p>
        <Reveal className="border-border bg-surface mt-8 border p-6">
          <p className="label">this block faded in — once</p>
        </Reveal>
      </Section>
    </>
  );
}
