# Hairstrology

A community + courses platform for working stylists. Conversations behind the chair, client astrology (as a framework, not a forecast), and the business of your station.

This is a **prototype** — built to be cloned, run locally, and iterated on.

---

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with an editorial palette (warm pearl / midnight / dusty coral)
- **Fraunces** (serif) + **Inter** (sans), loaded via `next/font`
- **Prisma + SQLite** for the waitlist (swap to Postgres in one line)
- **Docker** with a multi-stage build using Next's `standalone` output
- **Vercel-ready** with zero config

## Quick start (local dev)

```bash
git clone <this-repo> hairstrology
cd hairstrology

npm install

# Create a local .env from the example, then push the DB schema:
cp .env.example .env
npx prisma db push

npm run dev
# → http://localhost:3000
```

## Run with Docker

The simplest way to run the prototype on any machine:

```bash
git clone <this-repo> hairstrology
cd hairstrology
docker compose up --build
# → http://localhost:3000
```

The SQLite database persists to `./data/hairstrology.db` on the host.

To stop and clean up:

```bash
docker compose down
```

To wipe the waitlist:

```bash
rm -rf data/
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo at https://vercel.com/new — framework detection picks up Next.js automatically.
3. Add a single env var: `DATABASE_URL`. SQLite isn't great on Vercel's serverless filesystem, so for production swap to a hosted DB:
   - **Easiest:** Vercel Postgres → change `prisma/schema.prisma` `provider = "postgresql"`, run `npx prisma db push`.
   - **Alternative:** Turso (SQLite at the edge) → use the libsql adapter.

For the prototype, you can also deploy on Fly.io, Railway, or any container host using the included `Dockerfile`.

## What's in the prototype

| Route                       | What it is                                                 |
| --------------------------- | ---------------------------------------------------------- |
| `/`                         | Landing page — hero, three pillars, manifesto, waitlist    |
| `/client-insights`          | Interactive tool — enter a birthday, get a sign read       |
| `/courses`                  | Course index — three sample courses                        |
| `/courses/[slug]`           | Course detail with lesson stubs                            |
| `/waitlist`                 | Full waitlist form (name, role, years, ZIP)                |
| `/about`                    | Mission / "why this exists"                                |
| `/api/waitlist` (POST, GET) | Save a waitlist entry / get a count                        |
| `/api/insights` (GET)       | `?month=1-12&day=1-31` → sign profile JSON                 |
| `/api/health` (GET)         | Liveness check used by docker-compose                      |

## Editing content

- **Astrology copy** lives in `src/lib/astrology.ts` — one object per sign. Kristina can edit it directly.
- **Course copy** lives in `src/lib/courses.ts` — same shape.
- **Brand colors** live in `tailwind.config.ts` under `theme.extend.colors`.
- **Typography** is loaded in `src/app/layout.tsx` via `next/font/google`. Swap Fraunces for another serif there if she wants.

## Project layout

```
hairstrology/
├── Dockerfile              # multi-stage; uses Next standalone output
├── docker-compose.yml      # web service with persistent SQLite volume
├── vercel.json             # zero-config Vercel project
├── prisma/
│   └── schema.prisma       # WaitlistEntry model
├── public/
│   └── favicon.svg
├── scripts/
│   ├── docker-entrypoint.sh # ensures DB schema on first boot
│   └── setup.sh            # local-dev / git-init helper
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                # landing
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── about/page.tsx
│   │   ├── client-insights/page.tsx
│   │   ├── courses/page.tsx
│   │   ├── courses/[slug]/page.tsx
│   │   ├── waitlist/page.tsx
│   │   └── api/
│   │       ├── health/route.ts
│   │       ├── insights/route.ts
│   │       └── waitlist/route.ts
│   ├── components/
│   │   ├── insights-form.tsx
│   │   ├── site-footer.tsx
│   │   ├── site-nav.tsx
│   │   └── waitlist-form.tsx
│   └── lib/
│       ├── astrology.ts    # sun-sign data + lookup
│       ├── courses.ts      # course/lesson content
│       ├── db.ts           # Prisma client singleton
│       └── utils.ts        # cn() helper
├── README.md
├── CLAUDE.md               # instructions for Claude Code on a fresh machine
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## Roadmap (suggested next moves)

1. Swap SQLite → Postgres before going public.
2. Add auth (NextAuth + email magic links) and gate the courses.
3. Add Stripe Checkout for course purchase.
4. Add a real CMS for course content (Sanity, Payload, or just markdown files in `src/content/`).
5. Expand `astrology.ts` beyond sun signs — moon/rising would 10× the depth without much engineering.
6. Build a stylist-only community area (forum or chat).

## Credit

Built for Kristina — a working stylist whose research during COVID became the seed of this whole idea. Visual language inspired by the editorial restraint of [Pontis Atelier](https://github.com/JongoDB/pontis-atelier).
