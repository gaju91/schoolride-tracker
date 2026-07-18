# School Transport Boarding POC
## Product Requirements Document and End-to-End Implementation Specification

**Document status:** Build-ready  
**Target:** Discovery-meeting proof of concept  
**Primary implementation language:** TypeScript  
**Delivery model:** Responsive web application / installable PWA  
**Primary identification method for the POC:** QR code  
**Future identification method:** NFC tag UID through a native mobile adapter  
**Recommended deployment:** Vercel + Supabase  
**Intended build time:** 5–7 focused working days for one experienced full-stack developer, or one strong coding-agent pass followed by human verification

---

# 1. Document Purpose

This document defines the complete product, UX, functional, technical, data, API, testing, and demonstration requirements for a school transport boarding proof of concept.

The implementation must demonstrate one credible end-to-end journey:

1. A driver selects a school route.
2. A student pass is scanned using a QR code.
3. The application identifies the student.
4. GPS coordinates and timestamp are captured.
5. The boarding event is stored or queued offline.
6. The school dashboard updates in real time.
7. The parent experience receives an in-app notification.
8. The system displays operational exceptions such as duplicate scans, unknown passes, wrong-route scans, and offline synchronization.

The POC must feel like a real product, not a collection of static mock screens.

The architecture must keep the student-identification mechanism separate from boarding business logic so that QR codes can later be replaced with NFC scanning without changing the rest of the system.

---

# 2. Product Summary

## 2.1 Product name

Working name: **SchoolRide Tracker**

The name is temporary and may be changed without affecting implementation.

## 2.2 Product statement

SchoolRide Tracker gives schools and parents immediate visibility when a student boards a school vehicle.

The driver scans a student pass, the system captures the time and location, the school transport dashboard updates, and the parent receives a boarding alert.

## 2.3 POC positioning

This is a discovery POC. It is not a production launch.

The POC must validate:

- Whether the proposed workflow matches the client’s actual transport operation.
- Whether drivers can perform the scan comfortably.
- Whether school administrators find the live dashboard useful.
- Whether parents receive the right information.
- Whether offline scanning is operationally necessary.
- Whether QR and future NFC identification can share the same business workflow.
- Which exceptions require policy decisions before production development.

## 2.4 Core value proposition

### For schools

- Know which students have boarded.
- Know which students are still waiting.
- See where and when a scan occurred.
- Detect duplicates, wrong-route boarding, and unknown passes.
- Reduce manual calls and WhatsApp coordination.

### For parents

- Receive timely confirmation that the child boarded.
- See the boarding time, route, vehicle, and location.
- Review the current day’s history.

### For drivers

- Use a fast, minimal scan workflow.
- Continue scanning in poor connectivity.
- See immediate confirmation and actionable errors.

---

# 3. Goals and Non-Goals

## 3.1 POC goals

The build is successful only when it demonstrates all of the following:

1. Real QR scanning from a mobile browser using the phone camera.
2. Student identification from a token stored in the QR code.
3. Route selection by the driver.
4. Automatic timestamp capture.
5. Automatic GPS capture with a visible fallback when permission is unavailable.
6. Boarding confirmation.
7. Real-time school dashboard update.
8. Real-time parent notification.
9. Offline queueing of boarding events.
10. Automatic retry and synchronization after connectivity returns.
11. Duplicate scan handling.
12. Unknown-pass handling.
13. Wrong-route handling.
14. A seeded two-school multi-tenant demonstration.
15. Clear separation of student-token reading from boarding-event processing.
16. A reliable demo mode that can be used if the camera, GPS, or network fails during the meeting.

## 3.2 Non-goals

The POC must not attempt to implement:

- Production billing or subscriptions.
- Complete school onboarding workflows.
- Government or identity-document verification.
- Production-grade school ERP integration.
- Full driver device management.
- Native NFC scanning.
- Continuous live vehicle tracking.
- Route optimization.
- Estimated time of arrival.
- Drop-off tracking.
- SMS, WhatsApp, or production push notifications.
- Complex role-management administration.
- Production-grade audit retention policies.
- Production-scale analytics.
- Facial recognition.
- Biometric verification.
- Geofencing automation.
- Full accessibility certification.
- Production legal/compliance documentation.

These may be represented as future roadmap items only.

---

# 4. Key Product Decisions

## 4.1 QR now, NFC later

The POC uses QR codes because physical NFC cards are not yet available.

The QR code contains a non-sensitive opaque token such as:

```text
stp_live_aarav_001
```

The token must not contain the student’s name, phone number, address, or school name.

Later, an NFC tag UID can resolve to the same `student_pass` record.

## 4.2 Web PWA rather than native mobile app

The POC will be a responsive web application that can be opened on:

- Driver phone
- Parent phone
- Admin laptop
- Super-admin laptop

The driver view should be installable as a PWA where practical.

Native mobile development is intentionally excluded from the POC to reduce time and risk.

## 4.3 Real in-app notifications rather than production push

The parent view must update in real time and show a notification toast/card.

Browser push notifications are optional and must not block completion.

## 4.4 Multi-tenant demonstration, not enterprise tenancy

The POC must contain two schools and strictly filter all visible records by the selected school.

It does not need full enterprise tenancy administration. However, every tenant-owned data model must contain `school_id`.

## 4.5 Explicit boarding confirmation

After a QR scan, the driver sees the identified student and presses **Confirm Boarding**.

This prevents accidental event creation when the wrong QR code is scanned.

A configuration flag may later support auto-confirmation, but the POC defaults to manual confirmation.

---

# 5. Personas and Roles

## 5.1 Super Admin

Purpose:

- Demonstrate that the platform can serve multiple schools.

POC capabilities:

- View a list of schools.
- Switch into a school workspace.
- See tenant-level summary counts.
- No complex platform settings are required.

## 5.2 School Admin / Transport Manager

Purpose:

- Monitor a school’s morning transport operation.

POC capabilities:

- View today’s live route dashboard.
- Filter by route.
- See boarded and waiting students.
- See the latest scan location on a map.
- See scan-event history.
- See exception events.
- Open a student detail drawer.
- Reset demo data.

## 5.3 Driver / Transport Operator

Purpose:

- Record student boarding.

POC capabilities:

- Select assigned school, vehicle, and route.
- Open camera scanner.
- Scan QR code.
- Review student confirmation.
- Confirm boarding.
- See last scans.
- Continue scanning while offline.
- See pending synchronization count.
- Use demo simulation controls.

## 5.4 Parent / Guardian

Purpose:

- Receive confirmation that a child boarded.

POC capabilities:

- View selected child.
- Receive real-time boarding notification.
- See latest status.
- Review today’s event timeline.
- View boarding location on a map.

---

# 6. Primary Demo Scenario

## 6.1 Scenario setup

