# TASKS.md — Portfolio Remediation Backlog

**Audience:** an AI coding agent working on this repository.
**Owner:** Yamen Joha. This portfolio is a hiring artifact — recruiters open it after reading the CV.
**Repo:** `yamen-portfolio` · Next.js 15.3.8 (App Router) · React 18.2 · TypeScript · Tailwind CSS v4 · next-intl (en/ar)

---

## 0. HOW TO WORK ON THIS REPO

1. **One task per session.** Do not chain tasks. Each task below is scoped to be finishable and verifiable alone.
2. **Read only the files the task names.** Do not explore or refactor adjacent code.
3. **Never run `npm run build` or `npm run dev`.** The owner verifies visually. You may run `npx tsc --noEmit` and `npm run lint`.
4. **Every task must end with `npx tsc --noEmit` passing with zero errors.** The repo is currently clean — keep it that way.
5. **If a task's diff exceeds ~10 files, stop and report.** Split it instead.
6. **Do not reformat files you did not need to change.** No repo-wide Prettier, no import reordering, no quote-style changes.
7. **Do not add npm dependencies** unless the task names the package explicitly.
8. **Do not commit or push.** Leave changes in the working tree and report what you changed.

---

## 1. STYLE LAW — READ BEFORE TOUCHING ANY FILE

Breaking the visual design is a worse outcome than leaving a task undone. These rules are absolute.

### 1.1 The accent color is `#b98f43` — and only from `globals.css`

`app/globals.css` `:root` and `.dark` both define `--accent: #b98f43` (a muted gold). This is the brand color of the entire site.

**`tailwind.config.js` is DEAD CONFIG. Do not wire it in, do not "fix" it, do not delete it.**
This project uses Tailwind v4 via `@import "tailwindcss"` in `app/globals.css`, with theme tokens declared in the `@theme inline` block. There is **no `@config` directive**, so `tailwind.config.js` is never loaded. That file declares a *different* accent (`#B8860B`) and different fonts. If you connect it, every accent surface on the site silently shifts color. Leave it inert.

### 1.2 Do not edit these blocks in `app/globals.css`

- The `@theme inline { ... }` block (token mapping).
- The `:root { ... }` and `.dark { ... }` variable blocks.
- The literal helper classes near the bottom: `.text-accent`, `.bg-accent`, and the two `hover:` variants written out by hand. These are intentional and are relied on by many components. **Deleting them removes the gold from the site.**
- The `@media print` block (used by the project detail page).

Adding a *new* rule at the end of the file is acceptable when a task requires it. Rewriting existing ones is not.

### 1.3 Colors

- Use existing semantic tokens only: `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `border-border`, `bg-accent`, `text-accent`, `bg-primary`, `text-primary-foreground`, `bg-secondary`, `bg-muted`, `text-destructive`, `bg-popover`, `ring-ring`, `border-input`.
- **Never write a raw hex value in a `className`.** No `#fff`, no arbitrary `text-[#b98f43]`.
- **Never introduce a new color** (no blue-500, no emerald, no gradients that were not already there).
- Neutral shades are `oklch(...)` values. Do not convert them to hex or to Tailwind's default palette.

### 1.4 Dark mode

Dark mode is class-based: `@custom-variant dark (&:is(.dark *))` in `globals.css`, driven by `next-themes` with `attribute="class"` in `app/layout.tsx`.

- Every visual change must be checked in **both** themes.
- Do not add `dark:` variants with hardcoded colors. The tokens already flip automatically — if a token is used, dark mode is handled.

### 1.5 Typography

`lib/fonts.ts` loads **Inter** from `next/font/google` with `variable: "--font-sans"`, applied in `app/layout.tsx` via `fontSans.variable`.

**Known fragile spot — do not touch unless a task says so:** the `@theme inline` block maps `--font-sans` to `var(--font-geist-sans)`, and `--font-geist-sans` is never defined anywhere. The mapping is inconsistent with `lib/fonts.ts`. It currently renders acceptably; "fixing" it changes the typeface across the whole site. Leave it alone.

Do not change font sizes, weights, or `tracking-*` / `leading-*` values on existing elements.

### 1.6 Spacing, radius, layout

- Radius scale derives from `--radius: 0.625rem`. Use `rounded-sm|md|lg|xl`. Do not use arbitrary pixel radii.
- Do not change existing padding/margin/gap values, grid column counts, `max-w-*` containers, or breakpoints. If a task requires a layout change it will say so explicitly.
- `components/ui/Section.tsx` is the shared section wrapper. Use it; do not re-implement its spacing inline.

