# Testsprite Frontend Test Report

## Document Metadata
- Project Name: `uinic-webdev`
- Date: `2025-12-02`
- Prepared by: `AI Assistant via TestSprite`

## Requirement Validation Summary

### Requirement: User Registration
- TC001 — User Registration Success — Status: ❌ Failed
  - Error: Login page "Sign up" link does not navigate to registration.
  - Analysis / Findings: Navigation wiring to `/register` appears broken or missing. Validate route registry and link targets on the auth entry page. Ensure `resources/js/pages/auth/register.tsx` is routed and exported properly and the landing/auth links use the router, not raw anchors.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/a940ee13-8a14-45ac-ac6f-ef09e8ec9495
- TC002 — User Registration with Invalid Email — Status: ❌ Failed
  - Error: Registration page renders empty; no form fields.
  - Analysis / Findings: Component may not render due to missing default export, broken layout wrapper, or guard. Inspect `resources/js/pages/auth/register.tsx` and layout dependencies. Confirm form composition and conditional guards.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/eeb14969-9219-49ee-98b9-63cd74d2512c

### Requirement: User Login
- TC003 — User Login Success — Status: ❌ Failed
  - Error: "SAYA SUDAH PUNYA AKUN" does not navigate to login; console shows requests to `.tsx` paths (net::ERR_EMPTY_RESPONSE).
  - Analysis / Findings: Misconfigured links likely point to source file paths instead of app routes. Replace any `href` values referencing `resources/js/...tsx` with valid route paths (e.g., `/login`). Verify route registry and `wayfinder` usage.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/9bc5e3ab-6c27-4ce6-97ac-49a193202974
- TC004 — User Login Failure with Incorrect Password — Status: ✅ Passed
  - Analysis / Findings: Invalid password handling works; maintain consistent error messaging and rate-limiting.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/acdf9322-c9ac-4de2-bbd6-6b2a4d566fcb

### Requirement: Two-Factor Authentication (2FA)
- TC005 — 2FA Setup and Verification — Status: ❌ Failed
  - Error: App page failed to load; Vite HMR WebSocket timed out; Supabase REST responded 400 on `xp_events` queries.
  - Analysis / Findings: Missing or invalid Supabase env leads to 400s; HMR websocket failing indicates dev server/proxy constraints during testing. Ensure `.env` keys for Supabase are present and mock external calls for tests. Consider disabling HMR in CI or allowing WebSocket through the proxy.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/9d8ae8be-9738-4cca-8f48-3cf3374cb8bf

### Requirement: Password Recovery
- TC006 — Password Recovery and Reset — Status: ❌ Failed
  - Error: Cannot access forgot password page; navigation elements non-functional.
  - Analysis / Findings: Auth flow links are miswired or missing. Audit links to `/forgot-password` and verify route registration.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/b3e94acb-3d4b-47ce-a311-3ee1a4d1f244

### Requirement: Dashboard Content
- TC007 — Dashboard Displays Dynamic Content — Status: ❌ Failed
  - Error: Test timed out.
  - Analysis / Findings: Initial data dependencies (Supabase or API) may block rendering. Add skeletons and timeout-safe fallbacks; lazy-load non-critical widgets.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/69a0266a-b3bb-42fc-b583-cab4ef4887af

### Requirement: Journal & Mood Tracking
- TC008 — Journal Entry Creation and Mood Tracking — Status: ❌ Failed
  - Error: Test timed out.
  - Analysis / Findings: Similar to dashboard, external calls likely block interaction; add graceful error handling and mock data in test mode.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/98220646-8522-492c-88c3-7bf56acfaeca

### Requirement: Mental Health Chatbot
- TC009 — Chatbot Interaction — Status: ❌ Failed
  - Error: "Mulai Chat" link unresponsive from dashboard.
  - Analysis / Findings: Ensure CTA links use app router and correct path (e.g., `/mental-health-chat`). Avoid disabled buttons or missing handlers.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/b71c2dc7-807d-487e-8a08-f7fb40a0b26d

### Requirement: Gamification Progress
- TC010 — XP, Streaks, Achievements — Status: ❌ Failed
  - Error: Journaling XP increases verified; chatbot activity element missing/unclickable.
  - Analysis / Findings: Ensure all tracked activities have visible, enabled triggers; verify progress aggregation does not hard-fail when one activity is unavailable.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/b8889038-4eeb-4787-817f-2d563bdca1b8

