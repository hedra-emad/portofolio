import { Container } from "@/components/container";
import { SITE } from "@/lib/site";

/**
 * Renders only the links that exist. `SITE.links` entries are null until Hedra
 * supplies them, so this footer is empty of contact links rather than full of
 * `href="#"` — a link that goes nowhere is a bug a recruiter finds first.
 */
export function SiteFooter() {
  const contacts = [
    { label: "Email", href: SITE.links.email },
    { label: "GitHub", href: SITE.links.github },
    { label: "LinkedIn", href: SITE.links.linkedin },
  ].filter((c): c is { label: string; href: string } => c.href !== null);

  return (
    <footer className="border-border mt-24 border-t py-10">
      <Container
        width="wide"
        className="text-fg-muted flex flex-wrap items-center justify-between gap-4 text-sm"
      >
        <p>
          {SITE.name} — {new Date().getFullYear()}
        </p>
        {contacts.length > 0 && (
          <ul className="flex gap-6">
            {contacts.map((contact) => (
              <li key={contact.label}>
                <a
                  href={contact.href}
                  className="decoration-border hover:text-accent hover:decoration-accent underline underline-offset-4 transition-colors"
                >
                  {contact.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </footer>
  );
}