### 1.7 Animation

Framer Motion variants live in `utils/motion.ts`. **Reuse the existing variants.** Do not write new `initial`/`animate`/`transition` objects inline when an exported variant covers the case, and do not change existing durations, delays, or easings.

### 1.8 Components

- `components/ui/*` are shared primitives (`button`, `card`, `badge`, `input`, `textarea`). Use them. Do not restyle them — a change there propagates everywhere.
- Do not add a new UI library. shadcn/ui patterns + Radix + `lucide-react` + `@icons-pack/react-simple-icons` are what exist; that is the full set.
- Preserve the `cn()` helper usage from `lib/utils.ts` for conditional classes.

### 1.9 Content and i18n

- **No user-facing string may be hardcoded in a `.tsx` file.** All copy lives in `locales/en/*.json` and `locales/ar/*.json`.
- **Both languages must always be updated together.** A key added to `en` and missing in `ar` is a bug — `next-intl` will throw at runtime.
- Do not rewrite existing Arabic copy unless the task asks for new copy.

---

## 2. TASKS

### P0 — Ship today. The site is currently failing at its job.

---

#### TASK-01 — The contact form is dead. Build the missing API route.

**Problem:** `components/Form.tsx` line 34 posts to `/api/contact`. **No API route exists anywhere in this repo** — there is no `app/api/` directory and no `route.ts` file. Every submission returns 404, `res.ok` is false, and the visitor sees an error. This has been broken since the last deploy.

**Do:**

1. Create `app/api/contact/route.ts` — a `POST` handler.
2. Validate the body: `name`, `email`, `subject`, `message`, all required strings; `email` must match a basic email shape. Return `400` on invalid input.
3. Send the mail with **Resend** (`npm i resend` — this package is explicitly authorized for this task). Read the key from `process.env.RESEND_API_KEY` and the destination from `process.env.CONTACT_TO_EMAIL`.
4. If either env var is missing, return `500` with a generic message and `console.error` the reason — never leak the key or the internal error to the client.
5. Return `200` with `{ ok: true }` on success.
6. Add `.env.example` at the repo root listing `RESEND_API_KEY=` and `CONTACT_TO_EMAIL=` with no real values.
7. Reject bodies over 5000 characters total as basic abuse protection.

**Do not:** change `components/Form.tsx` markup, classes, or layout. Its fetch call and state machine already work correctly — only the endpoint is missing. Touching its JSX is out of scope.

**Done when:** `app/api/contact/route.ts` exists, `tsc --noEmit` is clean, and `.env.example` documents both variables.

---

#### TASK-02 — Replace the `yourdomain.com` placeholder and fix the OG image.

**Problem:** `utils/globalmetadata.ts` line 5 still reads `metadataBase: new URL("https://yourdomain.com")`, and line 31 sets `openGraph.url` to the same placeholder. It points `openGraph.images` at `/images/og-image.jpg`, but **`public/images/` does not exist** — the image 404s. Result: sharing the site on LinkedIn or WhatsApp produces a blank card. This URL is printed on the owner's CV.

**Do:**

1. In `utils/globalmetadata.ts`, replace both `yourdomain.com` occurrences with the real production URL. **Ask the owner for it before writing** — do not guess, do not use a `vercel.app` subdomain without confirmation.
2. Point `openGraph.images` and the Twitter card image at an asset that actually exists. Prefer adding `public/og-image.png` at 1200×630 and referencing `/og-image.png`. If you cannot produce the image, reference `/me.png` (which exists) and flag in your report that a proper OG image is still needed.
3. Update the `description` in the same file. It currently says *"Frontend developer passionate about building modern, smooth web applications..."*. The owner's current positioning is **Product Engineer — Full-Stack**, specialising in multi-tenant SaaS. Rewrite `description` and `title.default` to match, under 160 characters.
4. Add `alternates` with `canonical` and `languages` for `en` and `ar` so the two locales are declared to search engines.

**Do not:** touch any component or stylesheet. This task is metadata only.

**Done when:** `grep -rn "yourdomain" utils/` returns nothing, and the referenced OG image resolves to a real file in `public/`.

