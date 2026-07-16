# Portfolio Site — Build Brief

**For:** Claude Code
**Owner:** Hedra Emad Fawzy — Full-Stack Developer (TypeScript, NestJS, React & Next.js)
**Goal:** a portfolio that gets Hedra into technical interviews and answers a recruiter's questions before they have to ask.

---

## 0. Read this first

Hedra has **no formal employment history**. His projects *are* his experience. That single fact determines the entire design of this site:

- Projects are not a section at the bottom. **Projects are the site.**
- Every claim must be **verifiable in one click** — live demo, repo, or both.
- The site must survive the question every interviewer will ask in 2026: *"How much of this did AI write?"* The answer is not a disclaimer. The answer is **depth**: case studies that explain *why* each architectural decision was made. Anyone can ship a feature with an AI assistant; only the author can explain why they chose destination charges over separate charges. **The engineering-decisions sections are the most important content on this site.** Do not cut them for brevity.

---

## 1. Stack & constraints

| | |
|---|---|
| Framework | **Next.js (App Router) + TypeScript** |
| Styling | **Tailwind CSS** |
| Deployment | Vercel |
| Rendering | Static (SSG). No database, no backend, no CMS. Content lives in typed TS/MDX files. |
| Analytics | Vercel Analytics (Hedra needs to know if anyone visits) |

**Performance targets — these are requirements, not aspirations.** A slow portfolio from a developer claiming performance skills is self-refuting.

- Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO
- LCP < 2.0s, CLS < 0.05
- No layout shift on font load (`next/font`, `display: swap`)
- All images via `next/image`, correct `sizes`, explicit dimensions

**Accessibility:** semantic HTML, real headings in order, visible focus states, keyboard-navigable, `prefers-reduced-motion` respected, AA contrast minimum.

---

## 2. Design direction — Swiss / grid, light only

**Light mode only.** No dark mode, no theme toggle. One well-executed theme beats two half-executed ones, and it removes a whole class of contrast bugs.

The reference is a Swiss editorial grid: a tight grotesque, mono labels, numbered sections, generous whitespace, hairline rules. Precise and engineered. The layout should feel *set*, not *arranged*.

**No** hero illustrations, gradient blobs, stock icons, glassmorphism, parallax, drop shadows, or animated backgrounds. If a decorative element can be removed without losing meaning, remove it.

### Type

Two families, both from `next/font` (self-hosted, `display: swap`):

- **Headings + body:** a tight grotesque — `Inter Tight`, `Space Grotesk`, or `Geist`. Pick one and commit.
- **Labels, metadata, code, section numbers:** a mono — `JetBrains Mono`, `IBM Plex Mono`, or `Geist Mono`.

The mono is a **structural** element, not decoration. It carries: section numbers (`01 / selected work`), stat labels, dates, tech tags, file paths, and all code.

Scale (1.25 major third, rem-based):

| Role | Size | Weight | Tracking |
|---|---|---|---|
| Display (hero name) | 56–64px | 500 | -0.02em |
| h2 (section) | 32px | 500 | -0.015em |
| h3 | 22px | 500 | -0.01em |
| Body | 17–18px | 400 | 0 |
| Mono label | 12–13px | 400 | 0.02em, lowercase |
| Caption | 14px | 400 | 0 |

Body `line-height: 1.7`. **Prose max-width `68ch`** — non-negotiable; over-long lines are the single most common failure of minimal layouts. Headings `line-height: 1.15`.

Two weights only: **400 and 500.** Never 600 or 700 — bold grotesques read as shouty at display sizes.

**Sentence case everywhere.** Mono labels are lowercase. No ALL CAPS, no Title Case.

### Colour

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FAFAF8` | Page (warm off-white, not pure white) |
| `--surface` | `#FFFFFF` | Cards, code blocks |
| `--text` | `#111111` | Body and headings |
| `--text-muted` | `#5F5E5A` | Metadata, mono labels, captions |
| `--border` | `#E3E1DA` | Hairlines — always `1px`, never thicker |
| `--accent` | one colour only | Links, active states, one or two key numbers |

Suggested accent: a deep teal (`#0F6E56`) or a deep blue (`#185FA5`). **Pick one.** It appears on links, focus rings, and at most two numbers per page. Everything else is black, muted grey, or hairline.

Contrast: AA minimum on every pairing. Check `--text-muted` on `--bg` before shipping.

### Layout

