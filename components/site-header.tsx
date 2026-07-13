import Link from "next/link";

import { Container } from "@/components/container";
import { SiteNav } from "@/components/site-nav";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-border border-b">
      <Container className="flex items-center justify-between gap-6 py-5">
        <Link href="/" className="font-medium tracking-tight">
          {SITE.name}
        </Link>
        <SiteNav />
      </Container>
    </header>
  );
}
