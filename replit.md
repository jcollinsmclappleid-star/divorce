# UK Divorce Financial Modeller

## Overview

This project is a **UK Divorce Financial Modelling Web Application** designed to provide illustrative, scenario-based financial modelling for separation and divorce. Its primary purpose is to help users understand potential financial outcomes by modelling various settlement scenarios based on their assets, liabilities, incomes, and expenses. A constant disclaimer must be visible stating that the application does not provide legal, tax, or financial advice.

Key capabilities include a configurable UK tax/NI engine and optional child maintenance estimations. The application aims to offer clarity and structured insights for users navigating complex financial divisions, acting as a decision-support tool rather than an advisory one. The project envisions empowering users with financial understanding, reducing the need for expensive preliminary consultations, and ultimately improving negotiation outcomes.

## User Preferences

Preferred communication style: Simple, everyday language. Avoid financial jargon — use plain English equivalents with technical terms in brackets where needed.

## System Architecture

### Overall Structure

The project utilizes a **monorepo** architecture, separating concerns into three top-level directories: `client/` for the React frontend, `server/` for the Express.js API, and `shared/` for common types, schemas, and route definitions.

### Frontend (`client/src/`)

The frontend is a React 18 Single Page Application built with TypeScript and Vite. It uses Wouter for client-side routing, Zustand for state management with localStorage persistence, and shadcn/ui (New York style) with Radix UI primitives and Tailwind CSS for its user interface. Data fetching is handled by TanStack React Query, and Recharts is used for financial visualizations. Form management is implemented with React Hook Form and Zod resolvers for validation. The application features a multi-step wizard for data entry, a landing page, and a comprehensive results page that integrates advanced decision-support tools and insights. The results page prioritizes user-friendly language and includes features like executive summaries, scenario detail cards, stress test sliders, projection charts, a decision lens toggle, and downloadable reports.

### Backend (`server/`)

The backend is an Express.js server on Node.js. It provides RESTful JSON API endpoints for session management (creating, retrieving, updating sessions) and a stub for PDF generation. In development, it integrates with Vite's dev middleware, while in production it serves static files.

### Financial Engine (`client/src/lib/engine/` or `shared/lib/engine/`)

The financial engine is a critical component designed to be **deterministic, pure-function based, and fully testable**. It is planned to reside in either `client/src/lib/engine/` or `shared/lib/engine/` and will handle all financial calculations on the client-side for privacy. All tax bands, NI thresholds, and CMS rates are configuration-driven via `config.fixed.json`, ensuring no hardcoded values and easy updates for new tax years. The engine will include modules for income tax, national insurance, net income calculation, mortgage amortization, child maintenance estimation, and various settlement scenarios (Sell & Split, A Keeps Home, B Keeps Home, Deferred Sale). All arithmetic will use decimal-safe libraries and round currency to two decimal places.

### Data Layer

PostgreSQL is used as the database, accessed via Drizzle ORM. The `shared/schema.ts` defines the `sessions` and `purchases` tables. The `sessions` table stores the full `AppState` as JSONB. The `purchases` table tracks Stripe payments with session tokens, checkout IDs, payment status, and 6-month expiry timestamps. Drizzle Kit manages database migrations. Client-side state persistence is handled by Zustand with localStorage.

### Premium Access Flow (Preview → Unlock → Results)

The application uses a freemium model with a £59 launch phase payment (standard £79) for full access:
- **Preview page** (`/preview`): Shows limited financial data (net equity, asset pool, 50/50 split) with blurred sections for premium content. Users are redirected here after completing the wizard or clicking example scenarios.
- **Unlock page** (`/unlock`): Professional pricing page with Stripe Checkout integration.
- **Payment success** (`/payment-success`): Verifies payment and grants 6-month access.
- **Access control**: `/results` and `/report` are wrapped in `AccessGate` component that checks `GET /api/access/:sessionToken`. If no valid purchase, user is redirected to `/preview`.
- **Stripe integration**: Uses Replit Stripe connector with `stripe-replit-sync` for webhook processing and data sync. Product: "Structured Financial Analysis" (£59 launch phase; standard £79). Webhook handler updates purchases table on checkout.session.completed.
- **Session token**: Stored in localStorage as `dfm-session-token`, used to link purchases to browser sessions.

