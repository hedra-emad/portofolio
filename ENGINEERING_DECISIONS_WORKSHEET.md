# Engineering Decisions — Worksheet

You said only you can write these. True. But you don't start from a blank page — **your code already made the decisions.** Below is what your codebase actually does, pulled from the repo, with file references. Your job is to supply the **why**, and the **trade-off you accepted**.

Answer these out loud first. If you can't, that's the gap to close before an interview — not a writing problem.

Each write-up follows the same shape:

> **The problem** → **The options** → **What I chose** → **The trade-off I accepted**

Keep each to 150–250 words. Include the real code snippet.

---

## 1. RAG chunking strategy

### What your code actually does

`src/rag/chunking.ts`:

- **Window size:** 1800 characters (~450 tokens at ~4 chars/token)
- **Overlap:** 250 characters carried from the end of one window into the next
- **Sentence-aware:** splits on `[.!?]` boundaries and greedily packs whole sentences into windows — it never cuts mid-sentence
- **Hard-split fallback:** any window with no sentence breaks that exceeds `maxChars * 1.5` is force-split
- **Timestamped variant:** a second chunker maps each window back to a video start time, so a citation can link to the moment in the lecture

### Questions only you can answer

- Why **1800 characters**? What happens to retrieval quality if you make chunks much bigger — and what happens if you make them much smaller?
- Why **250 characters of overlap**? What is the failure it prevents? (Hint: what happens to a sentence that answers the question but straddles a window boundary?)
- Why **sentence-aware** packing rather than a fixed-size split? What does an embedding of a half-sentence actually represent?
- Why the `maxChars * 1.5` escape hatch — what real input forced you to add it?
- The timestamp mapping: why was that worth building?

### What a strong answer sounds like

Not _"I chose 1800 characters."_ Rather: _"Embeddings represent meaning, so a chunk has to be a coherent unit of meaning. Too large and the embedding averages several topics together and retrieval gets vague; too small and it loses the context that makes it answerable. I landed on ~450 tokens because a lecture transcript paragraph is roughly that size. The 250-char overlap exists because the sentence that answers a question is often the last one in a window — without overlap, it has no surrounding context in either chunk."_

---

## 2. Retrieval: in-process cosine similarity, not a vector database

**You made this decision and you should be proud of it — it's the most interesting one in the codebase, and you nearly didn't put it on the CV.**

### What your code actually does

`src/rag/schema/content-chunk.schema.ts` says it outright:

> _"…one course = tens–hundreds of chunks, so Phase 2 loads a course's chunks and ranks them with in-Node cosine similarity — no Atlas Vector Search."_