School: **Sunrise Public School**  
Route: **Morning Route 4**  
Vehicle: **Bus 12 – RJ14 PB 2045**  
Driver: **Ramesh Kumar**  
Student: **Aarav Sharma**  
Parent: **Neha Sharma**

## 6.2 Demo sequence

1. Admin dashboard is open on a laptop.
2. Driver view is open on a phone.
3. Parent view is open on a second phone or a phone-sized browser window.
4. Admin dashboard shows:
   - 10 assigned students
   - 7 boarded
   - 3 waiting
5. Driver scans Aarav’s QR code.
6. Driver sees:
   - Aarav Sharma
   - Grade 4-A
   - Route 4
   - Bus 12
   - GPS status
7. Driver selects **Confirm Boarding**.
8. Driver sees success feedback.
9. Admin dashboard changes to:
   - 8 boarded
   - 2 waiting
10. Aarav’s status changes to **Boarded**.
11. A new map marker appears.
12. Parent view shows:
   - “Aarav boarded Bus 12 at 7:42 AM.”
13. Network is disabled on the driver device.
14. Driver scans Meera Jain.
15. Driver sees:
   - “Saved offline”
   - “1 event waiting to sync”
16. Network is restored.
17. Pending event synchronizes automatically.
18. Admin and parent views update.
19. Driver scans Aarav again.
20. System shows a duplicate-scan warning and does not create a second boarding event.

---

# 7. Functional Requirements

# 7.1 Authentication and Demo Access

## FR-AUTH-001 Demo login

The app must provide a demo login page with role cards:

- Super Admin
- School Admin
- Driver
- Parent

Selecting a role signs the user into a seeded demo account.

Production authentication is out of scope.

## FR-AUTH-002 Session persistence

The selected demo role and user ID must survive page refresh using a cookie or local storage.

## FR-AUTH-003 Role routing

After login:

- Super Admin → `/super-admin`
- School Admin → `/admin`
- Driver → `/driver`
- Parent → `/parent`

## FR-AUTH-004 Role guard

Each role must be prevented from opening another role’s route through normal navigation.

This is a POC guard, not a substitute for production authorization.

---

# 7.2 School and Tenant Selection

## FR-TENANT-001 Super-admin school list

The super-admin screen must display:

- School name
- School code
- Number of students
- Number of active routes
- Number of vehicles
- Today’s boarded count

## FR-TENANT-002 Enter school workspace

Selecting a school opens its admin dashboard.

## FR-TENANT-003 Tenant isolation

All data queries must be scoped by `school_id`.

No school-owned record may be returned without tenant filtering.

## FR-TENANT-004 Demo schools

Seed two schools:

1. Sunrise Public School
2. Green Valley Academy

---

# 7.3 Driver Assignment and Route Selection

## FR-DRV-001 Driver context

The driver screen must show:

- Driver name
- School
- Vehicle
- Route
- Session date
- Connectivity state

## FR-DRV-002 Route selector

The driver may choose from routes assigned to the demo driver.

Default:

- Morning Route 4
- Afternoon Route 4

The POC only needs the morning flow to be fully seeded.

## FR-DRV-003 Persist selected route

The selected route must remain selected after refresh.

## FR-DRV-004 Start scan

The driver selects **Scan Student Pass** to open the QR scanner.

---

# 7.4 QR Student Pass Scanning

## FR-SCAN-001 Camera access

The scanner must request camera access only after the user initiates scanning.

## FR-SCAN-002 QR token

The scanner reads a string token.

The token must be sent to the pass-resolution service.

## FR-SCAN-003 Student resolution

A valid token resolves to:

- Student ID
- Student name
- Photo/avatar
- Grade and section
- Assigned route
- Assigned stop
- Parent name
- Current boarding state

## FR-SCAN-004 Unknown token

An unrecognized token must show:

- “Unknown student pass”
- Token suffix for support, not the full token
- **Try Again**
- **Cancel**

No boarding event is created.

## FR-SCAN-005 Wrong-school token

A pass belonging to another school must show:

- “This pass is not registered with the current school.”

No student details from the other school may be exposed.

## FR-SCAN-006 Wrong-route warning

If the student is assigned to another route, show:

- Assigned route
- Current driver route
- **Cancel**
- **Record With Exception**

If the driver selects **Record With Exception**, the event is created with status `route_mismatch`.

## FR-SCAN-007 Duplicate boarding

If the student already has a successful boarding event for the same route session and service date, show:

- Existing boarding time
- Existing vehicle
- Existing driver
- “Student has already boarded.”

No second normal boarding event is created.

A demo-only **Record Duplicate Exception** control may create an exception event for testing.

## FR-SCAN-008 Review before confirmation

After successful resolution, show a confirmation sheet with:

- Student
- Grade
- Assigned stop
- Assigned route
- Current route
- GPS status
- Timestamp preview
- **Confirm Boarding**
- **Cancel**

## FR-SCAN-009 Scan debounce

The same QR token must not trigger repeated resolution while the confirmation sheet is open.

---

# 7.5 GPS Capture

## FR-GPS-001 Capture timing

GPS capture begins immediately after a token is successfully resolved.

## FR-GPS-002 High-accuracy attempt

Request high accuracy with a maximum wait of 8 seconds.

## FR-GPS-003 GPS success

Store:

- Latitude
- Longitude
- Accuracy in meters
- Capture timestamp

## FR-GPS-004 GPS timeout or denial

The driver may still confirm boarding.

The event must store:

- `location_status = unavailable`
- An optional reason:
  - permission_denied
  - timeout
  - unsupported
  - unknown

## FR-GPS-005 Demo location

Demo mode must provide a fixed fallback location near the configured school or route stop.

It must be visibly labelled **Simulated location**.

---

# 7.6 Boarding Event Creation

## FR-EVENT-001 Event payload

A boarding event contains:

- Event ID
- School ID
- Student ID
- Student pass ID
- Route ID
- Vehicle ID
- Driver ID
- Service date
- Event type
- Event status
- Occurred-at timestamp
- Device-local timestamp
- GPS data
- Location status
- Sync source
- Client-generated idempotency key
- Exception type, when applicable
- Created-at timestamp
- Synced-at timestamp

## FR-EVENT-002 Event type

POC event type:

- `boarding`

Future event types may include:

- `drop_off`
- `manual_boarding`
- `pass_replacement`

## FR-EVENT-003 Event statuses

Supported values:

- `confirmed`
- `pending_sync`
- `route_mismatch`
- `duplicate_rejected`
- `unknown_pass_rejected`
- `location_unavailable`
- `sync_failed`

## FR-EVENT-004 Idempotency

The client must generate an idempotency key before local save.

The server must reject duplicate requests carrying the same idempotency key and return the original result.

## FR-EVENT-005 Server validation

The server validates:

