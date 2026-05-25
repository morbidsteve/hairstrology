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