- A visible **12-column grid** underneath the design, even if no grid lines are drawn. Elements align to it. Nothing floats.
- **Numbered sections:** `01 / selected work`, `02 / skills`, `03 / background` — mono, muted, small, above each `h2`.
- **Hairline rules** (`1px solid var(--border)`) separate sections. No card shadows anywhere.
- Content column for prose; full-bleed only for code blocks, the architecture diagram, and screenshots.
- Left-aligned. No centred body text.
- Generous vertical rhythm — sections separated by `6–8rem`, not `2rem`.

### Components

- **Stat strip** (case studies): mono label above, large number below, hairline dividers between. `188 / rest endpoints`. Not cards — a row.
- **Tech tags:** mono, lowercase, hairline border, no fill, no pill radius (`4px`).
- **Code blocks:** `--surface` background, 1px border, mono, `4px` radius. Syntax highlighting muted — this is evidence, not a light show.
- **Links:** accent colour, `1px` underline, offset. No hover animations beyond a colour shift.

### Motion

Almost none. Fade + 8px translate on scroll-in, ~300ms, once. Nothing bounces, spins, parallaxes, or types itself out. **`prefers-reduced-motion: reduce` disables all of it.**

The restraint is the point. A recruiter should think "this person is precise," not "this person found a template."

---

## 3. Information architecture

```
/                       Landing
/projects/edugenie      Case study (the flagship — most of the effort goes here)
/projects/optern        Case study
/about                  Short bio + background
/cv                     Redirect to a PDF in /public
```

Keep the nav to four items. No hamburger on desktop.

---

## 4. Landing page

**a. Hero.** Name, one-line positioning, one short paragraph. No "Welcome to my portfolio." No typewriter animation. Get to the point:

> **Hedra Emad Fawzy**
> Full-Stack Developer — TypeScript, NestJS, React & Next.js
>
> I led a 5-developer team to build EduGenie, an AI-powered e-learning platform: a NestJS backend of 188 REST endpoints, a RAG pipeline, and Stripe Connect payments — designed, built and deployed in six weeks.

Two buttons: **View EduGenie** · **GitHub**. That's it.

**b. Selected work.** Two cards — EduGenie, Optern. Each: screenshot, one-sentence description, the stack, and two links (Live / Code). Cards link to the case study.

**c. Skills.** Grouped exactly as on the CV, and **honestly labelled**:
- *Proficient:* TypeScript, JavaScript (ES6+), Node.js, NestJS, Express.js, React.js, Next.js, MongoDB & Mongoose, REST API design, Jest, Git
- *Working knowledge:* GraphQL & Apollo, SQL Server, Redux Toolkit, TanStack Query, Tailwind, Socket.IO, Stripe API, Vercel/Railway
- *AI engineering:* RAG, embeddings & semantic search, OpenAI API, Google Gemini API, prompt engineering

Do **not** add Angular, Vue, or any framework not in this list. The honesty of this section is a feature — senior engineers read "working knowledge" as maturity.

**d. Background.** Three compact lines: ITI Intensive Code Camp (618 hrs, MERN + GenAI), B.Sc. Computer Science (South Valley University, 2021–2025), Route Academy Full-Stack Diploma (9 months).

**e. Contact.** Email, GitHub, LinkedIn, CV download. No contact form unless Hedra asks — a `mailto:` that works beats a form that silently fails.

---

## 5. Case study: EduGenie (the flagship)

Structure it like an engineering write-up, not a brochure.

**Header:** title, role (**Team Leader & Full-Stack Developer**), team of 5, **May – Jul 2026 (6-week build)**, live + code links for all three repos.

**1. What it is.** An AI-powered e-learning platform: course delivery, quizzes, certification, instructor payouts, and an AI study coach grounded in course material via RAG.

**2. My role.** Led a 5-developer team — architecture decisions, task distribution, code review. Personally owned the backend architecture, the RAG pipeline, and payments.

**3. Architecture.** A diagram (inline SVG, no image file): three apps — Next.js student web, Angular admin dashboard, NestJS API — over MongoDB, with Stripe, OpenAI/Gemini, Cloudinary and Socket.IO/Pusher as external services.

> Note: the *dashboard is Angular*. It is fine to say so in a case study — this is describing history, not advertising a skill. The CV omits Angular deliberately; the case study can be accurate.

**4. Numbers.** A small stat strip. Use only these — every one is verifiable from the repo:
- 188 REST endpoints across 32 feature modules
- 33 Jest test files / 140 tests, green
- 28 routes, 160+ components (student app)
- 4 roles with RBAC (student, instructor, admin, super-admin)
- 6-week build, team of 5