- Student belongs to school.
- Route belongs to school.
- Vehicle belongs to school.
- Driver belongs to school.
- Pass is active.
- Student is active.
- Route session is active.
- Duplicate rule.

## FR-EVENT-006 Boarding state

A student is considered boarded when there is a successful `boarding` event for the selected service date and route session.

---

# 7.7 Offline-First Queue

## FR-OFF-001 Offline detection

The driver screen must display:

- Online
- Offline
- Reconnecting

## FR-OFF-002 Local persistence

When the network request cannot be completed, save the event to IndexedDB.

Do not rely on memory-only state.

## FR-OFF-003 Pending queue display

The driver screen shows:

- Number of pending events
- Oldest pending event time
- **Retry Now**

## FR-OFF-004 Automatic retry

Retry when:

- Browser emits an online event.
- App starts.
- Driver selects **Retry Now**.
- Periodic background retry runs while the driver screen is open.

## FR-OFF-005 Retry strategy

Use bounded exponential backoff:

- 2 seconds
- 5 seconds
- 10 seconds
- 30 seconds
- 60 seconds

After five failed attempts, retain the event and show `Needs attention`.

## FR-OFF-006 Queue order

Events must be attempted in occurrence order.

## FR-OFF-007 Successful sync

After sync:

- Mark local event as synced.
- Record server event ID.
- Remove or archive the queue item.
- Update pending count.
- Show a small “Synced” toast.

## FR-OFF-008 Duplicate after reconnect

If an event becomes a duplicate by the time it reaches the server, mark it as `duplicate_rejected` and show it in the driver history.

## FR-OFF-009 Client clock warning

If device time differs significantly from server time, retain both timestamps and show an admin warning.

For the POC, a difference greater than five minutes is considered significant.

---

# 7.8 Real-Time School Dashboard

## FR-ADMIN-001 Summary cards

Display:

- Assigned students
- Boarded
- Waiting
- Exceptions
- Pending offline events known to the server, when available

## FR-ADMIN-002 Route filter

Allow selection of:

- All routes
- Morning Route 4
- Morning Route 7

## FR-ADMIN-003 Student table

Columns:

- Student
- Grade
- Stop
- Route
- Status
- Boarding time
- Vehicle
- Scan location
- Event status

## FR-ADMIN-004 Status values

Display:

- Waiting
- Boarded
- Exception
- Not Scheduled

## FR-ADMIN-005 Real-time updates

A newly synchronized boarding event must update the dashboard without manual refresh.

## FR-ADMIN-006 Recent activity

Show a reverse-chronological event feed containing:

- Student
- Event
- Time
- Route
- Driver
- Status
- Sync source

## FR-ADMIN-007 Exceptions panel

Show:

- Route mismatches
- Duplicate attempts
- Unknown passes
- GPS unavailable
- Clock mismatch
- Sync failure

## FR-ADMIN-008 Student detail drawer

Opening a student displays:

- Profile summary
- Assigned route and stop
- Parent
- Today’s status
- Recent seven transport events
- Latest scan map

## FR-ADMIN-009 Empty states

Each dashboard panel must have a clear empty state.

---

# 7.9 Map

## FR-MAP-001 Admin map

The map displays latest scan markers for boarded students in the selected route.

## FR-MAP-002 Marker details

Selecting a marker shows:

- Student
- Boarding time
- Route
- Vehicle
- GPS accuracy
- Simulated/real indicator

## FR-MAP-003 Missing location

Events without GPS must remain visible in the table but do not require a map marker.

## FR-MAP-004 Map implementation

Use one of:

- MapLibre with OpenStreetMap tiles
- Leaflet with OpenStreetMap tiles

Avoid paid map dependencies for the POC.

---

# 7.10 Parent Experience

## FR-PARENT-001 Child selector

The seeded parent may have one or two children.

Default child: Aarav Sharma.

## FR-PARENT-002 Latest status

Display:

- Waiting for boarding
- Boarded
- Exception under review

## FR-PARENT-003 Boarding notification

When the child boards, display:

- Student name
- Boarding time
- Vehicle
- Route
- Location label or coordinates
- “View on map”

## FR-PARENT-004 Real-time update

The parent view must update without refresh.

## FR-PARENT-005 Today timeline

Display today’s transport events for the child.

## FR-PARENT-006 Privacy

A parent must only see children assigned to that parent demo account.

---

# 7.11 Demo Controls

## FR-DEMO-001 Demo mode banner

When demo mode is active, show a small non-intrusive banner.

## FR-DEMO-002 Simulate scan

The driver can simulate:

- Aarav valid scan
- Meera valid scan
- Unknown pass
- Wrong-route pass
- Duplicate scan
- GPS unavailable
- Offline save

## FR-DEMO-003 Reset demo

School Admin and Super Admin can reset all mutable POC data to the seed state.

Reset requires confirmation.

## FR-DEMO-004 Deterministic reset

After reset:

- Sunrise Route 4 has 10 students.
- 7 are boarded.
- Aarav, Meera, and Riya are waiting.
- Parent notifications are cleared.
- Offline queue is cleared only on the current browser after explicit confirmation.

## FR-DEMO-005 Demo event timestamps

Seed event times relative to the current date so the interface always looks current.

---

# 8. User Experience Specification

# 8.1 Visual direction

The interface should communicate:

- Safety
- Trust
- Operational clarity
- Calmness
- School friendliness

Avoid:

- Overly playful illustrations
- Dense enterprise tables
- Excessive gradients
- Too many dashboard widgets
- Unexplained technical language

## 8.2 Responsive breakpoints

- Mobile: 360–767 px
- Tablet: 768–1023 px
- Desktop: 1024 px and above

## 8.3 Accessibility minimums

- Keyboard-focusable interactive elements.
- Visible focus states.
- Semantic labels.
- Minimum 44 px touch targets on driver mobile screens.
- Status must not rely on color alone.
- Scanner errors must be announced through visible text.

---

# 8.4 Screen Inventory

## Screen S-01: Demo Login

Route: `/`

Elements:

- Product logo and name
- One-line product statement
- Role cards:
  - Super Admin
  - School Admin
  - Driver
  - Parent
- “Reset demo data” secondary action
- Build/version label

Acceptance:

- Selecting a role opens the correct workspace.
- The screen looks professional at 1366×768 and 390×844.

## Screen S-02: Super Admin Overview

Route: `/super-admin`

Elements:

- Header
- Platform summary
- School cards/table
- Enter workspace action
- Demo reset action

No charts are required.

## Screen S-03: School Admin Dashboard

Route: `/admin`

Desktop layout:

1. Header
2. School and route filters
3. Summary cards
4. Main content:
   - Student table, 60%
   - Map, 40%
5. Bottom row:
   - Recent activity
   - Exceptions

Mobile layout:

- Summary cards
- Filter
- Tabbed sections:
  - Students
  - Map
  - Activity
  - Exceptions

