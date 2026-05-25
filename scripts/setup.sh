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
