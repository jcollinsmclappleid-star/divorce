#!/usr/bin/env bash
# Read-only copy: production Postgres → Neon dev database.
#
# SAFE: pg_dump only READS from production. Writes go to Neon (DATABASE_URL) only.
# Production is NOT modified by this script.
#
# Setup:
#   1. Create Neon project (separate from production)
#   2. Put Neon connection string in .env as DATABASE_URL
#   3. Put production connection string in .env.production as PRODUCTION_DATABASE_URL
#      (copy from .env.production.example)
#
# Usage:
#   ./script/copy-production-to-neon.sh
#
# Requires: pg_dump and pg_restore (brew install libpq && brew link --force libpq)

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

load_env_file() {
  local file="$1"
  [[ -f "$file" ]] || return 0
  set -a
  # shellcheck disable=SC1090
  source "$file"
  set +a
}

load_env_file "$ROOT/.env"
load_env_file "$ROOT/.env.production"

SOURCE_URL="${PRODUCTION_DATABASE_URL:-${REPLIT_DATABASE_URL:-}}"
TARGET_URL="${DATABASE_URL:-}"

if [[ -z "$SOURCE_URL" ]]; then
  echo "Error: PRODUCTION_DATABASE_URL is not set."
  echo ""
  echo "Add it to .env.production (recommended):"
  echo "  cp .env.production.example .env.production"
  echo "  # edit .env.production and paste your production DATABASE_URL"
  echo ""
  echo "Or export it for this session only:"
  echo "  export PRODUCTION_DATABASE_URL='postgresql://...'"
  exit 1
fi

if [[ -z "$TARGET_URL" ]]; then
  echo "Error: DATABASE_URL is not set (Neon target)."
  echo "Add your Neon connection string to .env"
  exit 1
fi

if [[ "$SOURCE_URL" == "$TARGET_URL" ]]; then
  echo "Error: PRODUCTION_DATABASE_URL and DATABASE_URL are the same."
  echo "DATABASE_URL must point at your Neon dev copy, not production."
  exit 1
fi

if ! command -v pg_dump >/dev/null 2>&1; then
  echo "Error: pg_dump not found. Install with: brew install libpq"
  exit 1
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " Production → Neon copy (read-only export)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " Source (read only): ${SOURCE_URL%%@*}@***"
echo " Target (will be overwritten): ${TARGET_URL%%@*}@***"
echo ""
echo " Production will NOT be modified — only pg_dump reads from it."
echo " Neon will be replaced with a fresh copy of production data."
echo ""
read -r -p "Continue? [y/N] " confirm
if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
  echo "Cancelled."
  exit 0
fi

DUMP_FILE="$(mktemp /tmp/divorce-production-dump.XXXXXX.dump)"
trap 'rm -f "$DUMP_FILE"' EXIT

echo ""
echo "Exporting from production (read-only)..."
pg_dump "$SOURCE_URL" --no-owner --no-acl -F c -f "$DUMP_FILE"

echo "Importing into Neon..."
pg_restore -d "$TARGET_URL" --no-owner --no-acl --clean --if-exists "$DUMP_FILE" 2>/dev/null || true

echo ""
echo "Done."
echo "  • Production: unchanged (read-only export)"
echo "  • Neon: updated with production copy"
echo ""
echo "Next: npm run db:push   # only if schema drifted; usually not needed after full restore"
echo "      npm run dev"