> Note: `components/ui/ContactInfo.tsx` also contains `contact@yourdomain.com`, but that file is **dead code** — imported nowhere, so it is not rendered. It is removed in TASK-09, not here.

---

#### TASK-03 — Set `lang` and `dir` on the `<html>` element.

**Problem:** `app/layout.tsx` line 19 renders `<html suppressHydrationWarning>` with **no `lang` and no `dir`**. The locale layout at `app/[locale]/layout.tsx` cannot set them because it is nested inside the root `<html>`. Consequences: screen readers cannot identify the page language, Google cannot distinguish the `ar` and `en` versions, and the document direction is always LTR — which is why 16 components across the codebase each set `dir` by hand (see TASK-10).

**Do:**

1. Make the root layout locale-aware so `<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>` is emitted on the server. The standard next-intl approach is to move the `<html>`/`<body>` shell into `app/[locale]/layout.tsx` and reduce `app/layout.tsx` to a pass-through that returns `children`.
2. Keep `suppressHydrationWarning` on `<html>` — `next-themes` requires it. Removing it causes hydration warnings in dark mode.
3. Keep the exact `<body>` className: `cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)`. Do not alter it.
4. Keep `ThemeProvider` wrapping everything with its current props (`attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`). Changing any of these breaks theme behaviour.

**While you are in these two files, fix the duplication:** `LoadingProvider` and `LoadingSpinner` are currently rendered **twice** — once in `app/layout.tsx` and again in `app/[locale]/layout.tsx`. Keep exactly one instance of each.

**Do not:** begin converting physical CSS utilities to logical ones. That is TASK-10 and it is deliberately separate.

**Done when:** view-source shows `<html lang="ar" dir="rtl">` on `/ar` and `<html lang="en" dir="ltr">` on `/en`, exactly one `LoadingProvider` exists in the tree, and `tsc --noEmit` is clean.

---

### P1 — This week. Align the site with the CV.

---

#### TASK-04 — Cut the portfolio down to five projects.

**Problem:** the site lists eight projects. Three of them are student-grade work that pulls the owner's positioning down from "Product Engineer shipping multi-tenant SaaS" to "graduate learning React". A recruiter judges by the weakest item on the page.

**Remove these three projects completely:**

- `book-library`
- `react-portfolio`
- `travel-app`

**KEEP `iphone`. It stays. Do not remove it.** It is the 3D showcase piece and the owner has decided it earns its place.

**Remaining after this task:** `scripto-website`, `real-estate`, `caros`, `ecommerce-platform`, `iphone`.

**Do, for each of the three removed projects:**

1. Delete its object from the `projects` array in `lib/data/projects.ts`. Match by `id`, not by line number. Watch the trailing commas so the array stays syntactically valid.
2. Delete its translation key from **both** `locales/en/projects.json` and `locales/ar/projects.json`, under the `projects` object. The keys are `bookLibrary`, `reactPortfolio`, `travelApp` — camelCase, so they do not match the kebab-case ids.
3. Delete its image folder from `public/projects/`: `Portfolio/` for react-portfolio, `TravelApp/` for travel-app. `book-library` uses `/projects/placeholder.jpg` — **leave `placeholder.jpg` in place**, other code may fall back to it.

**Also clean up while you are here:**

- `public/projects/Brainwave/` is an orphan — no project in `lib/data/projects.ts` references it. Delete it.
- `public/projects/` contains both `Iphone.png` and an `iPhone/` folder. The kept `iphone` project references `/projects/iPhone/Macbook-pro-16.png`. Verify which assets are actually referenced and delete only the unreferenced one. **This matters:** Vercel's filesystem is case-sensitive while Windows is not, so a wrong-case path works locally and 404s in production. Check every image path of the `iphone` entry against the real filenames on disk.

**Do not:** change the remaining five projects' data, copy, images, or ordering. Do not change the `Project` interface or the `ProjectType` union in this task — that is TASK-05.

**Done when:** `lib/data/projects.ts` has exactly five entries, `grep -rn "bookLibrary\|reactPortfolio\|travelApp" locales/` returns nothing, and `tsc --noEmit` is clean.

---

#### TASK-05 — Fix the broken project-type filter labels.

**Problem (pre-existing, and TASK-04 makes it more visible):** `components/project/Filters.tsx` renders type labels through a `types.<type>` translation lookup, but `locales/*/projects.json` is missing keys for several types that are actually in use:

