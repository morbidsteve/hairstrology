# Hairstrology — Build Spec

**Instructions for Claude Code:** This single file contains everything needed to create the Hairstrology prototype. Read it end-to-end, then create every file listed below with the exact contents shown. After all files exist, run the verification steps at the bottom.

## What this is

Hairstrology is a Next.js 14 + TypeScript + Tailwind + Prisma prototype for a community/courses platform serving working hair stylists. Built for Kristina — a stylist whose pandemic-era research into astrology and psychology became the seed of the project. The visual language is editorial: warm pearl background, Fraunces serif headings, Inter body, a single dusty-coral accent. Inspired by https://github.com/JongoDB/pontis-atelier.

## Stack

- Next.js 14 (App Router), TypeScript
- Tailwind CSS (custom palette)
- Prisma + SQLite (waitlist persistence)
- Docker multi-stage build using Next's `standalone` output
- Vercel-ready

## Routes

- `/` — landing (hero, three pillars, manifesto, waitlist)
- `/client-insights` — interactive tool: birthday → sun sign → tips
- `/courses` and `/courses/[slug]` — course index + detail
- `/waitlist` — full signup form
- `/about` — mission
- `POST /api/waitlist`, `GET /api/insights?month=&day=`, `GET /api/health`

## Conventions

- Editorial restraint. Don't add bright colors, shadows, or UI library components without asking. Accent `#c66b4a` used sparingly.
- Content (astrology, courses) lives in plain TypeScript files (`src/lib/astrology.ts`, `src/lib/courses.ts`) so non-developers can edit it.
- Forms use the `.field` / `.field-label` / `.btn-primary` / `.btn-secondary` utility classes defined in `globals.css`.

## How to use this spec

1. Create a new directory `hairstrology/`.
2. For every "### `path/to/file`" heading below, create that file with the contents from the following fenced code block.
3. Make `scripts/setup.sh` and `scripts/docker-entrypoint.sh` executable (`chmod +x`).
4. Run the verification block at the very bottom of this document.

---


### `.dockerignore`

```gitignore
node_modules
.next
.git
.gitignore
Dockerfile
docker-compose.yml
README.md
CLAUDE.md
SETUP.md
.env*
!.env.example
data
*.db
.vscode
.idea
.DS_Store
```

### `.env.example`

```gitignore
# SQLite for the waitlist. Use file:./data/hairstrology.db in production
# (the docker-compose mount maps a host volume to /app/data).
DATABASE_URL="file:./prisma/dev.db"

# Public site URL (used by Open Graph + canonical tags)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Optional: where contact-form/waitlist notifications should go.
# Leave blank in dev; wire up an email provider later.
CONTACT_EMAIL=""
```

### `.eslintrc.json`

```json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "react/no-unescaped-entities": "off"
  }
}
```

### `.gitignore`

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Production
*.tsbuildinfo
next-env.d.ts

# Env files
.env
.env.local
.env.production
.env.development