## Screen S-04: Driver Home

Route: `/driver`

Elements:

- Driver identity
- Route and vehicle selector
- Connectivity badge
- Pending sync badge
- Large **Scan Student Pass** button
- Last five scans
- Demo controls collapsible section
- Sign out

Primary scan button must be visible without scrolling on common phone sizes.

## Screen S-05: QR Scanner

Route/modal: `/driver/scan` or dialog

Elements:

- Camera viewport
- Scan frame
- Flash control where supported
- Switch camera where supported
- Permission instructions
- Cancel
- Manual/demo fallback

## Screen S-06: Confirm Boarding Sheet

Elements:

- Student avatar
- Student name
- Grade
- Stop
- Assigned route
- Current route
- Route mismatch warning when relevant
- GPS capture state
- Confirm Boarding
- Cancel

## Screen S-07: Scan Success

Elements:

- Success indicator
- Student name
- Time
- Sync state:
  - Synced
  - Saved offline
- Scan another
- Done

Auto-return to driver home after 2 seconds is optional.

## Screen S-08: Parent Home

Route: `/parent`

Elements:

- Child selector
- Latest status hero card
- Real-time notification toast
- Today timeline
- Mini map / map link
- Driver and route summary

---

# 9. User Flows

# 9.1 Happy-path boarding

1. Driver signs in.
2. Route context loads.
3. Driver opens scanner.
4. Camera permission is granted.
5. QR token is read.
6. Token resolves to student.
7. GPS capture begins.
8. Student confirmation opens.
9. Driver confirms.
10. Client creates idempotency key.
11. Client submits event.
12. Server validates event.
13. Server stores event.
14. Server emits real-time event.
15. Driver sees success.
16. Admin updates.
17. Parent updates.

# 9.2 Offline boarding

1. Driver is offline.
2. Driver scans a valid QR code.
3. Token resolution succeeds from local student-pass cache.
4. GPS is captured.
5. Driver confirms.
6. Event is stored in IndexedDB as pending.
7. Driver sees “Saved offline.”
8. Network returns.
9. Queue worker submits event.
10. Server validates and stores it.
11. Queue item becomes synced.
12. Admin and parent update.

Important: Valid demo student-pass mappings must be cached locally before the device goes offline.

# 9.3 Unknown pass

1. Driver scans QR code.
2. Token is not found in local or server mappings.
3. Error is shown.
4. No boarding event is created.
5. Rejected attempt may be logged as a demo exception when online.

# 9.4 Wrong-route student

1. Pass resolves to student assigned to Route 7.
2. Driver is operating Route 4.
3. Warning is shown.
4. Driver cancels or records exception.
5. Admin sees route mismatch.
6. Parent notification wording indicates manual review only if the event is recorded.

# 9.5 Duplicate scan

1. Student already has confirmed boarding.
2. Driver scans again.
3. System shows existing time and route.
4. No second standard event is created.
5. Admin exception feed may show duplicate attempt.

---

# 10. Information Architecture and Routes

```text
/
├── /super-admin
├── /admin
│   ├── ?schoolId=
│   └── ?routeId=
├── /driver
├── /driver/scan
├── /parent
└── /api
    ├── /demo/login
    ├── /demo/reset
    ├── /schools
    ├── /routes
    ├── /driver/context
    ├── /passes/resolve
    ├── /boarding-events
    ├── /boarding-events/sync
    ├── /dashboard
    ├── /students/:id
    └── /parent/children/:id/events
```

---

# 11. Recommended Technical Architecture

# 11.1 Stack

## Frontend and server

- Next.js with TypeScript
- React
- Tailwind CSS
- shadcn/ui or a similarly restrained component system
- Zod for validation
- TanStack Query for server-state handling
- Dexie for IndexedDB offline queue
- `@zxing/browser` for QR scanning
- MapLibre or Leaflet for maps

## Backend and data

- Next.js Route Handlers
- Supabase Postgres
- Supabase Realtime
- Supabase JavaScript client
- Row-level security where practical
- Server-side service key only in protected server runtime

## Deployment

- Vercel for the web application
- Supabase for database and real-time events

## Testing

- Vitest
- React Testing Library
- Playwright

# 11.2 Architecture diagram

```text
┌───────────────────────┐
│ Driver PWA            │
│ QR + GPS + IndexedDB  │
└──────────┬────────────┘
           │ HTTPS
           │
┌──────────▼────────────┐
│ Next.js Application   │
│ UI + Route Handlers   │
│ Zod + business rules  │
└──────────┬────────────┘
           │
           │ SQL / Realtime
┌──────────▼────────────┐
│ Supabase              │
│ Postgres + Realtime   │
└───────┬────────┬──────┘
        │        │
        │        │
┌───────▼───┐ ┌──▼────────────┐
│ Admin Web │ │ Parent Web     │
│ Realtime  │ │ Realtime alert │
└───────────┘ └───────────────┘
```

# 11.3 Identification abstraction

The QR scanner must not directly create boarding events.

Use this contract:

```ts
export type StudentTokenRead = {
  token: string;
  source: "qr" | "nfc" | "demo";
  readAt: string;
};

export interface StudentTokenReader {
  read(): Promise<StudentTokenRead>;
}
```

Implement:

```ts
export class QrStudentTokenReader implements StudentTokenReader {}
export class DemoStudentTokenReader implements StudentTokenReader {}
```

Reserve:

```ts
export class NfcStudentTokenReader implements StudentTokenReader {
  async read(): Promise<StudentTokenRead> {
    throw new Error("Native NFC adapter not implemented in POC");
  }
}
```

The use case consumes a token read, not a QR-specific object:

```ts
resolveStudentPass(tokenRead)
captureLocation()
confirmBoarding()
createOrQueueBoardingEvent()
```

# 11.4 Domain service boundaries

Required services:

- `DemoAuthService`
- `SchoolService`
- `DriverContextService`
- `StudentPassService`
- `BoardingValidationService`
- `BoardingEventService`
- `LocationService`
- `OfflineQueueService`
- `RealtimeSubscriptionService`
- `DemoResetService`

---

# 12. Repository Structure