### Requirement: Mentoring Hub
- TC011 — Content Navigation and Progression — Status: ❌ Failed
  - Error: Negative emoji click treated as correct; SVG path error `Expected number`.
  - Analysis / Findings: Game logic validation faulty; sanitize input handling and fix SVG path generation. Avoid percent signs in `d` path; compute numeric coordinates.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/fe2b7b9c-1ae7-4439-9f9a-37922b38158a

### Requirement: CBT Game
- TC012 — CBT Game Interaction — Status: ❌ Failed
  - Error: Missing levels on progression page; SVG path error persists.
  - Analysis / Findings: Verify level registry and conditional rendering; fix path computations as above.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/5e61402c-77aa-4c22-8eb5-00db52c5cf64

### Requirement: Shop & Leaderboard
- TC013 — Data Loading and Interaction — Status: ✅ Passed
  - Analysis / Findings: Data interactions work; ensure cache and loading states remain consistent under degraded network.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/65932e6b-44fb-4ebf-ad42-c4e7c32612ee

### Requirement: Profile & Settings Persistency
- TC014 — Update Persistency — Status: ❌ Failed
  - Error: "Edit Profil" button non-functional; Supabase 400s.
  - Analysis / Findings: Wire up edit CTA to profile form route; implement robust error handling for external data. Ensure env variables present or mock client in tests.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/204d5ca3-3344-46f7-a82f-4aba8c39f676

### Requirement: Routing & Navigation
- TC015 — Consistency — Status: ✅ Passed
  - Analysis / Findings: Baseline routing OK; fix remaining broken anchors in auth/dashboard.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/bf4543e0-cf0e-4b87-bd53-75667c3ba0d8

### Requirement: UI Accessibility
- TC016 — Accessibility and Consistency — Status: ✅ Passed
  - Analysis / Findings: UI kit behaves correctly; continue improving focus management and ARIA on custom components.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/baeee055-c481-4385-84ac-2d2377e28b42

### Requirement: Deployment (Vercel)
- TC017 — Env Variable Handling — Status: ❌ Failed
  - Error: Unable to login to Vercel due to verification/OAuth issues.
  - Analysis / Findings: Out-of-scope credentials; treat as external blocker. Ensure deployment docs clearly specify required envs and steps.
  - Visualization: https://www.testsprite.com/dashboard/mcp/tests/eaf0cb14-7937-405a-ba8e-63271311be85/449984f5-69b7-49da-abf4-f9ee7ec21a40

## Coverage & Matching Metrics
- Total Tests: `17`
- Passed: `4`
- Failed: `13`
- Pass Rate: `23.53%`

| Requirement                       | Total | ✅ Passed | ❌ Failed |
|-----------------------------------|-------|----------|----------|
| User Registration                 | 2     | 0        | 2        |
| User Login                        | 2     | 1        | 1        |
| Two-Factor Authentication (2FA)   | 1     | 0        | 1        |
| Password Recovery                 | 1     | 0        | 1        |
| Dashboard Content                 | 1     | 0        | 1        |
| Journal & Mood Tracking           | 1     | 0        | 1        |
| Mental Health Chatbot             | 1     | 0        | 1        |
| Gamification Progress             | 1     | 0        | 1        |
| Mentoring Hub                     | 1     | 0        | 1        |
| CBT Game                          | 1     | 0        | 1        |
| Shop & Leaderboard                | 1     | 1        | 0        |
| Profile & Settings Persistency    | 1     | 0        | 1        |
| Routing & Navigation              | 1     | 1        | 0        |
| UI Accessibility                  | 1     | 1        | 0        |
| Deployment (Vercel)               | 1     | 0        | 1        |

## Key Gaps / Risks
- Broken navigation links in auth/dashboard pages causing inability to reach core flows.
- External dependencies (Supabase) returning 400s; tests need mocks or graceful fallbacks.
- Vite HMR/WebSocket instability under proxy; adjust dev server config for CI.
- SVG path computation errors in mentoring/CBT components; replace percent-based coordinates with numeric values.
- Missing or disabled CTAs for activity tracking (chatbot) blocking XP progression.

## Recommended Fixes
- Audit and correct all anchor/router links to use valid app routes (`/login`, `/register`, `/forgot-password`, `/mental-health-chat`).
- Add test-mode guards to mock Supabase calls; ensure `.env` is loaded and secrets are not required for smoke tests.
- Configure Vite `server.hmr` to tolerate proxy/HMR or disable HMR when testing.
- Normalize SVG path generators to numeric coordinates; validate inputs and reject incorrect emoji selection.
- Ensure all gamification activities have visible, enabled triggers and non-blocking progress aggregation.

