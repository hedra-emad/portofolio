import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { CodeSample } from "@/components/code-sample";
import { ProjectHeader } from "@/components/project-header";
import { Screens, type Shot } from "@/components/case-study/screens";
import { Section } from "@/components/section";
import { StatStrip } from "@/components/stat-strip";
import { EDUGENIE, EDUGENIE_WEB_STATS } from "@/content/projects";

const API = "https://github.com/hedra-emad/edugenie-api/blob/main";

const SHOTS: readonly Shot[] = [
  {
    src: "/shots/edugenie/student-landing.png",
    alt: "EduGenie student landing page",
    caption: "The student landing — search, trending tracks, featured courses.",
  },
  {
    src: "/shots/edugenie/course-page.png",
    alt: "EduGenie course detail page",
    caption: "A course page — curriculum, certificate, and the AI chatbot.",
  },
  {
    src: "/shots/edugenie/onboarding.png",
    alt: "EduGenie onboarding wizard",
    caption: "Onboarding — the AI maps a learning path to your goals.",
  },
  {
    src: "/shots/edugenie/roadmap-advisor.png",
    alt: "EduGenie AI roadmap advisor",
    caption: "The AI Roadmap Advisor — a full plan, bought in one click.",
  },
  {
    src: "/shots/edugenie/instructor-earnings.png",
    alt: "EduGenie instructor earnings and payouts",
    caption:
      "Instructor earnings & Stripe Connect payouts — the 65 / 35 fee split.",
  },
  {
    src: "/shots/edugenie/course-builder.png",
    alt: "EduGenie instructor course builder",
    caption: "The course builder — settings, learning goals, requirements.",
  },
  {
    src: "/shots/edugenie/admin-approvals.png",
    alt: "EduGenie admin course approvals",
    caption: "The admin dashboard — the course-approval queue.",
  },
  {
    src: "/shots/edugenie/checkout-success.png",
    alt: "EduGenie Stripe checkout success",
    caption: "Stripe checkout success — the course unlocks after payment.",
  },
];

/**
 * The EduGenie case study, rendered on its own route (`/projects/edugenie`).
 * `ProjectHeader` is the page `h1`, `Section`s are `h2` (numbered 01–07), and the
 * engineering sub-decisions are `h3`.
 */
export function EduGenieCaseStudy() {
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

      <Section number="05" title="Screens">
        <p className="text-text-muted max-w-measure">
          The platform, deployed and running — the student app, the instructor
          portal, and the admin dashboard.
        </p>
        <div className="mt-10">
          <Screens items={SHOTS} />
        </div>
      </Section>

      <Section number="06" title="Engineering decisions">
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
        <h3 className="mt-14">
          Stripe: destination charges vs. separate charges
        </h3>
        <p className="text-text-muted max-w-measure mt-3">
          The repository does both. A single-course purchase is a destination
          charge: the platform charges, keeps{" "}
          <code>application_fee_amount</code>, and transfers the rest to the
          instructor&rsquo;s connected account. A cart spanning several
          instructors can&rsquo;t be — one charge can&rsquo;t carry three
          destinations — so it uses separate charges and transfers.
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
          For a cart, the money lands on the platform account first, tagged with
          the order id as its <code>transfer_group</code>, and one Transfer goes
          out per instructor once it settles — same checkout for the student,
          different settlement underneath. Checkout fails early, naming any
          instructor without a payouts-enabled account, since a Transfer to a
          missing one would fail silently later. Either way the charge sits on
          the platform account, so the platform is the merchant of record:
          Stripe&rsquo;s processing fee comes off its balance, and its own cut —
          the <code>application_fee</code> — is separate, the instructor
          receiving the course price minus that fee.
        </p>
        <p className="max-w-measure mt-6">
          That also puts dispute liability on the platform. The cart edge: if a
          student disputes after an instructor was already paid by Transfer, the
          platform is out the refund unless it reverses that Transfer — work I
          would add before real volume. The broader cost is two money paths to
          keep correct: split reconciliation and diverging refunds (a cart
          refund reverses a specific Transfer, a destination-charge refund
          unwinds the destination transfer), and a charge that can succeed while
          a later Transfer fails if an account goes restricted between checkout
          and payout — the up-front <code>charges_enabled</code> check narrows
          that window without closing it. I accepted the cost because the two
          flows genuinely have different requirements; collapsing them would
          break carts or make single-course purchases needlessly complex.
        </p>

        {/* ------------------------------------------------------------- */}
        <h3 className="mt-14">Webhook idempotency</h3>
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
          both pass the lookup before either writes. The fix is a unique, sparse
          index on <code>stripeSessionId</code>: the second insert would fail
          outright and the fulfillment code could treat that duplicate-key error
          as an already-fulfilled signal. I&rsquo;d add it before real volume —
          today the application check is the guard, and the database constraint
          that would make it airtight is not in place yet.
        </p>

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

      <Section number="07" title="What I'd do differently">
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
          The test suite has drifted from the code, and the drift hides behind
          green checkmarks run selectively. On a clean clone, twelve of
          thirty-three spec files fail — some <code>nest g</code> boilerplate
          never filled in, others with mocks that had not followed the services
          through a refactor. That is worse than no tests: a half-broken suite
          gives false confidence. Repairing it to a fully green suite is
          outstanding work, and the deeper lesson is that nothing ran the suite
          automatically to catch the drift the day it happened — which is the
          next item.
        </p>
        <p className="max-w-measure mt-6">
          There was no CI during the build. Five people pushing, and nothing
          automatically ran the tests or the build — which is exactly how the
          drift above accumulated unseen. The fix is a GitHub Actions gate:
          lint, build, and test on every push, required to pass before merge. On
          a solo project you can skip it; on a five-person team it is not
          optional, and I learned that the practical way.
        </p>
        <p className="max-w-measure mt-6">
          The webhook idempotency guard is a read-then-write with no database
          constraint behind it — two simultaneous Stripe deliveries could both
          pass the lookup before either wrote. The fix is a unique, sparse index
          on <code>stripeSessionId</code> (sparse because an order can exist
          before its session id is set), so the second insert would fail and the
          fulfillment code could treat the duplicate-key error as an
          already-fulfilled signal. I&rsquo;d add it before real volume — today
          the application check is the only guard.
        </p>
      </Section>
    </>
  );
}
