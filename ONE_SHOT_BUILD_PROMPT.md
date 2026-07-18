# One-Shot Coding Agent Prompt
## SchoolRide Tracker Discovery POC

You are a senior full-stack TypeScript engineer responsible for producing a complete, runnable discovery POC.

Read `NFC_SCHOOL_TRANSPORT_POC_PRD_AND_SPEC.md` completely before writing code.

Build the entire project described in that specification. Do not reinterpret the product, broaden the scope, or substitute static mockups for functional flows.

## Required outcome

Deliver a working responsive PWA in which:

1. A driver selects a route.
2. A student QR pass is scanned using a phone camera.
3. The student is resolved from an opaque token.
4. GPS location and timestamp are captured.
5. The driver confirms boarding.
6. The boarding event is stored.
7. The school dashboard updates in real time.
8. The parent view receives an in-app real-time notification.
9. Boarding works while offline through IndexedDB queueing.
10. Queued events synchronize after connectivity returns.
11. Duplicate, unknown-pass, wrong-school, wrong-route, and GPS-unavailable cases are handled.
12. Two schools demonstrate tenant isolation.
13. Demo simulation controls make the meeting reliable.
14. QR reading is abstracted behind a `StudentTokenReader` contract so native NFC can be added later.

## Mandatory stack

- TypeScript
- Next.js
- React
- Tailwind CSS
- Zod
- TanStack Query
- Supabase Postgres and Realtime
- Dexie / IndexedDB
- `@zxing/browser`
- MapLibre or Leaflet
- Vitest
- React Testing Library
- Playwright

Do not replace the stack without a technical blocker.

## Required repository assets

Create:

- Supabase migrations
- Seed and deterministic reset scripts
- Demo login and role routing
- Super Admin screen
- School Admin dashboard
- Driver scanner workflow
- Parent workflow
- Real-time events
- Offline queue and retries
- QR asset generator
- Printable demo-pass sheet
- Unit tests
- Integration tests
- Critical Playwright tests
- `.env.example`
- `README.md`
- `DEMO_SCRIPT.md`
- `KNOWN_LIMITATIONS.md`

## Implementation rules

- Use strict TypeScript.
- Do not use `any` casually.
- Validate all API input with Zod.
- Scope every tenant-owned server query by `school_id`.
- Never put student name, school name, phone number, or address into the QR token.
- Never log full pass tokens.
- Keep Supabase service-role credentials server-side.
- Use client-generated idempotency keys.
- Persist offline events in IndexedDB.
- Maintain both `occurred_at` and server `received_at`.
- Use school timezone for display and UTC for storage.
- Create parent notifications only for accepted boarding events.
- Clearly label simulated locations and demo-only actions.
- Do not claim NFC support is implemented.
- Keep hardware-specific functionality behind interfaces.
- Use clear loading, empty, error, and offline states.
- Add a demo reset that restores the required seed state.
- Make the demo usable without browser developer tools.

## Build sequence

1. Project foundation and environment validation.
2. Schema, migrations, seed, and reset.
3. Domain types, Zod schemas, repositories, and business rules.
4. API routes.
5. Admin dashboard and parent experience.
6. Real-time subscriptions.
7. Driver route context and QR scanning.
8. GPS capture.
9. IndexedDB queue and synchronization.
10. Demo controls and QR generation.
11. Tests.
12. Documentation.
13. Final verification against every acceptance criterion in the specification.

## Final verification

Before stopping:

- Run type checking.
- Run lint.
- Run unit and integration tests.
- Run critical Playwright tests.
- Confirm seed and reset work repeatedly.
- Confirm real QR scan on a mobile browser where the environment permits.
- Confirm simulated scan fallback works.
- Confirm offline event survives refresh.
- Confirm sync after reconnect.
- Confirm admin and parent update without refresh.
- Confirm duplicate prevention.
- Confirm tenant isolation.
- Confirm no secret is exposed in client bundles.

Then provide:

1. A concise implementation summary.
2. Exact setup commands.
3. Exact environment variables.
4. Exact database migration and seed commands.
5. Exact local run command.
6. Exact test commands.
7. Deployment steps.
8. Known limitations.
9. Any acceptance criterion that could not be verified, with the reason.

Do not stop after scaffolding. Stop only after the complete end-to-end POC is runnable.