| Type used in `projects.ts` | Translation key present? |
|---|---|
| `portfolio` (scripto-website) | **missing** |
| `saas` (real-estate, ecommerce-platform) | **wrong** — JSON has `sass`, a typo |
| `3d-showcase` (iphone) | **missing** |
| `landing-page` | **missing** |
| `marketplace` (caros) | present |

After TASK-04 the surviving types are `portfolio`, `saas`, `marketplace`, `3d-showcase` — three of the four are broken.

**Do:**

1. Add the missing keys under `projects.types` in **both** `locales/en/projects.json` and `locales/ar/projects.json`: `portfolio`, `saas`, `3d-showcase`.
2. Fix the `sass` → `saas` typo in both files.
3. Prune the `ProjectType` union in `lib/data/projects.ts` and `typeValues` in `components/project/Filters.tsx` down to the types that survive TASK-04, so the filter bar does not offer options that match zero projects.
4. Remove any now-unused type keys from both locale files so the JSON and the union stay in sync.

**Do not:** change the filter's markup, icons, classes, or interaction behaviour. This is data and copy only.

**Done when:** every value in `typeValues` has a matching key in both locale files, every `type` in `projects.ts` appears in `typeValues`, and `tsc --noEmit` is clean.

---

#### TASK-06 — Add Sello and Naql as private projects.

**Problem:** the owner's CV headlines **Sello** and **Naql** as its two lead projects, marked "PRIVATE — walkthrough on request". Neither appears on this site. A recruiter who reads the CV and then opens the portfolio finds no trace of them, which turns "private" from a professional choice into a credibility gap. These are the two strongest pieces of work the owner has.

**Do:**

1. Add two entries to `lib/data/projects.ts` following the **exact shape** of the existing objects:
   - **Sello** — multi-tenant social-commerce platform. Next.js · TypeScript · Supabase (RLS) · Tailwind · Zustand · Zod. `type: "saas"`, `category: "web"`.
   - **Naql** — intercity bus booking marketplace. Next.js · TypeScript · Supabase · TanStack Query · Zustand. `type: "marketplace"`, `category: "web"`.
2. Set `link: undefined` and `github: undefined` for both — there is no public URL.
3. Add a `statusKey` whose copy reads "Private — walkthrough on request" (EN) / "خاص — جولة عند الطلب" (AR).
4. Add full translation keys (`title`, `description`, `overview`, `features`, `status`, `audience`, `goal`, `purpose`) under `projects.sello` and `projects.naql` in **both** locale files, matching the depth and tone of the existing entries.
5. **Ask the owner for screenshots** and place them under `public/projects/Sello/` and `public/projects/Naql/`. If screenshots are not available, use `/projects/placeholder.jpg` and flag it clearly in your report — do not invent or generate fake product imagery.
6. Order the array so Sello, Naql and Caros appear **first**. They are the strongest work and the grid renders in array order.

**Content accuracy — these claims are true and may be used. Do not embellish beyond them:**

- **Sello:** one codebase serves many merchants; each tenant is a row in `tenants`, resolved at runtime from the request host and isolated by `tenant_id` plus Postgres Row-Level Security; every order is re-priced server-side through a single `create_order` RPC rather than trusting the client cart; CI enforces lint, typecheck and a custom design-system gate.
- **Naql:** live seat map with per-seat locking via server-issued TTL; idempotent booking creation that survives double-submits and expired locks; critical writes go through typed RPCs with a closed error-code set; fully Arabic RTL.

**Do not:** invent metrics, user counts, revenue, or client names. Everything written must be defensible in an interview.

**Done when:** seven projects exist, Sello/Naql/Caros lead the array, both locale files have complete matching keys, and `tsc --noEmit` is clean.

---

#### TASK-07 — Resolve contradictions between the site and the CV.

Each item is a factual inconsistency a recruiter comparing the two documents will notice. **This task is blocked on the owner's input — ask, then edit. Do not guess any of the four answers.**

1. **Caros team size.** `lib/data/projects.ts` says `teamSize: "4 developers"` for `caros`, while the CV presents it as the owner's own product. Ask which is accurate and make both documents agree.
2. **`client: "Personal Project"` on every entry.** All eight projects carry it, while the CV claims *"Delivered production-ready websites and web apps for international clients"*. Ask which projects were client work and label those accurately.
3. **`year: 2025` on every entry.** Identical years make the whole portfolio look like one weekend's output. Ask for real years and correct them.
4. **Caros URL.** Both the site and the CV link `caros-rho.vercel.app`, a generated Vercel subdomain, while the project is configured for **`caros.dev`**. Once the owner points the domain, update `link` in `lib/data/projects.ts`. If the domain is not live yet, report it and leave the URL as is.

