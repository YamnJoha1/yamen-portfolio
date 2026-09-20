## 2026-09-19 — TASK-06: Add Sello and Naql as private projects

**Files changed**
- `lib/data/projects.ts` — added optional `status?: 'private'` to the `Project` interface; added `sello` and `naql` entries; moved `caros` up so the array now leads with Sello, Naql, Caros.
- `locales/en/projects.json`, `locales/ar/projects.json` — added `projects.sello` and `projects.naql` (title, description, overview, features, status, audience, goal, purpose) and a shared `projects.privateLabel` key. Both files kept in sync.
- `components/project/ProjectLinks.tsx` — when `status === 'private'`, renders the "Private — walkthrough on request" label instead of the Live Demo button.
- `components/project/ProjectCard.tsx`, `app/[locale]/projects/[id]/ProjectDetails.tsx` — pass `status={project.status}` to the three `ProjectLinks` call sites.

**Verification** — `npx tsc --noEmit` clean, `npm run lint` clean.

**Deferred / needs the owner**
- **Screenshots are missing.** Both projects use `/projects/placeholder.jpg` as `desktopImage`, with empty `mobileImage`/`tabletImage`, so the device-preview strip renders the "no preview available" state. No product imagery was invented. Owner to supply assets for `public/projects/Sello/` and `public/projects/Naql/`.
- `goal` and `purpose` were derived from the owner-supplied description/role/audience — no new claims were added, but they should be read once before the site goes out.
- Sello's `type` is `saas`, whose label key is still the `sass` typo in both locale files. Nothing breaks today because `saas` is not in `typeValues` in `components/project/Filters.tsx`; TASK-05 fixes it properly.

## 2026-09-19 — TASK-01: Build the missing contact API route

**Files changed**
- `app/api/contact/route.ts` — created `POST` route handler validating required strings (`name`, `email`, `subject`, `message`), verifying email shape, enforcing a 5000 character maximum body length, and dispatching emails using Resend with generic error responses and internal server logging.
- `package.json`, `package-lock.json` — installed `resend` (authorized for TASK-01).
- `.env.example` — added template documenting `RESEND_API_KEY=` and `CONTACT_TO_EMAIL=`.
- `.gitignore` — added `!.env.example` exception so example environment variables are tracked by git.

**Verification** — `npx tsc --noEmit` clean, `npm run lint` clean.

**Deferred / needs the owner**
- Set real values for `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in local `.env` and deployment environment variables.

## 2026-09-19 — TASK-02: Replace placeholder domain and fix OG metadata

**Files changed**
- `utils/globalmetadata.ts` — replaced `yourdomain.com` placeholders with confirmed production URL `https://yamen-website.vercel.app`; updated default title to "Yamen Joha | Product Engineer — Full-Stack"; updated description to align with positioning ("Product Engineer — Full-Stack specialising in multi-tenant SaaS, scalable architectures, and modern web applications."); added `alternates` with canonical and language links (`en`, `ar`); pointed OpenGraph and Twitter card images to `/me.png` (resolves to existing `public/me.png`); removed placeholder Twitter handle.

**Verification** — `grep -rn "yourdomain" utils/` returned 0 matches, `/me.png` resolves to existing `public/me.png`, `npx tsc --noEmit` clean, `npm run lint` clean.

**Deferred / needs the owner**
- `/me.png` is currently used for the OpenGraph / Twitter card image. A dedicated 1200×630 social preview graphic (`public/og-image.png`) can be added later if desired.


## 2026-09-19 — Social links: add Facebook, switch Instagram to the personal account

**Files changed**
- `lib/data/links.ts` — added a `Facebook` entry (`https://www.facebook.com/profile.php?id=61594358043415`) before WhatsApp; changed the Instagram `href` from the Scripto company account to the personal `https://www.instagram.com/yamen.dev/`.
- `locales/en/contact.json`, `locales/ar/contact.json` — added `contact.social.links.facebook` (label + description) to both.

**Assumption to confirm:** the existing Instagram entry pointed at `scripto.technology` (the company). Since this is a personal portfolio and the owner gave `yamen.dev` as "my Instagram", it was treated as a replacement rather than a second Instagram icon in the footer. Say the word if both should appear.

## 2026-09-19 — TASK-04: Cut the portfolio down to five (now seven) projects

**Files changed**
- `lib/data/projects.ts` — removed `book-library`, `react-portfolio`, `travel-app`. `iphone` kept. Array is now Sello, Naql, Caros, scripto-website, real-estate, ecommerce-platform, iphone.
- `locales/en/projects.json`, `locales/ar/projects.json` — removed `bookLibrary`, `reactPortfolio`, `travelApp`, and the orphan `brainwave` block (its images were deleted, nothing referenced it).
- Deleted `public/projects/Portfolio/`, `public/projects/TravelApp/`, `public/projects/Brainwave/`, and `public/projects/Iphone.png` (root-level orphan; the kept project uses the `iPhone/` folder). `placeholder.jpg` left in place.

**Case-sensitivity fix (the Vercel 404 class of bug):** `iphone.desktopImage` read `/projects/iPhone/Macbook-pro-16.png`; the real file is `Macbook-Pro-16.png`. Corrected. Its other two paths were already correct.

**Verification** — `npx tsc --noEmit` clean, `npm run lint` clean. Audited every image path against the real filenames on disk and confirmed no orphan folders remain under `public/projects/`.

**Reported, NOT changed — three more broken image paths on the surviving projects.** TASK-04 says not to touch the remaining projects' data, so these are left for the owner to approve. All three 404 on Vercel today (case-insensitive Windows hides them locally):

| project | field | current value | real file |
|---|---|---|---|
| `caros` | `mobileImage` | `/projects/Caros/Caros-iPhone-15-.png` | `Caros-iPhone-15-Pro.png` |
| `scripto-website` | `tabletImage` | `/projects/Scripto/scripto-light-iPadPro11.png` | `scripto-light-iPadpro11.png` |
| `ecommerce-platform` | `mobileImage` | `/projects/e-commerce/ecommerce-light-iPhone15pro.png` | `ecommerce-light-iPhone15Pro.png` |

Also: `caros.tabletImage` points at `Caros-iPhone-15-Pro.png` (a phone shot) while the unused `Caros-iPad-Pro-11.png` exists — likely a mix-up, not a 404.

## 2026-09-19 — TASK-05: Fix broken project-type filter labels and prune unused types

**Files changed**
- `locales/en/projects.json`, `locales/ar/projects.json` — fixed `sass` → `saas` typo; added missing keys `portfolio` ("Portfolio" / "معرض أعمال") and `3d-showcase` ("3D Showcase" / "عرض ثلاثي الأبعاد"); removed unused type keys (`landing`, `ecommerce`, `dashboard`, `ios & android`, `blog`, `real-estate`, `landing-page`).
- `lib/data/projects.ts` — pruned `ProjectType` union to exactly the four types used by active projects (`'saas' | 'marketplace' | 'portfolio' | '3d-showcase'`).
- `components/project/Filters.tsx` — pruned `typeValues` to `["all", "saas", "marketplace", "portfolio", "3d-showcase"]` so that every button maps to active projects and has translations in both locales.

**Verification** — `npx tsc --noEmit` clean (0 errors), `npm run lint` clean (0 warnings or errors). Every value in `typeValues` has matching keys in both locale files, and every project `type` in `projects.ts` appears in `typeValues`.


## 2026-09-19 — TASK-06 re-verified and closed out

The data work for TASK-06 was completed earlier in the same session (see the first entry above). Re-verified after TASK-05 landed:

- 7 projects, ordered Sello, Naql, Caros, scripto-website, real-estate, ecommerce-platform, iphone.
- `status: "private"` on both new entries; `link`/`github` are `undefined`; `ProjectLinks` renders the `privateLabel` badge instead of the Live Demo button at all three call sites.
- `projects.sello` and `projects.naql` carry the same 8 keys (title, description, overview, features, status, audience, goal, purpose) in both `en` and `ar`.
- TASK-05 added `types.saas`, so Sello's type now resolves to a real label; `types.marketplace` already covered Naql.

**Bug found and fixed — `components/project/DevicePreview.tsx`.** The "Loading preview…" spinner overlay was gated only on `loadingStates[device.key]`, which starts `true` and is only cleared by an image/iframe load handler. On the fallback branch (no image, or a load error, and no live link) nothing ever fires that handler, so the spinner rendered on top of the "no preview available" message forever. Sello and Naql are the only projects that hit this — they have no live link and empty `tabletImage`/`mobileImage` — so the Tablet and Mobile tabs on both detail pages sat on a permanent spinner. The overlay is now additionally gated on there actually being something to load. Markup, classes and spacing unchanged.

**Still open — screenshots (TASK-06 item 5).** Both projects still use `/projects/placeholder.jpg` for `desktopImage` with empty `tabletImage`/`mobileImage`. `public/projects/Sello/` and `public/projects/Naql/` do not exist. The Tablet and Mobile tabs now correctly show "no preview available". No product imagery was invented. This is the last thing blocking TASK-06.

## 2026-09-19 — TASK-07: Resolve contradictions between the site and the CV

All four items answered by the owner and applied. **File changed: `lib/data/projects.ts` only.**