```text
schoolride-tracker/
├── app/
│   ├── page.tsx
│   ├── super-admin/
│   │   └── page.tsx
│   ├── admin/
│   │   └── page.tsx
│   ├── driver/
│   │   ├── page.tsx
│   │   └── scan/
│   │       └── page.tsx
│   ├── parent/
│   │   └── page.tsx
│   └── api/
│       ├── demo/
│       │   ├── login/route.ts
│       │   └── reset/route.ts
│       ├── passes/
│       │   └── resolve/route.ts
│       ├── boarding-events/
│       │   ├── route.ts
│       │   └── sync/route.ts
│       ├── dashboard/route.ts
│       └── parent/
│           └── children/[id]/events/route.ts
├── components/
│   ├── admin/
│   ├── driver/
│   ├── parent/
│   ├── map/
│   └── shared/
├── domain/
│   ├── boarding/
│   │   ├── boarding.types.ts
│   │   ├── boarding.schemas.ts
│   │   ├── boarding.validation.ts
│   │   └── boarding.service.ts
│   ├── passes/
│   └── tenancy/
├── infrastructure/
│   ├── supabase/
│   ├── offline/
│   ├── realtime/
│   ├── qr/
│   └── location/
├── hooks/
├── lib/
├── public/
│   ├── demo-passes/
│   └── manifest.json
├── scripts/
│   ├── seed.ts
│   ├── reset-demo.ts
│   └── generate-demo-qr.ts
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── policies.sql
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── README.md
├── package.json
└── tsconfig.json
```

---

# 13. Data Model

All identifiers should use UUIDs except human-readable school codes and opaque pass tokens.

# 13.1 `schools`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| code | text | Unique, e.g. SPS |
| name | text | Required |
| timezone | text | Default Asia/Kolkata |
| is_active | boolean | Default true |
| created_at | timestamptz | Required |

# 13.2 `users`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| school_id | uuid nullable | Null for platform super admin |
| role | text | super_admin, school_admin, driver, parent |
| name | text | Required |
| email | text | Demo value |
| phone | text nullable | Demo value |
| is_active | boolean | Default true |

# 13.3 `students`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| school_id | uuid | Required |
| admission_no | text | Unique per school |
| name | text | Required |
| grade | text | Required |
| section | text | Required |
| avatar_url | text nullable | Optional |
| parent_user_id | uuid | Required |
| is_active | boolean | Default true |

# 13.4 `student_passes`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| school_id | uuid | Required |
| student_id | uuid | Required |
| token_hash | text | Store hash, not plain token in production |
| demo_token | text nullable | Allowed only in POC seed |
| token_type | text | qr, nfc |
| status | text | active, lost, replaced, inactive |
| issued_at | timestamptz | Required |
| expires_at | timestamptz nullable | Optional |

For the POC, `demo_token` may be stored for easy local cache creation. The UI must not expose full tokens.

# 13.5 `vehicles`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| school_id | uuid | Required |
| code | text | e.g. BUS-12 |
| registration_no | text | e.g. RJ14 PB 2045 |
| capacity | integer | Optional |
| is_active | boolean | Default true |

# 13.6 `routes`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| school_id | uuid | Required |
| code | text | e.g. MR-04 |
| name | text | Morning Route 4 |
| direction | text | morning, afternoon |
| vehicle_id | uuid | Required |
| driver_user_id | uuid | Required |
| is_active | boolean | Default true |

# 13.7 `route_stops`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| school_id | uuid | Required |
| route_id | uuid | Required |
| name | text | Required |
| sequence_no | integer | Required |
| latitude | numeric | Required |
| longitude | numeric | Required |

# 13.8 `student_route_assignments`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| school_id | uuid | Required |
| student_id | uuid | Required |
| route_id | uuid | Required |
| stop_id | uuid | Required |
| effective_from | date | Required |
| effective_to | date nullable | Optional |
| is_active | boolean | Default true |

# 13.9 `boarding_events`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| school_id | uuid | Required |
| student_id | uuid nullable | Null for unknown token rejection log |
| student_pass_id | uuid nullable | Optional |
| route_id | uuid | Required |
| vehicle_id | uuid | Required |
| driver_user_id | uuid | Required |
| service_date | date | Required |
| event_type | text | boarding |
| status | text | confirmed, route_mismatch, etc. |
| exception_type | text nullable | route_mismatch, duplicate, unknown_pass |
| occurred_at | timestamptz | Device occurrence time |
| received_at | timestamptz | Server receive time |
| latitude | numeric nullable | Optional |
| longitude | numeric nullable | Optional |
| accuracy_meters | numeric nullable | Optional |
| location_status | text | captured, unavailable, simulated |
| location_failure_reason | text nullable | Optional |
| sync_source | text | online, offline_queue, demo |
| idempotency_key | text | Unique |
| client_device_id | text | Pseudonymous browser/device ID |
| client_clock_offset_ms | integer nullable | Optional |
| metadata | jsonb | POC extension data |
| created_at | timestamptz | Required |

Recommended uniqueness:

```sql
unique (school_id, idempotency_key)
```

Duplicate boarding should be enforced through application logic, and optionally a partial database constraint if the schema supports it cleanly.

# 13.10 `parent_notifications`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| school_id | uuid | Required |
| parent_user_id | uuid | Required |
| student_id | uuid | Required |
| boarding_event_id | uuid | Required |
| title | text | Required |
| body | text | Required |
| read_at | timestamptz nullable | Optional |
| created_at | timestamptz | Required |

# 13.11 `demo_audit_events`

Optional POC table for:

- Demo reset
- Unknown pass attempt
- Duplicate rejection
- Route mismatch
- Manual simulation

---

# 14. API Contracts

All responses use:

```ts
type ApiSuccess<T> = {
  ok: true;
  data: T;
};

type ApiFailure = {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
};
```

# 14.1 Resolve pass

`POST /api/passes/resolve`

Request:

```json
{
  "schoolId": "uuid",
  "routeId": "uuid",
  "token": "stp_live_aarav_001",
  "source": "qr"
}
```

Success:

```json
{
  "ok": true,
  "data": {
    "passId": "uuid",
    "student": {
      "id": "uuid",
      "name": "Aarav Sharma",
      "grade": "4",
      "section": "A",
      "avatarUrl": null
    },
    "assignment": {
      "routeId": "uuid",
      "routeName": "Morning Route 4",
      "stopId": "uuid",
      "stopName": "Vaishali Nagar"
    },
    "validation": {
      "routeMatches": true,
      "alreadyBoarded": false,
      "existingBoarding": null
    }
  }
}
```

Unknown pass:

```json
{
  "ok": false,
  "error": {
    "code": "PASS_NOT_FOUND",
    "message": "Unknown student pass."
  }
}
```

Wrong-school pass:

```json
{
  "ok": false,
  "error": {
    "code": "PASS_NOT_REGISTERED_FOR_SCHOOL",
    "message": "This pass is not registered with the current school."
  }
}
```

# 14.2 Create boarding event

`POST /api/boarding-events`

Request:

```json
{
  "idempotencyKey": "device-uuid:local-event-uuid",
  "schoolId": "uuid",
  "studentId": "uuid",
  "studentPassId": "uuid",
  "routeId": "uuid",
  "vehicleId": "uuid",
  "driverUserId": "uuid",
  "eventType": "boarding",
  "occurredAt": "2026-07-18T07:42:10+05:30",
  "location": {
    "status": "captured",
    "latitude": 26.9124,
    "longitude": 75.7873,
    "accuracyMeters": 18
  },
  "syncSource": "online",
  "clientDeviceId": "demo-device-01",
  "allowRouteMismatch": false
}
```