---

#### TASK-08 — Add `sitemap.ts`, `robots.ts`, and hreflang.

**Problem:** no `app/sitemap.ts`, no `app/robots.ts`, and no `hreflang` alternates. Search engines cannot discover the project detail pages or tell the two locales apart.

**Do:**

1. Create `app/sitemap.ts` returning the home page and every project detail route for **both** locales, generated from the `projects` array in `lib/data/projects.ts` — never hardcode a project list that can drift.
2. Create `app/robots.ts` allowing all crawlers and pointing at the sitemap.
3. Ensure `alternates.languages` is emitted per page. This pairs with TASK-02 item 4.
4. Read the production URL from a single shared constant. Do not re-hardcode the domain in three files.

**Do not:** change any page component or stylesheet.

---

### P2 — Cleanup and hardening. Lower risk to the owner, higher risk to the design — go carefully.

---

#### TASK-09 — Delete dead code.

These seven files are imported **nowhere** in the repository, verified by cross-reference against all of `app/`, `components/`, `lib/`, `utils/`:

```
components/ProjectsPageClient.tsx
components/ui/accordion.tsx
components/ui/Separator.tsx
components/ui/sheet.tsx
components/ui/SocialLinks.tsx
components/ui/tabs.tsx
components/ui/ContactInfo.tsx     <- also holds the contact@yourdomain.com placeholder
```

**Do:**

1. **Re-verify each one before deleting.** Run `grep -rn "<ComponentName>" app components lib utils --include='*.ts' --include='*.tsx'` and confirm the only hit is the file's own definition. Do not trust this list blindly — earlier tasks may have introduced a usage.
2. Delete only the files that are still genuinely unreferenced.
3. After deleting, check whether any dependency in `package.json` became unused (for example `@radix-ui/react-accordion`, `@radix-ui/react-tabs`, `@radix-ui/react-separator`). **Report which ones are now unused — do not uninstall them in this task.**

**Also remove the duplicate message loading:** `i18n/request.ts` loads all nine locale JSON files via `getRequestConfig`, and then `app/[locale]/layout.tsx` re-loads the **same nine files** in its own `getMessages()` helper and passes them to `NextIntlClientProvider`. This is redundant work on every request. Keep the `i18n/request.ts` path — the idiomatic one — drop the manual loader in the layout, and let `NextIntlClientProvider` inherit messages from the request config.

**Done when:** `tsc --noEmit` and `npm run lint` are both clean, and the rendered site is visually unchanged.

---

#### TASK-10 — Convert physical CSS utilities to logical ones. HIGHEST STYLE RISK — READ CAREFULLY.

**Problem:** RTL is currently implemented by scattering `dir={isRTL ? 'rtl' : 'ltr'}` across 16 separate components, on top of a layout that never sets direction at the document level. Measured state of the codebase:

| | count |
|---|---|
| physical utilities (`pl-`, `pr-`, `ml-`, `mr-`, `left-`, `right-`, `text-left`, `text-right`) | **49** |
| logical utilities (`ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`, `text-start`) | **4** |

This matters beyond code quality: the owner's CV states *"Implemented full Arabic (RTL) / English internationalization using **logical CSS properties**"*. This repository is the one a reviewer will actually open and inspect, and right now it contradicts that claim.

**Prerequisite:** TASK-03 must be finished and verified first. Converting utilities before `dir` is set on `<html>` will produce wrong layouts, because logical properties resolve against the document direction.

**Do — in small batches, not all at once:**

1. Work through **one component at a time. Maximum 3 components per session.**
2. Mapping: `pl`→`ps`, `pr`→`pe`, `ml`→`ms`, `mr`→`me`, `left-`→`start-`, `right-`→`end-`, `text-left`→`text-start`, `text-right`→`text-end`, `border-l`→`border-s`, `border-r`→`border-e`, `rounded-l`→`rounded-s`, `rounded-r`→`rounded-e`.
3. After converting a component, remove its now-redundant manual `dir={...}` prop — but only if nothing inside it depends on the local direction override.
4. **Check every converted component in all four combinations:** `en`+light, `en`+dark, `ar`+light, `ar`+dark. Report anything that shifted.