| # | Item | Owner's answer | Change |
|---|---|---|---|
| 1 | Caros team size | Solo | `teamSize: "4 developers"` → `"1 developer"` |
| 2 | `client: "Personal Project"` everywhere | Only the Scripto site was real client work | `scripto-website.client` → `"Scripto"`; all others stay `"Personal Project"` |
| 3 | `year: 2025` everywhere | Spread 2023–2025 | `iphone` → 2023, `real-estate` → 2024, `ecommerce-platform` → 2024; `caros` and `scripto-website` confirmed 2025 |
| 4 | Caros URL | `caros.dev` is live | `link` → `https://caros.dev` |

`sello` and `naql` were already correct (2026, client Scripto) from TASK-06 and were not touched.

**Verification** — `npx tsc --noEmit` clean, `npm run lint` clean.

**Owner-side follow-ups this task surfaced (not code — see section 5 of TASKS.md):**
1. **The CV's "international clients" line is not supported by the portfolio.** The owner confirmed only the Scripto website was client work, and Scripto is the owner's own company. Five of seven projects are genuinely personal. The plural "international clients" claim should be softened on the CV, or a real client engagement added, before a recruiter compares the two documents.
2. **The CV still links `caros-rho.vercel.app`.** The site now points at `caros.dev`; the PDF needs the same edit, otherwise the contradiction just moves rather than being resolved.
3. `public/YamenJoha-CV.pdf` remains modified and unpushed, so the live site still serves the old CV.

## 2026-09-19 — TASK-08: Add sitemap.ts, robots.ts, and hreflang

**Files changed**
- `lib/constants.ts` — created shared `SITE_URL` constant (`https://yamen-website.vercel.app`) to avoid hardcoding across metadata, sitemap, and robots files.
- `app/sitemap.ts` — generated dynamic XML sitemap with entries for home, projects index, and all active project detail pages for both `en` and `ar`, populated directly from `projects` in `lib/data/projects.ts` with `alternates.languages` per entry.
- `app/robots.ts` — created robots handler allowing all search crawlers (`userAgent: "*"`, `allow: "/"`) and referencing the generated `${SITE_URL}/sitemap.xml`.
- `utils/globalmetadata.ts`, `utils/seoMetadata.ts`, `app/[locale]/projects/[id]/generateMetadata.ts` — updated to import and use `SITE_URL`, ensuring canonical links and `alternates.languages` (hreflang) URLs are absolute and consistent.
- `app/[locale]/page.tsx`, `app/[locale]/projects/[id]/page.tsx` — exported `generateMetadata` so Next.js emits the metadata and hreflang alternates for the home and project detail pages.
- `app/[locale]/projects/layout.tsx` — created layout exporting `generateMetadata` for the `/projects` route.

**Verification** — `npx tsc --noEmit` clean (0 errors), `npm run lint` clean (0 warnings or errors).

## 2026-09-19 — TASK-03: Set `lang` and `dir` on the `<html>` element

**Files changed (5)**
- `app/layout.tsx` — reduced to a pass-through that returns `children`. Keeps `import "./globals.css"` and the `metadata`/`viewport` re-export (metadata is still collected from this segment).
- `app/[locale]/layout.tsx` — now owns the shell: `<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>`, `<head />`, and `<body>` with the **exact** original className `cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)`. `ThemeProvider` moved here unchanged (`attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`), wrapping `Suspense` → `LoadingProvider` → `NextIntlClientProvider` → `ScrollProvider` → Navbar/main/Footer.
- `app/not-found.tsx`, `app/error.tsx`, `app/loading.tsx` — each now renders its own `<html>`/`<body>` shell.

**Duplication fixed:** `LoadingProvider` and `LoadingSpinner` were each rendered twice (once in `app/layout.tsx`, once in `app/[locale]/layout.tsx`). There is now exactly one of each, plus one `ThemeProvider` and one `NavigationProgress`. Verified by grep — all four appear only in `app/[locale]/layout.tsx`.

