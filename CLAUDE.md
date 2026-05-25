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
