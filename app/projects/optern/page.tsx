import type { Metadata } from "next";

import { OpternCaseStudy } from "@/components/case-study/optern";

export const metadata: Metadata = {
  title: "Optern",
  description:
    "A virtual job-preparation platform — AI mock interviews, an AI CV builder, and collaboration rooms. A layered Next.js and TypeScript front end, team of 4.",
};

export default function OpternPage() {
  return <OpternCaseStudy />;
}
