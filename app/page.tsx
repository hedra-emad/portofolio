import Link from "next/link";

import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { BACKGROUND as BACKGROUND_ITEMS, SKILL_GROUPS } from "@/content/cv";
import { METRICS } from "@/content/metrics";
import { EDUGENIE, OPTERN } from "@/content/projects";
import { SITE } from "@/lib/site";

const DOT: Record<string, string> = {
  teal: "bg-accent shadow-[0_0_10px_var(--accent)]",
  blue: "bg-accent-2 shadow-[0_0_10px_var(--accent-2)]",
  ai: "bg-accent rounded-full shadow-[0_0_12px_var(--accent)]",
  neutral: "bg-text-muted shadow-[0_0_10px_rgba(154,167,184,0.6)]",
};

const TAG_VARIANT: Record<string, string> = {
  teal: "tag-teal",
  blue: "tag-blue",
  ai: "tag-ai",
  neutral: "",
};

const SECTION = "mx-auto max-w-wide px-[clamp(20px,5vw,72px)]";

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section
        id="top"
        className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-[clamp(20px,5vw,72px)] pt-[120px] pb-[90px]"
      >
        {/* Static grid overlay, masked to a soft vignette. No pan animation. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] [mask-image:radial-gradient(circle_at_50%_40%,#000_20%,transparent_78%)] bg-[size:60px_60px]"
        />

        <div className="relative max-w-[1100px]">
          <Reveal>
            <p className="text-accent mb-[30px] inline-flex items-center gap-[10px] rounded-full border border-[rgba(47,240,221,0.3)] bg-[rgba(47,240,221,0.05)] px-[14px] py-[7px] font-mono text-[13px]">
              <span
                aria-hidden
                className="bg-accent size-[7px] rounded-full shadow-[0_0_10px_var(--accent)]"
              />
              Available for full-stack / backend roles
            </p>
          </Reveal>

          <Reveal>
            <h1 className="mb-[26px] leading-[0.98]">
              Full-Stack Developer
              <br />
              building <span className="gradient-text">AI-native</span> products
            </h1>
          </Reveal>

          <Reveal>
            <p className="text-text-muted text-lead mb-[40px] max-w-[660px] leading-[1.65]">
              I&rsquo;m{" "}
              <strong className="text-text font-semibold">
                Hedra Emad Fawzy
              </strong>{" "}
              — working in TypeScript across the Node.js and React ecosystems. I
              led a 5-developer team as Team Leader on{" "}
              <strong className="text-accent font-semibold">EduGenie</strong>,
              and trained through the{" "}
              <strong className="text-text font-semibold">
                ITI Intensive Code Camp
              </strong>{" "}
              (618 hours, full-stack and generative AI).
            </p>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#work" className="btn btn-primary">
                View my work →
              </Link>
              <Link href="#contact" className="btn btn-ghost">
                Contact me
              </Link>
              <a href="/cv" className="btn btn-ghost">
                Download CV ↗
              </a>
              <div className="ml-[6px] flex gap-[10px]">
                {SITE.links.github !== null && (
                  <a
                    href={SITE.links.github}
                    target="_blank"
                    rel="me noopener noreferrer"
                    aria-label="GitHub"
                    className="text-text-sub hover:text-accent flex size-[50px] items-center justify-center rounded-[12px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.02)] transition-colors hover:border-[rgba(47,240,221,0.5)]"
                  >
                    <GitHubIcon />
                  </a>
                )}
                {SITE.links.linkedin !== null && (
                  <a
                    href={SITE.links.linkedin}
                    target="_blank"
                    rel="me noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-text-sub hover:text-accent flex size-[50px] items-center justify-center rounded-[12px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.02)] transition-colors hover:border-[rgba(47,240,221,0.5)]"
                  >
                    <LinkedInIcon />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- METRICS */}
      <section className={`${SECTION} pt-[40px] pb-[90px]`}>
        <Reveal>
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-[18px]">
            {METRICS.map((metric) => (
              <div key={metric.label} className="card card-hover p-[34px]">
                <dd
                  className={`font-display text-[clamp(40px,5vw,56px)] leading-none font-bold ${
                    metric.color === "teal" ? "text-accent" : "text-accent-2"
                  }`}
                >
                  <Counter value={metric.value} suffix={metric.suffix} />
                </dd>
                <dt className="text-text-muted mt-[12px] text-[14px] leading-[1.4]">
                  {metric.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* -------------------------------------------------------------- SKILLS */}
      <section
        id="skills"
        className={`${SECTION} scroll-mt-24 pt-[60px] pb-[100px]`}
      >
        <Reveal>
          <div className="mb-[46px]">
            <p className="eyebrow">{"// 01 — capabilities"}</p>
            <h2 className="mt-[10px]">Technical skill matrix</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
          {SKILL_GROUPS.map((group) => (
            <Reveal key={group.level}>
              <div
                className={`card card-hover h-full p-[30px] ${
                  group.dot === "ai"
                    ? "border-[rgba(47,240,221,0.28)] bg-[linear-gradient(160deg,rgba(47,240,221,0.06),rgba(77,141,255,0.03))]"
                    : ""
                }`}
              >
                <div className="mb-[20px] flex items-center gap-[10px]">
                  <span
                    aria-hidden
                    className={`size-[8px] rounded-[2px] ${DOT[group.dot]}`}
                  />
                  <span className="font-display text-text-bright text-[18px] font-semibold">
                    {group.level}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-[9px]">
                  {group.skills.map((skill) => (
                    <li key={skill} className={`tag ${TAG_VARIANT[group.dot]}`}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------------- WORK */}
      <section
        id="work"
        className={`${SECTION} scroll-mt-24 pt-[60px] pb-[100px]`}
      >
        <Reveal>
          <div className="mb-[46px]">
            <p className="eyebrow">{"// 02 — selected work"}</p>
            <h2 className="mt-[10px]">Featured projects</h2>
          </div>
        </Reveal>

        {/* EduGenie */}
        <Reveal>
          <div className="card card-hover mb-[26px] p-[clamp(26px,3.5vw,48px)]">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] items-start gap-[clamp(24px,3vw,48px)]">
              <div>
                <div className="mb-[16px] flex flex-wrap items-center gap-[12px]">
                  <span className="bg-accent text-accent-contrast rounded-[6px] px-[11px] py-[5px] font-mono text-[12px] font-semibold">
                    team leader
                  </span>
                  <span className="text-text-muted font-mono text-[12px]">
                    NestJS · MongoDB · Next.js · Stripe
                  </span>
                </div>
                <h3 className="mb-[14px]">EduGenie</h3>
                <p className="text-text-muted mb-[22px] text-[16px] leading-[1.65]">
                  An AI-powered e-learning platform, built and deployed in six
                  weeks. I led a 5-developer team, architected a{" "}
                  <strong className="text-text-sub">
                    188-endpoint NestJS and MongoDB backend
                  </strong>{" "}
                  across 31 feature modules, and integrated{" "}
                  <strong className="text-text-sub">Stripe Connect</strong>{" "}
                  payments end to end with signature-verified webhooks and
                  automated instructor payouts.
                </p>
                <div className="flex flex-wrap items-center gap-[14px]">
                  <Link
                    href={`/projects/${EDUGENIE.slug}`}
                    className="btn btn-primary text-[14px]"
                  >
                    Read the case study →
                  </Link>
                  {EDUGENIE.live[0] !== undefined && (
                    <a
                      href={EDUGENIE.live[0].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost text-[14px]"
                    >
                      Live demo ↗
                    </a>
                  )}
                </div>
              </div>

              <div className="ai-glow p-[26px]">
                <div className="mb-[18px] inline-flex items-center gap-[9px] rounded-full border border-[rgba(47,240,221,0.6)] bg-[rgba(47,240,221,0.12)] px-[12px] py-[6px] font-mono text-[12px] text-[#d7fbf6]">
                  <span
                    aria-hidden
                    className="bg-accent size-[7px] rounded-full shadow-[0_0_12px_var(--accent)]"
                  />
                  AI features
                </div>
                <ul className="flex list-none flex-col gap-[13px]">
                  {[
                    <>
                      <strong className="text-text-bright">RAG pipeline</strong>{" "}
                      — chunking, embeddings and semantic retrieval powering an
                      AI study coach.
                    </>,
                    <>
                      Auto-generated{" "}
                      <strong className="text-text-bright">
                        learning roadmaps
                      </strong>{" "}
                      and remediation flows.
                    </>,
                    <>
                      Swappable{" "}
                      <strong className="text-text-bright">
                        OpenAI and Gemini
                      </strong>{" "}
                      provider for lecture transcription.
                    </>,
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-[11px] text-[14px] leading-[1.45] text-[#d5dde8]"
                    >
                      <span aria-hidden className="text-accent font-mono">
                        ▹
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Optern */}
        <Reveal>
          <div className="card card-hover p-[clamp(26px,3.5vw,48px)]">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] items-center gap-[clamp(24px,3vw,48px)]">
              <div>
                <div className="mb-[16px] flex flex-wrap items-center gap-[12px]">
                  <span className="text-accent-2 rounded-[6px] border border-[rgba(77,141,255,0.4)] bg-[rgba(77,141,255,0.08)] px-[11px] py-[5px] font-mono text-[12px] font-semibold">
                    front-end
                  </span>
                  <span className="text-text-muted font-mono text-[12px]">
                    Next.js · GraphQL · Apollo · Redux
                  </span>
                </div>
                <h3 className="mb-[14px]">Optern</h3>
                <p className="text-text-muted mb-[22px] text-[16px] leading-[1.65]">
                  A virtual job-preparation platform with AI-driven mock
                  interviews and CV building. As front-end developer I delivered{" "}
                  <strong className="text-text-sub">
                    48 merged pull requests
                  </strong>
                  , built the{" "}
                  <strong className="text-text-sub">collaboration rooms</strong>{" "}
                  (workspace and sprint boards), the full auth flow, and
                  consumed{" "}
                  <strong className="text-text-sub">GraphQL APIs</strong> via
                  Apollo Client within a layered architecture.
                </p>
                <Link
                  href={`/projects/${OPTERN.slug}`}
                  className="btn btn-ghost text-[14px]"
                >
                  Read the case study →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-[12px]">
                <div className="card p-[20px]">
                  <div className="font-display text-accent-2 text-[32px] font-bold">
                    48
                  </div>
                  <div className="text-text-muted mt-[4px] text-[12px]">
                    merged PRs
                  </div>
                </div>
                <div className="card p-[20px]">
                  <div className="font-display text-accent-2 text-[32px] font-bold">
                    4
                  </div>
                  <div className="text-text-muted mt-[4px] text-[12px]">
                    dev team
                  </div>
                </div>
                <div className="card col-span-2 p-[18px]">
                  <div className="text-text-muted font-mono text-[12px] leading-[1.6]">
                    collaboration rooms · sprint boards · blog · auth flow ·
                    shared component library
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------ JOURNEY */}
      <JourneySection />

      {/* ------------------------------------------------------------ CONTACT */}
      <ContactSection />
    </>
  );
}

function JourneySection() {
  const line: Record<string, string> = {
    teal: "border-accent shadow-[0_0_14px_rgba(47,240,221,0.6)]",
    blue: "border-accent-2 shadow-[0_0_14px_rgba(77,141,255,0.5)]",
    neutral: "border-text-muted",
  };
  const meta: Record<string, string> = {
    teal: "text-accent",
    blue: "text-accent-2",
    neutral: "text-text-muted",
  };
  return (
    <section
      id="journey"
      className="mx-auto max-w-[1000px] scroll-mt-24 px-[clamp(20px,5vw,72px)] pt-[60px] pb-[100px]"
    >
      <Reveal>
        <div className="mb-[46px]">
          <p className="eyebrow">{"// 03 — the journey"}</p>
          <h2 className="mt-[10px]">Education &amp; training</h2>
        </div>
      </Reveal>
      <div className="relative flex flex-col gap-[28px] pl-[34px]">
        <div
          aria-hidden
          className="absolute top-[6px] bottom-[6px] left-[7px] w-[2px] bg-[linear-gradient(#2ff0dd,#4d8dff,rgba(77,141,255,0.1))]"
        />
        {BACKGROUND_ITEMS.map((entry) => (
          <Reveal key={entry.title} className="relative">
            <span
              aria-hidden
              className={`bg-bg absolute top-[4px] left-[-34px] size-[16px] rounded-full border-2 ${line[entry.dot]}`}
            />
            <div className="card card-hover p-[28px]">
              <div
                className={`mb-[10px] font-mono text-[12px] ${meta[entry.dot]}`}
              >
                {entry.period}
              </div>
              <h3 className="mb-[8px] text-[21px] font-semibold">
                {entry.title}
              </h3>
              <p className="text-text-muted text-[14px] leading-[1.6]">
                {entry.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const cvHref = "/cv";
  return (
    <section
      id="contact"
      className="border-border relative scroll-mt-24 border-t px-[clamp(20px,5vw,72px)] pt-[70px] pb-[50px]"
    >
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <div className="mb-[50px] text-center">
            <p className="eyebrow">{"// 04 — let’s build something"}</p>
            <h2 className="mt-[14px] text-[clamp(32px,6vw,68px)] leading-[1.02]">
              Get in touch<span className="text-accent">_</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[16px]">
            {SITE.links.email !== null && (
              <a
                href={`mailto:${SITE.links.email}`}
                className="card card-hover block p-[26px]"
              >
                <div className="text-accent mb-[10px] font-mono text-[12px]">
                  email
                </div>
                <div className="text-text font-medium">{SITE.links.email}</div>
              </a>
            )}
            {SITE.links.phone !== null && (
              <a
                href={`tel:${SITE.links.phone}`}
                className="card card-hover block p-[26px]"
              >
                <div className="text-accent mb-[10px] font-mono text-[12px]">
                  phone
                </div>
                <div className="text-text font-medium">{SITE.links.phone}</div>
              </a>
            )}
            {SITE.links.location !== null && (
              <div className="card p-[26px]">
                <div className="text-accent mb-[10px] font-mono text-[12px]">
                  location
                </div>
                <div className="text-text font-medium">
                  {SITE.links.location}
                </div>
              </div>
            )}
            <div className="card p-[26px]">
              <div className="text-accent mb-[14px] font-mono text-[12px]">
                profiles
              </div>
              <div className="flex flex-col gap-[10px]">
                {SITE.links.github !== null && (
                  <a
                    href={SITE.links.github}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="text-text hover:text-accent font-medium"
                  >
                    GitHub ↗
                  </a>
                )}
                {SITE.links.linkedin !== null && (
                  <a
                    href={SITE.links.linkedin}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="text-text hover:text-accent font-medium"
                  >
                    LinkedIn ↗
                  </a>
                )}
              </div>
            </div>
            <a href={cvHref} className="card card-hover block p-[26px]">
              <div className="text-accent mb-[10px] font-mono text-[12px]">
                résumé
              </div>
              <div className="text-text font-medium">Download CV ↗</div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
