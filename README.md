# SchoolRide Tracker

A responsive, installable discovery POC connecting a fictional school transport desk, driver, and parent at boarding time. It uses QR passes today and keeps identification behind `StudentTokenReader`; native NFC is explicitly not implemented.

## Quick start

Requirements: Node.js 20+ and npm.

```bash
cp .env.example .env.local
npm install
npm run generate:qr
npm run dev
```

Open `http://localhost:3000`. Demo state is shared across tabs in the same browser profile through `BroadcastChannel`, persisted in local storage/IndexedDB, and reset from the UI.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_APP_NAME` | Display name |
| `NEXT_PUBLIC_DEMO_MODE` | Enables the clearly labelled demo controls |
| `NEXT_PUBLIC_DEFAULT_SCHOOL_ID` | Default Sunrise tenant UUID |
| `NEXT_PUBLIC_MAP_TILE_URL` | OpenStreetMap tile template |

The UI reset restores Sunrise Route 4 to ten assigned students, seven boarded, and Aarav/Meera/Riya waiting. Seed timestamps are based on the current date.

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

1. Import the GitHub repository into Vercel and connect `main` as the production branch.
2. Add the public application variables above to Vercel Production and Preview.
3. Deploy and verify camera and location permissions on the physical driver phone.
4. Run the UI reset and follow [DEMO_SCRIPT.md](DEMO_SCRIPT.md).

Commits pushed to `main` deploy to production automatically. Pull requests receive isolated Vercel Preview deployments using the Preview environment variables.

## Architecture and safety

- Next.js route handlers validate requests with Zod and apply `schoolId` on every tenant operation.
- Accepted boarding events create parent notifications; route mismatches do not create a normal parent notification.
- `occurredAt` and `receivedAt` are retained separately; UTC is stored and Asia/Kolkata is used for display.
- Dexie persists queued events with client idempotency keys and ordered bounded retries.
- Passes encode opaque tokens. Full tokens are never logged or shown for support; only suffixes appear.
- `BroadcastChannel` provides live updates between tabs in the same browser profile.

All people, schools, phone numbers, registrations, and events in this repository are fictional.

## Production disclaimer

This POC is not production-ready. Production use requires formal security, privacy, consent, data-minimization, encryption, retention, legal, accessibility, device-management, operational-support, authentication, and authorization reviews. See [KNOWN_LIMITATIONS.md](KNOWN_LIMITATIONS.md).
