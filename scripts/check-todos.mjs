/**
 * Fails if any <Todo> placeholder is still rendered in the app.
 *
 * The Todo component exists so unwritten content is impossible to miss on the
 * page. This script makes it impossible to miss in CI too: a scaffold that can
 * be deployed is a scaffold that eventually is.
 *
 * Opt in with ALLOW_TODOS=1 for local work-in-progress builds.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

if (process.env.ALLOW_TODOS === "1") {
  process.stdout.write("check:todos — skipped (ALLOW_TODOS=1)\n");
  process.exit(0);
}

/** @param {string} dir @returns {string[]} */
function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const offenders = walk("app").filter(
  (file) =>
    file.endsWith(".tsx") && /<Todo[\s>]/.test(readFileSync(file, "utf8")),
);

if (offenders.length > 0) {
  process.stderr.write(
    `check:todos — ${offenders.length} page(s) still render a <Todo> placeholder:\n` +
      offenders.map((f) => `  ${f}\n`).join("") +
      "\nWrite the content, or run with ALLOW_TODOS=1 to build anyway.\n",
  );
  process.exit(1);
}

process.stdout.write("check:todos — no placeholders remain\n");
