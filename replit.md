# UK Divorce Financial Modeller

## Overview

This project is a **UK Divorce Financial Modelling Web Application** designed to provide illustrative, scenario-based financial modelling for separation and divorce. Its primary purpose is to help users understand potential financial outcomes by modelling various settlement scenarios based on their assets, liabilities, incomes, and expenses. The application offers clarity and structured insights for users navigating complex financial divisions, acting as a decision-support tool. It includes a configurable UK tax/NI engine and optional child maintenance estimations. The vision is to empower users with financial understanding, reduce the need for expensive preliminary consultations, and improve negotiation outcomes, always with a clear disclaimer that it does not provide legal, tax, or financial advice.

## User Preferences

Preferred communication style: Simple, everyday language. Avoid financial jargon — use plain English equivalents with technical terms in brackets where needed.

## System Architecture

### Overall Structure

The project uses a **monorepo** with `client/` for the React frontend, `server/` for the Express.js API, and `shared/` for common types, schemas, and route definitions.

### Frontend (`client/`)

A React 18 Single Page Application built with TypeScript and Vite. It uses Wouter for routing, Zustand for state management with localStorage persistence, and shadcn/ui (New York style) with Radix UI and Tailwind CSS for the UI. Data fetching is done with TanStack React Query, and Recharts for visualizations. Forms use React Hook Form with Zod for validation. Features include a multi-step wizard, a landing page, and a comprehensive results page with decision-support tools, scenario detail cards, stress test sliders, projection charts, a decision lens toggle, and downloadable reports. Personalization uses `partyAName` and `partyBName` from a welcome screen to dynamically replace "Party A" / "Party B" throughout the application.

### Backend (`server/`)

An Express.js server on Node.js providing RESTful JSON API endpoints for session management (creating, retrieving, updating sessions) and a stub for PDF generation.

### Financial Engine

The financial engine is a **deterministic, pure-function based, and fully testable** component, likely residing in `client/src/lib/engine/` or `shared/lib/engine/`. It handles all financial calculations client-side for privacy. All tax bands, NI thresholds, and CMS rates are configuration-driven via `config.fixed.json`. It includes modules for income tax, national insurance, net income calculation, mortgage amortization, child maintenance estimation, and various settlement scenarios (Sell & Split, A Keeps Home, B Keeps Home, Deferred Sale). All arithmetic uses decimal-safe libraries and rounds currency to two decimal places.

### Data Layer

PostgreSQL is used as the database, accessed via Drizzle ORM. The `sessions` table stores the full `AppState` as JSONB, and the `purchases` table tracks Stripe payments. Client-side state persistence is managed by Zustand with localStorage.

### Premium Access Flow

A freemium model requires a one-time payment for full access. A `/preview` page shows limited data, redirecting users to an `/unlock` page for Stripe Checkout. Upon successful payment at `/payment-success`, a 6-month access is granted. Access to `/results` and `/report` is controlled by an `AccessGate` component that checks `GET /api/access/:sessionToken`.

### Key Design Decisions

1.  **Client-side engine for privacy**: Sensitive financial calculations occur in the browser.
2.  **Config-driven tax model**: Financial parameters are externalized in a JSON configuration.
3.  **Scenario comparison model**: Focuses on modelling user-defined split assumptions.
4.  **Zod for validation**: Consistent schema validation across client and server.
5.  **Freemium access model**: Preview limited data, full analysis requires payment.

### SEO Foundation

Technical SEO is implemented for `divorcecalculatoruk.co.uk` with dynamic page titles, meta tags, OG tags, canonical links, and JSON-LD structured data. `robots.txt` and `sitemap.xml` are configured. Dynamic pages are `noindex, nofollow`. Content pages (`/methodology`, `/terms`, `/privacy`, and a cluster of SEO-focused pages) follow specific layouts and include relevant disclaimers and regulatory compliance information.

### Access Management

Email recovery (`/recover`) allows users to regain session tokens. The results page shows access expiry, with a warning for approaching expiry. An `/admin` panel (password-protected) allows customer support to extend access. Security measures include rate-limiting and timing-safe comparisons for sensitive endpoints.

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
-   **Vite**: Frontend bundling.
-   **esbuild**: Server bundling.
-   **tsx**: TypeScript execution.
-   **Tailwind CSS** + **PostCSS** + **Autoprefixer**: Styling.