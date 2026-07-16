import type { Metadata } from "next";

import { EduGenieCaseStudy } from "@/components/case-study/edugenie";

export const metadata: Metadata = {
  title: "EduGenie",
  description:
    "An AI-powered e-learning platform: a NestJS backend of 188 REST endpoints, a RAG pipeline grounded in course material, and Stripe Connect instructor payouts. Team of 5, six-week build.",
};

export default function EduGeniePage() {
  return <EduGenieCaseStudy />;
}