**Why the three root-level files had to change (this went beyond the task's file list).** Once `app/layout.tsx` stops rendering `<html>`/`<body>`, anything that renders in the `app/` segment *outside* `[locale]` has no document shell. All three can do exactly that:
- `not-found.tsx` — the middleware matcher is `['/', '/(ar|en)/:path*']`, so a request to e.g. `/foobar` never reaches the locale segment; it is also what `notFound()` in the locale layout falls back to.
- `error.tsx` — when an error bubbles past `app/[locale]/layout.tsx`, that layout unmounts and this renders directly under the pass-through root.
- `loading.tsx` — its Suspense fallback replaces the locale layout while streaming.

Their markup, classes and copy are otherwise unchanged. One extra fix in `loading.tsx`: it rendered `<LoadingSpinner />;` — a stray semicolon that printed a literal ";" — and `LoadingSpinner` calls `useLoading()`, which now throws outside the provider. Swapped to the provider-free `components/ui/Spinner`.

**Verification** — `npx tsc --noEmit` clean, `npm run lint` clean. Per section 0 rule 3, `npm run build` / `npm run dev` were not run.

**Owner must verify visually before this is considered done:**
1. View-source on `/en` shows `<html lang="en" dir="ltr">` and on `/ar` shows `<html lang="ar" dir="rtl">`.
2. Dark mode still flips correctly in both locales (the `ThemeProvider` moved segments).
3. A 404 (try `/foobar`) and the loading state still render styled, not as bare unstyled HTML.

**Note on TASK-10:** its prerequisite is now met — `dir` is set at the document level. The 16 per-component `dir={...}` props were deliberately left in place; removing them is TASK-10's job, not this one.

## 2026-09-19 — TASK-09: Delete dead code and remove duplicate message loading

**Files changed**
- Deleted 7 unreferenced files:
  - `components/ProjectsPageClient.tsx`
  - `components/ui/accordion.tsx`
  - `components/ui/Separator.tsx`
  - `components/ui/sheet.tsx`
  - `components/ui/SocialLinks.tsx`
  - `components/ui/tabs.tsx`
  - `components/ui/ContactInfo.tsx` (which also held the dead `contact@yourdomain.com` placeholder)
- `app/[locale]/layout.tsx` — removed manual `getMessages` loading helper that re-imported the 9 locale JSON files; `NextIntlClientProvider` now inherits messages directly from the standard `i18n/request.ts` request config.

**Verification** — `npx tsc --noEmit` clean (0 errors), `npm run lint` clean (0 warnings or errors).

**Unused dependencies identified in package.json (reported per task instruction, not uninstalled):**
- `@radix-ui/react-accordion`
- `@radix-ui/react-separator`
- `@radix-ui/react-tabs`
- `@radix-ui/react-dialog` (was only used by deleted `sheet.tsx`)
- `react-simple-icons` (duplicate beta package; the project exclusively imports `@icons-pack/react-simple-icons`)


## 2026-09-19 — TASK-10 batch 1 of N: logical CSS properties (3 components)

Prerequisite TASK-03 is done, so `dir` is now set on `<html>` and logical utilities resolve correctly. Per the task's cap, **3 components this session**. Spacing values were not altered anywhere — only the axis changed.

**1. `components/ContactCard.tsx`**
- `textAlignLabel`: `isRTL ? "text-right" : "text-left"` → `"text-start"`.
- `textAlignDescription`: `isEmail || isPhone ? "text-right" : isRTL ? "text-right" : "text-left"` → `isEmail || isPhone ? "text-end" : "text-start"`.
- `dirDescription`: `isEmail || isPhone ? "ltr" : isRTL ? "rtl" : "ltr"` → `isEmail || isPhone ? "ltr" : undefined`. The `dir="ltr"` on emails/phones is **kept** — it is a real override that makes the string render LTR inside an RTL page, not a redundant one. The non-special branch now inherits the document direction.
- With that, `isRTL`, `locale` and the `useLocale` import became unused and were removed.
- Equivalence check: under `dir="ltr"`, `text-end` === `text-right` (unchanged for emails/phones). Under the document dir, `text-start` === `text-right` in `ar` and `text-left` in `en` (unchanged in both).

**2. `components/project/Filters.tsx`** — `ml-1` → `ms-1` (×2, the X on the active-filter badges), `ml-2` → `ms-2` (×1, the category button label). No `dir` prop in this file.

**3. `app/[locale]/projects/[id]/ProjectDetails.tsx`**
- `-ml-4` → `-ms-4` (back button), `mr-2` → `me-2` (back arrow).
- `${isRTL ? 'text-right' : 'text-left'}` → `text-start` on the description.
- Removed **three** now-redundant `dir={isRTL ? 'rtl' : 'ltr'}` props (header row, sidebar, extra-info grid). Each set exactly the document direction, so nothing inside depended on a local override. Child components keep their own `dir` props — those are TASK-10's later batches.
- `isRTL` became unused and was removed.

**Verification** — `npx tsc --noEmit` clean, `npm run lint` clean. Re-grepped the three files: zero physical utilities and zero `isRTL` remain in them. Repo-wide, physical utilities in `app/` + `components/` dropped from 43 to 32 by the same measure, and files carrying a manual `dir={` went from 12 to 11.

**OWNER MUST VERIFY VISUALLY — all four combinations (`en`/`ar` × light/dark):**
- Contact cards: label and value alignment, and that the email/phone still read left-to-right in Arabic.
- Projects page filter bar: the gap between icon and label, and the X inside active-filter badges.
- A project detail page: back-button offset, description alignment, sidebar, and the audience/goal/purpose grid.

**Found but deliberately NOT changed (not utility conversions — they need a decision):**
1. `ContactCard` uses `whileHover={{ x: 5 }}` — a Framer Motion offset that slides the card right on hover in both locales. In RTL it should be `-5`. Motion values are out of TASK-10's mapping and section 1.7 forbids editing existing variants.
2. `ContactCard` renders `ArrowRight`, and `ProjectDetails`'s back button renders `ArrowLeft`. Both keep pointing the same way in Arabic, where the reading direction is reversed. These are icon choices, not CSS utilities.
3. `components/sections/WelcomeSection.tsx` was considered for this batch and skipped: of its 5 physical utilities, 3 (`top-20 left-10`, `bottom-20 right-10`, `left-1/2 -translate-x-1/2` on the blurred background blobs) are decorative positions and fall under the task's "leave these physical" exception. Only the two `ml-2` icon gaps are genuine conversions.

**Remaining for later batches** (physical-utility count per file): WelcomeSection 5 (2 real), VideoPreview 4, MobileNav 4, NavigationProgress 2, AboutSection 2, DevicePreview 2, DesktopNav 2, HeroSection 2, Footer 2, Section 1, ErrorBoundary 1, SkillsSection 1, ProjectsSection 1, ProjectLinks 1, Form 1. `StickyCVButton` 1 is a documented permanent exception — do not convert.

## 2026-09-19 — TASK-11: Inspect the pending React Server Components CVE branch

**Nothing was merged, rebased or pushed.** Per the task, this session is inspection and a recommendation only.

**The branch:** `origin/vercel/react-server-components-cve-vu-zd5r1o`, one commit — `d964f1e` "Fix React Server Components CVE vulnerabilities", authored by the Vercel bot on 2025-12-25. It touches **only** `package.json` and `package-lock.json`.

**`git diff main <branch>` is misleading and should not be used to judge this branch.** The branch was cut from an older `main` and is 4 commits behind it, so that diff reports main's own later work (CV file, project data, AboutSection, deleted TravelApp images…) as if the branch were reverting it. The branch's real content is the single commit above.

### Finding: the fix is already on `main`. The branch is obsolete.

| | branch `d964f1e` | `main` | working tree | installed |
|---|---|---|---|---|
| `next` (package.json) | 15.3.8 | **15.3.8** | 15.3.8 | — |
| `next` (package-lock) | 15.3.8 | **15.3.8** | 15.3.8 | **15.3.8** |
| `@next/env` | 15.3.8 | 15.3.8 | 15.3.8 | — |
| `@next/swc-*` (all 8) | 15.3.5 | 15.3.5 | 15.3.5 | — |

The bump the bot wanted (15.3.2 → 15.3.8) was already applied on `main`, most likely by commit `66f3e63 "uodate version"`. Every Next-related entry in the branch's lockfile matches main's exactly.

**What merging would actually change:** six nested lockfile entries under `node_modules/@tailwindcss/oxide-wasm32-wasi/` (`@emnapi/core`, `@emnapi/runtime`, `@emnapi/wasi-threads`, `@napi-rs/wasm-runtime`, `@tybys/wasm-util`, `tslib`) — unrelated WASM fallback transitives, pure lockfile churn from a different npm resolution. **Zero change to Next.js or React.**

The commit message also lists `react-server-dom-webpack` / `-parcel` / `-turbopack`. None of those exist in this project — it is on React 18.2.0 and those are React 19 packages. That part of the bot's message does not apply here.

### Recommendation: do not merge. Delete the stale branch.

Merging buys no security benefit and adds lockfile noise. Deleting a remote branch is a push, so it is the owner's call and their action:
`git push origin --delete vercel/react-server-components-cve-vu-zd5r1o`

Also note the working tree currently has ~40 modified files and several untracked additions from this session's tasks. Merging anything into that state would be risky regardless of the branch's contents.

### Separate finding: the installed tree does not match the lockfile

`npm audit` refused to run: `Invalid package tree, run npm install to rebuild your package-lock.json`. So the CVE status could not be confirmed by audit — the version evidence above is direct instead. This is worth resolving on its own (likely a side effect of the `npm i resend` in TASK-01); `npm install` was **not** run, as it would rewrite the lockfile mid-session.

## 2026-09-19 — TASK-09 verification (implemented elsewhere) + regression fix

### What passed verification

- All seven dead files are deleted: `ProjectsPageClient.tsx`, `ui/accordion.tsx`, `ui/Separator.tsx`, `ui/sheet.tsx`, `ui/SocialLinks.tsx`, `ui/tabs.tsx`, `ui/ContactInfo.tsx`.
- Re-grepped for every component name and import path — **no dangling references** anywhere in `app/`, `components/`, `lib/`, `utils/`, `i18n/`.
- `grep -rn "yourdomain" app components lib utils` is now **clean**, which also closes the last open item from TASK-02.
- The TASK-03 shell survived: `<html lang={locale} dir=...>`, the exact `<body>` className, and the single `ThemeProvider`/`LoadingProvider`/`LoadingSpinner` are all intact.
- The manual `getMessages` helper is gone from `app/[locale]/layout.tsx` and `<NextIntlClientProvider>` now takes no props, as the task asked.

### REGRESSION FOUND AND FIXED — the Arabic site would have rendered English

Removing the manual message loader exposed a latent bug in `i18n/request.ts`. It destructured `{ locale }`:

```ts
export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? 'en';
```

In **next-intl 4.1.0** (confirmed against the installed `getRequestConfig.d.ts`) that parameter is *not* the `[locale]` segment. Its own docstring: *"If you provide an explicit locale to an async server-side function like `getTranslations({locale: 'en'})`, it will be passed via `locale`."* On a normal page render it is `undefined`, so `resolvedLocale` fell through to `'en'` **every time**. The segment value lives in a different parameter, `requestLocale: Promise<string | undefined>`.

This was harmless before, because the layout loaded the correct messages itself and passed them explicitly to the provider — the broken config was never consulted. With the manual loader removed the provider inherits from the request config, so:
- every Arabic page would have rendered English copy, and
- `useLocale()` in client components would have returned `'en'` on `/ar`, pointing internal links at `/en`.

A second problem compounds it: `getRequestLocale()` falls back to reading the `X-NEXT-INTL-LOCALE` middleware header, which is unavailable under the `export const dynamic = 'force-static'` on this layout. next-intl's own error text for that case names the fix — `setRequestLocale` — and it was not used anywhere in the repo.

**Fix applied (2 files):**
- `i18n/request.ts` — switched to `requestLocale`, awaited it, and validated it against `['en','ar']` with an `'en'` fallback for invalid segments (the `[locale]` segment catches unknown routes like `/unknown.txt`).
- `app/[locale]/layout.tsx` — added `setRequestLocale(locale)` after the locale guard, plus `generateStaticParams()` returning both locales so the segment is actually prerendered.

**Verification** — `npx tsc --noEmit` clean, `npm run lint` clean.

### Unused dependencies — reported, NOT uninstalled (per the task)

Newly unused as a direct result of deleting the dead files:
- `@radix-ui/react-accordion`, `@radix-ui/react-dialog`, `@radix-ui/react-separator`, `@radix-ui/react-tabs`

Already unused before this task (worth removing in the same pass):
- `@tanstack/react-query` — imported nowhere
- `next-seo` — imported nowhere; metadata is handled by Next's own Metadata API
- `react-simple-icons` — imported nowhere; the code uses `@icons-pack/react-simple-icons`
- `install` — a junk package, almost certainly a stray `npm install install`

**Do not remove `react-dom`.** A plain import scan flags it, but it is a required runtime dependency of React/Next and is never imported directly.

### Follow-ups

1. **Owner must verify `/ar` visually.** This is the one change in the session that could silently swap the whole site's language. Check that `/ar` renders Arabic copy and that its navigation links stay under `/ar`.
2. next-intl's static-rendering guidance is to call `setRequestLocale` in every layout **and page**. It is currently only in the locale layout, which should suffice since the value is cached per request, but `app/[locale]/projects/page.tsx` is a `"use client"` page and could not take it regardless — a structural issue that belongs to TASK-12.

## 2026-09-19 — Pending fixes applied

### 1. Broken image paths in `lib/data/projects.ts` (4 fixes)

All previously reported and deferred. Three were 404s in production — Windows is case-insensitive so they render fine locally and fail on Vercel.

| project | field | was | now |
|---|---|---|---|
| `caros` | `mobileImage` | `Caros-iPhone-15-.png` | `Caros-iPhone-15-Pro.png` |
| `caros` | `tabletImage` | `Caros-iPhone-15-Pro.png` (a phone shot in a tablet frame) | `Caros-iPad-Pro-11.png` |
| `scripto-website` | `tabletImage` | `scripto-light-iPadPro11.png` | `scripto-light-iPadpro11.png` |
| `ecommerce-platform` | `mobileImage` | `ecommerce-light-iPhone15pro.png` | `ecommerce-light-iPhone15Pro.png` |

Re-audited every image path against the real filenames on disk: **0 broken paths remain**.

### 2. Removed 8 unused dependencies

`@radix-ui/react-accordion`, `@radix-ui/react-dialog`, `@radix-ui/react-separator`, `@radix-ui/react-tabs`, `@tanstack/react-query`, `next-seo`, `react-simple-icons`, `install`. 36 packages removed in total.

Each was confirmed unreferenced by direct grep first. `react-simple-icons` needed a precise check — a naive scan matches it inside `@icons-pack/react-simple-icons`, which **is** used (SkillsSection, links.ts, techIcons.ts); the bare package is not. `react-dom` was deliberately kept despite showing as unimported — it is a required React/Next runtime dependency.

`npx tsc --noEmit` clean, `npm run lint` clean afterwards.

### 3. Side effect: `npm audit` works again — and the result matters

The earlier "Invalid package tree" error is gone, so the CVE question from TASK-11 can finally be answered properly.

**`npm audit` reports 14 vulnerabilities: 2 critical, 9 high, 3 moderate.**

**This corrects the practical conclusion of TASK-11.** That analysis was right that the Vercel branch adds nothing over `main` — both sit at `next@15.3.8`. But being at 15.3.8 is **not** the same as being patched. The advisory range for Next.js is `9.3.4-canary.0 - 16.3.0-preview.10`, which **includes 15.3.8**. Among the 30 advisories listed against it:

- *Next.js: Unauthenticated Remote Code Execution on windows-hosted servers* (GHSA-p293-qw3h-jr36)
- *Next.js: Unauthenticated Remote Code Execution in Image Optimization API when AVIF files are used* (GHSA-2xp9-vwfh-vxw4)
- *Next.js Improper Middleware Redirect Handling Leads to SSRF* (GHSA-4342-x723-ch2f)
- multiple cache-poisoning and middleware/proxy-bypass issues in App Router

`next-intl@4.1.0` is also affected (`<=4.9.1`): an open-redirect advisory (GHSA-8f24-v5vv-gm5j) and a prototype-pollution one.

**Nothing was bumped.** TASK-11 forbids raising the Next version without explicit owner approval, and both fixes fall outside the stated dependency ranges:
- `npm audit fix` — resolves the 9 transitive dev-chain issues (brace-expansion, js-yaml, minimatch, nanoid, picomatch, browserslist, flatted, ajv, @humanfs/node). Stays in range. Low risk.
- `npm audit fix --force` — installs `next@15.5.25` and `next-intl@4.14.5`. **Needs owner approval.** A Next minor bump on an App Router app with a restructured root layout (TASK-03) must be followed by a real build and a pass over both locales.

## 2026-09-20 — TASK-10 batch 2: logical CSS properties (3 components)

Same cap as batch 1 — 3 components. No spacing value was altered.

**1. `components/project/VideoPreview.tsx`** — two identical `${isRTL ? 'text-right' : 'text-left'}` template classNames on the `<h2>` (one in the error branch, one in the normal render) collapsed to a plain `className="text-2xl font-semibold text-start"`. `isRTL` became unused and was removed. `locale` was then only feeding `isRTL`, so it is no longer destructured — **the `locale` prop stays on `VideoPreviewProps` and the call site in `ProjectDetails.tsx` is unchanged**, so the component's API is untouched.

**2. `components/project/DevicePreview.tsx`** — the header `<h2>`'s `isRTL ? "text-right" : "text-left"` collapsed to `text-start`, and the now-unused `isRTL` removed. `locale` is still used by the component for other things and was left alone.

**3. `components/Footer.tsx`** — `md:text-left` → `md:text-start` (brand block) and `md:text-right` → `md:text-end` (copyright). The unconditional `text-center` on both stays as-is; it is axis-neutral.

**Verification** — `npx tsc --noEmit` clean, `npm run lint` clean. Re-grepped all three files: zero physical utilities and zero `isRTL` remain. Confirmed `ProjectDetails.tsx` still passes `locale` to `VideoPreview`.

**Progress:** physical utilities in `app/` + `components/` are down to **24** (43 at the start of TASK-10, 32 after batch 1). Six components converted so far.

**OWNER MUST VERIFY VISUALLY (`en`/`ar` × light/dark):** the "Device Previews" and "Project Preview" headings on a project detail page, and the footer's brand text and copyright line at `md` width and above.

### Remaining, with notes on what is actually convertible

| file | hits | note |
|---|---|---|
| `WelcomeSection.tsx` | 5 | only 2 real (`ml-2` icon gaps); 3 are decorative blobs — documented exception |
| `MobileNav.tsx` | 4 | **needs its own session.** `top-0 right-0 … border-l` is the drawer itself. Converting it mirrors the drawer to the left in Arabic — arguably correct, but it is a visible behaviour change, not a like-for-like swap. Same file as the open accessibility gap (no Escape, no focus trap, no scroll lock). |
| `NavigationProgress.tsx` | 2 | `left-0 right-0` is a full-width bar (neutral), but `origin-left` has **no logical equivalent** in Tailwind — in RTL the progress bar should grow from the right. Needs a custom rule or an inline style; flagging rather than guessing. |
| `AboutSection.tsx` | 2 | `md:text-left` is a clean swap; `right-0` positions a timeline marker and needs a look at the layout first |
| `DesktopNav.tsx` | 2 | `mr-2` is clean; `absolute right-0` on the dropdown should become `end-0`, which moves the menu in Arabic — correct but visible |
| `HeroSection.tsx` | 2 | both are decorative blobs — nothing to convert |
| `Section.tsx`, `ErrorBoundary.tsx`, `SkillsSection.tsx`, `ProjectsSection.tsx`, `ProjectLinks.tsx`, `Form.tsx` | 1 each | straightforward; good material for one final batch |
| `StickyCVButton.tsx` | 1 | **permanent exception — do not convert** |

## 2026-09-20 — TASK-10 batch 3: logical CSS properties (3 components)

**1. `components/sections/WelcomeSection.tsx`** — the two `ml-2` icon gaps on the CTA buttons → `ms-2`. The three remaining physical utilities are the blurred background blobs (`top-20 left-10`, `bottom-20 right-10`, `left-1/2 -translate-x-1/2`) and were **deliberately left physical** under the task's decorative exception.

**2. `components/sections/AboutSection.tsx`** — `md:text-left` → `md:text-start` on the markdown description block, and its `dir={locale === "ar" ? "rtl" : "ltr"}` removed as redundant against the document direction. `locale` is still used elsewhere in the file, so it stays. The `absolute right-0` dot on the centred accent bar under the heading was **left physical**: it is an ornament on a centred element, not reading-order, and the task says to leave ambiguous decorative positions alone and report them.

**3. `components/Navbar/DesktopNav.tsx`** — `mr-2` → `me-2` on the theme toggle, and `absolute right-0` → `absolute end-0` on the language dropdown. **This one is a visible change in Arabic**: the dropdown now aligns to the logical end of its trigger, which mirrors it to the left in RTL. That is the correct behaviour for a menu anchored to its button, but it must be looked at.

**Verification** — `npx tsc --noEmit` clean, `npm run lint` clean. The only physical utilities left in these three files are the four intentional decorative ones listed above.

**Progress:** physical utilities down to **19** (43 → 32 → 24 → 19). Files carrying a manual `dir={` down to **10** (from 12). Nine components converted across three batches.

**OWNER MUST VERIFY VISUALLY (`en`/`ar` × light/dark):** the hero CTA button icons, the About description block at `md`+ width, and — most importantly — **open the language dropdown in the Arabic navbar** and confirm it is positioned sensibly against its button.

### Unrelated finding while working in AboutSection — fabricated metrics

`components/sections/AboutSection.tsx` lines 67–70 render four stat cards with hardcoded values:

```
"3+"   Years Experience
"50+"  Projects Completed
"100%" Client Satisfaction
"∞"    Passion
```

Two problems, neither touched here because they are outside TASK-10's scope:

1. **The numbers are not defensible.** The portfolio lists **7** projects, not 50+. "100% Client Satisfaction" has no basis — TASK-07 established that only the Scripto site was client work, and Scripto is the owner's own company. TASK-06 states the rule plainly: *"Do not invent metrics, user counts, revenue, or client names. Everything written must be defensible in an interview."* A recruiter comparing this against the project grid will notice.
2. **The labels are hardcoded in the `.tsx`** via `locale === "en" ? ... : ...`, which violates rule 1.9 — all user-facing copy belongs in `locales/`. `AboutSection` is the last place in the repo still doing this, along with the "Live Preview"/"Static Image"/"Refresh" strings in `DevicePreview.tsx`.

Recommend a small dedicated task: move these strings into `locales/{en,ar}/about.json`, and either correct the numbers or drop the stat row.

### Remaining after this batch

| file | hits | note |
|---|---|---|
| `MobileNav.tsx` | 4 | needs its own session — converting the drawer mirrors it in Arabic; same file as the open a11y gap |
| `NavigationProgress.tsx` | 2 | `origin-left` has no logical equivalent in Tailwind; needs a custom rule |
| `HeroSection.tsx` | 2 | both decorative blobs — nothing to convert |
| `WelcomeSection.tsx` | 3 | decorative blobs — nothing to convert |
| `AboutSection.tsx` | 1 | decorative dot — left intentionally |
| `Section.tsx`, `ErrorBoundary.tsx`, `SkillsSection.tsx`, `ProjectsSection.tsx`, `ProjectLinks.tsx`, `Form.tsx` | 1 each | mechanical; one final batch clears them |
| `StickyCVButton.tsx` | 1 | permanent exception |

Of the 19 remaining, **7 are documented exceptions that should never be converted**, and 2 (`NavigationProgress`) need a non-Tailwind solution. The genuinely convertible remainder is 10, concentrated in `MobileNav` and the six single-hit files.

## 2026-09-20 — CV-driven content corrections

Source: `public/YamenJoha-CV.pdf`, text extracted with pypdf (2 pages).

### 1. About stats — fabricated numbers replaced with CV-backed ones

`components/sections/AboutSection.tsx` rendered `3+ Years Experience`, `50+ Projects Completed`, `100% Client Satisfaction`, `∞ Passion`, with the labels hardcoded in the TSX via `locale === "en" ? ... : ...`.

| was | now | basis |
|---|---|---|
| `3+` Years Experience | `4+` Years Experience | CV: *"Product Engineer with 4+ years in frontend engineering"* |
| `50+` Projects Completed | `{projects.length}` Projects Shipped | computed from `lib/data/projects.ts` — currently 7, and it can no longer drift from the grid below it |
| `100%` Client Satisfaction | `2` Years Shipping SaaS | CV: *"the last 2 shipping complete SaaS products end-to-end"*. The old value had no basis — TASK-07 established only the Scripto site was client work, and Scripto is the owner's own company |
| `∞` Passion | `∞` Passion | kept; obviously a flourish, not a metric |

All four labels moved to `about.stats.*` in `locales/en/about.json` and `locales/ar/about.json`, so rule 1.9 is satisfied. `useLocale` was then unused in the component and removed.

### 2. Caros realigned with the CV — it described a different product

The site and the CV disagreed completely about what Caros *is*:

| | site (before) | CV |
|---|---|---|
| what it is | "Car Rental and Sales Platform" | "Multi-Tenant Dealership SaaS" |
| stack | Next.js, React, Tailwind, Zod, Framer Motion, Lucide, Swiper, React Hook Form | Next.js, TypeScript, Supabase, Tailwind, **Leaflet** |
| features | online booking, 24/7 support, airport transfers, wedding events | white-label storefront + self-service dashboard from one deployment, advanced inventory filtering, map-based browsing, per-tenant theming, WhatsApp lead capture |

The CV version is the stronger and more recent one, and it is consistent with the owner's multi-tenant positioning. Updated to match: `type` `marketplace` → `saas`, technologies replaced, and the full `projects.caros` block rewritten in **both** locale files (title, description, overview, 6 features, audience, goal, purpose, status). Nothing was claimed beyond what the CV states.

`link` stays `https://caros.dev` — the owner confirmed in TASK-07 that the domain is live. The CV is the stale document on that point.

**Note on a self-inflicted bug:** the first attempt at the Caros locale rewrite used a `str.encode().decode('unicode_escape')` round-trip, which wrote double-encoded (mojibake) text into both locale files. Caught on read-back, rewritten using `json.dumps(..., ensure_ascii=False)`, and verified: byte-level check confirms `\xe2\x80\x94` for the em dash and correct UTF-8 for all Arabic, and a scan of every file in `locales/` found no double-encoded sequences anywhere.

**Verification** — `npx tsc --noEmit` clean, `npm run lint` clean.

### 3. Further CV / site divergences found (not changed)

1. **The CV still links `CAROS-RHO.VERCEL.APP`.** The site now points at `caros.dev`. Previously flagged; the CV edit is the owner's.
2. **`yamen-website.vercel.app` is confirmed.** The CV prints it in the header, which settles the open question from TASK-02 about whether that Vercel subdomain was intentional. It is.
3. **The CV features 4 projects; the site shows 7.** The CV's four are Sello, Naql, Caros and the E-commerce Platform. The site adds `scripto-website`, `real-estate` and `iphone`. Not a contradiction, but the two documents lead with a different story — worth a deliberate decision rather than drift.

## 2026-09-20 — TASK-12: no safe candidates exist

Scanned all 57 `.tsx` files. **35** carry `"use client"`. Each was checked against every disqualifier the task lists — `useState`, `useEffect`, `useRef`, `useContext`, `useMemo`, `useCallback`, `useTranslations`, `useLocale`, `useTheme`, navigation hooks, `framer-motion`, `next-themes`, event handlers, and browser APIs.

**Every one of the 35 trips at least one disqualifier. Zero files were changed.**

The three closest — `components/HeroSection.tsx`, `components/RelatedGrid.tsx`, `components/project/ProjectsGrid.tsx` — trip only on `framer-motion`, which the task explicitly says to leave inside a client boundary. Each was opened to rule out an unused import; all three genuinely render `motion.*` / `AnimatePresence` with variants, so the directive is load-bearing in every case.

The task's premise — that some components have "no hooks, no event handlers, and no browser APIs" — does not hold for this codebase. Framer Motion is used in nearly every presentational component, and `useTranslations` in nearly every component with copy.

**The real lever is out of TASK-12's declared scope.** `app/[locale]/projects/page.tsx` is a `"use client"` *page*: it holds filter state and renders the whole projects route on the client. Converting it means extracting the filter state into a small client island and leaving the page a server component — which is exactly the "split components into server/client pairs" that TASK-12 forbids. (The deleted `components/ProjectsPageClient.tsx` was, ironically, a draft of that island.) Same for `app/[locale]/projects/[id]/ProjectDetails.tsx`.

**Recommendation:** close TASK-12 as not actionable as written, and replace it with a scoped task to make `/projects` a server page with a client filter island. That single change would also let `setRequestLocale` be called on the page, which the TASK-09 fix noted as an outstanding gap.

## 2026-09-20 — TASK-10 batch 4: logical CSS properties (3 components)

The six remaining single-hit files were surveyed first. Only **four** turned out to be genuinely convertible; the cap is 3, so the three user-facing icon gaps were taken as one coherent batch:

- `components/sections/ProjectsSection.tsx` — `ml-2` → `ms-2` (CTA arrow)
- `components/project/ProjectLinks.tsx` — `mr-2` → `me-2` (Live Demo external-link icon)
- `components/Form.tsx` — `mr-2` → `me-2` (submit button send icon)

**Not converted, and why:**
- `components/ui/Section.tsx` and `components/sections/SkillsSection.tsx` each carry the **identical** `absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-accent bg-muted` decorative dot that `AboutSection` has. That one was left physical in batch 3 as an ornament on a centred element, so these two were left physical too — converting some copies of the same ornament and not others would be worse than leaving all three.
- `components/ui/ErrorBoundary.tsx` — `text-left` → `text-start` is a clean, valid conversion. Deferred purely by the 3-component cap.

**Verification** — `npx tsc --noEmit` clean, `npm run lint` clean.

**OWNER MUST VERIFY VISUALLY (`en`/`ar` × light/dark):** the home page "View All Projects" button arrow, the Live Demo button on a project card and detail page, and the contact form's submit button.

### TASK-10 status after four batches

| | start | now |
|---|---|---|
| physical utilities | 43 | **16** |
| logical utilities | 4 | **26** |
| files with a manual `dir={` | 12 | 10 |

Twelve components converted. Of the 16 physical utilities left, **11 are documented exceptions that should never be converted**:

| file | hits | disposition |
|---|---|---|
| `WelcomeSection.tsx` | 3 | decorative background blobs — permanent exception |
| `HeroSection.tsx` | 2 | decorative background blobs — permanent exception |
| `Section.tsx`, `SkillsSection.tsx`, `AboutSection.tsx` | 1 each | the shared decorative accent dot — permanent exception |
| `StickyCVButton.tsx` | 1 | permanent exception, named in the task itself |
| `NavigationProgress.tsx` | 2 | `left-0 right-0` is a neutral full-width bar, but **`origin-left` has no logical equivalent in Tailwind** — in RTL the progress bar grows from the wrong side. Needs a custom CSS rule or an inline style, not a utility swap. |

**Genuinely still convertible: 5 utilities across 2 files.**
- `ErrorBoundary.tsx` (1) — trivial, deferred by the cap
- `MobileNav.tsx` (4) — **needs its own session.** `top-0 right-0 … border-l` is the drawer itself; converting it mirrors the drawer to the left in Arabic. That is a visible behaviour change rather than a like-for-like swap, and it is the same file that still has no Escape handler, no focus trap, no scroll lock and no `aria-modal`. Those two pieces of work belong together.

## 2026-09-20 — MobileNav: logical properties + the accessibility gap (one component)

Done as its own session because the conversion here is a behaviour change, not a like-for-like swap. One component, so the TASK-10 cap holds.

### Logical properties

- `fixed top-0 right-0 … border-l` → `fixed top-0 end-0 … border-s` on the drawer panel.
- `text-left` → `text-start` on the drawer header.
- `ml-auto` → `ms-auto` on the active-link dot.

**The `ml-auto` was nearly missed.** The residual check used in earlier batches was `(pl|pr|ml|mr)-[0-9]`, which requires a digit and silently skips `ml-auto`, `mr-px`, `pl-full` and arbitrary values. A repo-wide rescan with `(pl|pr|ml|mr)-(auto|px|full|screen|\[…\])` now reports **none remaining** — this was the only one.

### The animation had to follow

`sidebarVariants.closed` was `x: "100%"` — always off-screen to the right. Once the panel docks on the *logical* end edge, that offset makes it slide in from the wrong side in Arabic. Both local variant objects are now factories keyed on direction:

- `makeSidebarVariants(isRTL)` — `x: isRTL ? "-100%" : "100%"`
- `makeMenuItemVariants(isRTL)` — `x: isRTL ? -20 : 20` for the staggered items

Memoised on `isRTL` so the variant identity is stable across renders and framer-motion does not re-run the animation. **Every duration, stiffness, damping, stagger and delay value is unchanged** — only the sign of the offset moves.

### Accessibility — the gap reported earlier is closed

The drawer was a hand-rolled 348-line panel with none of the semantics a modal needs. Added, without touching any existing markup, class or animation:

| | |
|---|---|
| `role="dialog"` + `aria-modal="true"` | assistive tech now announces it as a modal, not a stray `<aside>` |
| `aria-expanded` / `aria-haspopup="dialog"` on the trigger | the button reports its state |
| **Escape closes it** | previously there was no keyboard way out |
| **Focus trap** | Tab / Shift+Tab cycle inside the panel; visible focusables only (`offsetParent !== null`) so hidden items are skipped |
| **Focus moves in on open** | first focusable in the panel, on a `setTimeout(0)` so it lands after the mount animation |
| **Focus returns to the trigger on close** | guarded by a `wasOpen` ref so it does not steal focus on first render |
| **Scroll lock** | `document.body.style.overflow = "hidden"` while open, restoring the previous value on cleanup rather than assuming it was `""` |

All listeners and the scroll lock are removed in the effect cleanup, so nothing leaks if the component unmounts while open.

**Verification** — `npx tsc --noEmit` clean, `npm run lint` clean.

**OWNER MUST VERIFY — this one needs real interaction, in `en` and `ar`, light and dark:**
1. The drawer slides in from the **right in English** and from the **left in Arabic**, and the border sits on the inner edge both ways.
2. Escape closes it; focus returns to the hamburger button.
3. Tab from the last item wraps to the first and does not escape to the page behind.
4. The page behind does not scroll while the drawer is open.
5. The staggered menu items still animate in as before.

### TASK-10 final state

| | start | now |
|---|---|---|
| physical utilities | 43 | **12** |
| logical utilities | 4 | **31** |

Thirteen components converted. **All 12 remaining physical utilities are intentional**, except one:

| file | hits | disposition |
|---|---|---|
| `WelcomeSection.tsx` 3, `HeroSection.tsx` 2 | 5 | decorative background blobs — permanent exception |
| `Section.tsx`, `SkillsSection.tsx`, `AboutSection.tsx` | 3 | the shared decorative accent dot — permanent exception |
| `StickyCVButton.tsx` | 1 | permanent exception, named in the task |
| `NavigationProgress.tsx` | 2 | `origin-left` has no Tailwind logical equivalent; needs a custom CSS rule |
| `ErrorBoundary.tsx` | 1 | **the last genuine conversion left** — `text-left` → `text-start`, one line |

TASK-10 is effectively complete. The CV's claim — *"Implemented full Arabic (RTL) / English internationalization using logical CSS properties"* — is now supported by the code a reviewer would open.

## 2026-09-20 — Contact switched from Resend to WhatsApp + email, and a full production build

### Contact form rebuilt (owner's decision: drop Resend)

**Why:** the Resend route sent from `onboarding@resend.dev`, Resend's sandbox sender, which only delivers to the Resend account owner's own address — and it needed env vars on Vercel that, if missing, returned a 500 the visitor saw as a generic error. It could lose leads silently.

**Removed:** `app/api/contact/route.ts` (the whole `app/api/` tree), the `resend` dependency, and `.env.example` (both of its variables were Resend's; no other `process.env` use remains outside `NODE_ENV`). **This reverses TASK-01** at the owner's explicit request.

**`components/Form.tsx` rewritten.** Fields are now Name + Subject + Message — no email field, because each channel already carries the sender's identity (their number on WhatsApp, their address in email). Two **equally visible** buttons, per the owner's instruction that both options be clear rather than one hidden behind the other:
- primary `Send via WhatsApp` → `wa.me/<number>?text=…`, opened in a new tab
- secondary `Send via Email` → `mailto:` with subject and body prefilled, after `reportValidity()` so it gets the same native validation as the submit path

Each has a one-line hint saying the message opens **ready to send** — nothing is sent from the page itself. `maxLength={MESSAGE_MAX_LENGTH}` (1000) keeps both URLs inside practical limits.

`lib/constants.ts` gained `WHATSAPP_NUMBER`, `CONTACT_EMAIL`, `MESSAGE_MAX_LENGTH`. All copy lives in `contact.form.*` in both locales; the dead `email`/`emailPlaceholder`/`sending`/`success`/`error` keys were dropped.

### Production build — run at the owner's request (overrides TASKS.md §0.3)

`npm run build` **succeeds.** 24 static pages, no errors.

Everything this session touched is confirmed in the real output:

| check | result |
|---|---|
| `<html>` on `/en` | `<html lang="en" dir="ltr">` |
| `<html>` on `/ar` | `<html lang="ar" dir="rtl">` |
| **TASK-09 regression fix** | `/ar` home has 14,122 Arabic characters, `/en` home has **0** — the locale genuinely resolves per route, and no English leaks into Arabic or vice versa |
| TASK-03 layout restructure | accepted by Next; pass-through root + `<html>` in the locale layout builds cleanly |
| `setRequestLocale` + `generateStaticParams` | all 14 project pages and both locales prerender as **SSG**, so static rendering really works |
| Sello/Naql private badge | renders in both locales |
| Caros encoding fix | em dash intact, zero mojibake in the built Arabic HTML |
| sitemap / robots | 18 URLs, correct `Sitemap:` line |
| contact wiring | `wa.me/963938044059` ×2 and `mailto:yamn.joha@gmail.com` present in the built page |

`npx tsc --noEmit` clean, `npm run lint` clean.

**One build warning:** `Browserslist: browsers data (caniuse-lite) is 15 months old` → `npx update-browserslist-db@latest`. Harmless but worth clearing.

## 2026-09-20 — Image and metadata optimisation (the judgement half; bulk WebP handed off)

### Correction to the earlier analysis

An earlier report claimed "9.5 MB of images hurts LCP". **That was overstated.** Every image in the repo goes through `next/image` — there is no raw `<img>` anywhere — so Vercel resizes and re-encodes them on demand and the visitor never downloads the heavy source. The real problems were narrower: the assets that are served **raw**, bypassing `next/image` entirely.

### What was actually broken

| asset | problem |
|---|---|
| `public/me.png` | 2048×2048, **3.21 MB**, rendered at 100×100 — and used as the OG image. Crawlers fetch OG images raw, so social platforms were being handed 3.21 MB. Worse, it is **square**, so a 1200×630 card cropped it badly. |
| `public/logos/yamn-jo/favicon.svg` | **221 KB** — and not a vector at all: a base64-encoded PNG wrapped in an `<svg>`. `favicon-96x96.png` already existed at 10 KB and does the same job. |
| `public/projects/placeholder.jpg` | 5000×3001, 1.12 MB, for a fallback screenshot. Sello and Naql both use it. |

### Fixed

- **New `public/og-image.png`** — a real 1200×630 card generated with sharp: brand gradient on the dark background, the `#b98f43` accent rule, name, "Product Engineer · Full-Stack", the stack line, the site URL, and a circular crop of the portrait. **36 KB.** Rendered and inspected visually, not just written.
- `me.png` → 512×512 (covers 3× retina for a 100 px render): **3.21 MB → 299 KB**.
- `placeholder.jpg` → 1600×960: **1.12 MB → 20 KB**.
- `favicon.svg` deleted and dropped from `utils/globalmetadata.ts`. The PNG and ICO entries remain; `site.webmanifest` never referenced it.
- `next.config.ts` — added `images: { formats: ['image/avif', 'image/webp'] }`.

`public/` total: **11.7 MB → 7.5 MB**, before the WebP pass.

### A real bug found while wiring the OG image: TASK-02 never reached the live pages

Pointing `utils/globalmetadata.ts` at `/og-image.png` did **not** change the built HTML. There is a **second metadata system that shadows it**:

`locales/data/{en,ar}/metadata.json` → `utils/metadata.ts` → `utils/seoMetadata.ts` → `app/[locale]/generateMetadata.ts` (and the `projects` equivalents)

Page-level metadata wins, so that JSON is what actually ships. It still held the pre-TASK-02 content:
- `og:image` and `twitter:image` were `/logos/yamn-jo.png` — the small site logo, not a social card
- the description was still *"I am Yamen Joha, building modern web apps with a focus on efficient and attractive user interfaces"* — exactly the "Frontend developer" positioning TASK-02 was written to replace
- the title was *"Welcome to Yamen Joha's Portfolio"*

TASK-02 edited `globalmetadata.ts` only, so **the site has been serving the old positioning the whole time.** Both locale files rewritten to match the CV's positioning, verified in the built output:

| | before | after |
|---|---|---|
| `<title>` en | Welcome to Yamen Joha's Portfolio \| Yamen Joha | **Product Engineer — Full-Stack \| Yamen Joha** |
| `<title>` ar | مرحبًا بكم في بورتفوليو يامن جحه \| Yamen Joha | **مهندس منتج — فول ستاك \| Yamen Joha** |
| `description` | "building modern web apps…" | "Product Engineer building multi-tenant SaaS end-to-end…" (126 chars) |
| `og:image` | `/logos/yamn-jo.png` | `/og-image.png` |

**Verification** — `npm run build` clean, 24 static pages; `npx tsc --noEmit` and `npm run lint` clean. OG and Twitter tags confirmed in `.next/server/app/{en,ar}.html`, and no stale `favicon.svg` reference remains.

**Note:** the Arabic metadata spells the name **يامن جحه**; the CV transliterates it *Joha* (جحا). Left as found — changing someone's name is the owner's call.

### Handed off

`docs/TASK-IMG-WEBP.md` — spec for converting the remaining 18 files under `public/projects/` (~4.8 MB) to WebP with sharp, plus the `lib/data/projects.ts` path updates and a case-sensitivity verification script. Mechanical and well-bounded; the judgement-heavy parts are done above.

## 2026-09-20 — TASK-IMG-WEBP: Convert project screenshots to WebP

**Files changed**
- `public/projects/**` — converted 18 images from PNG/JPG to WebP using `sharp@0.34.3` (`{ quality: 82, effort: 5 }`), maintaining original pixel dimensions. Original PNG/JPG files removed.
- `lib/data/projects.ts` — updated all 17 screenshot/placeholder image paths from `.png` / `.jpg` to `.webp`. Basenames and directory casings preserved identically.
- `components/project/ProjectCard.tsx` — updated fallback image path from `/projects/placeholder.jpg` to `/projects/placeholder.webp`.

**Total Size Comparison**
- Before: **5,003,567 bytes (~4.77 MB)**
- After: **484,776 bytes (~473.4 KB)**
- Net Savings: **4,518,791 bytes (90.3% reduction)**

**Per-File Savings Table**

| File | Original Size | WebP Size | Savings (KB) | Reduction | Status |
|---|---|---|---|---|---|
| `public/projects/Caros/Caros-Macbook-Pro-16.png` | 2,040,013 B (1,992.2 KB) | 140,100 B (136.8 KB) | 1,855.4 KB | 93.1% | Converted to WebP |
| `public/projects/RealEstate/real-estate-MacbookPro16.png` | 864,021 B (843.8 KB) | 79,758 B (77.9 KB) | 765.9 KB | 90.8% | Converted to WebP |
| `public/projects/e-commerce/ecommerce-MacbookPro.png` | 475,268 B (464.1 KB) | 33,044 B (32.3 KB) | 431.9 KB | 93.0% | Converted to WebP |
| `public/projects/Caros/Caros-iPad-Pro-11.png` | 283,597 B (277.0 KB) | 35,216 B (34.4 KB) | 242.6 KB | 87.6% | Converted to WebP |
| `public/projects/iPhone/Macbook-Pro-16.png` | 220,852 B (215.7 KB) | 11,988 B (11.7 KB) | 204.0 KB | 94.6% | Converted to WebP |
| `public/projects/iPhone/iPhone-15-Pro.png` | 178,386 B (174.2 KB) | 33,186 B (32.4 KB) | 141.8 KB | 81.4% | Converted to WebP |
| `public/projects/Scripto/scripto.png` | 128,628 B (125.6 KB) | 25,892 B (25.3 KB) | 100.3 KB | 79.9% | Converted to WebP |
| `public/projects/RealEstate/realestate-ipadpro11.png` | 127,546 B (124.6 KB) | 16,470 B (16.1 KB) | 108.5 KB | 87.1% | Converted to WebP |
| `public/projects/Caros/Caros-iPhone-15-Pro.png` | 112,842 B (110.2 KB) | 25,742 B (25.1 KB) | 85.1 KB | 77.2% | Converted to WebP |
| `public/projects/iPhone/iPad-Pro-11.png` | 100,547 B (98.2 KB) | 10,884 B (10.6 KB) | 87.6 KB | 89.2% | Converted to WebP |
| `public/projects/Scripto/scripto-light-iPadpro11.png` | 100,525 B (98.2 KB) | 14,960 B (14.6 KB) | 83.6 KB | 85.1% | Converted to WebP |
| `public/projects/e-commerce/ecommerce-categories-light-iphone.png` | 96,004 B (93.8 KB) | 10,014 B (9.8 KB) | 84.0 KB | 89.6% | Converted to WebP |
| `public/projects/Scripto/scripto-iPadPro11.png` | 65,669 B (64.1 KB) | 8,062 B (7.9 KB) | 56.3 KB | 87.7% | Converted to WebP |
| `public/projects/RealEstate/realestate-iphone.png` | 65,411 B (63.9 KB) | 11,076 B (10.8 KB) | 53.1 KB | 83.1% | Converted to WebP |
| `public/projects/e-commerce/ecommerce-light-iPhone15Pro.png` | 47,652 B (46.5 KB) | 5,896 B (5.8 KB) | 40.8 KB | 87.6% | Converted to WebP |
| `public/projects/e-commerce/ecommerce-light-iPadpro11.png` | 47,428 B (46.3 KB) | 10,774 B (10.5 KB) | 35.8 KB | 77.3% | Converted to WebP |
| `public/projects/Scripto/scripto-iPhone.png` | 28,259 B (27.6 KB) | 5,756 B (5.6 KB) | 22.0 KB | 79.6% | Converted to WebP |
| `public/projects/placeholder.jpg` | 20,919 B (20.4 KB) | 5,958 B (5.8 KB) | 14.6 KB | 71.5% | Converted to WebP |

**Files Kept as Original**
- None. Every file achieved significant size reduction in WebP format (between 71.5% and 94.6% reduction).

**Verification Results (§3)**
- **3.1 Case-sensitive path check:** Passed (`broken paths: 0`).
- **3.2 Stale reference check:** Passed (0 stale `.png` / `.jpg` references in `app`, `components`, `lib`, `utils`).
- **3.3 Orphaned files check:** Passed (0 non-webp files remaining under `public/projects/`).
- **3.4 Clean build & typecheck:** Passed (`npx tsc --noEmit` clean, `npm run lint` clean, `npm run build` generated 24/24 static pages cleanly).


## 2026-09-20 — Verification of TASK-IMG-WEBP (implemented elsewhere)

Every claim in the report was re-checked independently rather than accepted.

| check | method | result |
|---|---|---|
| 18 files, all WebP, no leftovers | walked `public/projects/` | **pass** — 18 files, 473 KB, zero non-WebP |
| size claim (4.77 MB → 473 KB, 90.3%) | measured on disk | **pass** |
| **dimensions unchanged** | compared against the two originals whose sizes were on record — `Caros-Macbook-Pro-16` (1728×1117) and `placeholder` (1600×960) | **pass** — exact match, nothing was resized |
| paths resolve case-sensitively | ran my own audit script over `lib/data/projects.ts` | **pass** — 17 refs, 0 broken |
| no stale `.png`/`.jpg` refs | grepped `app components lib utils locales i18n hooks graphic` — wider than the spec required | **pass** |
| forbidden areas untouched | `public/mockups/` (4 files, original mtimes), `me.png` (299 KB), `og-image.png` (36 KB) | **pass** |
| temp script removed | no `scripts/` directory | **pass** |
| `tsc` / `lint` / `build` | **re-run by me**, not taken from the report | **pass** — 24/24 static pages |
| built output uses WebP | grepped `.next/server/app/en/projects.html` | **pass** — only `.webp`, zero `.png`/`.jpg` project refs |
| **visual quality** | decoded `Caros-Macbook-Pro-16.webp` and looked at it | **pass** — text crisp, no artifacts despite a 93% reduction |

`public/` total is now **3.2 MB**, down from 11.7 MB at the start of the image work.

### Minor: two converted files are unreferenced

`e-commerce/ecommerce-categories-light-iphone.webp` and `Scripto/scripto-iPadPro11.webp` are not referenced by any project. **Both were already orphans as PNGs** — the spec said to convert everything under `public/projects/`, so this is correct behaviour, not a mistake. They can simply be deleted (~18 KB).

### 🔴 Found while eyeballing the converted image: the Caros screenshots are stale

Rendering `Caros-Macbook-Pro-16.webp` to check for compression artifacts showed what the screenshot actually depicts: a **car-rental booking page** — "Welcome to you in Caros", a "Book Your Ride" widget with pickup/drop-off and One Way, "Experience luxury and reliability with our premium fleet. From airport transfers to special events".

That is the *old* Caros, and it matches the site copy as it was **before** this session. It directly contradicts the copy rewritten earlier today from the CV, which now describes Caros as a **multi-tenant dealership SaaS** — white-label storefront plus self-service dashboard, inventory filtering, map-based browsing, per-tenant theming, WhatsApp lead capture.

A fetch of the live `caros.dev` confirms the CV version is the current product: it markets a self-managed platform for dealerships, a search-indexed page per vehicle, an inventory/orders dashboard, DB-enforced roles, and **subscription tiers at $29–$99/month**.

So a visitor now reads "white-label dealership SaaS" and then sees a rental-booking hero. **All three Caros screenshots need to be retaken from `caros.dev`.** This is a consequence of the copy realignment, not of the WebP conversion — flagging it against the owner, not the conversion work.

## 2026-09-20 — Section dividers removed, Experience timeline RTL fix, About rewritten from the CV

### 1. Removed the accent bar under section headings (owner request)

The decorative `h-1 bg-accent` rule with the dot and the small 45° tick lived in three places:
- `components/ui/Section.tsx` — behind a `withDivider` prop
- `components/sections/AboutSection.tsx` — hardcoded
- `components/sections/SkillsSection.tsx` — hardcoded

All three removed. `withDivider` defaulted to `true` and **no caller ever passed it**, so the prop became dead and was deleted from `SectionProps` and the destructure as well.

**Side effect worth noting:** this ornament was the `absolute right-0` that TASK-10 batches 3 and 4 listed as a *permanent exception* across three files. Deleting it removes 3 of the remaining physical utilities, and the `-left-[26px]` ticks with them.

### 2. Experience timeline — cards were all stacking on one side in Arabic

**Reported:** the timeline should run down the centre with cards alternating right, left, right. Instead every card sat on the right and the left column was empty.

**Cause — a real regression from TASK-03.** `react-vertical-timeline-component` builds its two columns with physical CSS only:

```css
.vertical-timeline--two-columns .vertical-timeline-element-content { width: 44% }            /* no float */
.vertical-timeline--two-columns .vertical-timeline-element:nth-child(even) … { float: right } /* even only */
```

Odd cards are unfloated, so they settle at the **inline start**; even cards are `float: right`. Under LTR that is left / right and alternates correctly. Once TASK-03 set `dir="rtl"` on `<html>`, the inline start became the right — so unfloated odd cards and `float: right` even cards **both** resolve right, leaving the left column empty. Exactly the reported symptom.

**Fix:** `dir="ltr"` on the motion wrapper around `<VerticalTimeline>`, pinning the library's scaffold to the direction its stylesheet assumes. Card contents already carry their own `dir={locale === 'ar' ? 'rtl' : 'ltr'}`, so Arabic text still reads right-to-left inside each card. Verified in `.next/server/app/ar.html`: the wrapper ships `dir="ltr"` and the timeline keeps its `vertical-timeline--two-columns` class.

A comment in the file records why, so it is not "cleaned up" into a logical property later.

**Also worth knowing:** the library only goes two-column at `min-width: 1170px`. Below that it is single-column **by design**, not a bug — if the timeline looks one-sided on a narrower window, that is the library's own breakpoint.

### 3. About section rewritten against the CV

The copy was stale and carried numbers that are not defensible.

| | before | now |
|---|---|---|
| subtitle | "Frontend Engineer" / "مهندس واجهات أمامية" | **"Product Engineer — Full-Stack"** / "مهندس منتج — فول ستاك" |
| experience | "3+ years" | **4+ years**, with the last two shipping complete products (CV wording) |
| **"improving application performance by up to 30%"** | present | **removed** — no basis in the CV |
| **"reduced development time by around 25%"** | present | **removed** — the CV says "cut delivery time for new features" with *no* number |
| backend | "a solid understanding of backend fundamentals" | rewritten — the CV has him shipping backend end to end (Supabase, RLS, PostgreSQL) |
| differentiators | absent | multi-tenancy + Postgres RLS, reusable component libraries and design tokens, Arabic-first RTL with logical CSS, the AI-assisted workflow line from the CV |

Trimmed from six paragraphs to four. Both locales updated together. `grep` confirms no `30%`, `25%` or "3+ years" remains in either file.

**Verification** — `npm run build` clean (24/24 static pages), `npx tsc --noEmit` clean, `npm run lint` clean. Confirmed in the built HTML: zero `border-4 border-accent` (divider gone), `dir="ltr"` on the timeline wrapper in the Arabic build, and the new subtitle shipping in both locales.

## 2026-09-20 — Real screenshots, Naql → X-Bus, a gallery in place of "Live Demo", Caros demos

### 1. Naql renamed to X-Bus

`id` `naql` → `x-bus` (kebab, matching `real-estate` / `ecommerce-platform`), translation key `naql` → `xBus` (camelCase, matching `scriptoWebsite`), folder `public/projects/naql/` → `public/projects/x-bus/`, and every occurrence of "Naql" inside the copy replaced with "X-Bus" in both locales. Also updated in `github/README.md`.

Verified: `grep -rni "naql"` across `app components lib utils locales github` returns **nothing**; the build emits `x-bus.html` for both locales and the sitemap lists `/projects/x-bus`.

### 2. New screenshots converted

Six PNGs added by the owner, converted to WebP (quality 82) and renamed:

| from | to | size |
|---|---|---|
| `sello/storefront-sello.png` | `sello/storefront.webp` | 1190 → **69 KB** |
| `sello/dashboard-sello.png` | `sello/dashboard.webp` | 1028 → **57 KB** |
| `naql/naql-home.png` | `x-bus/home.webp` | 477 → **71 KB** |
| `naql/naql-trips.png` | `x-bus/trips.webp` | 148 → **46 KB** |
| `Caros/showroom-demo-caros.png` | `Caros/showroom.webp` | 1482 → **52 KB** |
| `Caros/rental-demo-dashboard-todaypanel-caros.png` | `Caros/rental-dashboard.webp` | 176 → **45 KB** |

4.5 MB → 340 KB.

### 3. New presentation: `components/project/ProjectGallery.tsx`

**Why a new component.** These are **full-page captures**, not device-ratio screenshots — aspect ratios run from 0.42 to 1.07 (`storefront` is 809×1944). Feeding them to `DevicePreview` would crop them to a sliver inside a MacBook frame. They need their own presentation.

What it does:
- Each capture sits in a **browser-style frame** — three dots and a caption bar — which reads as a running product rather than a mockup.
- Tall pages are cropped from the top (`object-cover object-top`) in a fixed-height card, never squashed.
- Clicking opens a **lightbox** with the image at full size, scrollable. Escape closes it, the page behind is scroll-locked, focus moves to the close button on open and returns to the card that opened it, and `role="dialog"` + `aria-modal` are set. Backdrop click closes; clicks inside do not.
- `GalleryItem` carries intrinsic `width`/`height` read from the files, so nothing shifts while loading.

Only existing tokens and the existing `fadeIn` variant are used; no new dependency.

**Routing between the two presentations** in `ProjectDetails.tsx`:
- `DevicePreview` now renders **only when the project has a `link`** — device mockups exist to frame a live URL, and without one they were showing "no preview available" on two of three tabs.
- `ProjectGallery` renders whenever the project has a `gallery`.

Verified in the built HTML by looking for markup that only the rendered component emits (not the translation payload):

| page | device switcher | gallery cards |
|---|---|---|
| `sello` | 0 | ✅ |
| `x-bus` | 0 | ✅ |
| `caros` | 1 | ✅ |
| `scripto-website` | 1 | — |

Sello and X-Bus keep the "Private — walkthrough on request" badge; the gallery is what carries the work now.

### 4. Caros — three live environments

`ProjectLinks` now takes a `demos` array alongside `link`, so a project can expose more than one environment:

- `link` → `https://caros.dev` (the product landing page) — renders as the primary button
- `demos` → `https://showroom.caros.dev` ("Showroom demo") and `https://rental-demo.caros.dev` ("Rental demo") — outline buttons

Caros's `desktopImage` moved to the new `showroom.webp`, which is **1559×975 — a 1.60 ratio, an exact MacBook fit**, so the device mockup frames it properly. `mobileImage`/`tabletImage` cleared; the live-preview iframe covers those tabs.

### Flagged, not acted on — three orphaned Caros files

`Caros-Macbook-Pro-16.webp`, `Caros-iPad-Pro-11.webp`, `Caros-iPhone-15-Pro.webp` (196 KB total) are no longer referenced. They are the **old rental-booking product** — "Book Your Ride", "premium fleet", "airport transfers" — which is what triggered the earlier stale-screenshot finding. They now contradict both the CV-aligned copy and the live `caros.dev`.

They were left in place rather than deleted: removing the owner's own screenshots is his call, not an automatic cleanup. Deleting them is safe (they are in git history) and recommended.

Two older orphans remain as well: `e-commerce/ecommerce-categories-light-iphone.webp` and `Scripto/scripto-iPadPro11.webp` (18 KB).

**Verification** — `npm run build` clean (24/24 static pages), `npx tsc --noEmit` clean, `npm run lint` clean. Arabic gallery captions confirmed rendering in `/ar/projects/sello`.
