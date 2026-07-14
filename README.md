# hedra-portfolio

Portfolio site for Hedra Emad Fawzy — full-stack developer (TypeScript, NestJS, React & Next.js).

Statically generated. No database, no backend, no CMS: all content lives in typed
TypeScript files, so a wrong claim shows up as a type error or a failed build
rather than as a bad row in a table.

## Stack

|           |                                                             |
| --------- | ----------------------------------------------------------- |
| Framework | Next.js 16 (App Router), React 19                           |
| Language  | TypeScript, `strict` + `noUncheckedIndexedAccess`, no `any` |
| Styling   | Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`) |
| Fonts     | `next/font` — Space Grotesk, IBM Plex Sans, JetBrains Mono  |
| Hosting   | Vercel                                                      |

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

## Checks

These four are what CI runs on every push. Run them before committing.

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

## How the content is structured

```
app/                 Routes (App Router). Every page is statically rendered.
  globals.css        The design system: colour tokens, type scale, base styles.
components/          Shared UI. Server components unless a hook forces otherwise.
lib/site.ts          Site-wide facts — name, nav, contact links.
```

`lib/site.ts` is the single source of truth for anything appearing in more than
one place. Fields with no verified value yet are `null`, and consumers skip
them, so the site never renders a placeholder link.

## Design system

Dark "AI-native" direction, ported from a Claude Design mock. Near-black ground
(`#070a0f`), one teal accent (`#2ff0dd`) with a blue support (`#4d8dff`), glass
surfaces, mono as the structural label face. Colour and type tokens are declared
once in `app/globals.css` as CSS custom properties, then mapped into Tailwind
utilities with `@theme inline`.

Three families via `next/font`: **Space Grotesk** (display/headings), **IBM Plex
Sans** (body), **JetBrains Mono** (eyebrows, dates, tags, code).

Contrast was measured against the background, not eyeballed — the mock's dimmest
grey (`#556170`, 3.14:1) was lifted to `#727f90` (4.87:1) so every text pairing
clears the 4.5:1 AA floor.

Motion is deliberately restrained: the mock's five infinite loops (float, grid
pan, glow pulse, shimmer, cursor blink) are dropped. What remains is scroll
reveal and a one-shot counter, both gated on `prefers-reduced-motion` and
`scripting: enabled` so a no-JS or reduced-motion reader never waits on an
observer.

The landing page (`/`) is the single-page portfolio. `/projects/edugenie` and
`/projects/optern` are deep case studies restyled to the same theme; each number
in them prints the command that reproduces it (see `content/projects.ts`).

## Local development on Windows

If you clone this onto a OneDrive-synced path and build under WSL, OneDrive will
sync a Windows copy of `node_modules` over the Linux one and the build dies with
`Cannot find module '../lightningcss.linux-x64-gnu.node'`. Keep `node_modules`
off the synced drive:

```bash
mkdir -p ~/.node-modules-store/hedra-portfolio
ln -s ~/.node-modules-store/hedra-portfolio node_modules
npm install
```

Linux CI and Vercel are unaffected.
