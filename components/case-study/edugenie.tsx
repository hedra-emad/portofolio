import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { CodeSample } from "@/components/code-sample";
import { ProjectHeader } from "@/components/project-header";
import { Section } from "@/components/section";
import { StatStrip } from "@/components/stat-strip";
import { EDUGENIE, EDUGENIE_WEB_STATS } from "@/content/projects";

const API = "https://github.com/hedra-emad/edugenie-api/blob/main";

/**
 * The EduGenie case study, rendered inline as section `03` of the single-page
 * site. Its internal sections are numbered `03.x` so the whole page reads as one
 * document; the sub-decision headings are `h4`, one level under each `Section`'s
 * `h3`.
 */
export function EduGenieCaseStudy() {
  return (
    <section id="edugenie" className="scroll-mt-24">
      <ProjectHeader project={EDUGENIE} number="03" />

      <Section number="03.1" title="What it is">
        <p className="max-w-measure">
          An AI-powered e-learning platform. Instructors publish courses;
          students take them, sit quizzes, and earn certificates; instructors
          get paid out. On top of that sits an AI study coach that answers
          questions about the course — grounded in the actual lecture material
          through a RAG pipeline, so it cites the lecture rather than inventing
          an answer.
        </p>
      </Section>

      <Section number="03.2" title="My role">
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

      <Section number="03.3" title="Architecture">
        <ArchitectureDiagram />
      </Section>

      <Section number="03.4" title="Numbers">
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
        <h4 className="mt-14">Student app</h4>
        <div className="mt-6">
          <StatStrip stats={EDUGENIE_WEB_STATS} />
        </div>
      </Section>

      <Section number="03.5" title="Engineering decisions">
        <p className="text-text-muted max-w-measure">
          Four decisions, each stated as: the problem, the options, what I
          chose, and the trade-off I accepted. The code is pasted from the
          repository — every snippet links to the file it came from.
        </p>

        {/* ------------------------------------------------------------- */}
        <h4 className="mt-14">RAG chunking strategy</h4>
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
        <p className="max-w-measure mt-6">
          An embedding compresses the whole chunk into one vector. Too large and
          that point becomes the average of several topics — it matches nothing
          sharply and retrieval goes vague. Too small and the sentence that
          answers a question is severed from the context that makes it
          answerable, so neither piece scores well and the right chunk never
          surfaces. At ~4 characters per token, 1800 is ~450 tokens — about one
          transcript paragraph: coherent enough to mean something, focused
          enough to embed sharply, with headroom under the model&rsquo;s limit.
        </p>
        <p className="max-w-measure mt-6">
          The 250-character overlap guards the boundary case — a question whose
          answer opens the next window. Without overlap that chunk starts cold,
          stripped of its setup, and embeds too generically to retrieve.
          Carrying the tail of each window forward guarantees the answer appears
          at least once alongside its context.
        </p>
        <p className="max-w-measure mt-6">
          A fixed split would cut sentences in half, and half a sentence embeds
          to a fragment that points nowhere — cosine similarity against a real
          question just returns noise. So I pack whole sentences. That assumes
          sentences exist: auto-generated transcripts sometimes come back as a
          wall of text with no punctuation, which the splitter would treat as
          one enormous sentence and never break. Any such window past{" "}
          <code>maxChars * 1.5</code> gets hard-split at the character level —
          defensive, but the kind of malformed input that is inevitable at
          scale.
        </p>
        <p className="max-w-measure mt-6">
          The trade-off: for the timestamped variant — the one that deep-links a
          search hit to the exact moment in the video — I dropped the overlap,
          because each chunk&rsquo;s start time has to map to a single
          transcript segment. That costs a little recall at the seams, which is
          fine for lesson-level seeking but would not be for the coach&rsquo;s
          main retrieval path.
        </p>

        {/* ------------------------------------------------------------- */}
        <h4 className="mt-14">
          Stripe: destination charges vs. separate charges
        </h4>
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
        <p className="max-w-measure mt-6">
          A destination charge routes one payment to exactly one connected
          account — perfect for a single course. A cart can hold courses from
          three instructors, and one charge cannot carry three destinations. So
          a cart takes the money onto the platform account first, tags it with
          the order id as the <code>transfer_group</code>, and issues one
          Transfer per instructor after it settles — same checkout for the
          student, different settlement underneath. Checkout fails early if any
          instructor lacks a payouts-enabled account, naming who, because a
          Transfer to a missing account would fail silently later.
        </p>
        <p className="max-w-measure mt-6">
          In both flows the charge lands on the platform account, so the
          platform is the merchant of record and Stripe&rsquo;s processing fee
          comes out of the platform balance. The platform&rsquo;s own cut — the{" "}
          <code>application_fee</code> — is separate: the instructor receives
          the course price minus that fee, and the platform keeps the fee minus
          Stripe&rsquo;s processing cost.
        </p>
        <p className="max-w-measure mt-6">
          The platform also carries dispute liability in both, since the charge
          is on its account. In the cart flow that is a real edge: if a student
          disputes after an instructor has already been paid by Transfer, the
          platform is out the refund unless it reverses that Transfer. Reversing
          transfers on dispute is work I would add before real volume.
        </p>
        <p className="max-w-measure mt-6">
          The trade-off: two money paths means two code paths to keep correct,
          split reconciliation, and refund logic that diverges — a cart refund
          reverses a specific Transfer, a destination-charge refund unwinds the
          destination transfer. The charge can even succeed while a later
          Transfer fails, if an instructor&rsquo;s account goes restricted
          between checkout and payout; the up-front <code>charges_enabled</code>{" "}
          check narrows that window but does not close it. I accepted the cost
          because the two flows genuinely have different requirements —
          collapsing them would either break carts or make single-course
          purchases needlessly complex.
        </p>

        {/* ------------------------------------------------------------- */}
        <h4 className="mt-14">Webhook idempotency</h4>
        <p className="text-text-muted max-w-measure mt-3">
          Stripe delivers <code>checkout.session.completed</code> at least once,
          and retries any webhook it does not acknowledge quickly. Fulfilling
          twice would mean a second enrollment, a second earning row, and a
          duplicate payout. Three layers stop that: the controller verifies the
          Stripe signature before anything runs; each Checkout Session is
          created with a deterministic idempotency key, so a retried creation
          returns the original session; and before fulfilling, the code looks up
          the Order by <code>stripeSessionId</code> and returns early if one
          exists.
        </p>
        <CodeSample
          path="src/payments/payments.service.ts"
          href={`${API}/src/payments/payments.service.ts#L460-L465`}
          code={`// Idempotency: skip if this session was already fulfilled.
const existing = await this.orderModel
  .findOne({ stripeSessionId: session.id })
  .lean()
  .exec();
if (existing) return;`}
        />
        <p className="max-w-measure mt-6">
          I key the guard on the session id rather than the Stripe event id on
          purpose. The event id would only catch Stripe re-delivering the same
          event. The session id catches anything that tries to fulfill the same
          purchase — the webhook, the browser return-redirect confirmation, and
          a manual re-confirm all key off the same session, so whichever fires
          (or if two fire at once) the Order is created once. The idempotency
          key on creation carries the same intent one step earlier: it includes
          price, fee and destination, so a genuinely changed purchase gets a
          fresh key instead of colliding with a stale one.
        </p>
        <p className="max-w-measure mt-6">
          The guard is a read-then-write — <code>findOne</code> then insert — so
          on its own, two simultaneous deliveries for the same session could
          both pass the lookup before either writes. The database backs it: a
          unique, sparse index on <code>stripeSessionId</code> means the second
          insert fails outright, and the fulfillment code treats that
          duplicate-key error as an already-fulfilled signal. The application
          check is the fast path; the constraint is the guarantee.
        </p>

        {/* ------------------------------------------------------------- */}
        <h4 className="mt-14">Provider abstraction</h4>
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
        <p className="max-w-measure mt-6">
          The factory picks OpenAI when a key is present, Gemini otherwise — so
          the same codebase runs on paid Whisper in one environment and
          Gemini&rsquo;s free tier in another, with no code change. That is the
          real driver: the free tier as the zero-cost default for dev and demos,
          OpenAI when a paid key buys better quality. It also means neither
          vendor is load-bearing — if one is down or misconfigured, the other
          picks up.
        </p>
        <p className="max-w-measure mt-6">
          The two are not equivalent, which is the interesting part. Whisper
          returns real segment timestamps; Gemini estimates them. Both surface
          through the same <code>transcribeSegments</code> returning{" "}
          <code>{`{ start, text }`}</code>, so a caller cannot tell accurate
          timing from approximate — the interface is the lowest common
          denominator, and timestamp accuracy is exactly what it hides.
          Word-level timing or speaker diarization would break the abstraction
          outright: only one provider could supply them, and the interface would
          have to drop to the weaker one or grow provider-specific escape
          hatches.
        </p>
        <p className="max-w-measure mt-6">
          Two implementations cost two code paths to test, and they drift —
          OpenAI returns <code>verbose_json</code> with a segments array, Gemini
          returns generated content parsed differently, so a format change
          breaks one while the other keeps working. Model retirement is real
          too: <code>gemini-2.0-flash</code> was retired and had to be swapped
          for a current id, on the vendor&rsquo;s timeline, not mine.
        </p>
        <p className="max-w-measure mt-6">
          The safety net is model-matching. Every stored chunk records the model
          and dimensions it was embedded with, because vectors from two
          embedding models live in different spaces — cosine similarity across
          them is meaningless and would silently return garbage. Recording the
          model means a provider switch forces a clean re-index instead of
          quietly corrupting search. That one field is what makes swappable
          providers actually safe.
        </p>
      </Section>

      <Section number="03.6" title="What I'd do differently">
        <p className="text-text-muted max-w-measure">
          The most convincing rebuttal to &ldquo;how much of this did AI
          write?&rdquo; is a developer who can name what is wrong with their own
          system. This section stays.
        </p>
        <p className="max-w-measure mt-8">
          The payments module is the least-tested code in the system, and it
          handles the money. It sits around 9% statement coverage while the
          modules around it are far higher — the most critical path in the app,
          the one that charges students and pays instructors, is the
          least-verified. A regression in checkout or payout could ship with no
          test catching it, and the blast radius there is not a broken screen,
          it is money moving wrong. This one I have not fixed yet: the money
          path should be the highest testing priority, not the lowest — full
          coverage on charge creation, fulfillment, and payouts, including the
          failure cases. It is the first thing I would do before this went near
          real transactions.
        </p>
        <p className="max-w-measure mt-6">
          The test suite had drifted from the code, and the drift hid behind
          green checkmarks. On a clean clone, twelve of thirty-three spec files
          were failing — some <code>nest g</code> boilerplate never filled in,
          others with mocks that had not followed the services through a
          refactor. That is worse than no tests: a half-broken suite gives false
          confidence. I found it and repaired it to a green 140-test suite. The
          real lesson was that nothing ran the suite automatically to catch the
          drift the day it happened — which is the next item.
        </p>
        <p className="max-w-measure mt-6">
          There was no CI for most of the six weeks. Five people pushing, and
          nothing automatically ran the tests or the build — which is exactly
          how the drift above accumulated unseen. I have since added a GitHub
          Actions gate: lint, build, and test on every push, required to pass
          before merge. On a solo project you can skip it; on a five-person team
          it is not optional, and I learned that the practical way.
        </p>
        <p className="max-w-measure mt-6">
          The webhook idempotency guard was a read-then-write with no database
          constraint behind it — two simultaneous Stripe deliveries could both
          pass the lookup before either wrote. I closed it with a unique, sparse
          index on <code>stripeSessionId</code> (sparse because an order can
          exist before its session id is set), and the fulfillment code now
          treats the duplicate-key error as an already-fulfilled signal. The
          application check is the fast path; the database constraint is the
          guarantee.
        </p>
      </Section>
    </section>
  );
}
