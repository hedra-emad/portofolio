/**
 * EduGenie's architecture, as inline SVG — no image file, no PNG to go stale,
 * and it stays sharp at any zoom. It is drawn with the same tokens as the rest
 * of the page: hairline strokes, the mono face for labels, the accent used once
 * (on the API, because the API is the thing Hedra owned).
 *
 * `role="img"` plus a `<title>`/`<desc>` pair means a screen reader gets a real
 * description instead of "graphic".
 */
export function ArchitectureDiagram() {
  return (
    <figure className="border-border bg-surface border p-6">
      <svg
        viewBox="0 0 900 420"
        className="h-auto w-full"
        role="img"
        aria-labelledby="arch-title arch-desc"
      >
        <title id="arch-title">EduGenie system architecture</title>
        <desc id="arch-desc">
          Two client applications — a Next.js student web app and an Angular
          admin dashboard — both call a NestJS REST API. The API reads and
          writes MongoDB, and integrates four external services: Stripe Connect
          for payments, OpenAI and Gemini for the RAG pipeline, Cloudinary for
          media, and Socket.IO with Pusher for realtime.
        </desc>

        <g
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
          fontFamily="var(--font-mono)"
        >
          {/* Clients */}
          <rect x="60" y="30" width="230" height="70" rx="4" fill="var(--bg)" />
          <rect
            x="330"
            y="30"
            width="230"
            height="70"
            rx="4"
            fill="var(--bg)"
          />

          {/* API */}
          <rect
            x="195"
            y="170"
            width="230"
            height="80"
            rx="4"
            fill="var(--bg)"
            stroke="var(--accent)"
          />

          {/* Data */}
          <rect
            x="195"
            y="320"
            width="230"
            height="70"
            rx="4"
            fill="var(--bg)"
          />

          {/* External services */}
          <rect
            x="620"
            y="140"
            width="220"
            height="140"
            rx="4"
            fill="var(--bg)"
          />

          {/* Edges */}
          <path d="M175 100 L 250 170" />
          <path d="M445 100 L 370 170" />
          <path d="M310 250 L 310 320" />
          <path d="M425 210 L 620 210" />
        </g>

        <g
          fontFamily="var(--font-mono)"
          fontSize="13"
          fill="var(--text)"
          textAnchor="middle"
        >
          <text x="175" y="60">
            student web
          </text>
          <text x="175" y="80" fill="var(--text-muted)" fontSize="12">
            next.js
          </text>

          <text x="445" y="60">
            admin dashboard
          </text>
          <text x="445" y="80" fill="var(--text-muted)" fontSize="12">
            angular
          </text>

          <text x="310" y="203" fill="var(--accent)">
            edugenie-api
          </text>
          <text x="310" y="223" fill="var(--text-muted)" fontSize="12">
            nestjs · 188 rest endpoints
          </text>

          <text x="310" y="352">
            mongodb
          </text>
          <text x="310" y="372" fill="var(--text-muted)" fontSize="12">
            mongoose
          </text>
        </g>

        <g
          fontFamily="var(--font-mono)"
          fontSize="12"
          fill="var(--text-muted)"
          textAnchor="start"
        >
          <text x="644" y="168" fill="var(--text)" fontSize="13">
            external services
          </text>
          <text x="644" y="196">
            stripe connect
          </text>
          <text x="644" y="218">
            openai · gemini
          </text>
          <text x="644" y="240">
            cloudinary
          </text>
          <text x="644" y="262">
            socket.io · pusher
          </text>
        </g>
      </svg>
      <figcaption className="label mt-5 normal-case">
        Two clients over one NestJS API. The dashboard is Angular — this is
        history, not a skill claim.
      </figcaption>
    </figure>
  );
}
