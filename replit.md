# UK Divorce Financial Modeller

## Overview

This project is a **UK Divorce Financial Modelling Web Application** providing illustrative, scenario-based financial modelling for separation and divorce. It helps users understand potential financial outcomes by modelling various settlement scenarios based on their assets, liabilities, incomes, and expenses. The application offers clarity and structured insights, acting as a decision-support tool. It includes a configurable UK tax/NI engine, optional child maintenance estimations, and optional spousal maintenance income transfer. The vision is to empower users with financial understanding, reduce the need for expensive preliminary consultations, and improve negotiation outcomes, while explicitly stating it does not provide legal, tax, or financial advice.

## User Preferences

Preferred communication style: Simple, everyday language. Avoid financial jargon — use plain English equivalents with technical terms in brackets where needed.

## System Architecture

The project uses a **monorepo** with `client/` for the React frontend, `server/` for the Express.js API, and `shared/` for common types, schemas, and route definitions.

### Frontend (`client/`)

A React 18 Single Page Application (TypeScript, Vite) uses Wouter for routing, Zustand for state management with localStorage persistence, and shadcn/ui (New York style) with Radix UI and Tailwind CSS for the UI. Data fetching uses TanStack React Query, and Recharts for visualizations. Forms are managed with React Hook Form and Zod for validation. Key features include a multi-step wizard, a landing page, and a comprehensive results page with decision-support tools, scenario cards, stress test sliders, projection charts, a decision lens toggle, and downloadable reports. User personalization uses `partyAName` and `partyBName` to dynamically update display names. The logo component displays "Divorce Calculator UK" text branding.

Landing page includes: hero with dual CTA (start free + preview sample report), "What your full report includes" 6-card feature section, updated pricing with 7 bullet points, and a sample report modal (`report-preview-modal.tsx`). Preview/paywall page shows a personalised hero with asset pool badge, Guided Summary locked teaser, and free/paid comparison. Report page uses premium gradient section headers, scenario stat strips, and color-coded tax tables. Guided Summary Panel uses colored left-border blocks per section type with collapsible sections.

The design features a signature gold accent (`#C9A84C`) for primary CTAs and branding, complemented by a multi-color palette for interactive elements (teal/cyan), assets (violet), income (rose), sustainability (emerald), and scenarios (amber). Scroll-triggered fade-in animations are used for UI elements.

**Landing motion pass (subtle, professional):** The hero left column uses a staggered framer-motion fade-up cascade culminating in a drawn gold underline under "blind." and a slow `cta-breath` glow on the primary CTA; the dot-grid background has a gentle scroll-linked parallax; the right console fades up in sync. A 2px gold `ScrollProgressBar` (framer-motion `useScroll`/`useSpring`) appears past the hero. The `LandingCommandConsole` auto-rotates scenarios every 5s (pauses on hover, stops permanently on user interaction). The `DemoCarousel` auto-advances every 6s only while in view, with the same hover/interaction rules. UK Facts figures and the £79 price use a shared `AnimatedCounter` (IntersectionObserver-triggered count-up). The Live Pool showcase dial draws its gold arc on view via `motion.path` `pathLength`. All motion is gated by `useReducedMotion` and a `prefers-reduced-motion` CSS block that disables ambient loops (`cta-breath`, `btn-shimmer`, `step-node-active`, `animate-pulse-soft`, `animate-nudge-right`) and `[data-reveal]` transitions.

### Backend (`server/`)

An Express.js server (Node.js) provides RESTful JSON API endpoints for purchase access checks (`GET /api/access/:token`, `/api/access/recover`), magic-link auth (`/api/auth/send-link`, `/api/auth/verify`, `/api/auth/me`, `/api/auth/logout`), email lead capture (`POST /api/leads` + `/api/leads/verify`), Stripe checkout + webhook, the guided report summary, and a stub for PDF generation. The server intentionally does **not** persist wizard modelling state — that lives only in the browser.

### Financial Engine

A **deterministic, pure-function based, and fully testable** financial engine resides client-side (`client/src/lib/engine/`) for privacy. All financial calculations occur in the browser. Tax bands, NI thresholds, and CMS rates are configuration-driven via `config.fixed.json`. It includes modules for income tax, national insurance, net income, mortgage amortization, child maintenance, and various settlement scenarios (Sell & Split, A Keeps Home, B Keeps Home, Deferred Sale). All arithmetic uses decimal-safe libraries and rounds currency to two decimal places. Spousal maintenance, when enabled, applies as an income transfer.

### Data Layer

PostgreSQL is used as the database via Drizzle ORM. Tables: `purchases` (Stripe payments), `email_leads` (captured email addresses with double opt-in), `magic_links` (single-use sign-in tokens with 1-hour expiry), and `user_sessions` (server-side auth session store managed by connect-pg-simple). Wizard modelling state (names, finances, scenarios) is held entirely client-side via Zustand + localStorage and is never sent to the server — the legacy server-side `sessions` table and `/api/sessions` endpoints were removed in May 2026.