# Database
data/
*.db
*.db-journal
prisma/dev.db
prisma/*.db

# OS
.DS_Store
*.pem
Thumbs.db

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# IDE
.vscode/
.idea/

# Vercel
.vercel
```

### `CLAUDE.md`

~~~~~~~~markdown
# CLAUDE.md — instructions for Claude Code on a fresh machine

This file is read by Claude Code when it opens this repository. It tells you (Claude) what this project is, what's already built, and what the user is most likely to ask for next.

## What this is

**Hairstrology** — a Next.js 14 + Tailwind + Prisma prototype for a stylist community / course platform. Built as a single self-contained project so it can be `git clone`d and `docker compose up`ed on any machine.

## What's already built

- Marketing landing page (`/`) with hero, three pillars, manifesto, and an inline waitlist form
- Interactive "Client Insights" tool (`/client-insights`) — birthday → sun sign → conversation tips, rebook cadence, etc. All data lives in `src/lib/astrology.ts`.
- Courses index (`/courses`) and course detail (`/courses/[slug]`) — three sample courses defined in `src/lib/courses.ts`
- Full waitlist page (`/waitlist`) with optional fields (role, years behind chair, ZIP)
- API routes: `POST /api/waitlist`, `GET /api/insights`, `GET /api/health`
- Prisma + SQLite, persisted to `./data/` via the docker-compose volume
- Multi-stage Dockerfile using `next.config.mjs` `output: "standalone"`
- Vercel-ready (`vercel.json`)

## Running it

```bash
# Local dev
npm install
cp .env.example .env
npx prisma db push
npm run dev    # → http://localhost:3000

# Docker
docker compose up --build
```

## Conventions

- **Editorial design**: serif headings (Fraunces), sans body (Inter), warm pearl background, generous whitespace, hairline rules. Don't add bright colors or shadowy UI — the whole aesthetic is restraint. Accent color is `#c66b4a` (dusty coral); use sparingly.
- **Content is data**: astrology + course copy live in plain TypeScript files (`src/lib/astrology.ts`, `src/lib/courses.ts`) so a non-developer can edit them. Don't move that copy into a CMS without explicit ask.
- **Forms** use the `.field` + `.field-label` + `.btn-primary` / `.btn-secondary` utility classes defined in `src/app/globals.css`. Stay with those; don't introduce a component library mid-stream.
- **Comments**: only where they explain *why*, not what.

## Things the user (Steven) might ask next

1. **"Add a community/forum section."** Start with a single threads model in Prisma; gate behind a simple email magic-link auth (NextAuth).
2. **"Make the courses paid."** Add `Stripe` + a `Purchase` model, then gate `/courses/[slug]` body content. Keep the lesson stubs free as preview.
3. **"Move astrology beyond sun signs."** Pull in `astronomia` or `astrolibrary` to compute moon/rising from birth time + location. Add the optional time/place fields to the form.
4. **"Switch to Postgres."** Change `prisma/schema.prisma`'s provider to `postgresql`, update `DATABASE_URL`, run `prisma db push`. Update `docker-compose.yml` to add a `postgres` service.
5. **"Add an admin view of the waitlist."** Build `/admin/waitlist` behind a single shared secret in `.env`. The table query is one line of Prisma.
6. **"Write a real lesson."** Lesson body uses a tiny inline markdown renderer (bold + italic only) in `src/app/courses/[slug]/page.tsx`. If a real lesson is being authored, switch to `react-markdown` and update `package.json` accordingly.

## What NOT to do without asking

- Don't add analytics or telemetry by default.
- Don't introduce a new UI framework (shadcn, Mantine, etc.). The current Tailwind setup is intentional.
- Don't change the color palette without checking.
- Don't move content from `src/lib/` into a CMS — that's a separate, larger decision.

## Verify the build works

```bash
npm install
npx prisma generate
npm run build
```

If `npm run build` succeeds, the docker-compose flow will too.
~~~~~~~~

### `Dockerfile`

```dockerfile
# syntax=docker/dockerfile:1.7

# ───────────────────────── Stage 1: deps ─────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

# Prisma needs openssl on Alpine.
RUN apk add --no-cache libc6-compat openssl

COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci

# ──────────────────────── Stage 2: build ─────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# We use SQLite at /app/data/hairstrology.db in production.
ENV DATABASE_URL="file:./data/hairstrology.db"
ENV NEXT_TELEMETRY_DISABLED=1

RUN npx prisma generate
RUN npm run build

# ─────────────────────── Stage 3: runner ─────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl tini && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV DATABASE_URL="file:./data/hairstrology.db"

# Copy the Next.js standalone output. Includes a minimal node_modules.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Prisma client + schema for runtime migrations.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Entrypoint: ensure DB schema is applied before booting the server.
COPY --chown=nextjs:nodejs scripts/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

USER nextjs
EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--", "/usr/local/bin/docker-entrypoint.sh"]
CMD ["node", "server.js"]
```

### `README.md`

~~~~~~~~markdown
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
~~~~~~~~

### `SETUP.md`

~~~~~~~~markdown
# Setup — Hairstrology

## The one-line path

```bash
bash scripts/setup.sh
```

That script:
- Checks for Node 20+
- Creates `.env` from `.env.example`
- Runs `npm install`
- Initializes the SQLite database
- Runs `git init` + makes the first commit
- Optionally creates a private GitHub repo via the `gh` CLI

## What to do on the remote machine

Assuming you've already pushed this repo to GitHub from your dev machine:

```bash
# On the remote box:
git clone git@github.com:<your-username>/hairstrology.git
cd hairstrology

# Pick ONE of these two paths:

# ── Path A: Docker (recommended for the remote host) ──────────
docker compose up --build -d
# → http://<remote-host>:3000

# ── Path B: bare Node (handy if you want HMR) ─────────────────
npm install
cp .env.example .env
npx prisma db push
npm run dev      # http://localhost:3000  (dev)
# or
npm run build && npm start    # production-ish, no HMR
```

## What to commit

Everything in this repo. The `.gitignore` already excludes:

- `node_modules/`
- `.next/`, `out/`, `build/`, `dist/`
- `data/` (the SQLite volume — never commit your live waitlist)
- `prisma/*.db`
- `.env*` (but `.env.example` is committed)

## If something breaks

| Symptom                                | Fix                                                                                          |
| -------------------------------------- | -------------------------------------------------------------------------------------------- |
| `prisma generate` fails on Alpine      | The Dockerfile installs `openssl` for this exact reason — make sure you didn't strip it.     |
| Build complains "Module not found: @/" | `tsconfig.json` paths look right; try `rm -rf .next node_modules && npm install`.            |
| Docker compose says port 3000 in use   | `PORT=3030 docker compose up`                                                                |
| Waitlist 500s after deploy             | `data/` directory not writable. `chown 1001:1001 data/` (the nextjs user inside the image).  |
| Fraunces or Inter fail to load         | next/font fetches at build time; rebuild on a machine with internet access.                  |
~~~~~~~~

### `docker-compose.yml`

```yaml
# Docker Compose for Hairstrology
# Usage:
#   docker compose up --build
#   docker compose down
#
# The SQLite database is persisted to ./data on the host.

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    image: hairstrology:latest
    container_name: hairstrology
    restart: unless-stopped
    ports:
      - "${PORT:-3000}:3000"
    environment:
      DATABASE_URL: "file:./data/hairstrology.db"
      NEXT_PUBLIC_SITE_URL: "${NEXT_PUBLIC_SITE_URL:-http://localhost:3000}"
      NODE_ENV: "production"
    volumes:
      - ./data:/app/data
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://127.0.0.1:3000/api/health"]
      interval: 30s
      timeout: 5s
      retries: 5
      start_period: 10s
```

### `next-env.d.ts`

```tsx
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.
```

### `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  experimental: {
    // SQLite via Prisma is fine in node runtime; just be explicit.
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
  },
};

export default nextConfig;
```

### `package.json`

```json
{
  "name": "hairstrology",
  "version": "0.1.0",
  "private": true,
  "description": "Hairstrology — a community + courses platform for hair stylists. Built by Steven.",
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start -H 0.0.0.0 -p ${PORT:-3000}",
    "lint": "next lint",
    "postinstall": "prisma generate",
    "db:push": "prisma db push",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "@prisma/client": "^5.22.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.460.0",
    "next": "14.2.18",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.5.4",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^20.17.6",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.1",
    "eslint-config-next": "14.2.18",
    "postcss": "^8.4.49",
    "prisma": "^5.22.0",
    "tailwindcss": "^3.4.15",
    "typescript": "^5.6.3"
  }
}
```

### `postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### `prisma/schema.prisma`

```prisma
// Hairstrology — Prisma schema (SQLite for the prototype).
// To switch to Postgres later, change `provider` + `DATABASE_URL`.

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model WaitlistEntry {
  id         String   @id @default(cuid())
  email      String   @unique
  name       String?
  role       String?  // "stylist", "salon owner", "student", "other"
  yearsBehindChair Int?
  zip        String?
  source     String?  // utm/source if we want to track it later
  createdAt  DateTime @default(now())
}
```

### `public/favicon.svg`

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="8" fill="#1c1d24"/>
  <text x="32" y="44" font-family="Georgia, serif" font-size="36" font-style="italic" fill="#f8f5ef" text-anchor="middle">h</text>
</svg>
```

### `scripts/docker-entrypoint.sh`

```bash
#!/bin/sh
set -e

# Make sure the SQLite database file + schema exist before the app starts.
# We need a prisma CLI for `db push`, but the runner image doesn't ship one,
# so we use the @prisma/client's bundled query engine via a tiny inline script.
#
# Easiest portable option: ship `prisma` in the runtime image too. We do that
# implicitly by copying node_modules/@prisma above; the CLI lives at
# node_modules/prisma/build/index.js (not present in the standalone bundle).
# To avoid that complication, we run a quick connection probe instead — Prisma
# will create the SQLite file on first connect, and we run a one-shot
# `db push` if the file is empty.

DATA_DIR="/app/data"
DB_FILE="${DATA_DIR}/hairstrology.db"

mkdir -p "${DATA_DIR}"

# If the DB file is missing or zero-bytes, ask prisma to push the schema.
if [ ! -s "${DB_FILE}" ]; then
  echo "[entrypoint] Initializing SQLite database at ${DB_FILE}"
  # Try the bundled prisma binary if present; otherwise install it on the fly.
  if [ -f "/app/node_modules/prisma/build/index.js" ]; then
    node /app/node_modules/prisma/build/index.js db push --skip-generate
  else
    npx --yes prisma@5 db push --skip-generate
  fi
fi

exec "$@"
```

### `scripts/setup.sh`

```bash
#!/usr/bin/env bash
# Hairstrology — one-shot setup helper.
# Initializes git, creates a .env, and (optionally) creates a GitHub repo.

set -euo pipefail

cd "$(dirname "$0")/.."

echo "▸ Hairstrology setup"
echo

# 1. Node check
if ! command -v node >/dev/null 2>&1; then
  echo "❌  Node is not installed. Install Node 20+ first."
  exit 1
fi
NODE_MAJOR=$(node -p "process.versions.node.split('.')[0]")
if [ "${NODE_MAJOR}" -lt 20 ]; then
  echo "❌  Node ${NODE_MAJOR} is too old. Install Node 20+ first."
  exit 1
fi
echo "✓  Node $(node -v)"

# 2. .env
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✓  Created .env from .env.example"
else
  echo "•  .env already exists, leaving alone"
fi

# 3. npm install
if [ ! -d node_modules ]; then
  echo "▸ Installing dependencies (this takes a minute)…"
  npm install
else
  echo "•  node_modules already present, skipping install"
fi

# 4. Prisma generate + db push
echo "▸ Initializing the local SQLite database…"
npx prisma generate
npx prisma db push --skip-generate

# 5. Git init
if [ ! -d .git ]; then
  echo "▸ Initializing git repo…"
  git init -q
  git add .
  git commit -q -m "feat: initial Hairstrology prototype"
  echo "✓  Git repo initialized with one commit"
else
  echo "•  Git repo already initialized"
fi

# 6. Optional: gh repo create
if command -v gh >/dev/null 2>&1; then
  echo
  read -r -p "Create a GitHub repo for this project with 'gh'? [y/N] " yn
  if [[ "${yn}" =~ ^[Yy]$ ]]; then
    read -r -p "  Repo name (default: hairstrology): " repo_name
    repo_name=${repo_name:-hairstrology}
    read -r -p "  Visibility [public/private] (default: private): " vis
    vis=${vis:-private}
    gh repo create "${repo_name}" --source=. --remote=origin --"${vis}" --push
    echo "✓  Pushed to GitHub as ${repo_name}"
  fi
else
  echo
  echo "•  'gh' CLI not found. To create a GitHub repo manually:"
  echo "   1) gh CLI: brew install gh && gh auth login"
  echo "   2) gh repo create hairstrology --source=. --private --push"
fi

echo
echo "─────────────────────────────────────────"
echo "Setup complete. Next steps:"
echo "  Dev:    npm run dev          → http://localhost:3000"
echo "  Docker: docker compose up --build"
echo "─────────────────────────────────────────"
```

### `src/app/about/page.tsx`

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Who built Hairstrology and why.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-readable px-6 py-20">
      <p className="eyebrow">About</p>
      <h1 className="mt-4">Why this exists.</h1>

      <div className="mt-10 space-y-6 text-lg text-burnt leading-relaxed">
        <p>
          Hairstrology started in the slow months — when the salons closed and
          the work disappeared and there was, finally, time to read. Kristina
          spent that year going deep on astrology, on psychology, on the
          patterns that show up in a chair when you've been doing this for
          twenty years.
        </p>

        <p>
          When the chairs filled back up, the work had changed. Clients didn't
          just want a cut — they wanted to be heard. Stylists, who had never
          been trained for that part of the job, became the place people went
          to process the worst year of their lives.
        </p>

        <p>
          That work is real. It deserves real tools, a real community, and a
          real way to talk about it. That's what we're building here.
        </p>

        <p>
          Hairstrology is for stylists who are tired of being treated like they
          chose the simpler path — by clients, by family, by every cocktail
          party where someone with a law degree asks <em>what do you actually
          do</em>. We're the people whose job is half craft and half care. This
          is a place to compare notes.
        </p>
      </div>

      <hr className="my-14" />

      <p className="eyebrow">The promise</p>
      <h2 className="mt-3">No mysticism, no pyramid scheme, no upsell.</h2>
      <div className="mt-6 space-y-5 text-burnt leading-relaxed">
        <p>
          The astrology is a framework, not a forecast. The community is a
          place to compare notes, not a place to be sold MLM products. The
          courses are practical, taught by working stylists, and priced like
          we know you're paying with tip money.
        </p>
        <p>
          If we get this right, your chair will feel a little less heavy at
          the end of the day. That's the whole goal.
        </p>
      </div>
    </article>
  );
}
```

### `src/app/api/health/route.ts`

```tsx
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ ok: true, service: "hairstrology", ts: new Date().toISOString() });
}
```

### `src/app/api/insights/route.ts`

```tsx
import { NextResponse } from "next/server";
import { z } from "zod";
import { sunSignFor } from "@/lib/astrology";

export const runtime = "nodejs";

const Query = z.object({
  month: z.coerce.number().int().min(1).max(12),
  day: z.coerce.number().int().min(1).max(31),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = Query.safeParse({
    month: url.searchParams.get("month"),
    day: url.searchParams.get("day"),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Provide ?month=1-12&day=1-31" }, { status: 400 });
  }

  const profile = sunSignFor(parsed.data.month, parsed.data.day);
  if (!profile) {
    return NextResponse.json({ error: "Could not resolve sign." }, { status: 422 });
  }
  return NextResponse.json(profile);
}
```

### `src/app/api/waitlist/route.ts`

```tsx
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

// Force the node runtime — Prisma needs it.
export const runtime = "nodejs";

const Body = z.object({
  email: z.string().email("Please enter a real email."),
  name: z.string().trim().max(120).optional().nullable(),
  role: z.string().trim().max(40).optional().nullable(),
  yearsBehindChair: z.coerce.number().int().min(0).max(80).optional().nullable(),
  zip: z.string().trim().max(20).optional().nullable(),
  source: z.string().trim().max(80).optional().nullable(),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = Body.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    const entry = await prisma.waitlistEntry.upsert({
      where: { email: data.email.toLowerCase() },
      update: {
        name: data.name ?? undefined,
        role: data.role ?? undefined,
        yearsBehindChair: data.yearsBehindChair ?? undefined,
        zip: data.zip ?? undefined,
        source: data.source ?? undefined,
      },
      create: {
        email: data.email.toLowerCase(),
        name: data.name ?? undefined,
        role: data.role ?? undefined,
        yearsBehindChair: data.yearsBehindChair ?? undefined,
        zip: data.zip ?? undefined,
        source: data.source ?? undefined,
      },
    });

    return NextResponse.json({ ok: true, id: entry.id });
  } catch (err) {
    console.error("[waitlist] failed:", err);
    return NextResponse.json(
      { error: "Could not save your entry. Try again in a moment." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Quick count for ops checks; nothing sensitive.
  try {
    const count = await prisma.waitlistEntry.count();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0, db: "unavailable" }, { status: 503 });
  }
}
```

### `src/app/client-insights/page.tsx`

```tsx
import type { Metadata } from "next";
import { InsightsForm } from "@/components/insights-form";

export const metadata: Metadata = {
  title: "Client Insights",
  description:
    "Enter a client's birthday and get a short, plain-language read on how to talk to them — what they want from the chair, what to avoid, and how often they'll rebook.",
};

export default function ClientInsightsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <p className="eyebrow">Client Insights</p>
      <h1 className="mt-4">Read the room faster.</h1>
      <p className="mt-6 text-lg text-burnt leading-relaxed max-w-readable">
        Enter a client's birthday. You'll get a one-screen summary of how they
        tend to show up at the chair, what to talk about, what to skip, and
        roughly when they'll want to come back. It's a framework, not a
        forecast — use it as a starting place, never as a verdict.
      </p>

      <div className="mt-12">
        <InsightsForm />
      </div>

      <hr className="my-16" />

      <details className="group">
        <summary className="cursor-pointer text-sm uppercase tracking-[0.16em] text-burnt hover:text-ink">
          A note on the astrology
        </summary>
        <div className="mt-4 text-burnt leading-relaxed text-sm space-y-3">
          <p>
            This uses tropical sun signs — the most common Western system, and
            the one most clients are familiar with. It is intentionally a
            simplification: a real natal chart involves time and place of
            birth and a lot more than the sun.
          </p>
          <p>
            For the chair, the simplification is usually enough. The point is
            to give you a faster first read so you can ask better questions.
          </p>
        </div>
      </details>
    </section>
  );
}
```

### `src/app/courses/[slug]/page.tsx`

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse } from "@/lib/courses";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const course = getCourse(params.slug);
  if (!course) return { title: "Course not found" };
  return {
    title: course.title,
    description: course.tagline,
  };
}

export default function CoursePage({ params }: PageProps) {
  const course = getCourse(params.slug);
  if (!course) notFound();

  const totalMinutes = course.lessons.reduce((sum, l) => sum + l.durationMinutes, 0);

  return (
    <article className="mx-auto max-w-4xl px-6 py-16 md:py-20">
      <Link href="/courses" className="eyebrow text-burnt hover:text-ink no-underline">
        ← All courses
      </Link>

      <p className="eyebrow mt-8">{course.level} · {course.lessons.length} lessons · ~{totalMinutes} min</p>
      <h1 className="mt-4">{course.title}</h1>
      <p className="mt-6 text-xl text-burnt max-w-readable leading-relaxed">
        {course.description}
      </p>

      <hr className="my-14" />

      <div className="space-y-12">
        {course.lessons.map((lesson, i) => (
          <section key={lesson.slug} className="grid grid-cols-1 md:grid-cols-[7rem_1fr] gap-6">
            <div>
              <p className="font-serif text-3xl text-accent tracking-tightest">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-burnt">
                {lesson.durationMinutes} min
              </p>
            </div>
            <div>
              <h2 className="text-3xl">{lesson.title}</h2>
              <div className="mt-4 space-y-4 text-lg text-burnt leading-relaxed">
                {lesson.body.split(/\n\n+/).map((para, idx) => (
                  <p
                    key={idx}
                    dangerouslySetInnerHTML={{ __html: renderInline(para) }}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <hr className="my-16" />

      <div className="bg-bone/60 border border-clay/20 p-8">
        <p className="eyebrow text-accent">Preview only</p>
        <h3 className="mt-2 text-2xl">Want the full course?</h3>
        <p className="mt-3 text-burnt">
          We're opening the first cohort soon. Join the waitlist and we'll
          let you know when seats are ready.
        </p>
        <Link href="/waitlist" className="btn-primary mt-6">
          Join the waitlist
        </Link>
      </div>
    </article>
  );
}

/** Tiny inline markdown: **bold** and *italic*. Enough for the prototype. */
function renderInline(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-ink">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}
```

### `src/app/courses/page.tsx`

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { COURSES } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Courses",
  description: "Practical courses for working stylists.",
};

export default function CoursesIndexPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <p className="eyebrow">Courses</p>
      <h1 className="mt-4">For the work the schools didn't cover.</h1>
      <p className="mt-6 text-lg text-burnt leading-relaxed max-w-readable">
        Short, useful courses on the parts of stylist work that don't fit on
        the certification exam. Built by working stylists, tested in real
        chairs, priced like we know what tips look like.
      </p>

      <div className="mt-16 divide-y divide-clay/20 border-y border-clay/20">
        {COURSES.map((course, i) => (
          <Link
            key={course.slug}
            href={`/courses/${course.slug}`}
            className="no-underline group grid grid-cols-[5rem_1fr_auto] items-baseline gap-6 py-10 hover:bg-bone/40 transition-colors -mx-6 px-6"
          >
            <span className="font-serif text-clay text-lg tracking-tightest">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="eyebrow text-burnt">{course.level} · {course.lessons.length} lessons</p>
              <h3 className="mt-2 text-3xl text-ink group-hover:text-accent transition-colors">
                {course.title}
              </h3>
              <p className="mt-2 text-burnt max-w-readable leading-relaxed">
                {course.tagline}
              </p>
            </div>
            <span className="text-burnt group-hover:text-accent transition-colors text-sm">
              Read →
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-12 text-sm text-burnt italic">
        Preview only — lessons in the prototype are short excerpts. The full
        cohort opens to waitlist members first.
      </p>
    </section>
  );
}
```

### `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    @apply bg-pearl text-ink font-sans;
    font-feature-settings: "ss01", "kern", "liga";
  }

  /* Editorial headings — serif, tight tracking, generous leading. */
  h1, h2, h3, h4 {
    @apply font-serif text-ink tracking-tightest;
    font-feature-settings: "ss01", "dlig", "kern";
  }

  h1 { @apply text-5xl md:text-6xl leading-[1.05]; }
  h2 { @apply text-3xl md:text-4xl leading-[1.1]; }
  h3 { @apply text-2xl leading-snug; }
  h4 { @apply text-xl leading-snug; }

  p { @apply leading-relaxed; }

  a {
    @apply underline decoration-clay/40 underline-offset-4 transition-colors;
  }

  a:hover {
    @apply decoration-ink;
  }

  ::selection {
    background-color: #1c1d24;
    color: #f8f5ef;
  }

  /* Soft hairline rule used throughout. */
  hr {
    @apply border-0 border-t border-clay/25;
  }
}

