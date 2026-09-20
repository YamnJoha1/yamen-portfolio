<h1 align="center">Yamen Joha</h1>
<p align="center"><b>Product Engineer · Full-Stack</b><br/>
Next.js · TypeScript · PostgreSQL · Supabase</p>

<p align="center">
  <a href="https://yamen-website.vercel.app">Portfolio</a> ·
  <a href="https://linkedin.com/in/yamn-joha-45586a267">LinkedIn</a> ·
  <a href="mailto:yamn.joha@gmail.com">Email</a>
</p>

---

I build multi-tenant SaaS products end to end — design, frontend, and backend. Four years in frontend
engineering, the last two shipping complete products rather than screens: one codebase and one deployment
serving many isolated tenants, with the data boundary enforced in Postgres rather than in application code.

Arabic-first by default. Every interface I ship is full RTL/LTR, built with logical CSS properties.

---

### 🔨 What I'm building

Most of my current work is commercial and lives in private repositories. Here is what it is and what I
can walk you through on a call.

**[Caros](https://caros.dev)** — Multi-tenant dealership SaaS · **live, in production**
> Try it: [showroom demo](https://showroom.caros.dev) · [rental demo](https://rental-demo.caros.dev)
> White-label storefront and self-service dashboard for car dealerships, served from a single deployment.
> Each dealership gets its own branded site and domain; every vehicle gets a search-indexed page.
> Bilingual AR/EN, map-based browsing, per-tenant theming, role-based access enforced in the database,
> and WhatsApp lead capture.
> `Next.js` `TypeScript` `Supabase` `PostgreSQL` `Tailwind` `Leaflet`

**Sello** — Multi-tenant social-commerce platform · `private`
> Turns a merchant's social page into a branded storefront on its own subdomain, with a full
> products-and-orders dashboard. Tenants are resolved at runtime from the request host and isolated by
> Postgres Row-Level Security — never by routing or app code. Every order goes through a single
> server-side RPC that re-prices from the database, so the client never sends prices.
> `Next.js` `TypeScript` `Supabase (RLS)` `Zustand` `Zod`

**X-Bus** — Intercity bus booking marketplace · `private`
> Live seat map with per-seat locking backed by a server-issued TTL, so two passengers can never hold the
> same seat. Idempotent booking creation that survives double-submits and expired locks. Critical writes
> go through typed RPCs with a closed, fixed error-code set the UI branches on — never on HTTP status.
> `Next.js` `TypeScript` `Supabase` `TanStack Query` `Zod`

> 📬 Happy to give a guided walkthrough of any of the private products — architecture, trade-offs, and the
> parts that broke first. Just reach out.

---

### 🌐 Public work

| | | |
|---|---|---|
| **[Scripto](https://scripto-technology.com)** | Product studio site — the team I build with | `Next.js` `Framer Motion` `next-intl` |
| **[E-commerce Platform](https://e-commerce-two-mu-73.vercel.app/)** | Web + mobile storefront, Stripe checkout, admin dashboard | `Next.js` `NestJS` `Prisma` `GraphQL` `React Native` |
| **[Real Estate](https://real-estate-kohl-theta.vercel.app/)** | Property platform with smart filtering and image pipeline | `Next.js` `NestJS` `PostgreSQL` `Cloudinary` |
| **[Portfolio](https://yamen-website.vercel.app)** | This site — full AR/RTL, static-rendered, logical CSS throughout | `Next.js 15` `TypeScript` `next-intl` |

---

### 🧰 Stack

**Core** `Next.js (App Router)` `React` `TypeScript` `JavaScript`

**UI** `Tailwind CSS` `shadcn/ui` `Radix UI` `Framer Motion` `Three.js`

**State & data** `TanStack Query` `Zustand` `Redux` `React Hook Form` `Zod`

**Backend** `Node.js` `Express` `NestJS` `PostgreSQL` `Supabase (RLS)` `Prisma` `REST` `GraphQL`

**Architecture** `Multi-tenancy` `Row-Level Security` `RPC contracts` `SSR/SSG` `Design systems`

**Tooling** `Git` `Vercel` `Vite` `Webpack` `ESLint` `i18n (RTL/EN)`

---

### 📫 Reach me

**Email** yamn.joha@gmail.com · **WhatsApp** [+963 938 044 059](https://wa.me/963938044059)
**Portfolio** [yamen-website.vercel.app](https://yamen-website.vercel.app) · **LinkedIn** [yamn-joha](https://linkedin.com/in/yamn-joha-45586a267)

<sub>Damascus, Syria — working remotely. Arabic (native) · English (professional working proficiency).</sub>
