#!/usr/bin/env bash
# Run this INSIDE Replit Shell (not on your Mac).
# Replit auto-injects DATABASE_URL — it is NOT listed under Secrets.
#
# 1. Open your live Replit project
# 2. Open Shell
# 3. For PRODUCTION data: use the Production database (see Replit Database panel)
# 4. Run: bash script/export-from-replit-shell.sh
# 5. Download divorce_backup.dump from the Replit file browser
# 6. On your Mac: pg_restore -d "$DATABASE_URL" --no-owner --no-acl --clean --if-exists divorce_backup.dump

set -euo pipefail

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "DATABASE_URL is not set in this Replit shell."
  echo ""
  echo "Try:"
  echo "  1. Sidebar → Database (cylinder icon) → Create / enable PostgreSQL"
  echo "  2. Switch to the Production database tab if you need live data"
  echo "  3. Re-open Shell and run: echo \"\${DATABASE_URL:0:30}...\" to confirm"
  echo ""
  echo "If you migrated from legacy Neon, also check Secrets for NEON_DATABASE_URL."
  exit 1
fi

OUT="divorce_backup.dump"
echo "Exporting from Replit (read-only) → $OUT"
pg_dump "$DATABASE_URL" --no-owner --no-acl -F c -f "$OUT"
echo "Done. Download $OUT and restore to Neon on your Mac."