@layer components {
  .hairline { @apply border-t border-clay/25; }

  /* Editorial label/eyebrow above section titles. */
  .eyebrow {
    @apply font-sans text-xs uppercase tracking-[0.18em] text-burnt;
  }

  /* The serif display utility used in hero copy. */
  .display {
    @apply font-serif tracking-tightest leading-[1.02];
  }

  /* Buttons — quiet, editorial. */
  .btn {
    @apply inline-flex items-center justify-center gap-2 px-5 py-3 text-sm
      font-medium transition-colors no-underline;
  }

  .btn-primary {
    @apply btn bg-ink text-pearl hover:bg-midnight;
  }

  .btn-secondary {
    @apply btn border border-ink text-ink hover:bg-ink hover:text-pearl;
  }

  .btn-ghost {
    @apply btn text-ink hover:text-accent;
  }

  /* Input + form primitives. */
  .field {
    @apply w-full bg-transparent border-0 border-b border-clay/40 px-0 py-3
      font-sans text-base text-ink placeholder:text-clay/70
      focus:outline-none focus:border-ink transition-colors;
  }

  .field-label {
    @apply block text-xs uppercase tracking-[0.16em] text-burnt mb-2;
  }
}

/* Marquee — silent, used only when the user adds it. */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fade-in 0.5s ease-out both;
}
```

### `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hairstrology — the chair is a community.",
    template: "%s · Hairstrology",
  },
  description:
    "A community and course platform for working stylists. Conversations behind the chair, client astrology, and the business of your station.",
  openGraph: {
    title: "Hairstrology",
    description:
      "A community and course platform for working stylists.",
    type: "website",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
```

### `src/app/not-found.tsx`

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-readable px-6 py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4">Nothing on this page.</h1>
      <p className="mt-6 text-burnt leading-relaxed">
        That link doesn't lead anywhere yet. Head back to the home page or
        look at the courses.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <Link href="/" className="btn-primary">Home</Link>
        <Link href="/courses" className="btn-secondary">Browse courses</Link>
      </div>
    </section>
  );
}
```

### `src/app/page.tsx`

```tsx
import Link from "next/link";
import { WaitlistForm } from "@/components/waitlist-form";

export default function HomePage() {
  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="border-b border-clay/20">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <p className="eyebrow">A community for working stylists</p>

          <h1 className="display mt-6 text-ink text-[3.25rem] md:text-[5.5rem] max-w-4xl">
            The chair is half<br className="hidden md:block" /> the work.
          </h1>

          <p className="mt-8 max-w-readable text-lg md:text-xl text-burnt leading-relaxed">
            Hairstrology is a quiet place on the internet for stylists who came
            back from the shutdown and realized the job had changed. Clients
            tell us things now. Some of them are heavy. The schools didn't
            teach this part — so we're teaching each other.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/client-insights" className="btn-primary">
              Try the Client Insights tool
            </Link>
            <Link href="/courses" className="btn-secondary">
              Browse the courses
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── Three pillars ───────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="eyebrow">What's inside</p>
        <h2 className="mt-4 max-w-3xl">
          Three things every stylist already does — finally written down.
        </h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-12">
          <Pillar
            number="01"
            title="Conversations behind the chair."
            body="What to say when a client tells you about a divorce, a diagnosis, or a moment they're not sure they'll come back from. Short, plain-language modules from working stylists."
          />
          <Pillar
            number="02"
            title="Client astrology, applied."
            body="A framework — not a forecast — for reading the room faster. Birthday in, conversation starters and rebook cadence out. Skeptics welcome."
          />
          <Pillar
            number="03"
            title="Your chair, your business."
            body="Pricing, rebook rates, the tax stuff nobody covered in school. Treat your station like the small business it already is."
          />
        </div>
      </section>

      {/* ───────────── Manifesto / quote ───────────── */}
      <section className="bg-bone border-y border-clay/20">
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
          <p className="eyebrow">A note</p>
          <blockquote className="mt-6 display text-3xl md:text-5xl text-ink">
            “When the salons opened back up, the clients didn't just want a
            haircut. They wanted to tell someone.”
          </blockquote>
          <p className="mt-8 text-sm text-burnt uppercase tracking-[0.18em]">
            — Kristina, founder
          </p>
        </div>
      </section>

      {/* ───────────── Waitlist ───────────── */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <p className="eyebrow text-center">Be early</p>
        <h2 className="mt-4 text-center">
          Join the waitlist.
        </h2>
        <p className="mt-4 text-center text-burnt max-w-readable mx-auto">
          We're rolling out the first courses to a small group of stylists. Get
          on the list and we'll let you know when your seat is ready.
        </p>

        <div className="mt-10">
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}

function Pillar({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="font-serif text-sm text-accent tracking-tightest">
        {number}
      </p>
      <h3 className="mt-3 text-2xl">{title}</h3>
      <p className="mt-3 text-burnt leading-relaxed">{body}</p>
    </div>
  );
}
```

### `src/app/waitlist/page.tsx`

```tsx
import type { Metadata } from "next";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description: "Be one of the first stylists in Hairstrology.",
};

export default function WaitlistPage() {
  return (
    <section className="mx-auto max-w-readable px-6 py-20">
      <p className="eyebrow">The waitlist</p>
      <h1 className="mt-4">A seat at the chair.</h1>
      <p className="mt-6 text-lg text-burnt leading-relaxed">
        We're opening the first cohort in small batches so we can learn what
        actually helps. Tell us a little about yourself and we'll be in touch
        when your seat is ready.
      </p>

      <div className="mt-12">
        <WaitlistForm fullForm />
      </div>
    </section>
  );
}
```

### `src/components/insights-form.tsx`

```tsx
"use client";

import { useMemo, useState } from "react";
import { sunSignFor, type SignProfile } from "@/lib/astrology";

export function InsightsForm() {
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");

  const sign = useMemo(() => {
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    if (!m || !d) return null;
    return sunSignFor(m, d);
  }, [month, day]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10">
      <form
        className="space-y-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Client Insights form"
      >
        <div>
          <label htmlFor="clientName" className="field-label">Client name <span className="text-clay/70 normal-case tracking-normal">(optional)</span></label>
          <input
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="field"
            placeholder="e.g. Marcy"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="month" className="field-label">Birth month</label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="field appearance-none"
            >
              <option value="">Month</option>
              {MONTHS.map((m, i) => (
                <option key={m} value={i + 1}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="day" className="field-label">Day</label>
            <input
              id="day"
              type="number"
              min={1}
              max={31}
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="field"
              placeholder="DD"
            />
          </div>
        </div>

        <p className="text-xs text-burnt">
          Nothing is saved. The read happens in your browser.
        </p>
      </form>

      <div className="min-h-[24rem]">
        {sign ? (
          <SignCard sign={sign} clientName={clientName} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex items-center justify-center border border-dashed border-clay/40 p-8">
      <p className="font-serif text-2xl text-clay text-center max-w-sm leading-snug">
        Enter a month and a day and we'll give you a read.
      </p>
    </div>
  );
}

function SignCard({ sign, clientName }: { sign: SignProfile; clientName: string }) {
  return (
    <article className="fade-in border border-clay/30 bg-bone/40 p-8">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="eyebrow">
            {clientName ? `${clientName} — ${sign.dateRange}` : sign.dateRange}
          </p>
          <h2 className="mt-2 text-4xl">{sign.name}</h2>
        </div>
        <span className="font-serif text-6xl text-accent leading-none">{sign.symbol}</span>
      </div>

      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-burnt">
        {sign.element} · {sign.modality} · ruled by {sign.rulingPlanet}
      </p>

      <p className="mt-6 text-lg text-ink leading-snug">
        {sign.vibe}
      </p>

      <Section title="Talk about" items={sign.conversationStarters} />
      <Section title="Skip" items={sign.avoid} />
      <Section title="At the chair" items={sign.chairTips} />

      <div className="mt-8 pt-6 border-t border-clay/20">
        <p className="eyebrow">Rebook cadence</p>
        <p className="mt-2 text-ink">{sign.rebookCadence}</p>
      </div>
    </article>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-8">
      <p className="eyebrow">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="text-ink leading-relaxed pl-5 relative before:absolute before:left-0 before:top-[0.9rem] before:w-2 before:h-px before:bg-accent"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
```

### `src/components/site-footer.tsx`

```tsx
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-clay/20 bg-pearl">
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl text-ink tracking-tightest">
            Hairstrology
          </p>
          <p className="mt-3 text-sm text-burnt max-w-sm leading-relaxed">
            A community and course platform for working stylists — built by a
            stylist for the people who have done the job long enough to know
            the chair is half the work.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/client-insights" className="no-underline text-ink hover:text-accent">Client Insights tool</Link></li>
            <li><Link href="/courses" className="no-underline text-ink hover:text-accent">Courses</Link></li>
            <li><Link href="/about" className="no-underline text-ink hover:text-accent">About</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">Get involved</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/waitlist" className="no-underline text-ink hover:text-accent">Join the waitlist</Link></li>
            <li><a href="mailto:hello@hairstrology.local" className="no-underline text-ink hover:text-accent">Email us</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-clay/15">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-burnt">
            © {new Date().getFullYear()} Hairstrology. A prototype — content,
            voice, and design subject to change.
          </p>
          <p className="text-xs text-burnt">
            Made with care. Not a substitute for a real therapist or a real natal chart.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

### `src/components/site-nav.tsx`

```tsx
import Link from "next/link";

const links = [
  { href: "/client-insights", label: "Client Insights" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  return (
    <header className="border-b border-clay/20 bg-pearl/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="no-underline group flex items-baseline gap-2"
          aria-label="Hairstrology home"
        >
          <span className="font-serif text-2xl tracking-tightest text-ink leading-none">
            Hairstrology
          </span>
          <span className="hidden sm:inline text-xs uppercase tracking-[0.18em] text-burnt">
            the chair is a community
          </span>
        </Link>

        <nav className="flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="no-underline text-sm text-burnt hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/waitlist" className="btn-primary text-xs">
            Join the waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
```

### `src/components/waitlist-form.tsx`

```tsx
"use client";

import { useState } from "react";

interface Props {
  /** When true, includes optional fields (name, role, years, zip). */
  fullForm?: boolean;
}

export function WaitlistForm({ fullForm = false }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong.");
      }
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "ok") {
    return (
      <div className="fade-in border border-clay/30 px-6 py-8 bg-bone/40">
        <p className="eyebrow text-accent">You're on the list.</p>
        <h3 className="mt-2 text-2xl">Welcome — we'll be in touch.</h3>
        <p className="mt-3 text-burnt">
          We'll send a short note when the first cohort opens up. Until then,
          poke around the <a href="/courses" className="text-ink">courses</a>{" "}
          and the <a href="/client-insights" className="text-ink">Client Insights</a> tool.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {fullForm && (
        <div>
          <label htmlFor="name" className="field-label">Your name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Kristina"
            className="field"
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="field-label">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@yoursalon.com"
          className="field"
        />
      </div>

      {fullForm && (
        <>
          <div>
            <label htmlFor="role" className="field-label">You are a…</label>
            <select id="role" name="role" className="field appearance-none">
              <option value="">Choose one</option>
              <option value="stylist">Working stylist</option>
              <option value="salon owner">Salon owner / booth renter</option>
              <option value="student">Stylist in school</option>
              <option value="other">Something else</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="yearsBehindChair" className="field-label">Years behind the chair</label>
              <input
                id="yearsBehindChair"
                name="yearsBehindChair"
                type="number"
                min={0}
                max={70}
                placeholder="12"
                className="field"
              />
            </div>
            <div>
              <label htmlFor="zip" className="field-label">ZIP / postal code</label>
              <input
                id="zip"
                name="zip"
                type="text"
                autoComplete="postal-code"
                placeholder="73301"
                className="field"
              />
            </div>
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full md:w-auto disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Join the waitlist"}
      </button>

      {status === "error" && (
        <p className="text-sm text-accent">{error}</p>
      )}

      <p className="text-xs text-burnt">
        One email when the cohort opens. No spam, no resale of your address.
      </p>
    </form>
  );
}
```

### `src/lib/astrology.ts`

```tsx
/**
 * Hairstrology — sun-sign data used by the Client Insights tool.
 *
 * This is intentionally hand-written, plain-language guidance Kristina can
 * edit. It is NOT a substitute for a real natal chart — it's a conversation
 * starter for stylists behind the chair.
 *
 * For each sign we store:
 *  - element / modality / ruling planet (the basics)
 *  - vibe: one sentence on how this client tends to show up
 *  - conversationStarters: things they *love* to talk about
 *  - avoid: topics that tend to land badly
 *  - chairTips: practical advice for the appointment itself
 *  - rebookCadence: roughly how often they want to come back
 */

export type Element = "Fire" | "Earth" | "Air" | "Water";
export type Modality = "Cardinal" | "Fixed" | "Mutable";

export interface SignProfile {
  name: string;
  symbol: string;
  dateRange: string;
  element: Element;
  modality: Modality;
  rulingPlanet: string;
  vibe: string;
  conversationStarters: string[];
  avoid: string[];
  chairTips: string[];
  rebookCadence: string;
}

export const SIGNS: SignProfile[] = [
  {
    name: "Aries",
    symbol: "♈",
    dateRange: "Mar 21 – Apr 19",
    element: "Fire",
    modality: "Cardinal",
    rulingPlanet: "Mars",
    vibe: "Walks in already mid-sentence. Wants the appointment to move.",
    conversationStarters: [
      "Their next big project or competitive goal",
      "Workouts, sports, anything that involves pushing themselves",
      "A bolder version of what they were going to ask for",
    ],
    avoid: [
      "Long, philosophical detours when they're on the clock",
      "Negging a recent decision they're already committed to",
    ],
    chairTips: [
      "Confirm timing up-front — they hate feeling stuck",
      "Suggest one decisive change rather than three small ones",
      "Read back what you're about to do; they want to feel heard quickly",
    ],
    rebookCadence: "Every 4–6 weeks — they get bored of their hair fast.",
  },
  {
    name: "Taurus",
    symbol: "♉",
    dateRange: "Apr 20 – May 20",
    element: "Earth",
    modality: "Fixed",
    rulingPlanet: "Venus",
    vibe: "Comes in already loyal. Will keep coming back for a decade if the chair feels good.",
    conversationStarters: [
      "Food, restaurants, anything sensory",
      "Their garden, their pets, their home upgrades",
      "Long-running shows or comfort rewatches",
    ],
    avoid: [
      "Pushing a dramatic change without warming them up to it",
      "Chaotic energy in the room",
    ],
    chairTips: [
      "Make the scalp massage count — that's the loyalty hook",
      "Offer water/tea by name, not as an afterthought",
      "When suggesting change, frame it as a refinement of what works",
    ],
    rebookCadence: "Every 6–8 weeks — they want a routine they can count on.",
  },
  {
    name: "Gemini",
    symbol: "♊",
    dateRange: "May 21 – Jun 20",
    element: "Air",
    modality: "Mutable",
    rulingPlanet: "Mercury",
    vibe: "Has six stories before they even sit down. Loves the conversation as much as the cut.",
    conversationStarters: [
      "What they're reading or what podcast they just finished",
      "Group-chat drama (kept anonymous)",
      "Travel plans, even speculative ones",
    ],
    avoid: [
      "Silent appointments — reads as you being upset with them",
      "Locking them into one option without alternatives",
    ],
    chairTips: [
      "Offer two or three directions and let them pick",
      "Keep them updated as you work — they want to be in the loop",
      "Send a follow-up text — they remember small gestures",
    ],
    rebookCadence: "Every 5–7 weeks — they re-engage faster after a reminder.",
  },
  {
    name: "Cancer",
    symbol: "♋",
    dateRange: "Jun 21 – Jul 22",
    element: "Water",
    modality: "Cardinal",
    rulingPlanet: "Moon",
    vibe: "The chair is half hair appointment, half therapy. Treat it as both.",
    conversationStarters: [
      "Family — kids, parents, the family dog",
      "Their home, cooking, anything nesting",
      "How they're feeling that week (they will tell you)",
    ],
    avoid: [
      "Brushing past it when they share something heavy",
      "Surprising them with a price increase mid-service",
    ],
    chairTips: [
      "Lead with check-in, then style — never the other way around",
      "Remember the names they mentioned last time; it matters",
      "If they're going through something, offer a softer service",
    ],
    rebookCadence: "Every 6 weeks — they want continuity, especially in hard seasons.",
  },
  {
    name: "Leo",
    symbol: "♌",
    dateRange: "Jul 23 – Aug 22",
    element: "Fire",
    modality: "Fixed",
    rulingPlanet: "Sun",
    vibe: "Wants the appointment to feel like an event. Will refer their entire friend group if it does.",
    conversationStarters: [
      "What they're celebrating right now",
      "Compliments — but specific ones, not generic",
      "Their creative projects",
    ],
    avoid: [
      "Comparing them unfavorably to another client",
      "Cutting their story off to talk to the next chair",
    ],
    chairTips: [
      "Show them the back with a real flourish",
      "Suggest a signature look that's *theirs*, not a trend",
      "Photo before they leave — they'll post and tag you",
    ],
    rebookCadence: "Every 4–6 weeks — they want to stay camera-ready.",
  },
  {
    name: "Virgo",
    symbol: "♍",
    dateRange: "Aug 23 – Sep 22",
    element: "Earth",
    modality: "Mutable",
    rulingPlanet: "Mercury",
    vibe: "Has a Pinterest board with notes. Will notice if your station is messy.",
    conversationStarters: [
      "Their work, especially the craft of it",
      "Wellness habits, supplements, routines",
      "Specific product ingredients (they read labels)",
    ],
    avoid: [
      "Vague answers about what you're doing",
      "Improvising without telling them you're improvising",
    ],
    chairTips: [
      "Walk them through your plan before you start",
      "Recommend products with the *why* — not just the brand",
      "Be on time. They notice and it sets the whole tone.",
    ],
    rebookCadence: "Every 5–7 weeks — they like a predictable system.",
  },
  {
    name: "Libra",
    symbol: "♎",
    dateRange: "Sep 23 – Oct 22",
    element: "Air",
    modality: "Cardinal",
    rulingPlanet: "Venus",
    vibe: "Wants the room to feel beautiful and the decision to feel collaborative.",
    conversationStarters: [
      "Design, fashion, anything aesthetic",
      "A choice they're stuck on (offer to weigh in)",
      "Their relationships — they're always thinking about them",
    ],
    avoid: [
      "Putting all the decision pressure on them",
      "Anything that feels confrontational",
    ],
    chairTips: [
      "Offer your professional opinion gently but clearly",
      "Show two finished references and pick the stronger one together",
      "Keep the music tasteful — they're noticing",
    ],
    rebookCadence: "Every 6 weeks — they like balance and ritual.",
  },
  {
    name: "Scorpio",
    symbol: "♏",
    dateRange: "Oct 23 – Nov 21",
    element: "Water",
    modality: "Fixed",
    rulingPlanet: "Pluto (trad. Mars)",
    vibe: "Quiet at first. Once they trust you, they will tell you everything.",
    conversationStarters: [
      "Whatever they bring up first — follow their lead",
      "True crime, psychology, anything with depth",
      "The transformation they actually want (it's bigger than they said)",
    ],
    avoid: [
      "Surface-level small talk — feels fake to them",
      "Repeating their private details to other clients",
    ],
    chairTips: [
      "Earn the trust early — that's the whole relationship",
      "When they finally ask for a big change, take it seriously",
      "Confidentiality is your most important product",
    ],
    rebookCadence: "Every 6–8 weeks — slow to commit, intensely loyal once they do.",
  },
  {
    name: "Sagittarius",
    symbol: "♐",
    dateRange: "Nov 22 – Dec 21",
    element: "Fire",
    modality: "Mutable",
    rulingPlanet: "Jupiter",
    vibe: "Half their stories are from another country. Loves a stylist who can keep up.",
    conversationStarters: [
      "Travel — where they've been, where they're going",
      "Big ideas, philosophy, what's wrong with the world",
      "Their next adventure or course or move",
    ],
    avoid: [
      "Boxing them into a 'safe' look",
      "Acting offended by their bluntness",
    ],
    chairTips: [
      "Suggest the more adventurous option — they'll thank you",
      "Recommend low-maintenance styles for their travel weeks",
      "Pre-book the next two appointments while they're sitting there",
    ],
    rebookCadence: "Every 7–8 weeks, but only if they're in town.",
  },
  {
    name: "Capricorn",
    symbol: "♑",
    dateRange: "Dec 22 – Jan 19",
    element: "Earth",
    modality: "Cardinal",
    rulingPlanet: "Saturn",
    vibe: "Books in advance. Pays without drama. Wants you to be excellent and respectful of their time.",
    conversationStarters: [
      "Work, ambitions, what they're building",
      "Long-term plans (they have them all)",
      "A book/podcast on craft or business",
    ],
    avoid: [
      "Running late",
      "Trying to upsell too aggressively",
    ],
    chairTips: [
      "Be professional first, friendly second — they prefer that order",
      "Frame premium services as investments, not indulgences",
      "Send a clean invoice; they remember the small operational stuff",
    ],
    rebookCadence: "Every 5–6 weeks, scheduled months out.",
  },
  {
    name: "Aquarius",
    symbol: "♒",
    dateRange: "Jan 20 – Feb 18",
    element: "Air",
    modality: "Fixed",
    rulingPlanet: "Uranus (trad. Saturn)",
    vibe: "Wants to feel like they're not like other clients. Often, they aren't.",
    conversationStarters: [
      "A weird idea they've been thinking about",
      "Tech, sci-fi, anything future-leaning",
      "Causes they care about",
    ],
    avoid: [
      "Treating them like everyone else",
      "Too much physical fussing — they need their space",
    ],
    chairTips: [
      "Offer something unconventional — color placement, an asymmetric line",
      "Give them autonomy on the small choices",
      "They'll send other unusual people to you if you nail it",
    ],
    rebookCadence: "Every 6–10 weeks — variable, depends on what they're up to.",
  },
  {
    name: "Pisces",
    symbol: "♓",
    dateRange: "Feb 19 – Mar 20",
    element: "Water",
    modality: "Mutable",
    rulingPlanet: "Neptune (trad. Jupiter)",
    vibe: "Comes in a bit dreamy, leaves feeling like they had a spa day.",
    conversationStarters: [
      "Music, art, movies — anything atmospheric",
      "Whatever they're feeling that day",
      "Their creative work",
    ],
    avoid: [
      "Pushing a hyper-structured 'plan' without softness",
      "Bright fluorescent energy",
    ],
    chairTips: [
      "Soft lighting, soft voice — the energy of the chair matters",
      "Bring them back to specifics when the brief gets vague",
      "Send them home with one product that smells beautiful",
    ],
    rebookCadence: "Every 6–8 weeks — they'll drift if you don't pre-book.",
  },
];

// Sun-sign lookup by month + day (1-indexed month).
// This is the standard tropical-zodiac approximation; good enough for a stylist
// conversation tool. (Cusp birthdays are inherent — Hairstrology gives the most
// common dominant-sign reading.)
const SIGN_DATES: Array<{ name: string; month: number; day: number }> = [
  { name: "Capricorn", month: 1, day: 20 }, // Dec 22 – Jan 19
  { name: "Aquarius", month: 2, day: 19 }, // Jan 20 – Feb 18
  { name: "Pisces", month: 3, day: 21 }, // Feb 19 – Mar 20
  { name: "Aries", month: 4, day: 20 }, // Mar 21 – Apr 19
  { name: "Taurus", month: 5, day: 21 }, // Apr 20 – May 20
  { name: "Gemini", month: 6, day: 21 }, // May 21 – Jun 20
  { name: "Cancer", month: 7, day: 23 }, // Jun 21 – Jul 22
  { name: "Leo", month: 8, day: 23 }, // Jul 23 – Aug 22
  { name: "Virgo", month: 9, day: 23 }, // Aug 23 – Sep 22
  { name: "Libra", month: 10, day: 23 }, // Sep 23 – Oct 22
  { name: "Scorpio", month: 11, day: 22 }, // Oct 23 – Nov 21
  { name: "Sagittarius", month: 12, day: 22 }, // Nov 22 – Dec 21
  { name: "Capricorn", month: 12, day: 32 }, // Dec 22 – Dec 31
];

export function sunSignFor(month: number, day: number): SignProfile | null {
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  for (const entry of SIGN_DATES) {
    if (month < entry.month || (month === entry.month && day < entry.day)) {
      return SIGNS.find((s) => s.name === entry.name) ?? null;
    }
  }
  return SIGNS.find((s) => s.name === "Capricorn") ?? null;
}

export function signByName(name: string): SignProfile | null {
  return SIGNS.find((s) => s.name.toLowerCase() === name.toLowerCase()) ?? null;
}
```

### `src/lib/courses.ts`

```tsx
/**
 * Course content for the prototype. In production this becomes a CMS / DB.
 * For now: hand-authored, fully typed, easy to extend.
 */

export interface Lesson {
  slug: string;
  title: string;
  durationMinutes: number;
  body: string; // light markdown — paragraphs separated by blank lines
}

export interface Course {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  level: "Foundations" | "Working stylist" | "Salon owner";
  lessons: Lesson[];
}

export const COURSES: Course[] = [
  {
    slug: "behind-the-chair-foundations",
    title: "Behind the Chair: Foundations",
    tagline: "What to do when your client tells you something hard.",
    description:
      "A short, plain-language course on the conversations that show up at the chair — and how to hold them without taking them home with you.",
    level: "Foundations",
    lessons: [
      {
        slug: "you-are-not-a-therapist",
        title: "You are not their therapist. You are something else.",
        durationMinutes: 7,
        body: `Most clients don't have a regular therapist. They have you.

That's a real responsibility, but it's not the same job. Your job isn't to fix what they bring you. It's to receive it without flinching, hold the room, and finish the service.

In this lesson we'll cover three boundaries that protect you and serve the client:

The first is the **information boundary** — what they tell you stays at the chair, full stop.

The second is the **emotional boundary** — you can witness their thing without absorbing it.

The third is the **time boundary** — the appointment ends when the appointment ends, and that's okay.`,
      },
      {
        slug: "the-three-second-pause",
        title: "The three-second pause.",
        durationMinutes: 5,
        body: `When a client tells you something heavy — a diagnosis, a breakup, a death — your instinct is to fill the silence.

Don't.

Count three seconds. Then say one true sentence. Not a fix. Not a deflection. Just one true thing, like *"I'm so sorry. That's a lot to carry."*

The pause does most of the work. They needed to be heard, not solved.`,
      },
      {
        slug: "what-to-say-when-someone-mentions-suicide",
        title: "What to say when a client mentions suicide.",
        durationMinutes: 9,
        body: `This is the lesson nobody wants to need, and the one we get the most messages about.

If a client tells you they're thinking about ending their life — directly or sideways — there is a script that works, and we're going to walk through it.

We'll also cover when to keep cutting, when to pause, and the one phone number every stylist in the U.S. should have memorized: **988**.

This lesson is paired with a downloadable card you can keep at your station.`,
      },
    ],
  },
  {
    slug: "client-astrology-for-stylists",
    title: "Client Astrology for Stylists",
    tagline: "Read the room faster. Build relationships that rebook themselves.",
    description:
      "Twelve short modules — one per sign — on what makes each client tick and how to talk to them so they want to come back.",
    level: "Working stylist",
    lessons: [
      {
        slug: "why-this-works",
        title: "Why this works (and what it isn't).",
        durationMinutes: 6,
        body: `This isn't fortune-telling. It's a shortcut.

Astrology gives you a framework — twelve archetypes — for sorting first impressions. You're already doing this; you're just doing it ad hoc. A framework makes you faster and more consistent.

Use it as a hypothesis, never a verdict. The client in your chair will always tell you more than their sun sign will.`,
      },
      {
        slug: "fire-signs-at-the-chair",
        title: "Fire signs: Aries, Leo, Sagittarius.",
        durationMinutes: 12,
        body: `Fire wants momentum.

Aries wants the cut to happen *now*. Leo wants the cut to be *seen*. Sagittarius wants the cut to be *low-maintenance* because they're leaving for somewhere in three weeks.

We'll walk through opening lines, mid-appointment check-ins, and the rebook script that works for each of them.`,
      },
      {
        slug: "earth-signs-at-the-chair",
        title: "Earth signs: Taurus, Virgo, Capricorn.",
        durationMinutes: 12,
        body: `Earth wants the chair to be a *system* that works.

Taurus needs comfort. Virgo needs the plan up front. Capricorn needs the clock respected.

These are your most loyal clients once you nail the operational stuff.`,
      },
      {
        slug: "air-signs-at-the-chair",
        title: "Air signs: Gemini, Libra, Aquarius.",
        durationMinutes: 12,
        body: `Air wants the conversation to be the appointment.

Gemini wants options. Libra wants you to weigh in. Aquarius wants you to do something nobody else is doing.

Talk first, scissors second.`,
      },
      {
        slug: "water-signs-at-the-chair",
        title: "Water signs: Cancer, Scorpio, Pisces.",
        durationMinutes: 12,
        body: `Water wants the room to feel safe.

Cancer wants you to remember their dog's name. Scorpio wants you to keep their secrets. Pisces wants the lighting to be right.

These clients build the slowest relationships, and they keep them the longest.`,
      },
    ],
  },
  {
    slug: "your-chair-your-business",
    title: "Your chair, your business.",
    tagline: "Booth-renting, pricing, and treating your station like a P&L.",
    description:
      "The non-technical course they didn't teach you in school. Pricing, retention, taxes-for-stylists basics, and the spreadsheet that runs your week.",
    level: "Salon owner",
    lessons: [
      {
        slug: "the-rebook-rate-that-changes-everything",
        title: "The rebook rate that changes everything.",
        durationMinutes: 10,
        body: `One number tells you almost everything about your business: the percentage of clients who book their next appointment before they leave the chair.

Industry average sits in the 30s. Stylists who clear 65% are running a different business — even if their cut prices are the same.

This lesson covers the script, the timing, and the one operational change that moves the number the most.`,
      },
      {
        slug: "price-like-a-professional",
        title: "Price like a professional, not a beginner.",
        durationMinutes: 9,
        body: `If you haven't raised prices in 18 months, you've taken a pay cut.

We'll walk through the math — how to calculate your true hourly, how to phase a price increase so existing clients don't churn, and the email template that softens the announcement.`,
      },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}
```

### `src/lib/db.ts`

```tsx
import { PrismaClient } from "@prisma/client";

// Re-use the Prisma client across hot reloads in dev.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### `src/lib/utils.ts`

```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### `tailwind.config.ts`

```tsx
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Editorial palette — warm pearl + deep midnight, a single accent.
        pearl: "#f8f5ef",
        bone: "#ede7da",
        midnight: "#1c1d24",
        ink: "#0c0d12",
        clay: "#8a857a",
        burnt: "#5a564d",
        accent: "#c66b4a", // dusty coral — warm, salon-friendly
        accentSoft: "#f0d3c4",
      },
      fontFamily: {
        // Loaded via next/font in layout.tsx
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        prose: "68ch",
        readable: "44rem",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "3px",
      },
    },
  },
  plugins: [],
};

export default config;
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### `vercel.json`

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install"
}
```

---

## Verification

After writing every file above:

```bash
cd hairstrology
chmod +x scripts/setup.sh scripts/docker-entrypoint.sh
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npx tsc --noEmit                                     # should produce no output
DATABASE_URL="file:./prisma/dev.db" npx next build   # should compile all routes
npm run dev                                          # → http://localhost:3000
```

If you have Docker:

```bash
docker compose up --build
# → http://localhost:3000
```

To push to GitHub:

```bash
git init && git add . && git commit -m "feat: initial Hairstrology prototype"
gh repo create hairstrology --source=. --private --push
```

Or just run the one-shot helper, which does setup + git init + optional `gh repo create`:

```bash
bash scripts/setup.sh
```

## Notes for future work

The `CLAUDE.md` file (in this spec, written to the project root) is also addressed to Claude Code — it lists what was built, what conventions to keep, and what NOT to change without asking. Read it before making changes to the project after the initial build.
