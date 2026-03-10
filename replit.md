# UK Divorce Financial Modeller

## Overview

This project is a **UK Divorce Financial Modelling Web Application** designed to provide illustrative, scenario-based financial modelling for separation and divorce. Its primary purpose is to help users understand potential financial outcomes by modelling various settlement scenarios based on their assets, liabilities, incomes, and expenses. The application offers clarity and structured insights for users navigating complex financial divisions, acting as a decision-support tool. It includes a configurable UK tax/NI engine, optional child maintenance estimations, and optional spousal maintenance income transfer. The vision is to empower users with financial understanding, reduce the need for expensive preliminary consultations, and improve negotiation outcomes, always with a clear disclaimer that it does not provide legal, tax, or financial advice.

## User Preferences

Preferred communication style: Simple, everyday language. Avoid financial jargon — use plain English equivalents with technical terms in brackets where needed.

## System Architecture

### Overall Structure

The project uses a **monorepo** with `client/` for the React frontend, `server/` for the Express.js API, and `shared/` for common types, schemas, and route definitions.

### Frontend (`client/`)

A React 18 Single Page Application built with TypeScript and Vite. It uses Wouter for routing, Zustand for state management with localStorage persistence, and shadcn/ui (New York style) with Radix UI and Tailwind CSS for the UI. Data fetching is done with TanStack React Query, and Recharts for visualizations. Forms use React Hook Form with Zod for validation. Features include a multi-step wizard, a landing page, and a comprehensive results page with decision-support tools, scenario detail cards, stress test sliders, projection charts, a decision lens toggle, and downloadable reports. Personalization uses `partyAName` and `partyBName` from a welcome screen to dynamically replace "Party A" / "Party B" throughout the application.

### Backend (`server/`)

An Express.js server on Node.js providing RESTful JSON API endpoints for session management (creating, retrieving, updating sessions), email lead capture (`POST /api/leads`), and a stub for PDF generation.

### Financial Engine

The financial engine is a **deterministic, pure-function based, and fully testable** component in `client/src/lib/engine/`. It handles all financial calculations client-side for privacy. All tax bands, NI thresholds, and CMS rates are configuration-driven via `config.fixed.json`. It includes modules for income tax, national insurance, net income calculation, mortgage amortization, child maintenance estimation, and various settlement scenarios (Sell & Split, A Keeps Home, B Keeps Home, Deferred Sale). All arithmetic uses decimal-safe libraries and rounds currency to two decimal places. Spousal maintenance (when included by the user) is applied as an income transfer in the monthly surplus/deficit calculation.

### Data Layer

PostgreSQL is used as the database, accessed via Drizzle ORM. The `sessions` table stores the full `AppState` as JSONB, the `purchases` table tracks Stripe payments, and the `email_leads` table stores email addresses captured from the preview page and free guide. Client-side state persistence is managed by Zustand with localStorage.

### Premium Access Flow

A freemium model requires a one-time payment for full access. A `/preview` page shows limited data (real asset pool ring chart + locked scenario cards + greyed FSI dial + social proof + email lead capture), redirecting users to an `/unlock` page for Stripe Checkout. Upon successful payment at `/payment-success`, a 6-month access is granted. Access to `/results` and `/report` is controlled by an `AccessGate` component that checks `GET /api/access/:sessionToken`.

### Key Design Decisions

1. **Client-side engine for privacy**: Sensitive financial calculations occur in the browser.
2. **Config-driven tax model**: Financial parameters are externalized in a JSON configuration.
3. **Scenario comparison model**: Focuses on modelling user-defined split assumptions.
4. **Zod for validation**: Consistent schema validation across client and server.
5. **Freemium access model**: Preview limited data, full analysis requires payment.
6. **Email lead capture**: Preview page and free guide page capture email leads to `email_leads` table via `POST /api/leads`. Actual email delivery is a TODO (requires third-party email service integration).
7. **Spousal maintenance toggle**: Optional field in wizard Step 5 (Income). When enabled, applies a monthly income transfer between parties in the engine's surplus/deficit calculation.

### SEO Foundation

Technical SEO is implemented for `divorcecalculatoruk.co.uk` with dynamic page titles, meta tags, OG tags, canonical links, and JSON-LD structured data. `robots.txt` and `sitemap.xml` are configured. Dynamic pages are `noindex, nofollow`. Content pages follow specific layouts and include relevant disclaimers and regulatory compliance information.

**Content pages (public, indexed):**
- `/methodology` — Model methodology and limitations
- `/privacy`, `/terms` — Legal pages
- `/divorce-financial-modelling` — Pillar page
- `/divorce-50-50-split-calculator-uk`, `/divorce-house-buyout-calculator-uk`, `/divorce-pension-split-calculator-uk`, `/divorce-mortgage-affordability-after-separation`, `/divorce-financial-checklist-before-mediation` — Cluster pages
- `/is-50-50-split-automatic-uk`, `/can-i-keep-the-house-after-divorce-uk`, `/how-are-pensions-divided-in-divorce-uk` — FAQ pages
- `/how-much-does-divorce-cost-uk`, `/divorce-financial-settlement-calculator-uk`, `/who-gets-house-divorce-uk`, `/how-pensions-split-divorce-uk`, `/divorce-settlement-examples-uk` — 5 SEO authority pages (added 2026)
- `/free-guide` — Free UK Divorce Finances Guide (5 chapters, email capture, inline CTAs)

### Access Management

Email recovery (`/recover`) allows users to regain session tokens. The results page shows access expiry, with a warning for approaching expiry. An `/admin` panel (password-protected) allows customer support to extend access. Security measures include rate-limiting and timing-safe comparisons for sensitive endpoints.

### Wizard Steps

1. Your Situation (profile, partyAName, partyBName, England/Wales note)
2. Your Home (property assets)
3. Other Assets (savings, investments, other property)
4. Pensions
5. Your Income (incomes + spousal maintenance toggle)
6. Liabilities/Debts
7. Living Costs
8. Children (child maintenance)
9. Scenarios & Assumptions

### Store State

Key additions beyond base state:
- `maintenance: { included: boolean; monthlyAmount: number; direction: "AtoB" | "BtoA" }` — spousal maintenance toggle
- `profile.partyAName`, `profile.partyBName` — custom party names throughout the app

## External Dependencies

- **PostgreSQL**: Primary data store.
- **drizzle-orm** + **drizzle-kit**: ORM and migration tools.
- **zod**: Schema validation.
- **zustand**: Client-side state management.
- **@tanstack/react-query**: Server state management and API calls.
- **recharts**: Charting library.
- **react-hook-form** + **@hookform/resolvers**: Form management.
- **shadcn/ui** (Radix UI primitives): UI component library.
- **wouter**: Lightweight client-side router.
- **stripe** + **stripe-replit-sync**: Payment processing and webhook sync.
- **Vite**: Frontend bundling.
- **esbuild**: Server bundling.
- **tsx**: TypeScript execution.
- **Tailwind CSS** + **PostCSS** + **Autoprefixer**: Styling.
