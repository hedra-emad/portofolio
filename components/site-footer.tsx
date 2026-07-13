import { Container } from "@/components/container";
import { SITE } from "@/lib/site";

type Contact = {
  label: string;
  href: string;
  /** `rel="me"` on both profiles: it is the microformat that lets a crawler
   *  tie this site to those accounts as the same person — which is the point
   *  of ranking for the name "Hedra Emad Fawzy". */
  external: boolean;
};

/**
 * Renders only the links that exist. `SITE.links` entries are null until Hedra
 * supplies them, so the footer is missing a contact link rather than carrying a
 * dead one — a broken link is what a recruiter finds first.
 */
export function SiteFooter() {
  const contacts: Contact[] = [];

  if (SITE.links.email !== null) {
    contacts.push({
      label: "Email",
      href: `mailto:${SITE.links.email}`,
      external: false,
    });
  }
  if (SITE.links.github !== null) {
    contacts.push({
      label: "GitHub",
      href: SITE.links.github,
      external: true,
    });
  }
  if (SITE.links.linkedin !== null) {
    contacts.push({
      label: "LinkedIn",
      href: SITE.links.linkedin,
      external: true,
    });
  }

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
                  {...(contact.external
                    ? {
                        target: "_blank",
                        rel: "me noopener noreferrer",
                      }
                    : {})}
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
