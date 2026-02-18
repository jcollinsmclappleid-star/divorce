# Replit.md — UK Divorce Financial Modeller

## Overview

This is a **UK Divorce Financial Modelling Web Application** that provides illustrative, scenario-based financial modelling for separation/divorce situations. It is explicitly **not** legal, tax, or financial advice — a persistent disclaimer must appear on every page.

The app lets users enter marital assets, liabilities, incomes, and expenses for two parties (A and B), then models multiple settlement scenarios (sell & split, one party keeps the home, deferred sale, etc.). It includes a config-driven UK tax/NI engine and optional child maintenance estimation using CMS-style rules.

The core financial engine must be **deterministic, pure-function based, and fully testable** — no financial logic in UI components. All tax bands, NI thresholds, and CMS rates must come from configuration (no hardcoded values).

## Recent Changes

- **Feb 2026**: Expanded wizard to 9 steps: Welcome, Situation, Home, Assets, Pensions, Income, Living Costs, Support, Results. Living Costs step separated from Income with guided expense input (EXPENSE_SUGGESTIONS array with monthly/annual toggle and contextual hints).
- **Feb 2026**: Added premium insight engine (`client/src/lib/insights/`) with 5 pure-function modules:
  - `generateScenarioNarrative` — qualitative narrative summaries with headline, key drivers, trade-offs, risk flags
  - `buildSourceOfFunds` — row-by-row breakdown of where each party's liquid capital comes from
  - `computeStabilityScore` — 0-100 score with reasons (funding gap, affordability, runway, expense coverage, illiquidity)
  - `compareToSell` — delta comparison between keep-home and sell scenarios (liquid, net worth, runway changes)
  - `buildMonthlySnapshot` — monthly budget table (net income, expenses, mortgage, CMS) with surplus/deficit
- **Feb 2026**: Added guided suggestion panels (ASSET_SUGGESTIONS, DEBT_SUGGESTIONS, PENSION_SUGGESTIONS, INCOME_SUGGESTIONS) to wizard steps 3-5, matching the EXPENSE_SUGGESTIONS pattern with name/category/owner/hint fields and auto-filtering of already-added items.
- **Feb 2026**: Replaced stress test toggles with continuous sliders: mortgage rate slider (1-10%) and living costs adjustment slider (-20% to +30%). Added "How projections work" explanation panel and enhanced projection chart descriptions.
- **Feb 2026**: Rebuilt results page as premium decision-support tool with executive summary table, scenario detail cards (narrative + source-of-funds + composition chart + stability + monthly snapshot + comparison delta), stress test sliders, and projection charts.
- **Feb 2026**: Engine now exports intermediate values (netHomeEquity, totalLiquid, homeSaleCosts, totalDebt) for insight modules.
- **Feb 2026**: Refactored engine to always compute S1 (Sell & Split), S2 (A Keeps Home), S3 (B Keeps Home) using a shared `calcKeepsHome()` helper with role-swap pattern. S4 (Deferred Sale) is optional.
- **Feb 2026**: Fixed tax aggregation to handle multiple income streams per party with mixed tax treatment.
- **Feb 2026**: Added 3 new premium insight modules (`client/src/lib/insights/`):
  - `generateNegotiationLevers` — 3-5 structured suggestions for improving outcomes (split adjustment, expense reduction, rate reduction, buyout reduction, runway extension)
  - `computeSensitivityRanking` — ranks interest rate, living costs, and asset split changes by combined impact magnitude on surplus and runway
  - `computeHousingFeasibility` — keep-home mortgage analysis (income multiple vs 4.5x UK standard, deposit percentage, affordability threshold, descriptive notes)
- **Feb 2026**: Added advanced reporting sections to results page:
  - Decision Lens toggle (Liquidity Focus / Net Worth Focus / Risk & Sustainability) that highlights relevant rows in executive summary
  - 12-Month Snapshot table showing year-1 liquid remaining, monthly surplus, and months of buffer per scenario
  - Scenario Structure Comparison table with qualitative features (immediate liquidity, mortgage dependency, property/pension concentration, complexity level)
  - Sensitivity Ranking panel showing which factors (interest rate, living costs, asset split) have the largest impact
  - Housing Feasibility panel in keep-home scenario cards (mortgage required, income multiple, equity position, payment as % of net income)
  - Negotiation Levers panel in scenario detail cards with actionable suggestions and pound amounts
  - Assumptions appendix at bottom of results page
