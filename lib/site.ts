/**
 * Single source of truth for site-wide facts.
 *
 * Nothing here may be a guess. Fields Hedra has not supplied are `null`, and
 * every consumer skips nulls rather than rendering a placeholder — a dead link
 * in a portfolio is worse than a missing one.
 */

export type NavItem = {
  readonly href: string;
  readonly label: string;
  /** External links get rel/target and a visual affordance. */
  readonly external?: boolean;
};

export type SiteConfig = {
  readonly name: string;
  readonly role: string;
  /** Set once the domain is decided; used for canonical URLs and OG images. */
  readonly url: string | null;
  readonly nav: readonly NavItem[];
  readonly links: {
    /* TODO(hedra): supply these — see PORTFOLIO_BRIEF.md §10. */
    readonly github: string | null;
    readonly linkedin: string | null;
    readonly email: string | null;
  };
};

export const SITE: SiteConfig = {
  name: "Hedra Emad Fawzy",
  role: "Full-Stack Developer — TypeScript, NestJS, React & Next.js",
  url: "https://hedra-emad.vercel.app",
  nav: [
    { href: "/#work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/cv", label: "CV" },
  ],
  links: {
    github: "https://github.com/hedra-emad",
    linkedin: "https://www.linkedin.com/in/hedra-emad",
    email: "emadhedra4@gmail.com",
  },
} as const;
