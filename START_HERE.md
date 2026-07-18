# Start Here

Use the files in this folder in this order:

1. `NFC_SCHOOL_TRANSPORT_POC_PRD_AND_SPEC.md`  
   Complete product, UX, architecture, API, data, testing, acceptance, and demo specification.

2. `ONE_SHOT_BUILD_PROMPT.md`  
   Paste this into the coding agent after attaching or placing the specification in the repository.

3. `demo-seed.json`  
   Canonical fictional demo data for two-school tenancy, Route 4, student passes, and parent/driver roles.

Recommended first command after creating the repository:

```bash
cp NFC_SCHOOL_TRANSPORT_POC_PRD_AND_SPEC.md SPEC.md
cp ONE_SHOT_BUILD_PROMPT.md BUILD_PROMPT.md
```

The build intentionally uses QR codes in the POC and keeps NFC behind a future adapter.
