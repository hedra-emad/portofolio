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
| Fonts     | `next/font` — Source Serif 4, Inter, JetBrains Mono         |
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

Swiss editorial grid, **light only** — one well-executed theme rather than two
half-executed ones, which also removes a whole class of contrast bugs. There is
no `dark:` variant anywhere in this repo and no theme toggle.

Colour and type tokens are declared once in `app/globals.css` as CSS custom
properties, then mapped into Tailwind utilities with `@theme inline`.

Two families. **Inter Tight** carries the argument; **IBM Plex Mono** carries the
apparatus — section numbers, stat labels, dates, tech tags, file paths and code.
The mono is structural, not decorative, and the separation of those two registers
is what makes the page read as engineered.

Run the dev server and open `/` for the full specimen: the 12-column grid, the
type scale, swatches with their measured contrast ratios, prose at the 68ch
measure, and every component.

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
