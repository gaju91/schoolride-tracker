# Discovery Meeting Demo

## Before the meeting

1. Use **Reset demo** on the login or admin screen to restore browser-local seed data.
2. Open School Admin, Driver, and Parent in separate tabs of the same browser profile so local live updates are shared.
3. Confirm camera and GPS permissions on the HTTPS deployment.
4. Print `public/demo-passes/demo-pass-sheet.pdf` or display it on another screen.
5. Expand driver simulation controls once to confirm all fallbacks.

## Live flow

1. Show Route 4: 10 assigned, 7 boarded, Aarav/Meera/Riya waiting.
2. Scan Aarav’s QR. Explain that QR implements the reader contract while native NFC remains future work.
3. Review student, assigned stop, route, location, and timestamp. Confirm boarding.
4. Show the admin count at 8/2 and parent boarding card without refresh.
5. Toggle **Offline save**, scan Meera, and confirm the persistent pending count.
6. Refresh the driver page to demonstrate IndexedDB survival. Restore online and choose **Retry now**.
7. Scan Aarav again to show duplicate rejection.
8. Scan the Route 7 pass and explicitly record the route-mismatch exception.
9. Scan Unknown to demonstrate suffix-only support information.
10. Enter Green Valley from Super Admin and verify no Sunrise students appear.
11. Finish with **Questions for Pilot Planning** on the admin page.