**Exceptions — leave these physical, they are intentional:**

- `components/StickyCVButton.tsx` uses `left-1/2 -translate-x-1/2 md:left-auto md:right-6` for a centre-then-pin-right float. This is a **visual** position, not a reading-order one. Converting it will move the button. Leave it.
- Anything inside the `@media print` block in `globals.css`.
- Icon or decorative transforms where the position is visual rather than tied to text direction. When in doubt, leave it and note it in your report.

**Do not:** change any spacing *value* while converting. `pl-4` becomes `ps-4`, never `ps-3` or `ps-6`. The numbers stay identical.

**Done when:** a batch is converted, all four locale/theme combinations look identical to before, and `tsc --noEmit` is clean.

---

#### TASK-11 — Merge the pending React Server Components CVE branch.

**Problem:** the remote has an automated Vercel security branch that was never merged:

```
remotes/origin/vercel/react-server-components-cve-vu-zd5r1o
```

**Do:**

1. Inspect the diff before doing anything: `git diff main origin/vercel/react-server-components-cve-vu-zd5r1o`.
2. If it is a `next` version bump only, report the version delta to the owner and **wait for approval** before merging.
3. After merging, run `npx tsc --noEmit` and report any breakage.

**Do not:** merge, rebase, push, or bump the Next.js major version without explicit approval from the owner.

---

#### TASK-12 — Reduce `"use client"` sprawl.

**Problem:** 37 of roughly 50 component files are marked `"use client"`. The site is effectively a client-rendered app inside the App Router. The owner's CV lists SSR/SSG under Architecture skills; this repo does not demonstrate it.

**Do — conservatively:**

1. Identify components with **no** hooks, no event handlers, and no browser APIs, and remove `"use client"` from those only.
2. Leave anything using `useState`, `useEffect`, `useTranslations` inside a client boundary, `framer-motion`, `next-themes`, or a React context alone.
3. **Maximum 5 files per session.** Report each one changed.

**Do not:** restructure the component tree, split components into server/client pairs, or move files. This is a low-risk trim, not an architectural rewrite.

---

## 3. VERIFICATION — run before reporting any task complete

```bash
npx tsc --noEmit                                  # must exit 0 — the repo is currently clean
npm run lint                                      # must not introduce new errors
grep -rn "yourdomain" app components lib utils    # must return nothing after TASK-02
```

Then confirm manually in the browser: `/en` and `/ar`, in light and dark mode.

---

## 4. REPORTING

At the end of every session, append a dated section to `docs/PROGRESS.md` (create the file if it does not exist):

- Task ID and title
- Files changed
- Anything deferred, and why
- Any question that blocked you

Then **stop**. Do not start the next task.

---

## 5. OWNER-ONLY ACTIONS — NOT FOR THE AGENT

These are outside the agent's remit (section 0 forbids committing and pushing). They are listed so they do not get lost.

1. **Commit and push `public/YamenJoha-CV.pdf`.** It is currently modified and unpushed, so the live site still serves the **old** CV to everyone who clicks "Download Resume".
2. **Point the `caros.dev` domain**, then hand the agent TASK-07 item 4.
3. **Decide the answers to TASK-07** items 1–3 (Caros team size, which projects were client work, real years per project).
4. **Supply the production URL** for TASK-02 and screenshots for TASK-06.
5. **Fix the commit message habit.** The history reads `Initial commit - upload portfolio project` seven times, then `update`, `fix issues`, `uodate version`, and one commit whose message is a pasted `git status` line. This repo is public and recruiters open it.

---

## 6. THINGS THAT ARE NOT BROKEN — LEAVE THEM ALONE

Verified working. Do not "improve" them:

- `npx tsc --noEmit` passes with **zero** errors. Keep it there.
- `generateStaticParams` in `app/[locale]/projects/[id]/page.tsx`.
- `error.tsx`, `loading.tsx`, `not-found.tsx` at the app root.
- Translation coverage: nine files, complete and matching in both `locales/en/` and `locales/ar/`.
- The `DevicePreview` / `RealisticDeviceMockup` / `VideoPreview` presentation layer.
- The `next-themes` dark mode wiring.
- The separation of content (`lib/data/`, `locales/`) from presentation. Preserve it — new project data goes in `lib/data/projects.ts` and new copy goes in `locales/`, never inline in a component.
