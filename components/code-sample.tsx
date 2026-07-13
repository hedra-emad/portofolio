/**
 * A code snippet with its provenance attached.
 *
 * Every snippet on this site is pasted from the repository it claims to come
 * from, and `path` links to that exact file on GitHub. This is the citation
 * line applied to code: a reader who suspects the snippet was written for the
 * website can click through and read it in context, which is the only answer to
 * that suspicion that actually works.
 */
export function CodeSample({
  path,
  href,
  code,
}: {
  /** Repo-relative path, shown verbatim in mono. */
  path: string;
  href: string;
  code: string;
}) {
  return (
    <figure className="mt-6">
      <pre className="code-block">
        <code>{code}</code>
      </pre>
      <figcaption className="label mt-3 normal-case">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          {path}
        </a>
      </figcaption>
    </figure>
  );
}
