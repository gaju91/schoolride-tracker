# SchoolRide Tracker

A responsive, installable discovery POC connecting a fictional school transport desk, driver, and parent at boarding time. It uses QR passes today and keeps identification behind `StudentTokenReader`; native NFC is explicitly not implemented.

## Quick start

Requirements: Node.js 20+, npm, and optionally a Supabase project plus `psql`.

```bash
cp .env.example .env.local
npm install
npm run generate:qr
npm run dev
```

Open `http://localhost:3000`. With blank Supabase values the browser-local discovery mode is fully usable: state is shared across tabs through `BroadcastChannel`, persisted in local storage/IndexedDB, and reset from the UI. This fallback makes meeting simulation reliable. Configure Supabase for Postgres persistence and Realtime.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_APP_NAME` | Display name |
| `NEXT_PUBLIC_DEMO_MODE` | Enables the clearly labelled demo controls |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (browser-safe) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key (browser-safe) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only database credential |
| `SUPABASE_DB_URL` | Server-only Postgres connection string for seed/reset |
| `NEXT_PUBLIC_DEFAULT_SCHOOL_ID` | Default Sunrise tenant UUID |
| `NEXT_PUBLIC_MAP_TILE_URL` | OpenStreetMap tile template |

Never prefix the service-role or database URL with `NEXT_PUBLIC_`.

## Database setup

Apply migrations in order, then seed:

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -f supabase/migrations/202607180001_initial_schema.sql
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -f supabase/migrations/202607180002_rls.sql
npm run seed
```

Deterministic reset (safe only for the dedicated demo database):

```bash
npm run reset
```

The seed restores Sunrise Route 4 to ten assigned students, seven boarded, and Aarav/Meera/Riya waiting. Seed timestamps are based on the current date.

## Verification

```bash
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Generate printable passes with `npm run generate:qr`; output is under `public/demo-passes/`.

## Deployment

1. Create a Supabase project and apply both migrations and `supabase/seed.sql`.
2. Import this repository into Vercel.
3. Add all variables above in Vercel; keep service credentials server-only.
4. Deploy, then allow the HTTPS origin in Supabase settings.
5. Verify camera and location permissions on the physical driver phone.
6. Run the reset and follow [DEMO_SCRIPT.md](DEMO_SCRIPT.md).

## Architecture and safety

- Next.js route handlers validate requests with Zod and apply `schoolId` on every tenant operation.
- Supabase service credentials exist only in `infrastructure/supabase/server.ts`.
- Accepted boarding events create parent notifications; route mismatches do not create a normal parent notification.
- `occurredAt` and `receivedAt` are retained separately; UTC is stored and Asia/Kolkata is used for display.
- Dexie persists queued events with client idempotency keys and ordered bounded retries.
- Passes encode opaque tokens. Full tokens are never logged or shown for support; only suffixes appear.
- Supabase Realtime channels are tenant/parent filtered, with TanStack Query’s 15-second refetch policy as fallback.

All people, schools, phone numbers, registrations, and events in this repository are fictional.

## Production disclaimer

This POC is not production-ready. Production use requires formal security, privacy, consent, data-minimization, encryption, retention, legal, accessibility, device-management, operational-support, authentication, and authorization reviews. See [KNOWN_LIMITATIONS.md](KNOWN_LIMITATIONS.md).
