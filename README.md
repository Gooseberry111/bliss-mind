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
  components/         Navbar, Footer, ticker + UI primitives
  pages/              Home, About, Services, Contact, NotFound
  assets/brand/       logo source + generated web assets
  style.css           Tailwind entry, design tokens, glass/motion utilities
scripts/
  build-assets.mjs    logo -> transparent webp/png, favicon, OG card
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

`booking` in `src/data/site.js` controls the scheduler:

- `url` — the public booking page from whichever scheduler you use (Google
  Calendar appointment schedules, Calendly, SimplePractice, …). The scheduler
  is what shows free/busy times and emails out the Google Meet or Zoom link;
  the site only points at it.
- `mode` — `"embed"` renders it inline on the Contact page, `"link"` shows a
  card with a button that opens it in a new tab. `"link"` behaves better on
  small screens and makes swapping providers a one-line change.
- Leave `url` empty and the page shows a "booking coming soon" card with the
  email and phone instead, so a missing or wrong URL can never render a broken
  scheduler inside the site.

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
- `contact.phone`, `contact.hours` (email is set)
- `booking.url` — the scheduler link (see Booking above)
- `provider.qualifications` — further credentials as they are added

Also outstanding:

- **All clinical copy is a first draft** written from the practice brief and
  needs Dr. Ukata's review before it goes live.
- **A privacy policy page** — there is a footer slot for it but no page yet.
- **Scheduler and email under HIPAA** — a scheduler holds appointment data,
  and a free Gmail account is not covered by a Google BAA. Both are worth
  settling before real patients arrive; the callback form is deliberately
  built to collect no clinical detail in the meantime.
- **Prerendering** — per-page titles and OG tags are applied client-side, so
  scrapers that don't run JS see only the baseline tags in `index.html`.