Success:

```json
{
  "ok": true,
  "data": {
    "eventId": "uuid",
    "status": "confirmed",
    "studentStatus": "boarded",
    "notificationId": "uuid",
    "receivedAt": "2026-07-18T02:12:11Z"
  }
}
```

Duplicate:

```json
{
  "ok": false,
  "error": {
    "code": "STUDENT_ALREADY_BOARDED",
    "message": "Student has already boarded.",
    "details": {
      "eventId": "uuid",
      "occurredAt": "2026-07-18T07:35:00+05:30",
      "routeName": "Morning Route 4"
    }
  }
}
```

# 14.3 Batch synchronize events

`POST /api/boarding-events/sync`

Request:

```json
{
  "deviceId": "demo-device-01",
  "events": [
    {
      "localId": "local-uuid",
      "idempotencyKey": "device-uuid:local-uuid",
      "schoolId": "uuid",
      "studentId": "uuid",
      "studentPassId": "uuid",
      "routeId": "uuid",
      "vehicleId": "uuid",
      "driverUserId": "uuid",
      "eventType": "boarding",
      "occurredAt": "2026-07-18T07:44:05+05:30",
      "location": {
        "status": "captured",
        "latitude": 26.913,
        "longitude": 75.788,
        "accuracyMeters": 24
      },
      "syncSource": "offline_queue"
    }
  ]
}
```

Response:

```json
{
  "ok": true,
  "data": {
    "results": [
      {
        "localId": "local-uuid",
        "syncStatus": "synced",
        "serverEventId": "uuid"
      }
    ]
  }
}
```

Possible per-item statuses:

- `synced`
- `already_processed`
- `duplicate_rejected`
- `validation_failed`
- `retryable_failure`

# 14.4 Dashboard

`GET /api/dashboard?schoolId=:schoolId&routeId=:routeId&serviceDate=:date`

Response includes:

```json
{
  "ok": true,
  "data": {
    "summary": {
      "assigned": 10,
      "boarded": 8,
      "waiting": 2,
      "exceptions": 1
    },
    "students": [],
    "latestEvents": [],
    "exceptions": [],
    "mapMarkers": []
  }
}
```

# 14.5 Parent child events

`GET /api/parent/children/:studentId/events?serviceDate=:date`

Return only when the demo parent owns the student.

# 14.6 Demo reset

`POST /api/demo/reset`

Request:

```json
{
  "confirmation": "RESET_DEMO"
}
```

Response:

```json
{
  "ok": true,
  "data": {
    "resetAt": "ISO timestamp"
  }
}
```

---

# 15. Validation Rules

## 15.1 Pass validation

- Pass status must be active.
- Student status must be active.
- Pass and student school IDs must match request school.
- Full token must never be logged in browser or server logs.
- Unknown token errors must not reveal another school’s student.

## 15.2 Route validation

- Route must be active.
- Vehicle must be assigned to route.
- Driver must be assigned to route for the POC.
- Mismatch may be overridden only through explicit confirmation.

## 15.3 Duplicate validation

Default duplicate window:

- Same student
- Same service date
- Same direction
- Existing successful boarding event

The second event is rejected.

## 15.4 Location validation

- Latitude range: -90 to 90
- Longitude range: -180 to 180
- Accuracy must be non-negative
- Simulated location must be clearly marked

## 15.5 Time validation

- Store both device occurrence time and server receive time.
- Mark clock mismatch when absolute difference exceeds five minutes.
- Use school timezone for display.
- Store timestamps in UTC.

---

# 16. Offline Data Design

# 16.1 IndexedDB stores

## `cached_passes`

Fields:

- token
- passId
- schoolId
- student summary
- route assignment
- cachedAt
- expiresAt

## `pending_events`

Fields:

- localId
- idempotencyKey
- payload
- state
- attemptCount
- lastAttemptAt
- lastError
- createdAt

States:

- pending
- syncing
- synced
- needs_attention
- rejected

## `device_context`

Fields:

- deviceId
- selectedSchoolId
- selectedRouteId
- selectedVehicleId
- driverUserId
- lastSuccessfulSyncAt

# 16.2 Cache preload

When the driver opens the route online:

1. Fetch active student-pass mappings for the route.
2. Save them to IndexedDB.
3. Show “Offline ready” when successful.
4. Display cached student count.

# 16.3 Security note

For a real production product, local pass mappings and student details require stronger device security and data-minimization decisions.

For the POC:

- Cache only required student summary fields.
- Do not cache parent phone/email.
- Clear cache on explicit sign-out.
- Avoid storing full sensitive profiles.

---

# 17. Real-Time Event Design

Use Supabase Realtime subscriptions.

Channels:

```text
school:{schoolId}:boarding-events
parent:{parentUserId}:notifications
```

When a successful event is inserted:

1. Create boarding event.
2. Create parent notification.
3. Commit both in one server-side transaction where practical.
4. Admin subscribes to school events.
5. Parent subscribes to notifications.

Fallback:

- TanStack Query refetch every 15 seconds when real-time connection is unavailable.
- Show “Live updates delayed” when subscription is disconnected.

---

# 18. Security and Privacy Requirements for the POC

## SEC-001 Tenant filtering

Every server query involving school-owned data must include school scope.

## SEC-002 Opaque pass token

QR must contain an opaque token only.

## SEC-003 Server secrets

Supabase service-role key must never be exposed to the browser.

## SEC-004 Logging

Do not log:

- Full QR token
- Parent phone number
- Exact home address
- Authentication secrets

## SEC-005 Demo data label

All seeded names and data must be marked fictional in README.

## SEC-006 Location privacy

The POC displays boarding scan location only to school admin and linked parent roles.

## SEC-007 Production disclaimer

README must state that the POC is not production-ready and requires a formal security, privacy, legal, consent, and retention review.

---

# 19. Seed Data Requirements

The build must seed deterministic demo data.

## 19.1 Schools

### Sunrise Public School

- Code: SPS
- City: Jaipur
- Timezone: Asia/Kolkata

### Green Valley Academy

- Code: GVA
- City: Jaipur
- Timezone: Asia/Kolkata

## 19.2 Sunrise routes

### Morning Route 4

- Code: MR-04
- Vehicle: Bus 12
- Registration: RJ14 PB 2045
- Driver: Ramesh Kumar

Stops:

1. Vaishali Nagar
2. Gandhi Path
3. Chitrakoot
4. Ajmer Road
5. School Campus

### Morning Route 7

- Code: MR-07
- Vehicle: Bus 07
- Registration: RJ14 PC 1188
- Driver: Suresh Yadav