- **Feb 2026**: Added consumer-facing landing page (`client/src/pages/landing.tsx`) with all sections from homepage content spec:
  - Hero section with headline "Clarity Before Costly Decisions" and dual CTAs
  - Emotional positioning section ("Will I be financially okay?")
  - USP section with 5 feature cards (Starting Position, Sell vs Keep, Stability, Monthly Reality, Structured Brief)
  - Soft reassurance section (Private. Structured. On Your Terms.)
  - How It Works 4-step visual flow
  - Value anchor section (legal consultation cost comparison)
  - Final CTA section
  - Footer with branding and disclaimer
- **Feb 2026**: Updated routing: landing page at `/`, wizard moved to `/wizard`, results remain at `/results`

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Overall Structure

This is a **monorepo** with three top-level source directories:

- **`client/`** — React SPA (Vite + TypeScript)
- **`server/`** — Express.js API server (TypeScript, run via tsx)
- **`shared/`** — Shared types, Zod schemas, Drizzle DB schema, and route definitions used by both client and server

### Frontend (`client/src/`)

- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: Zustand with localStorage persistence (`use-store.ts`). The store holds all assets, liabilities, incomes, expenses, config, and scenario toggles as a flat `AppState` object.
- **UI Components**: shadcn/ui (New York style) with Radix UI primitives, Tailwind CSS, and Lucide icons
- **Data Fetching**: TanStack React Query for server interactions (session save/load)
- **Charts**: Recharts for financial visualizations (pie charts, bar charts, projections)
- **Forms**: React Hook Form with Zod resolvers for validation
- **Pages**: Dashboard (overview + charts), Assets & Debts, Income & Budget, Scenarios
- **Path aliases**: `@/` → `client/src/`, `@shared/` → `shared/`, `@assets/` → `attached_assets/`

### Backend (`server/`)

- **Framework**: Express.js on Node.js, wrapped in an HTTP server
- **Dev Server**: Vite dev middleware in development, static file serving in production
- **API Pattern**: RESTful JSON endpoints defined in `shared/routes.ts`, implemented in `server/routes.ts`
- **Current Endpoints**:
  - `POST /api/sessions` — Create a session (save financial model state)
  - `GET /api/sessions/:id` — Retrieve a session
  - `PUT /api/sessions/:id` — Update a session
  - `POST /api/pdf/generate` — PDF generation (stub, not yet implemented)
- **Build**: esbuild bundles server to `dist/index.cjs`; Vite builds client to `dist/public/`

### Financial Engine (Planned: `client/src/lib/engine/` or `shared/lib/engine/`)

The engine is the most critical architectural component. Per the design specs in `attached_assets/`:

- **Location**: Pure functions, no side effects. Originally spec'd as `/lib/engine/` — should live in shared or client depending on where calculations run (currently client-side in `use-engine.ts`)
- **Modules needed**:
  - `config/loadConfig.ts` — Load and validate UK tax config via Zod
  - `calc/incomeTax.ts` — Personal allowance taper + England/Wales/NI income tax bands
  - `calc/nationalInsurance.ts` — Employee Class 1 NI (LEL, PT, UEL thresholds)
  - `calc/netIncome.ts` — Gross → net income calculation
  - `calc/mortgage.ts` — Monthly amortisation from APR
  - `calc/childMaintenanceEstimate.ts` — CMS-style maintenance estimation (flat/reduced/basic/basic-plus rates with shared-care reductions)
  - `scenarios/` — S1 (sell & split), S2 (A keeps home), S3 (B keeps home), S4 (deferred/Mesher order)