### Key Design Decisions

1.  **Client-side engine for privacy**: All sensitive financial calculations occur in the browser, minimizing data transfer to the server.
2.  **Config-driven tax model**: All financial parameters are externalized in a JSON configuration, allowing for flexible updates.
3.  **Scenario comparison model**: The tool focuses on modelling user-defined split assumptions rather than prescribing legal outcomes.
4.  **Zod for validation**: Consistent schema validation is applied across both client and server using Zod.
5.  **Freemium access model**: Preview page shows limited data to demonstrate value; full analysis requires £59 launch phase Stripe payment (standard £79) with 6-month access window.

### SEO Foundation

Technical SEO is implemented for target domain `divorcecalculatoruk.co.uk`:
- **Dynamic page titles**: Each route has a unique title via `useDocumentTitle` hook (e.g., "Divorce Financial Settlement Calculator UK | DivorceCalculatorUK")
- **Meta tags**: Homepage has description, OG tags (title, description, type, url, image), canonical link, and JSON-LD structured data (WebApplication schema)
- **robots.txt**: Allows homepage, disallows /results, /report, /wizard, /unlock, /payment-success; references sitemap
- **sitemap.xml**: Includes /, /privacy, /terms only (no dynamic pages)
- **noindex**: Dynamic pages (wizard, preview, results, report, unlock, payment-success) have `<meta name="robots" content="noindex, nofollow">` via `useNoIndex` hook
- **OG image**: Branded 1200x630 image at `/og-image.png`
- **Privacy Policy** (`/privacy`): UK GDPR compliant, covers data collection, client-side processing, Stripe payments, user rights
- **Terms of Use** (`/terms`): UK consumer protection compliant, includes Consumer Rights Act 2015, 14-day cooling-off period, limitation of liability
- **Google Fonts**: Reduced from 25+ families to Inter (primary) + Playfair Display (headings) only

### Access Management
- **Email recovery** (`/recover`): Users enter the email used at checkout to recover their session token and regain access. Rate-limited to 5 attempts per IP per hour.
- **Expiry visibility**: Results page disclaimer bar shows access expiry date; amber warning badge when ≤14 days remain.
- **Admin panel** (`/admin`): Password-protected (ADMIN_PASSWORD env var) panel for customer support. Lookup purchases by email, extend access by 1-12 months. Rate-limited admin auth with timing-safe comparison. No financial data exposed — only purchase metadata.
- **Security**: Recovery endpoint rate-limited, admin auth uses crypto.timingSafeEqual, both endpoints behind rate limiting. Session tokens only unlock UI — all financial data stays in browser localStorage.

## External Dependencies

### Database
-   **PostgreSQL** — Primary data store, accessed via `DATABASE_URL` and Drizzle ORM with `node-postgres`.

### Key npm Packages
-   **drizzle-orm** + **drizzle-kit** — ORM and migration tools.
-   **zod** — Schema validation.
-   **zustand** — Client-side state management.
-   **@tanstack/react-query** — Server state management and API calls.
-   **recharts** — Charting library.
-   **react-hook-form** + **@hookform/resolvers** — Form management.
-   **shadcn/ui** (Radix UI primitives) — UI component library.
-   **wouter** — Lightweight client-side router.
-   **stripe** + **stripe-replit-sync** — Payment processing and webhook sync.

### Build Tools
-   **Vite** — Frontend bundling.
-   **esbuild** — Server bundling.
-   **tsx** — TypeScript execution.
-   **Tailwind CSS** + **PostCSS** + **Autoprefixer** — Styling.

### Planned/Needed
-   **decimal.js** (or equivalent) — For precise financial calculations.
-   **PDF generation library** — For server-side report generation.
-   **vitest** — For engine unit testing.

