# Known Limitations

- QR is the only implemented hardware reader. Native NFC is represented by an adapter that deliberately throws “not implemented.”
- This is a responsive PWA, not a production native driver application.
- Parent alerts are in-app; production push, SMS, and WhatsApp delivery are excluded.
- Boarding location comes from the driver device. Simulation is clearly labelled.
- Demo authentication and cookie guards are not production identity or RBAC.
- The credential-free browser demo is local to that browser profile; cross-device realtime requires configured Supabase.
- IndexedDB student/pass caching has not undergone formal device-security review.
- Two seeded schools demonstrate tenant isolation; enterprise tenancy administration is excluded.
- Continuous vehicle GPS, drop-off, ETA, route optimization, billing, ERP integration, and dedicated terminals are excluded.
- OpenStreetMap tiles require connectivity and must follow the tile provider’s usage policy.
- Camera/GPS behavior requires manual verification on Android Chrome and iPhone Safari over HTTPS; CI uses simulation.
- Production use needs privacy, consent, retention, security, legal, accessibility, incident-response, and operational policies.