You filter by `courseId`/`lessonId` (there's a compound index), pull that course's chunks, and rank them in Node.

### Questions only you can answer

- Why **not** Atlas Vector Search or a dedicated vector DB (Pinecone, Qdrant)? What did you gain — cost, latency, deployment simplicity, no extra infrastructure?
- What is the **scaling limit** of this design? At what number of chunks per course does it stop being a good idea? Do you know roughly where that ceiling is?
- What would you have to change to move to a real vector index — and how much of the code would survive that migration?

### Why this matters

This is the single best question on your whole portfolio, because **it shows you sized the solution to the problem instead of reaching for the fashionable tool.** Most bootcamp projects bolt on Pinecone because a tutorial said to. You reasoned about your actual data shape. _Say that._ And be honest about the ceiling — knowing where your design breaks is the difference between a junior and a mid-level engineer.

---

## 3. Stripe: destination charges _and_ separate charges + transfers

### What your code actually does

You used **both models**, deliberately:

`src/payments/payments.service.ts:46` — _"Stripe Connect (Express, destination charges) marketplace flow"_

`payments.service.ts:443` (`fulfillCheckout`):

> _"Whole-cart sessions (separate charges + transfers) carry an orderId and are fulfilled per-item / per-instructor. Single-course destination charges fall through to the legacy path below."_

So: **single-course purchase → destination charge. Multi-instructor cart → separate charges + transfers.**

### Questions only you can answer

- Why does a **cart** break the destination-charge model? (Hint: a destination charge has exactly **one** destination account. What happens when a cart contains courses from three different instructors?)
- For the single-course path, why destination charges rather than direct charges? Who is the **merchant of record**? Who carries **liability for refunds and chargebacks**? Who pays Stripe's fee?
- Your `application_fee` — how is the platform cut calculated, and where does it come from?
- You put instructors on an **automatic daily payout schedule** (`payments.service.ts:173`). Why automatic rather than manual?

### What a strong answer sounds like

_"A destination charge routes one payment to one connected account, which is exactly right for a single course. But a cart can contain courses from several instructors, and one charge can't have several destinations — so for carts I take the payment onto the platform account and then issue a separate transfer per instructor, keyed to the order. Same customer experience, different settlement model underneath."_

**That paragraph alone will move you past most candidates.** It's a real architectural fork, driven by a real constraint.

---

## 4. Webhook idempotency

**Good news: you already solved this. You just didn't know it was a selling point.**

### What your code actually does

Three separate layers of protection:

1. **Signature verification** — `payments.controller.ts:116`, `this.stripe.constructEvent(raw, signature)`. Rejects forged webhooks.
2. **Idempotency keys on creation** — `payments.service.ts:365`:
   ```ts
   idempotencyKey: `checkout_${buyerId}_${course._id}_${destination}_${priceCents}_${feeCents}_${origin}`;
   ```
   and `cart_${orderId}` for carts. Retrying a Checkout creation can't create a second session.
3. **Fulfillment guard** — `payments.service.ts:460`:
   ```ts
   // Idempotency: skip if this session was already fulfilled.
   const existing = await this.orderModel
     .findOne({ stripeSessionId: session.id })
     .lean()
     .exec();
   if (existing) return;
   ```
   Stripe retries `checkout.session.completed`. The second delivery finds the existing Order and returns early — **no second Enrollment, no second Earning, no double payout.**

You also expose a manual "Already paid? Sync my purchase" endpoint (`payments.controller.ts:90`) that runs the _same_ idempotent fulfillment — a fallback for when a webhook is dropped entirely.

### Questions only you can answer

- Why did you include the price and fee **in the idempotency key**? (What breaks if a course's price changes and the key doesn't?)
- The fulfillment guard is a **read-then-write**. Two webhook deliveries arriving _simultaneously_ could both pass the `findOne` before either writes. **Is there a unique index on `stripeSessionId`?** If yes, say so — that's your real guarantee. If not, **that is a genuine race condition, and adding the index is a 5-minute fix that turns a bug into a story.**
- Why build the manual sync endpoint? What incident or worry prompted it?

### ⚠️ Check this today

```bash
grep -rn "stripeSessionId" src/orders/schema/
```

If there's no `unique: true` on `stripeSessionId`, add it. Then you can say, truthfully: _"Idempotency is enforced at three layers, and the last one is a unique database constraint — so even simultaneous webhook deliveries can't double-fulfil."_ That's a complete answer.

---

## 5. Provider abstraction (OpenAI + Gemini)

### What your code actually does

`src/ai/transcription.provider.ts` defines a `TranscriptionProvider` interface. Two implementations satisfy it:

- `OpenAiTranscriptionProvider`
- `GeminiTranscriptionProvider` (inline audio → `generateContent`)

The same pattern appears in embeddings (`GeminiEmbeddingsProvider`), and `retrieval.service.ts` stores the embedding **model name alongside every vector**, then filters by it — _"model-matched so a provider switch doesn't"_ mix incompatible vectors.

### Questions only you can answer

- Why abstract at all instead of calling one SDK directly? Cost, rate limits, availability, avoiding lock-in — which actually drove it?
- **Why store the model name with every embedding?** This is a genuinely sophisticated detail. What goes wrong if you switch embedding models and _don't_ track which model produced each vector? (Answer: the vector spaces are incompatible; cosine similarity between them is meaningless. You'd silently return garbage.) **Make sure you can explain this — it's the kind of detail that convinces a senior engineer you understand what you built.**
- Did you ever actually switch providers? What did it cost you in code changes?

---

# §5.6 — "What I'd do differently"

Don't invent humility. You have four real answers already:

1. **Payments had the lowest test coverage in the codebase (9%) despite being the most critical module.** The code handling other people's money was the least verified. _(Fix it before you publish this, then write it as "I caught this and fixed it" — a much better story.)_
2. **Test scaffolding drifted from the code.** Twelve suites were failing on `main` — six were `nest g` boilerplate never filled in, and the rest had mocks that hadn't followed the service refactors. Nobody ran the suite in CI, so nobody noticed.
3. **No CI until after the build.** With five developers and no automated check on push, drift like the above is inevitable rather than accidental.
4. **In-process cosine similarity has a ceiling.** It's the right call at course scale; it is not the right call at ten thousand courses. _Knowing where your design breaks is the point of this section._

Two or three of these, stated plainly, are worth more than any feature list on the page.

---

# `/about` — your bio

Nobody can write this for you, but here's the scaffold. Three short paragraphs, ~150 words total. No "passionate about technology." No "results-oriented professional."

**Paragraph 1 — how you got here.** You studied Computer Science at South Valley University, did the Route Academy diploma, then ITI's code camp. But _why_ software? Was there a specific first thing you built that worked? Say the true thing, briefly.

**Paragraph 2 — what you actually do.** You lead and you build backends. In six weeks you led four other developers and shipped a platform with a RAG pipeline and a real payments integration. What do you like about that work — the systems design, the debugging, the shipping, leading a team?

**Paragraph 3 — what's next.** Be specific and honest. _"I want to work on a product team where the backend is the hard part — payments, data pipelines, or AI infrastructure. I want to be the least experienced person in the room for a while."_ Something like that. Vague ambition reads as no ambition.

### Optional — but it would set you apart

You spent 2022–2025 as a videographer and photographer while teaching yourself to code, and you're doing part-time accounting now while looking for your first developer role. **That is a real story, and it is not a weakness.** Most portfolios are written by people who've never had to fund their own retraining. One honest sentence about it will be remembered longer than anything else on the page — as long as it's stated as fact, not apology.

---

## Before you write any of it

Go read your own code for an hour. Not to memorise it — to reconstruct _why_ you did what you did. Every one of these decisions is defensible; you made them all under time pressure and they were mostly right.

The single hardest question you will face is: _"How much of this did AI write?"_

**The answer is not a denial.** It's this document. Nobody who couldn't explain why a cart forces separate charges, or why embeddings must be model-matched, wrote these paragraphs from a prompt.
