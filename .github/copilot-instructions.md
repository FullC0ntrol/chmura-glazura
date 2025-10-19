## Project snapshot

- Frontend: React + Vite app at the repo root (top-level `src/`, `index.html`). Scripts (dev/build/preview) are in `package.json` and use ESM (`"type":"module").
- API: small Express service under `reviews-api/` that proxies or returns review data. It uses ESM import syntax and `node-fetch`.

## Quick dev commands

- Frontend (from repo root):
  - npm run dev — start Vite dev server (HMR)
  - npm run build — produce production build
  - npm run preview — serve the built site locally
- Reviews API (from `reviews-api/`):
  - No dev script present. Use `node` (Node 18+) or `node --experimental-fetch` with ESM support. Example:
    - cd reviews-api; node server.js

Note: `reviews-api/package.json` currently depends on `node-fetch` and `express@5` and has no start script — adding `"start": "node server.js"` is a safe follow-up.

## Architecture & data flows (what matters to an AI coder)

- The frontend is a single-page app built by Vite. Components live under `src/components/` (Hero, Nav, Gallery, Reviews, etc.). The `Reviews` component expects review data from a backend endpoint and renders a Lightbox and other UI.
- The `reviews-api/server.js` file is an Express app that should expose `/api/reviews`. The frontend expects a JSON array of reviews (see `src/components/Reviews.jsx` for shape and usage). When editing the API, keep responses compact (JSON array or { data: [...] }) and stable.
- Module system: the frontend `package.json` sets `type: "module"`. The API also uses ESM imports. When running Node locally ensure Node >= 18 or keep `node-fetch` installed and import it (already present).

## Project-specific conventions and examples

- Use ESM imports across the repo (e.g. `import express from 'express'`). Avoid CommonJS `require` unless adding interop shims.
- Styling: Tailwind CSS is configured and used in `src/index.css` and component classNames. Prefer utility-first classes and keep custom styles in `index.css`.
- Linting: `npm run lint` runs ESLint at the repo root. Follow existing ESLint rules; files currently use React functional components with hooks.

## Common edits and gotchas for AI agents

- Fixing the `reviews-api/server.js` file: watch for unterminated route handler declarations (missing arrow function or closing parentheses). Example valid handler:

  app.get('/api/reviews', async (req, res) => {
    // fetch or return cached reviews
  });

- Cache naming: the API previously used variables named `CASH` and `CASHE_TTL_MS` — prefer `CACHE` and `CACHE_TTL_MS` for clarity.
- When adding scripts to `reviews-api/package.json`, include `"start": "node server.js"` and optionally `"dev": "nodemon server.js"` for faster iteration.
- When adding network fetches on the server, sanitize and validate upstream responses; the frontend expects JSON.

## Integration points & external dependencies

- Frontend communicates with the API at `/api/reviews`. The repository currently keeps the API as a sibling folder. In production these can be hosted separately; during local dev run the API and configure CORS or proxy accordingly.
- Key dependencies: `vite`, `react`, `tailwindcss`, `express`, `node-fetch`, `cors`, `dotenv`.

## Example PR help requests

- If asked to implement a new endpoint, return a minimal, documented JSON response and add tests or a smoke script in `reviews-api/`.
- If asked to update the frontend to call the API, modify `src/components/Reviews.jsx` to fetch from `/api/reviews` and handle empty arrays gracefully.

If anything here is unclear or you'd like me to merge content from an existing doc, tell me which section to expand or correct.
