# Bliss Mind

Marketing site for the virtual psychiatric practice of Dr. Jemimah Ukata,
PMHNP — telehealth for adults across Kansas.

Vue 3 (`<script setup>` SFCs), Vite, Tailwind v4, vue-router.

## Getting started

```bash
npm install
npm run dev      # dev server
npm run build    # production build to dist/
npm run preview  # serve the production build
npm run lint     # eslint --fix
npm run format   # prettier --write
npm run assets   # regenerate logo/favicon/social assets from the source logo
```

## Structure

```
index.html            shell, fonts, baseline meta, hidden Netlify form
src/
  main.js             bootstrap (router, @vueuse/head, v-reveal)
  App.vue             layout shell, skip link, per-route <head>
  router/index.js     routes, lazy loading, scroll behavior, page metadata
  data/site.js        ALL shared content — see below
  directives/reveal.js  v-reveal scroll animation
  components/         Navbar, Footer, ticker, booking widget + UI primitives
  pages/              Home, About, Services, Contact, NotFound
  assets/brand/       logo source + generated web assets
  style.css           Tailwind entry, design tokens, glass/motion utilities
scripts/
  build-assets.mjs    logo -> transparent webp/png, favicon, OG card
apps-script/
  Code.gs             booking backend (paste into Google Apps Script)
docs/
  BOOKING-SETUP.md    step-by-step booking setup for a non-developer
```

## Content

**`src/data/site.js` is the single source of truth.** Provider details,
contact info, the conditions treated, pricing, FAQs, the announcement ticker
and the crisis notice all live there — edit once, and every page follows.
Content used by only one page (About's values list) stays in that page.

Page titles and descriptions are declared in the route table's `meta` and
applied centrally in `App.vue`; pages don't call `useHead` themselves.

To hide every price on the site, set `pricing.visible = false` in
`site.js` — the copy stays, the sections just stop rendering.

## Design system

Tokens live in `src/style.css` as Tailwind v4 `@theme` variables. There is no
`tailwind.config.js`.

- **Palette** — `linen`/`shell`/`sand` warm neutral grounds, a `sage` ramp
  sampled from the logo, `ink` text colors, and a warm `clay` accent that
  keeps the page from reading as entirely green. `lilac` appears only in
  background washes.
- **Type** — Cormorant Garamond for display (it echoes the logo wordmark),
  Manrope for UI. Loaded from Google Fonts in `index.html`.
- **Motion** — `v-reveal` fades elements up on scroll, `.ticker-track` drives
  the announcement bar, `animate-drift`/`animate-float-soft` move the
  background blobs. Everything is disabled under `prefers-reduced-motion`.
- **Glass** — `.glass`, `.glass-dark`, `.glass-nav`, `.glass-drawer`. Note
  that nesting a `backdrop-filter` element inside another one silently does
  nothing, which is why the mobile drawer is `<Teleport>`ed to `<body>` rather
  than living inside the glass header.

## Brand assets

`src/assets/brand/logo-source.png` is the master. `npm run assets` derives
everything else from it — knocking out the white background, cropping the
emblem, and writing the favicon, apple touch icon and 1200x630 OG card. If the
logo is ever redrawn, replace the source and re-run that one command.

## Booking

Bookings run on a Google Apps Script web app backed by a Google Sheet. The
script is version-controlled here in `apps-script/Code.gs`; the Sheet is the
database and the owner-editable control panel.

**Full setup walkthrough: [docs/BOOKING-SETUP.md](docs/BOOKING-SETUP.md)** —
written for someone who has never opened Apps Script.

- `booking.apiUrl` in `src/data/site.js` is the deployed `/exec` URL. Leave it
  empty and the Contact page shows a "booking coming soon" card instead of a
  broken widget.
- The Sheet has four tabs: **Bookings** (written by the script),
  **Availability** (weekly hours), **Blackouts** (days off) and **Settings**.
  Changing hours needs no code change or redeploy.
- Every time in the system is **Central Time**, with no conversion anywhere.
  Patients must be located in Kansas, so their local time is Central by
  definition — this removes the whole class of timezone bug.
- Slot booking happens under a `LockService` lock, so two people submitting at
  once cannot take the same slot. The widget shows taken times struck through
  rather than hiding them.
- The site POSTs as `text/plain` because Apps Script cannot answer the CORS
  preflight that `application/json` would trigger.

After editing `Code.gs`, redeploy with **Deploy → Manage deployments → edit →
New version** so the URL stays the same.

## The callback form

The form posts to the same Apps Script web app as booking, which emails the
submission straight to the practice inbox and sends the enquirer an
acknowledgement. There is no Netlify Forms involvement and nothing to switch
on in a hosting dashboard.

- `api.url` in `src/data/site.js` is the deployed `/exec` URL.
- **The form needs no spreadsheet setup.** Paste `apps-script/Code.gs`, deploy
  it, paste the URL in, and it works. The script falls back to a built-in
  notification address if the Settings tab does not exist yet, and logs to an
  `Enquiries` tab only if a spreadsheet is available.
- Until `api.url` is set, the Contact page shows an "email us directly" card
  instead of a form that cannot submit.
- The form has no free-text field, so patients are not invited to disclose
  health information through a channel not built for it.

## Deployment (Netlify)

`netlify.toml` sets the build command, publish directory and Node version, and
`public/_redirects` handles SPA history-mode routing. Connect the repo in
Netlify and it builds itself — every push to `main` redeploys.

## Before launch

Placeholders to replace — all marked `TODO` in `src/data/site.js`:

- `site.url` — production domain (used for canonical + `og:url`)
- `contact.phone` — empty on purpose (no practice line yet); set it and
  phone links reappear across the site
- `api.url` — the Apps Script `/exec` URL (powers the form, and booking)
- `booking.enabled` — flip to true once availability is configured
- `provider.qualifications` — further credentials as they are added

Also outstanding:

- **All clinical copy is a first draft** written from the practice brief and
  needs Dr. Ukata's review before it goes live.
- **The privacy policy** (`/privacy`) is a plain-language draft describing
  what the site actually collects. It is explicitly _not_ the HIPAA Notice of
  Privacy Practices, which is a separate document Dr. Ukata must provide to
  patients.
- **Scheduler and email under HIPAA** — a scheduler holds appointment data,
  and a free Gmail account is not covered by a Google BAA. Both are worth
  settling before real patients arrive; the callback form is deliberately
  built to collect no clinical detail in the meantime.
- **Prerendering** — per-page titles and OG tags are applied client-side, so
  scrapers that don't run JS see only the baseline tags in `index.html`.
