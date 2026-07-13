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

Colour and type tokens are declared once in `app/globals.css` as CSS custom
properties, then mapped into Tailwind utilities with `@theme inline`. Dark mode
re-declares the same custom properties inside a `prefers-color-scheme` media
query — the tokens flip, the markup does not, which is why there are almost no
`dark:` variants in this codebase.

Run the dev server and open `/` for the full specimen: type scale, swatches with
their measured contrast ratios, prose at the 68ch measure, and focus states.
