import type { Metadata } from "next";

import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { CodeSample } from "@/components/code-sample";
import { ProjectHeader } from "@/components/project-header";
import { Section } from "@/components/section";
import { StatStrip } from "@/components/stat-strip";
import { Todo } from "@/components/todo";
import { EDUGENIE, EDUGENIE_WEB_STATS } from "@/content/projects";

export const metadata: Metadata = {
  title: "EduGenie",
  description:
    "An AI-powered e-learning platform: a NestJS backend of 188 REST endpoints, a RAG pipeline grounded in course material, and Stripe Connect instructor payouts. Team of 5, six-week build.",
};

const API = "https://github.com/hedra-emad/edugenie-api/blob/main";

export default function EduGeniePage() {
  return (
    <>
      <ProjectHeader project={EDUGENIE} />

      <Section number="01" title="What it is">
        <p className="max-w-measure">
          An AI-powered e-learning platform. Instructors publish courses;
          students take them, sit quizzes, and earn certificates; instructors
          get paid out. On top of that sits an AI study coach that answers
          questions about the course — grounded in the actual lecture material
          through a RAG pipeline, so it cites the lecture rather than inventing
          an answer.
        </p>
      </Section>

      <Section number="02" title="My role">
        <p className="max-w-measure">
          Team Leader and Full-Stack Developer, leading four other developers. I
          made the architecture decisions, distributed the work, and reviewed
          the code. I personally owned three things: the backend architecture,
          the RAG pipeline, and payments.
        </p>
        <p className="max-w-measure mt-6">
          Those three are also the three hardest things in the system, which is
          why the engineering-decision write-ups below are all drawn from them.
        </p>
      </Section>

      <Section number="03" title="Architecture">
        <ArchitectureDiagram />
      </Section>

      <Section number="04" title="Numbers">
        <p className="text-text-muted max-w-measure">
          Every figure here was counted from the repository, and each one prints
          the command that reproduces it. There are no user counts, no latency
          figures and no uptime numbers on this page, because the platform has
          no users yet — it was built, deployed, and is looking for its first
          ones.
        </p>
        <div className="mt-10">
          <StatStrip stats={EDUGENIE.stats} />
        </div>
        <h3 className="mt-14">Student app</h3>
        <div className="mt-6">
          <StatStrip stats={EDUGENIE_WEB_STATS} />
        </div>
      </Section>

      <Section number="05" title="Engineering decisions">
        <p className="text-text-muted max-w-measure">
          Four decisions, each stated as: the problem, the options, what I
          chose, and the trade-off I accepted. The code is pasted from the
          repository — every snippet links to the file it came from.
        </p>

        {/* ------------------------------------------------------------- */}
        <h3 className="mt-14">RAG chunking strategy</h3>
        <p className="text-text-muted max-w-measure mt-3">
          1800-character windows, 250 characters of overlap, packed on sentence
          boundaries, with a hard-split escape hatch at 1.5× the window.
        </p>
        <CodeSample
          path="src/rag/chunking.ts"
          href={`${API}/src/rag/chunking.ts`}
          code={`export function chunkText(raw: string, opts: ChunkOptions = {}): string[] {
  const maxChars = opts.maxChars ?? 1800;   // ~450 tokens at ~4 chars/token
  const overlap = opts.overlapChars ?? 250;

  // Greedily pack sentences into windows, prepending an overlap tail each time.
  const sentences = text.match(/[^.!?]+[.!?]*\\s*/g) ?? [text];
  for (const s of sentences) {
    if (current && current.length + s.length > maxChars) {
      windows.push(current.trim());
      const tail = current.slice(Math.max(0, current.length - overlap));
      current = tail + s;
    } else {
      current += s;
    }
  }`}
        />
        <Todo>
          Why 1800 characters, and what happens to retrieval quality if the
          windows get much bigger or much smaller? Why 250 of overlap — what
          failure does it prevent when the sentence that answers the question is
          the last one in a window? Why sentence-aware packing rather than a
          fixed split: what does an embedding of half a sentence represent? And
          what real input forced you to add the <code>maxChars * 1.5</code>{" "}
          escape hatch? 150–250 words.
        </Todo>

        {/* ------------------------------------------------------------- */}
        <h3 className="mt-14">
          Stripe: destination charges vs. separate charges
        </h3>
        <p className="text-text-muted max-w-measure mt-3">
          The repository does both, and that is the interesting part. A
          single-course purchase is a destination charge — the platform charges,
          keeps <code>application_fee_amount</code>, and transfers the rest to
          the instructor&rsquo;s connected account. A whole-cart purchase
          spanning several instructors cannot be, so it uses separate charges
          and transfers, with the platform as merchant of record.
        </p>
        <CodeSample
          path="src/payments/stripe.service.ts"
          href={`${API}/src/payments/stripe.service.ts`}
          code={`/** Destination-charge Checkout Session: platform charges, fee kept, rest transferred. */
payment_intent_data: {
  application_fee_amount: params.feeCents,
  transfer_data: { destination: params.destinationAccountId },
},

/**
 * Whole-cart Checkout Session using the "separate charges and transfers" model:
 * the PLATFORM is the merchant (no transfer_data/destination), so ONE session
 * can span courses from several instructors.
 */`}
        />
        <Todo>
          Who is merchant of record in each model, who carries the chargeback
          liability, and who pays the Stripe fee? Why was a single cart spanning
          multiple instructors the thing that forced the second model — and what
          did you give up by running two money paths instead of one? 150–250
          words.
        </Todo>

        {/* ------------------------------------------------------------- */}
        <h3 className="mt-14">Webhook idempotency</h3>
        <p className="text-text-muted max-w-measure mt-3">
          Stripe retries webhooks. An order is keyed by a SHA-256 hash of the
          cart contents inside a 30-minute window, so a retry finds the existing
          pending order instead of creating a second one — and an instructor is
          never paid twice for the same purchase.
        </p>
        <CodeSample
          path="src/orders/orders.service.ts"
          href={`${API}/src/orders/orders.service.ts`}
          code={`// 2. IDEMPOTENCY CHECK
const cartSnapshotHash = crypto
  .createHash('sha256')
  .update(cartSnapshotString)
  .digest('hex');

const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
const existingOrder = await this.orderModel.findOne({
  studentId: new Types.ObjectId(studentId),
  status: OrderStatus.PENDING,
  cartSnapshotHash: cartSnapshotHash,
  createdAt: { $gte: thirtyMinutesAgo },
});`}
        />
        <Todo>
          Why hash the cart contents rather than key off the Stripe event id?
          Why a 30-minute window — what breaks at 5 minutes, and what breaks at
          24 hours? This guard is application-level, not a unique index: what
          happens if two retries land at the same millisecond, and did you
          accept that race? Be honest about it — an interviewer will ask.
          150–250 words.
        </Todo>

        {/* ------------------------------------------------------------- */}
        <h3 className="mt-14">Provider abstraction</h3>
        <p className="text-text-muted max-w-measure mt-3">
          OpenAI and Gemini sit behind one interface, selected by a DI factory
          at module load: OpenAI when a key is present, Gemini otherwise.
        </p>
        <CodeSample
          path="src/ai/transcription.provider.ts"
          href={`${API}/src/ai/transcription.provider.ts`}
          code={`export interface TranscriptionProvider {
  readonly isConfigured: boolean;
  readonly model: string;
  /** Full plain-text transcript (may be '' for silent audio). */
  transcribeAudioUrl(audioUrl: string, mimeType?: string): Promise<string>;
  /** Time-coded segments for a clickable transcript + timestamped search. */
  transcribeSegments(audioUrl: string, mimeType?: string): Promise<TranscriptSegment[]>;
}

/** DI token for the selected transcription provider. */
export const TRANSCRIPTION_PROVIDER = Symbol('TRANSCRIPTION_PROVIDER');`}
        />
        <Todo>
          What did the second provider actually buy you — cost, availability, a
          rate limit you hit, or a capability one of them lacked? The interface
          is the lowest common denominator of the two APIs: name something you
          could not expose through it. And what does it cost to keep two
          implementations correct? 150–250 words.
        </Todo>
      </Section>

      <Section number="06" title="What I'd do differently">
        <p className="text-text-muted max-w-measure">
          The most convincing rebuttal to &ldquo;how much of this did AI
          write?&rdquo; is a developer who can name what is wrong with their own
          system. This section stays.
        </p>
        <Todo>
          The candidates, from your own audit: the payments module had the
          lowest test coverage in the codebase despite being the most critical
          code in it; the test scaffolding drifted from the implementation and
          had to be repaired; there was no CI until after the build finished.
          Pick the ones that are true, say what the consequence was, and say
          what you would do instead. Do not soften them — the value of this
          section is precisely that it is not flattering.
        </Todo>
      </Section>
    </>
  );
}
