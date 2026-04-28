# UK Divorce Financial Modeller

## Overview

This project is a **UK Divorce Financial Modelling Web Application** providing illustrative, scenario-based financial modelling for separation and divorce. It helps users understand potential financial outcomes by modelling various settlement scenarios based on their assets, liabilities, incomes, and expenses. The application offers clarity and structured insights, acting as a decision-support tool. It includes a configurable UK tax/NI engine, optional child maintenance estimations, and optional spousal maintenance income transfer. The vision is to empower users with financial understanding, reduce the need for expensive preliminary consultations, and improve negotiation outcomes, while explicitly stating it does not provide legal, tax, or financial advice.

## User Preferences

Preferred communication style: Simple, everyday language. Avoid financial jargon — use plain English equivalents with technical terms in brackets where needed.

## System Architecture

The project uses a **monorepo** with `client/` for the React frontend, `server/` for the Express.js API, and `shared/` for common types, schemas, and route definitions.

### Frontend (`client/`)

A React 18 Single Page Application (TypeScript, Vite) uses Wouter for routing, Zustand for state management with localStorage persistence, and shadcn/ui (New York style) with Radix UI and Tailwind CSS for the UI. Data fetching uses TanStack React Query, and Recharts for visualizations. Forms are managed with React Hook Form and Zod for validation. Key features include a multi-step wizard, a landing page, and a comprehensive results page with decision-support tools, scenario cards, stress test sliders, projection charts, a decision lens toggle, and downloadable reports. User personalization uses `partyAName` and `partyBName` to dynamically update display names. The logo component displays "Divorce Calculator UK" text branding.

The design features a signature gold accent (`#C9A84C`) for primary CTAs and branding, complemented by a multi-color palette for interactive elements (teal/cyan), assets (violet), income (rose), sustainability (emerald), and scenarios (amber). Scroll-triggered fade-in animations are used for UI elements.

### Backend (`server/`)

An Express.js server (Node.js) provides RESTful JSON API endpoints for session management (create, retrieve, update), email lead capture (`POST /api/leads`), and a stub for PDF generation.

### Financial Engine

A **deterministic, pure-function based, and fully testable** financial engine resides client-side (`client/src/lib/engine/`) for privacy. All financial calculations occur in the browser. Tax bands, NI thresholds, and CMS rates are configuration-driven via `config.fixed.json`. It includes modules for income tax, national insurance, net income, mortgage amortization, child maintenance, and various settlement scenarios (Sell & Split, A Keeps Home, B Keeps Home, Deferred Sale). All arithmetic uses decimal-safe libraries and rounds currency to two decimal places. Spousal maintenance, when enabled, applies as an income transfer.

### Data Layer

PostgreSQL is used as the database via Drizzle ORM. Tables include `sessions` (stores `AppState` as JSONB), `purchases` (Stripe payments), and `email_leads` (captured email addresses). Client-side state persistence is handled by Zustand with localStorage.

### Premium Access Flow

A freemium model requires a one-time payment for full access. A `/preview` page shows limited data and prompts users to an `/unlock` page for Stripe Checkout. Successful payment at `/payment-success` grants 6-month access. Access to `/results` and `/report` is controlled by an `AccessGate` component.

### Key Design Decisions

1.  **Client-side engine for privacy**: Sensitive financial calculations occur in the browser.
2.  **Config-driven tax model**: Financial parameters are externalized in a JSON configuration.
3.  **Scenario comparison model**: Focuses on modelling user-defined split assumptions.
4.  **Zod for validation**: Consistent schema validation across client and server.
5.  **Freemium access model**: Preview limited data, full analysis requires payment.
6.  **Email lead capture**: Captures emails from preview page, wizard, and free guide, with a double opt-in for the free guide.
7.  **Spousal maintenance toggle**: Optional feature in the wizard, applying an income transfer between parties in calculations.

### Security

HTTP security headers are applied via `helmet` including CSP (allowing Stripe.js, self-hosted fonts), HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy. Email FROM domains are verified (Resend with SPF/DKIM). Double opt-in is implemented for email leads. GDPR data deletion (`POST /api/gdpr/delete`) anonymises purchases and deletes email leads. Stripe webhook verification uses `STRIPE_WEBHOOK_SECRET`. Admin access is password-protected. Self-hosted fonts are used, and dependencies are regularly audited.

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