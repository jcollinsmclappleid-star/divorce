#!/usr/bin/env bash
# Deprecated wrapper — use ./script/copy-production-to-neon.sh instead.
# One-time read-only export from Replit Postgres → Neon.
# Does NOT change Replit production — only reads from Replit and writes to Neon.
#
# Usage:
#   export REPLIT_DATABASE_URL='postgresql://...'   # from Replit Secrets
#   export DATABASE_URL='postgresql://...'          # Neon connection string (in .env)
#   ./script/copy-replit-to-neon.sh
#
# Requires: pg_dump and pg_restore (install: brew install libpq && brew link --force libpq)

set -euo pipefail

if [[ -z "${REPLIT_DATABASE_URL:-}" ]]; then
  echo "Error: REPLIT_DATABASE_URL is not set."
  echo "Copy it from Replit → Tools → Secrets → DATABASE_URL"
  exit 1
fi

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "Error: DATABASE_URL is not set (Neon target)."
  exit 1
fi

if ! command -v pg_dump >/dev/null 2>&1; then
  echo "Error: pg_dump not found. Install with: brew install libpq"
  exit 1
fi

DUMP_FILE="$(mktemp /tmp/divorce-replit-dump.XXXXXX.dump)"
trap 'rm -f "$DUMP_FILE"' EXIT

echo "Exporting from Replit (read-only)..."
pg_dump "$REPLIT_DATABASE_URL" --no-owner --no-acl -F c -f "$DUMP_FILE"

echo "Importing into Neon..."
pg_restore -d "$DATABASE_URL" --no-owner --no-acl --clean --if-exists "$DUMP_FILE" || true

echo "Done. Replit production was not modified."