**Do not** invent user counts, latency figures, or uptime. There are no users yet. Nothing on this site may claim otherwise.

**5. Engineering decisions — the most important section.** Four sub-sections, each: *the problem → the options → what I chose → the trade-off I accepted.* Hedra will supply the real content; scaffold these headings and leave clearly-marked TODOs:

- **RAG chunking strategy.** Chunk size, overlap, why. What breaks when chunks are too large?
- **Stripe: destination charges vs. separate charges.** Who is merchant of record, who carries liability, who pays the fee.
- **Webhook idempotency.** Stripe retries. What guarantees an instructor is never paid twice?
- **Provider abstraction.** Why OpenAI *and* Gemini sit behind one swappable interface.

Show a small, real code snippet for each — pulled from the actual repo, not written for the site.

**6. What I'd do differently.** A short, honest section. Candidates for it: payments module test coverage was the lowest in the codebase despite being the most critical; test scaffolding drifted from the code and had to be repaired; no CI in place until after the build. **Keep this section.** Self-critique is the strongest possible signal that the author understands their own system — and it is the most convincing rebuttal to the AI-authorship question that exists.

---

## 6. Case study: Optern

Shorter. Header: Front-End Developer, team of 4, Nov 2024 – Jun 2025, repo link.

A virtual job-preparation platform — AI mock interviews, AI CV builder, virtual collaboration rooms. Hedra's contribution: 48 merged pull requests covering the blog module, user profile, notifications, the full authentication flow, and collaboration-room features (room creation, join requests, workspace and sprint boards). Built in Next.js + TypeScript against a GraphQL API via Apollo Client with Redux Toolkit, inside a layered domain/application/infrastructure/presentation architecture.

One engineering-decision section is enough here.

---

## 7. Live demo embeds — read this before you build them

Hedra asked for live demo embeds. **Do not naively `<iframe>` the Vercel apps.** Next.js apps commonly send `X-Frame-Options: SAMEORIGIN` or a `frame-ancestors` CSP, so the iframe will render blank in production even if it works locally.

**Verify first.** Check the response headers of each deployment:

```bash
curl -sI https://edugenie-student-web.vercel.app | grep -iE "x-frame-options|content-security-policy"
```

- **If embedding is allowed:** lazy-load the iframe, only on desktop, only on click ("Load live demo") — never on page load. It will cost you the Lighthouse target otherwise.
- **If it is blocked (likely):** fall back to a **short muted screen-recording** (`<video>`, `autoplay muted loop playsinline`, poster image) with a prominent **"Open live demo →"** button. A 15-second clip of the real app is more persuasive than an iframe anyway, and it always works.

Implement the fallback path first. Treat the iframe as progressive enhancement.

---

## 8. SEO & sharing

- Per-page `<title>` and meta description.
- Open Graph + Twitter card images (generate with `next/og`).
- `Person` JSON-LD on the landing page with `name`, `jobTitle`, `url`, `sameAs` (GitHub, LinkedIn).
- `sitemap.xml`, `robots.txt`.
- Target the query **"Hedra Emad Fawzy"** — a recruiter who Googles the name should land here, not on a stale profile.

---

## 9. Repository & hygiene

The portfolio repo is itself a code sample. It will be read.

- Clean commit history, conventional commits.
- A real README (what it is, how to run it, how the content is structured).
- ESLint + Prettier, no warnings.
- GitHub Actions: lint + build on push.
- Strict TypeScript. No `any`.
- **No secrets, no scratch files, no `console.log` in the committed tree.**

---

## 10. Content Hedra must supply — TODO

Scaffold these with obvious placeholders; do not invent them:

- [ ] Screenshots or screen recordings of EduGenie (student app + dashboard) and Optern
- [ ] Profile photo (optional — a portfolio can carry one)
- [ ] The four engineering-decision write-ups (§5.5) — **only Hedra can write these**
- [ ] The "what I'd do differently" content (§5.6)
- [ ] Short personal bio for `/about`: why he builds, what he wants to work on next
- [ ] CV PDF for `/public`
- [ ] Custom domain, or default to `hedra-emad.vercel.app`

---

## 11. Explicitly out of scope

- No blog (unless he writes posts — an empty blog is worse than no blog)
- No contact form
- No testimonials, no "trusted by" logos, no fake social proof
- **No claims of users, traffic, revenue, or production usage.** There are none yet. If that changes, the numbers go in — and not before.