- **Arithmetic**: Must use decimal-safe arithmetic (decimal.js or equivalent), round currency to 2dp
- **Config**: UK 2025/26 tax bands, NI thresholds, CMS rates stored in `config.fixed.json` — zero hardcoded values
- **Testing**: Vitest with fixture-based tests (see `attached_assets/` for test fixtures and expected outputs)

Currently, `use-engine.ts` has a simplified placeholder engine. The full engine per the attached specs needs to be built.

### Data Layer

- **Database**: PostgreSQL via Drizzle ORM
- **Schema** (`shared/schema.ts`):
  - `sessions` table: `id` (varchar PK), `name` (text), `data` (jsonb — stores full `AppState`), `createdAt`, `updatedAt`
- **Migrations**: Drizzle Kit with `drizzle-kit push` command, config in `drizzle.config.ts`, migrations output to `./migrations/`
- **Storage Pattern**: `server/storage.ts` implements `IStorage` interface with `DatabaseStorage` class wrapping Drizzle queries
- **Client Persistence**: Zustand persists to localStorage for MVP; server-side save is optional

### Shared Types (`shared/divorce_types.ts`)

Comprehensive Zod schemas for the domain model:
- **Parties**: A, B, joint
- **Assets**: 9 categories (primary_home, other_property, cash, investments, pension, business, vehicle, personal_possessions, other) with liquidity, growth rates, sale/tax cost percentages, pension-specific fields (CETV, DC/DB type)
- **Liabilities**: mortgage, loan, credit_card, tax, other — with optional secured-against-asset linking
- **Incomes**: Per-person streams with tax treatment toggle (use_tax_model vs net_provided)
- **Expenses**: Per-person or shared, with inflation linking and categorization
- **Children**: Number, nights with each parent (for CMS calculations)
- **Assumptions**: Split ratios, projection years, inflation rate, tax model toggle, CMS toggle
- **Full model**: `DivorceModelInputsSchema` combining all of the above

### Key Design Decisions

1. **Client-side engine for privacy**: All financial calculations run in the browser. The server is primarily for session persistence and PDF generation. This ensures sensitive financial data doesn't need to leave the user's device for computation.

2. **Config-driven tax model**: All UK tax/NI/CMS parameters come from a JSON config file, not hardcoded. This makes it easy to update for new tax years without code changes.

3. **Scenario comparison model**: Rather than claiming what a court would decide, the tool models outcomes under user-selected split assumptions. This is a deliberate legal/ethical design constraint.

4. **Zod everywhere**: Input validation uses Zod on both client and server, with shared schemas ensuring consistency.

## External Dependencies

### Database
- **PostgreSQL** — Required. Connection via `DATABASE_URL` environment variable. Used through Drizzle ORM with `node-postgres` driver.

### Key npm Packages
- **drizzle-orm** + **drizzle-kit** — Database ORM and migration tooling
- **zod** — Schema validation throughout the stack
- **zustand** — Client-side state management with persistence
- **@tanstack/react-query** — Server state management and API calls
- **recharts** — Charting library for financial visualizations
- **react-hook-form** + **@hookform/resolvers** — Form handling with Zod integration
- **shadcn/ui** (Radix UI primitives) — Complete UI component library
- **wouter** — Lightweight client-side routing
- **uuid** — Session ID generation
- **connect-pg-simple** — PostgreSQL session store (available but not yet actively used for auth sessions)
- **express-session** — Session middleware (available in dependencies)

### Build Tools
- **Vite** — Frontend bundling with React plugin, HMR in development
- **esbuild** — Server bundling for production
- **tsx** — TypeScript execution for development server
- **Tailwind CSS** + **PostCSS** + **Autoprefixer** — Styling pipeline

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal** — Runtime error overlay
- **@replit/vite-plugin-cartographer** — Dev tooling (dev only)
- **@replit/vite-plugin-dev-banner** — Dev banner (dev only)

### Planned/Needed
- **decimal.js** (or equivalent) — Decimal-safe arithmetic for financial calculations (mentioned in specs, needs to be added)
- **PDF generation library** (pdfkit, puppeteer, or similar) — Server-side PDF export (endpoint exists as stub)
- **vitest** — Test runner for engine unit tests (mentioned in specs, needs to be configured)