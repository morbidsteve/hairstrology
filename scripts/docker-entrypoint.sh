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