## 19.3 Sunrise Route 4 students

1. Aarav Sharma — Grade 4-A — Vaishali Nagar — waiting
2. Meera Jain — Grade 5-B — Gandhi Path — waiting
3. Riya Gupta — Grade 3-A — Chitrakoot — waiting
4. Kabir Mehta — Grade 6-A — Vaishali Nagar — boarded
5. Anaya Singh — Grade 2-B — Gandhi Path — boarded
6. Vivaan Joshi — Grade 4-B — Chitrakoot — boarded
7. Ishita Verma — Grade 5-A — Ajmer Road — boarded
8. Arjun Saini — Grade 3-C — Vaishali Nagar — boarded
9. Myra Agarwal — Grade 1-A — Gandhi Path — boarded
10. Dev Bansal — Grade 6-B — Chitrakoot — boarded

## 19.4 Parent account

Neha Sharma:

- Child: Aarav Sharma
- Optional second child: Anaya Singh

## 19.5 QR demo tokens

- Aarav: `stp_live_aarav_001`
- Meera: `stp_live_meera_002`
- Riya: `stp_live_riya_003`
- Kabir: `stp_live_kabir_004`
- Wrong-route student: `stp_live_route7_005`
- Unknown demo token: `stp_unknown_999`

Generate printable QR PNGs and one printable A4 sheet.

---

# 20. QR Asset Requirements

The script `scripts/generate-demo-qr.ts` must create:

```text
public/demo-passes/aarav.png
public/demo-passes/meera.png
public/demo-passes/riya.png
public/demo-passes/kabir.png
public/demo-passes/route7-student.png
public/demo-passes/unknown.png
public/demo-passes/demo-pass-sheet.pdf
```

Each printed card contains:

- Fictional student name
- Grade
- SchoolRide Tracker logo
- QR code
- “DEMO PASS”
- Human-readable pass alias, not full token

---

# 21. Environment Configuration

`.env.example`:

