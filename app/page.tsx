import type { Metadata } from "next";

import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Design system",
  description: "Type scale, colour tokens and component states.",
};

const TYPE_SCALE = [
  { token: "--text-display", size: "45 → 55px", sample: "Display" },
  { token: "--text-h1", size: "37 → 44px", sample: "Heading 1" },
  { token: "--text-h2", size: "31 → 35px", sample: "Heading 2" },
  { token: "--text-h3", size: "28px", sample: "Heading 3" },
  { token: "--text-lead", size: "22px", sample: "Lead paragraph" },
  { token: "--text-base", size: "18px", sample: "Body copy" },
  { token: "--text-sm", size: "16px", sample: "Caption / nav" },
  { token: "--text-xs", size: "14px", sample: "Label / meta" },
] as const;

const BODY_STEPS: readonly string[] = ["--text-base", "--text-sm", "--text-xs"];

const SWATCHES = [
  { token: "--bg", role: "Page background", contrast: null },
  { token: "--surface", role: "Raised surface", contrast: null },
  { token: "--border", role: "Hairline rule", contrast: null },
  {
    token: "--fg",
    role: "Body text",
    contrast: "18.03:1 light · 15.81:1 dark",
  },
  { token: "--fg-muted", role: "Secondary text", contrast: "6.93:1 · 6.68:1" },
  {
    token: "--accent",
    role: "Links, active states",
    contrast: "5.86:1 · 6.57:1",
  },
] as const;

export default function DesignSystemPage() {
  return (
    <Container width="wide" className="py-16">
      <p className="border-border bg-surface text-fg-muted mb-10 inline-block border px-3 py-1 text-xs">
        Phase 1 specimen — this route becomes the landing page in Phase 2.
      </p>

      <h1 style={{ fontSize: "var(--text-display)" }}>Design system</h1>
      <p className="max-w-measure text-lead text-fg-muted mt-6">
        Every token below is defined once in{" "}
        <code className="text-base">app/globals.css</code> and consumed as a
        Tailwind utility. Switch your OS to dark mode and this page changes
        without a single <code className="text-base">dark:</code> class.
      </p>

      <section className="mt-20">
        <h2>Type scale</h2>
        <p className="max-w-measure text-fg-muted mt-4">
          Minor third (1.200) on a phone, major third (1.250) on a desktop. The
          three largest steps interpolate between the two with{" "}
          <code className="text-base">clamp()</code>; the rest are fixed.
        </p>

        <ul className="divide-border border-border mt-10 divide-y border-y">
          {TYPE_SCALE.map((step) => (
            <li
              key={step.token}
              className="flex flex-wrap items-baseline justify-between gap-4 py-5"
            >
              <span
                className={
                  BODY_STEPS.includes(step.token)
                    ? "font-sans"
                    : "font-serif font-semibold"
                }
                style={{ fontSize: `var(${step.token})`, lineHeight: 1.2 }}
              >
                {step.sample}
              </span>
              <span className="text-fg-muted font-mono text-xs">
                {step.token} · {step.size}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2>Colour</h2>
        <p className="max-w-measure text-fg-muted mt-4">
          Warm near-black on warm off-white, one accent. Every ratio below was
          computed against the page background in both schemes rather than
          eyeballed — the weakest pair on the site is 5.86:1, past the 4.5:1 AA
          threshold for body text at any size.
        </p>

        <ul className="border-border bg-border mt-10 grid gap-px border sm:grid-cols-2">
          {SWATCHES.map((swatch) => (
            <li
              key={swatch.token}
              className="bg-bg flex items-center gap-4 p-5"
            >
              <span
                aria-hidden
                className="border-border size-12 shrink-0 rounded border"
                style={{ backgroundColor: `var(${swatch.token})` }}
              />
              <span className="min-w-0">
                <span className="block font-mono text-sm">{swatch.token}</span>
                <span className="text-fg-muted block text-xs">
                  {swatch.role}
                  {swatch.contrast === null ? "" : ` · ${swatch.contrast}`}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2>Prose</h2>
        <div className="max-w-measure mt-6">
          <p>
            Body copy sits at 18px, line-height 1.6, measure capped at 68
            characters. That cap is why this column stops well short of the page
            edge on a wide screen: past roughly 75 characters the eye starts
            losing its place on the return sweep, and an over-long line is the
            most common failure of sites that call themselves minimal.
          </p>
          <p className="mt-6">
            Headings are set in Source Serif 4, body in Inter, code in JetBrains
            Mono. An inline link —{" "}
            <a href="#main" className="link">
              like this one
            </a>{" "}
            — takes the accent colour and keeps its underline, because colour on
            its own is not an accessible way to mark a link.
          </p>
          <pre className="border-border bg-surface mt-6 overflow-x-auto rounded border p-4 text-sm">
            <code>{`function chunk(text: string, maxChars = 1800, overlap = 250) {
  // Code breaks out of the 68ch measure. It is not prose.
}`}</code>
          </pre>
        </div>
      </section>

      <section className="mt-20">
        <h2>States</h2>
        <p className="max-w-measure text-fg-muted mt-4">
          Tab through these. Focus is a 2px accent outline at a 2px offset,
          applied globally through{" "}
          <code className="text-base">:focus-visible</code> — visible to
          keyboard users, invisible to mouse users.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#main" className="btn-primary">
            Primary action
          </a>
          <a href="#main" className="btn-secondary">
            Secondary action
          </a>
          <a href="#main" className="link">
            Text link
          </a>
        </div>
      </section>
    </Container>
  );
}