## Regulatory Compliance (February 2026)

### Terminology Standards
- **Lending capacity**: All references use "Indicative Lending Capacity Benchmark (Non-Lender Specific)" with disclaimer: "generalised income multiple illustrations and do not constitute a lending assessment, mortgage advice, or credit approval indication"
- **Sustainability indicator**: "Financial Sustainability Indicator (Illustrative Model Output)" with bands: "Higher Resilience" (80+), "Moderate Resilience" (60-79), "Lower Resilience" (<60)
- **Court outcomes**: Explicit boundary: "Does not predict court outcomes, judicial discretion, legal entitlement, or settlement fairness"
- **FCA perimeter**: FSMA 2000 statement in Terms Section 2; no regulated financial advice, no product recommendations, no suitability assessments

### Key Pages
- `/methodology` — Model Methodology & Limitations (8 sections, SEO-indexed)
- `/terms` — Terms of Use (18 sections, FSMA 2000 + FCA/SRA disclaimers)
- `/privacy` — Privacy Policy (15 sections, UK GDPR compliant)
- Landing page FAQ section with 6 regulatory Q&As

### SEO Content Cluster (9 pages)
All content pages use a shared `ContentPageLayout` component (`client/src/components/content-page-layout.tsx`) with sticky nav, hero, inline CTAs, OG meta tags, canonical tags, Article JSON-LD, BreadcrumbList JSON-LD, related pages grid, disclaimer, and footer. Pages are in `client/src/pages/content/`.

**Pillar page (~2000 words):**
- `/divorce-financial-modelling` — "Divorce Financial Modelling in England & Wales" (Tabs, Accordions, icon Cards, GOV.UK external links, Section 25 factors detail, deferred sale orders, child maintenance overview)

**Cluster pages (5, ~800-1000 words each):**
- `/divorce-50-50-split-calculator-uk` — 50/50 Split Calculator (Party A/B comparison Cards, asset composition analysis, common misconceptions Accordion)
- `/divorce-house-buyout-calculator-uk` — House Buyout Calculator (stepped equity breakdown, Accordion affordability, SDLT considerations, deferred sale alternatives)
- `/divorce-pension-split-calculator-uk` — Pension Split Calculator (sharing vs offsetting Cards, DB vs DC comparison, actuarial advice guidance)
- `/divorce-mortgage-affordability-after-separation` — Mortgage Affordability (stress test Accordions, post-separation income changes, lender assessment overview)
- `/divorce-financial-checklist-before-mediation` — Mediation Checklist (7 checklist Cards, Form E overview, digital records guidance)

**FAQ pages (3, ~600-700 words each, with FAQ JSON-LD schema):**
- `/is-50-50-split-automatic-uk` — "Is 50/50 Automatic?" (callout Card, Accordion reasons, White v White principle, short vs long marriages)
- `/can-i-keep-the-house-after-divorce-uk` — "Can I Keep the House?" (factor Cards, retain vs sell comparison, children's housing needs, transfer of title)
- `/how-are-pensions-divided-in-divorce-uk` — "How Are Pensions Divided?" (approach Cards, Accordion tax/valuation, state pension considerations, pension actuary role)

**SEO infrastructure:**
- All pages in sitemap.xml (pillar 0.8, clusters 0.6, FAQs 0.5)
- Meta descriptions injected dynamically per page
- Canonical tags injected dynamically per page
- Article JSON-LD schema on all content pages
- BreadcrumbList JSON-LD schema on all content pages
- FAQ JSON-LD schema on landing page and 3 FAQ pages
- OG meta tags injected dynamically per page
- Cross-linked internally + to pillar + to tool
- External GOV.UK links open in new tab with `rel="noopener noreferrer"`
- JSON-LD price in index.html: £59 (launch phase)

### Language Policy
- Strictly non-advisory: use "may warrant assessment", "may be relevant considerations"
- Avoid: "Consider...", "should", "recommend", "advise", "fair", "entitled"
- Use: "Independent professional review may be warranted" not "is recommended"