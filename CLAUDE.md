# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Next.js 16 here has breaking changes from training-data knowledge — check
`node_modules/next/dist/docs/` before writing framework code.

## Commands

```bash
npm run dev            # dev server, http://localhost:3000
npm run build          # production build

# The four CI checks — run before committing. CI fails on any one.
npm run format:check   # prettier
npm run lint           # eslint
npm run typecheck      # tsc --noEmit
npm run build

npm run format         # write prettier fixes
npm run lint:fix       # write eslint fixes
npm run check:todos    # fail if any <Todo> placeholder still renders (see below)
```

CI (`.github/workflows/ci.yml`) runs format:check, lint, typecheck, build on push
and PR. Node 24. There is no test runner — correctness is enforced by the type
system and build, not unit tests. `check:todos` is **not** wired into CI; run it
yourself before shipping content.

## Deploy

GitHub Pages, via `.github/workflows/nextjs.yml` on push to `main` (Node 20 —
CI's Node 24 does not cover it). That workflow runs `next build` and uploads
`./out`, relying on `actions/configure-pages@v5` with `static_site_generator: next`
to inject the static-export settings. Two things follow:

- `next.config.ts` has no `output: "export"` of its own — `out/` never appears
  from a plain local `npm run build`. To reproduce the deploy build, add the
  flag temporarily or read the Pages workflow log.
- The `/cv` redirect in `next.config.ts` is a `redirects()` entry, which static
  export does not emit. It works in `next dev`/`next start`, not on Pages.

Both are live mismatches, not settled design — check the last Pages run before
assuming a content change is actually online.

## Architecture

Statically-generated portfolio site. **No database, backend, or CMS** — all
content lives in typed TypeScript under `content/` and `lib/`. A wrong claim
surfaces as a type error or failed build, not a bad row. This is the core
constraint: content is code.

- `app/` — App Router. `/` is the home portfolio (hero → metrics → skills → work
  → journey → contact); the two case studies are their own routes,
  `/projects/edugenie` and `/projects/optern`, each rendering a
  `components/case-study/*` component and linked from the home work cards. There
  is no `/about` route. `app/globals.css` is the whole design system.
- `components/` — shared UI. Server components unless a hook forces `"use client"`.
- `content/` — project data (`projects.ts`), CV (`cv.ts`), metrics (`metrics.ts`).
- `lib/site.ts` — single source of truth for site-wide facts (name, nav, contact).
- `next.config.ts` — pins `turbopack.root` (a parent dir has its own lockfile;
  without the pin Turbopack infers the wrong workspace root) and the `/cv` redirect.

The home page is shaped around projects-as-experience because Hedra has no
formal employment history — that is why the section order leads with work, not
a career timeline. Preserve that argument when changing the home page.

### Two rules the codebase enforces

**Unverified facts are `null`, never a guess.** `lib/site.ts` and `content/`
set fields with no verified value to `null`; every consumer skips nulls rather
than rendering a placeholder link. A missing link beats a dead one.

**Every number carries a reproducible `source`.** Each `Stat` in
`content/projects.ts` has a `source` (a glob or query someone else can run) that
the `Cite` component renders next to the value. If a number can't be traced to a
command, it doesn't belong. See the comments in `projects.ts` — two brief
figures were corrected this way (32→31 modules, 160→120 components).

**`<Todo>` placeholders block deploy.** The `Todo` component marks content only
Hedra can write; it breaks the palette on purpose. `npm run check:todos` greps
`app/` for it and exits non-zero if any remain, so a scaffold can't ship.
Override with `ALLOW_TODOS=1` for local WIP builds.

## Design system

Light "Bright lab" direction. Cool near-white ground (`#f7f9fc`), white cards,
ink-slate headings (`#0b1220`), the brand teal (`--accent #0f766e`) and cobalt
support (`--accent-2 #2563eb`) darkened to pass AA as text, plus a brighter
`--accent-strong #14b8a6` used only for decorative dots/fills (never text). Soft
neutral shadows do the lift — no neon glows. Mono is the structural label face.

- **Tailwind v4, CSS-first** — no `tailwind.config.js`. Tokens are CSS custom
  properties in `:root`, mapped to utilities via `@theme inline` in
  `app/globals.css`. Add or change a token there, not in a JS config.
- **Contrast is measured, not eyeballed** — against white `#ffffff` (the card
  surface; the ground is only marginally darker), every text pairing clears
  4.5:1 AA (see the ratio comments beside each `--text-*`/accent token). The
  dimmest text (`#64748b`, 4.76:1) is the floor. Preserve this when adding colors.
- **Fonts via `next/font`** (`app/layout.tsx`): Space Grotesk (display), IBM Plex
  Sans (body), JetBrains Mono (eyebrows/dates/tags/code). Weights pinned to what
  the design uses.
- **Restrained motion** — scroll reveal and a one-shot counter only, both gated on
  `prefers-reduced-motion` and `scripting: enabled`. No infinite loops.

## Lint rules that will bite

`eslint.config.mjs` errors (not warns) on: `no-explicit-any`, `no-console`, and
non-`type` imports of types (`consistent-type-imports`, inline fix style).
`tsconfig` is `strict` + `noUncheckedIndexedAccess`.

## Windows / WSL / OneDrive

Repo lives on a OneDrive-synced path. Building under WSL, OneDrive syncs a
Windows `node_modules` over the Linux one and the build dies with
`Cannot find module '../lightningcss.linux-x64-gnu.node'`. Keep `node_modules`
off the synced drive:

```bash
mkdir -p ~/.node-modules-store/hedra-portfolio
ln -s ~/.node-modules-store/hedra-portfolio node_modules
npm install
```

Linux CI and Vercel are unaffected.