### Premium Access Flow

A freemium model requires a one-time payment for full access. A `/preview` page shows limited data and prompts users to an `/unlock` page for Stripe Checkout. Successful payment at `/payment-success` grants 12-month access. Access to `/results` and `/report` is controlled by an `AccessGate` component.

### Authentication — Magic Link System

Users sign in via magic link emails — no password required. The flow:

1. User visits `/recover` (labelled "Sign In") and enters their checkout email.
2. `POST /api/auth/send-link` creates a 48-byte random token, stores it in `magic_links` (1-hour TTL), and sends a sign-in email via Resend.
3. User clicks the link → `GET /api/auth/verify?token=xxx` validates the token (single-use, expiry check), sets an **HttpOnly session cookie** (`dfm.sid`) via express-session backed by PostgreSQL, then redirects to `/access?token=PURCHASE_SESSION_TOKEN`.
4. The `/access` page sets `localStorage['dfm-session-token']` for backward compat and redirects to `/results`.
5. `GET /api/auth/me` returns `{ authenticated, email, hasAccess, expiresAt }` from the server session cookie.
6. `POST /api/auth/logout` destroys the server session and clears the cookie.

The `useAccess` hook checks both the server session (`/api/auth/me`) and the localStorage token (`/api/access/:token`) in parallel, granting access if either passes. Sign-out calls server logout + clears localStorage + resets Zustand store.

The `/recover` page also retains the order-reference fallback (`POST /api/access/recover-by-order`) for users who don't have email on record.

### Key Design Decisions

1.  **Client-side engine for privacy**: Sensitive financial calculations occur in the browser.
2.  **Config-driven tax model**: Financial parameters are externalized in a JSON configuration.
3.  **Scenario comparison model**: Focuses on modelling user-defined split assumptions.
4.  **Zod for validation**: Consistent schema validation across client and server.
5.  **Freemium access model**: Preview limited data, full analysis requires payment.
6.  **Email lead capture**: Captures emails from preview page, wizard, and free guide, with a double opt-in for the free guide.
7.  **Spousal maintenance toggle**: Optional feature in the wizard, applying an income transfer between parties in calculations.
8.  **Magic link auth**: No passwords. Server-side session via HttpOnly cookie. Cross-device access. Single-use tokens with 1-hour expiry. Email enumeration prevented (always returns `{ sent: true }`).

### Security & GDPR

HTTP security headers are applied via `helmet` including CSP (allowing Stripe.js, self-hosted fonts), HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy. Email FROM domains are verified (Resend with SPF/DKIM). Double opt-in is implemented for email leads. GDPR data deletion (`POST /api/gdpr/delete`) anonymises purchases and deletes email leads, magic links, and user sessions. Stripe webhook verification uses `STRIPE_WEBHOOK_SECRET`. Admin access is password-protected. Self-hosted fonts are used. Magic link tokens are single-use, 1-hour expiry, 96 hex characters (48 bytes), with both per-IP and per-email rate limits on `/api/auth/send-link`. Server sessions stored in PostgreSQL via connect-pg-simple with a 90-day cookie lifetime and hourly pruning.

**Data minimisation & retention:** API request logging only records method, path, status, and duration — never response bodies. Lead capture no longer stores `assetPoolSnapshot` (still passed through transiently for the user-confirmation email). No analytics, trackers, or cookie banner — only strictly necessary cookies are set.

**Automated retention** (`server/cleanup.ts`) runs on boot + every 6 hours:
- Expired `magic_links` (past `expires_at`) — deleted
- Unverified `email_leads` older than 30 days — deleted
- Verified `email_leads` older than 24 months — deleted
- Existing `email_leads.asset_pool_snapshot` values — NULL'd (column retained, no longer written)
- `purchases` older than 7 years — email anonymised (NULL)
- `user_sessions` (auth) — pruned hourly by connect-pg-simple

**Breach notification commitment** in privacy policy maps to UK GDPR Articles 33/34 only — ICO within 72 hours where required, data subjects without undue delay where high risk. No commitments beyond statutory minima.

## External Dependencies

-   **PostgreSQL**: Primary data store.
-   **drizzle-orm** + **drizzle-kit**: ORM and migration tools.
-   **zod**: Schema validation.
-   **zustand**: Client-side state management.
-   **@tanstack/react-query**: Server state management and API calls.
-   **recharts**: Charting library.
-   **react-hook-form** + **@hookform/resolvers**: Form management.
-   **shadcn/ui** (Radix UI primitives): UI component library.
-   **wouter**: Lightweight client-side router.
-   **stripe** + **stripe-replit-sync**: Payment processing and webhook sync.
-   **helmet**: HTTP security headers middleware.
-   **Vite**: Frontend bundling.
-   **esbuild**: Server bundling.
-   **tsx**: TypeScript execution.
-   **Tailwind CSS** + **PostCSS** + **Autoprefixer**: Styling.