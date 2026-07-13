import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter_Tight } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE } from "@/lib/site";

import "./globals.css";

/**
 * Two families, self-hosted by next/font at build time: no request to Google,
 * no render-blocking stylesheet, one preloaded woff2 each. `display: "swap"` is
 * next/font's default, and the fallback metrics it generates (size-adjust,
 * ascent-override) mean the swap costs no layout shift — which is how CLS stays
 * at zero rather than merely low.
 *
 * Inter Tight is Inter's display-tracked sibling: a neutral grotesque, because
 * in a Swiss grid the grid is the personality and the letterforms should not
 * compete with it. IBM Plex Mono is loaded at 400 only — the mono is structural
 * and is never emphasised, so a second weight would be dead payload.
 */
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "Full-stack developer working in TypeScript, NestJS, React and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${plexMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="bg-accent text-accent-contrast sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