```bash
NEXT_PUBLIC_APP_NAME=SchoolRide Tracker
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_DEFAULT_SCHOOL_ID=
NEXT_PUBLIC_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

The app must fail with a clear setup message when required variables are absent.

---

# 22. Error Handling

Required user-facing error codes:

| Code | User message |
|---|---|
| CAMERA_PERMISSION_DENIED | Camera access is required to scan the student pass. |
| CAMERA_NOT_AVAILABLE | No compatible camera was found. |
| QR_NOT_READABLE | The code could not be read. Please try again. |
| PASS_NOT_FOUND | Unknown student pass. |
| PASS_INACTIVE | This student pass is inactive. |
| PASS_NOT_REGISTERED_FOR_SCHOOL | This pass is not registered with the current school. |
| ROUTE_MISMATCH | Student is assigned to a different route. |
| STUDENT_ALREADY_BOARDED | Student has already boarded. |
| LOCATION_PERMISSION_DENIED | Location access was denied. Boarding can still be recorded. |
| NETWORK_UNAVAILABLE | Saved offline. It will sync when connectivity returns. |
| SYNC_FAILED | The event could not be synchronized yet. |
| SESSION_EXPIRED | Please select your demo role again. |
| UNKNOWN_ERROR | Something went wrong. Please try again. |

Technical stack traces must not be shown in the UI.

---

# 23. Analytics and Observability

POC telemetry may be simple console or structured server logging.

Track events:

- demo_login
- route_selected
- scanner_opened
- qr_scanned
- pass_resolved
- boarding_confirmed
- boarding_saved_offline
- sync_started
- sync_succeeded
- sync_failed
- duplicate_rejected
- route_mismatch_detected
- parent_notification_created
- demo_reset

Log fields:

- request ID
- school ID
- role
- route ID
- event type
- outcome
- latency
- error code

Never log the full pass token.

---

# 24. Testing Requirements

# 24.1 Unit tests

Required:

- Pass resolution
- Wrong-school protection
- Route mismatch detection
- Duplicate detection
- Idempotency behavior
- Location validation
- Offline queue ordering
- Retry-state transitions
- Parent authorization
- Tenant scoping helpers

# 24.2 Integration tests

Required:

1. Valid boarding event creates notification.
2. Duplicate boarding is rejected.
3. Route mismatch requires override.
4. Unknown pass does not create event.
5. Offline batch sync processes items independently.
6. Same idempotency key returns same server result.
7. Reset restores deterministic state.
8. Dashboard summary matches event state.

# 24.3 End-to-end tests

Use Playwright.

Required scenarios:

### E2E-01 Role entry

- Open app.
- Select School Admin.
- Verify dashboard.

### E2E-02 Simulated happy-path scan

- Open Driver.
- Select Aarav demo scan.
- Confirm boarding.
- Open Admin.
- Verify Aarav is boarded.
- Open Parent.
- Verify alert.

### E2E-03 Duplicate

- Scan Aarav again.
- Verify duplicate warning.

### E2E-04 Route mismatch

- Scan wrong-route pass.
- Verify warning.
- Record exception.
- Verify admin exception.

### E2E-05 Offline queue

- Mock offline state.
- Scan Meera.
- Verify pending count.
- Restore network.
- Verify synchronization.

### E2E-06 Tenant isolation

- Open Green Valley.
- Verify Sunrise students are not visible.

# 24.4 Manual device test matrix

Minimum:

- Android Chrome
- iPhone Safari
- Desktop Chrome
- Desktop Safari

Verify:

- Camera permission
- QR scan
- GPS permission
- Offline queue
- Layout
- Real-time updates

---

# 25. Acceptance Criteria

The POC is complete only when all critical criteria pass.

## AC-001

A user can enter each of the four roles from the demo login.

## AC-002

The driver can scan a printed QR code using a phone camera.

## AC-003

A valid QR code resolves to the correct seeded student.

## AC-004

The driver can confirm a boarding event.

## AC-005

GPS coordinates are captured when permission is granted.

## AC-006

Boarding can proceed with a clearly marked location-unavailable state.

## AC-007

The school dashboard updates within three seconds under normal connectivity.

## AC-008

The parent view updates within three seconds under normal connectivity.

## AC-009

A boarding event created offline remains after page refresh.

## AC-010

The offline event synchronizes after network restoration.

## AC-011

Duplicate boarding is prevented.

## AC-012

Wrong-route boarding produces a visible warning and exception state.

## AC-013

Unknown passes do not expose another school’s data.

## AC-014

Switching to Green Valley does not show Sunrise data.

## AC-015

Demo reset restores the defined seed state.

## AC-016

A camera/GPS/network failure cannot prevent the meeting demo because simulation controls are available.

## AC-017

The application can be deployed using documented steps.

## AC-018

README includes setup, seed, demo script, known limitations, and production caveats.

---

# 26. Implementation Plan

The coding agent should implement in this order.

## Phase 1: Foundation

1. Create Next.js TypeScript project.
2. Add Tailwind and component library.
3. Create layout, navigation, and demo role session.
4. Configure Supabase clients.
5. Add migrations and seed script.

## Phase 2: Domain and API

1. Add Zod schemas.
2. Implement tenant-scoped repositories.
3. Implement pass resolution.
4. Implement boarding validation.
5. Implement event creation and idempotency.
6. Implement parent notification creation.
7. Implement dashboard query.

## Phase 3: Admin and Parent

1. Admin dashboard.
2. Summary calculations.
3. Student status table.
4. Map.
5. Recent activity.
6. Exceptions.
7. Parent latest status and timeline.
8. Real-time subscriptions.

## Phase 4: Driver

1. Driver context.
2. QR scanner.
3. GPS capture.
4. Confirmation sheet.
5. Success/error states.
6. Demo scan fallback.

## Phase 5: Offline

1. IndexedDB schema.
2. Cache route pass mappings.
3. Queue event.
4. Retry worker.
5. Sync endpoint.
6. Pending UI.

## Phase 6: Demo hardening

1. Reset demo.
2. Generate QR assets.
3. Add deterministic demo controls.
4. Add error boundaries.
5. Add loading and empty states.
6. Mobile QA.
7. E2E tests.
8. README and demo script.

---

# 27. Definition of Done

The build is done when:

- No critical TypeScript errors exist.
- Lint passes.
- Unit tests pass.
- Integration tests pass.
- Critical Playwright flows pass.
- QR scanner works on a real phone.
- Offline queue works after refresh.
- Real-time admin update works.
- Real-time parent update works.
- Seed/reset scripts work repeatedly.
- Demo QR files are generated.
- Environment setup is documented.
- The deployed app is accessible through HTTPS.
- The meeting demo can be completed without developer tools.
- A fallback simulation path is available for every hardware-dependent step.

---

# 28. Discovery Questions to Place in the Product

Add a final admin-page panel titled **Questions for Pilot Planning**.

Questions:

1. Who performs the scan: driver, attendant, or student?
2. Will the school provide devices or use driver-owned phones?
3. Is boarding-only sufficient for phase one?
4. Is drop-off tracking mandatory?
5. What is the expected action when a student boards the wrong route?
6. Is parent notification required through push, SMS, WhatsApp, or multiple channels?
7. What happens when a student forgets or loses the pass?
8. Does the school already maintain route and student records digitally?
9. How frequently do route assignments change?
10. Is live vehicle tracking required, or is scan-location tracking enough?
11. How long should transport history be retained?
12. Who handles parent support and disputed scans?

This panel is part of the discovery workflow, not a production feature.

---

# 29. Demo Script

## Before the meeting

1. Reset demo data.
2. Open admin dashboard on laptop.
3. Open driver view on Android phone.
4. Open parent view in another browser profile or phone.
5. Verify all devices are signed into Sunrise demo roles.
6. Confirm QR sheets are printed or displayed on another screen.
7. Confirm camera and GPS permissions.
8. Confirm the simulation controls work.
9. Confirm Vercel and Supabase are healthy.

## Live script

### Step 1: Explain the operational gap

“Schools and parents often rely on calls or messages to confirm whether a student boarded. This POC creates a reliable event at the moment of boarding.”

### Step 2: Show waiting state

Show Aarav as waiting in the admin and parent views.

### Step 3: Scan

Scan Aarav’s QR code.

Explain:

“We are using QR for the discovery prototype. NFC will plug into the same identification interface when the physical cards are available.”

### Step 4: Confirm

Show student identity, route, time, and location.

Select **Confirm Boarding**.

### Step 5: Show live updates

Show:

- Driver success
- Admin count change
- Aarav status change
- Parent alert

### Step 6: Show offline behavior

Disable network.

Scan Meera.

Show “Saved offline.”

Restore network.

Show automatic sync.

### Step 7: Show safety rule

Scan Aarav again.

Show duplicate prevention.

### Step 8: Move into discovery

Open the Pilot Planning questions and discuss the client’s actual operation.

---

# 30. Known Limitations

The README and UI demo banner must disclose:

- QR codes are used instead of NFC.
- This is a responsive PWA, not a production native driver app.
- Parent alerts are in-app, not guaranteed production push/SMS delivery.
- Location is based on the driver device.
- Demo authentication is not production authentication.
- Offline local storage has not undergone formal security review.
- Multi-tenancy is demonstrated with two seeded schools.
- The solution requires production privacy, consent, retention, security, and operational policies.
- Dedicated vehicle terminals are not included.
- Continuous vehicle GPS tracking is not included.

---

# 31. Future Production Direction

The POC architecture should allow later evolution into:

- React Native or native driver app
- Native NFC reader adapter
- Push notification provider
- SMS fallback
- Drop-off scanning
- Student pass replacement workflow
- School ERP import
- Device registration and management
- Dedicated in-vehicle terminal
- Route-session management
- Geofencing
- Vehicle live tracking
- Parent consent
- Retention controls
- Audit exports
- Production RBAC and SSO
- Monitoring and alerting
- High-availability backend

No future item should be implemented unless required for the POC acceptance criteria.

---

# 32. Coding-Agent Constraints

The coding agent must follow these constraints:

1. Build only the scope in this document.
2. Do not replace working features with static mockups.
3. Do not use fake time delays to imitate real-time updates.
4. Do not expose service keys to the browser.
5. Do not store student identity inside QR payloads.
6. Do not couple QR scanner code to boarding-event creation.
7. Do not skip offline persistence.
8. Do not claim NFC is implemented.
9. Do not introduce paid services.
10. Do not build unrelated analytics.
11. Do not add unnecessary microservices.
12. Do not use `any` unless there is a documented reason.
13. Validate API inputs with Zod.
14. Use server-side tenant scoping.
15. Include seed and reset scripts.
16. Include tests for core business rules.
17. Produce a clean README.
18. Keep UI copy understandable to school staff.
19. Make all seeded people and schools explicitly fictional.
20. Stop only when the Definition of Done is satisfied.

---

# 33. Final Build Output Checklist

The repository must contain:

- Working Next.js application
- Supabase migrations
- Seed script
- Reset script
- QR generation script
- Printable QR assets
- Driver PWA view
- QR scanner
- GPS capture
- Offline queue
- Sync endpoint
- Admin dashboard
- Map
- Parent view
- Real-time subscriptions
- Demo controls
- Unit tests
- Integration tests
- Playwright tests
- `.env.example`
- `README.md`
- `DEMO_SCRIPT.md`
- `KNOWN_LIMITATIONS.md`

---

# 34. Final Product Principle

The POC should optimize for one outcome:

> A client should be able to watch a student pass being scanned and immediately understand how the school, driver, and parent experiences connect.

Everything in the build must support that outcome.
