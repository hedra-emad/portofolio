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
  /** The last item renders as a bordered pill instead of a plain link. */
  readonly cta?: boolean;
};

export type SiteConfig = {
  readonly name: string;
  readonly role: string;
  /** Set once the domain is decided; used for canonical URLs and OG images. */
  readonly url: string | null;
  readonly nav: readonly NavItem[];
  readonly links: {
    readonly github: string | null;
    readonly linkedin: string | null;
    readonly email: string | null;
    /** Supplied from Hedra's CV via the design mock. */
    readonly phone: string | null;
    readonly location: string | null;
  };
};

export const SITE: SiteConfig = {
  name: "Hedra Emad Fawzy",
  role: "Full-Stack Developer — TypeScript, NestJS, React & Next.js",
  url: "https://hedra-emad.vercel.app",
  // Single-page nav: each item scrolls to a section on the landing page. From a
  // case-study route the leading "/" navigates home first, then to the anchor.
  nav: [
    { href: "/#work", label: "work" },
    { href: "/#skills", label: "skills" },
    { href: "/#journey", label: "journey" },
    { href: "/#contact", label: "contact" },
    { href: "/cv", label: "Download CV ↗", cta: true },
  ],
  links: {
    github: "https://github.com/hedra-emad",
    linkedin: "https://www.linkedin.com/in/hedra-emad",
    email: "emadhedra4@gmail.com",
    phone: "+201028352103",
    location: "Cairo, Egypt",
  },
} as const;
