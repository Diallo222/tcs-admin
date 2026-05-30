# TCS Admin

Web admin dashboard for **TechCatalyst Summit** — manage members, events, sponsors, outreach, and more.

Phase 1 is a static UI backed by mock data and Zustand stores. API integration (Supabase) is planned for Phase 2.

## Stack

| Layer | Package |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State | Zustand + immer |
| Tables | TanStack Table v8 |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| UI | Radix primitives + custom TCS design system |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/dashboard`. Sign in at `/login` (Phase 1: any email works).

## Commands

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
npx tsc --noEmit # type check
```

## Architecture

```
app/        → App Router pages (thin wrappers)
features/   → Domain logic by module (12 admin modules)
shared/     → Reusable components, hooks, utils
core/       → Design tokens, constants
```

**Dependency rule:** `features/* → shared/* → core/*` — features never import from each other.

Each feature contains `pages/`, `components/`, `store/`, `data/mock*.ts`, and `types.ts`.

## Modules

`auth` · `dashboard` · `members` · `events` · `intros` · `dinners` · `sponsors` · `qr` · `payments` · `notifications` · `outreach` · `analytics`

## Design

Branding matches the [Summit-App](https://github.com/Diallo222/Summit-App) mobile client — DM Sans, TCS color tokens, and logo from `public/logo.png`.

Full build spec: `docs/TCS_Web_Admin_Build_Plan.md`  
Sprint tracker: `docs/IMPLEMENTATION_PLAN.md`

## Phase 2 (not started)

When the backend is ready: replace `mock*.ts` with Supabase API modules, magic-link auth, and third-party integrations (Dub.co, SendGrid, Stripe). See build plan §12.
