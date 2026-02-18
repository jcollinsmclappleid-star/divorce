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

PostgreSQL is used as the database, accessed via Drizzle ORM. The `shared/schema.ts` defines the `sessions` table, which stores the full `AppState` as JSONB. Drizzle Kit manages database migrations. Client-side state persistence is handled by Zustand with localStorage.

### Key Design Decisions

1.  **Client-side engine for privacy**: All sensitive financial calculations occur in the browser, minimizing data transfer to the server.
2.  **Config-driven tax model**: All financial parameters are externalized in a JSON configuration, allowing for flexible updates.
3.  **Scenario comparison model**: The tool focuses on modelling user-defined split assumptions rather than prescribing legal outcomes.
4.  **Zod for validation**: Consistent schema validation is applied across both client and server using Zod.

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

### Build Tools
-   **Vite** — Frontend bundling.
-   **esbuild** — Server bundling.
-   **tsx** — TypeScript execution.
-   **Tailwind CSS** + **PostCSS** + **Autoprefixer** — Styling.

### Planned/Needed
-   **decimal.js** (or equivalent) — For precise financial calculations.
-   **PDF generation library** — For server-side report generation.
-   **vitest** — For engine unit testing.