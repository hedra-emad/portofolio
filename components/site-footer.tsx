import { Container } from "@/components/container";
import { SITE } from "@/lib/site";

type Contact = {
  label: string;
  href: string;
  /** `rel="me"` on the two profiles: the microformat that tells a crawler this
   *  site and those accounts are one identity — which is the point of ranking
   *  for the query "Hedra Emad Fawzy". */
  external: boolean;
};

/**
 * Renders only the links that exist. `SITE.links` entries are typed
 * `string | null` and consumers skip nulls, so an unsupplied contact is a
 * missing link rather than a dead one.
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
    contacts.push({ label: "GitHub", href: SITE.links.github, external: true });
  }
  if (SITE.links.linkedin !== null) {
    contacts.push({
      label: "LinkedIn",
      href: SITE.links.linkedin,
      external: true,
    });
  }

  return (
    <footer className="border-border mt-(--spacing-section) border-t py-10">
      <Container className="flex flex-wrap items-center justify-between gap-4">
        <p className="label">
          {SITE.name} — {new Date().getFullYear()}
        </p>
        {contacts.length > 0 && (
          <ul className="flex flex-wrap gap-6">
            {contacts.map((contact) => (
              <li key={contact.label}>
                <a
                  href={contact.href}
                  {...(contact.external
                    ? { target: "_blank", rel: "me noopener noreferrer" }
                    : {})}
                  className="label hover:text-accent transition-colors"
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
