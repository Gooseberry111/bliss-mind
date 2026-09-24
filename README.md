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

## Deployment (Netlify)

`netlify.toml` and `public/_redirects` are both configured for SPA
history-mode routing. The callback form relies on Netlify Forms: because the
real form is rendered by Vue, the hidden static copy in `index.html` is what
registers it at deploy time — **keep the field names in the two in sync.**

**The form cannot work on `npm run dev`.** It posts to `/`, which only
Netlify intercepts — the Vite dev server has no handler there and returns 404.
In development the submit is short-circuited: the payload is logged to the
console and the success state is shown, so the UI can be tested. That branch is
compiled out of the production build.

**Form submissions do not email anyone by default.** They collect in the
Netlify dashboard under _Forms_. To get them by email, go to
**Site configuration → Forms → Form notifications → Add notification → Email
notification** and enter the address. This is a dashboard setting, not
something in this repo.

The form deliberately has **no free-text field**. It collects contact details
and fixed-choice options only, so patients are not invited to disclose health
information through a channel that is not built for it.

## Before launch

Placeholders to replace — all marked `TODO` in `src/data/site.js`:

- `site.url` — production domain (used for canonical + `og:url`)
- `contact.phone` — empty on purpose (no practice line yet); set it and
  phone links reappear across the site
- `booking.url` — the scheduler link (see Booking above)
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
