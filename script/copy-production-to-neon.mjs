#!/usr/bin/env node
/**
 * Read-only copy: production Postgres → Neon target (staging or dev).
 * Does not modify the source database.
 *
 * Usage:
 *   node --env-file=.env.production --env-file=.env.staging script/copy-production-to-neon.mjs
 *   node script/copy-production-to-neon.mjs --source "$PRODUCTION_DATABASE_URL" --target "$STAGING_DATABASE_URL"
 *
 * Options:
 *   --source   Source URL (default: PRODUCTION_DATABASE_URL)
 *   --target   Target URL (default: STAGING_DATABASE_URL or DATABASE_URL)
 *   --yes      Skip confirmation prompt
 */

import pg from "pg";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const { Client } = pg;

function parseArgs(argv) {
  const opts = { yes: false };
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--yes") opts.yes = true;
    else if (arg === "--source") opts.source = argv[++i];
    else if (arg === "--target") opts.target = argv[++i];
  }
  return opts;
}

async function listTables(client) {
  const { rows } = await client.query(
    `SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`,
  );
  return rows.map((r) => r.tablename);
}

async function tableExists(client, table) {
  const { rows } = await client.query(
    `SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = $1`,
    [table],
  );
  return rows.length > 0;
}

async function copyTable(source, target, table) {
  const countRes = await source.query(`SELECT COUNT(*)::int AS n FROM "${table}"`);
  const count = countRes.rows[0].n;
  if (count === 0) {
    console.log(`  ${table}: 0 rows (skip)`);
    return 0;
  }

  if (!(await tableExists(target, table))) {
    console.log(`  ${table}: target table missing — skipped (${count} rows on source)`);
    return 0;
  }

  await target.query(`TRUNCATE "${table}" RESTART IDENTITY CASCADE`);

  const { rows } = await source.query(`SELECT * FROM "${table}"`);
  const columns = Object.keys(rows[0]);
  const colList = columns.map((c) => `"${c}"`).join(", ");
  const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");

  for (const row of rows) {
    const values = columns.map((c) => row[c]);
    await target.query(
      `INSERT INTO "${table}" (${colList}) VALUES (${placeholders})`,
      values,
    );
  }

  console.log(`  ${table}: ${count} rows copied`);
  return count;
}

async function main() {
  const opts = parseArgs(process.argv);
  const sourceUrl =
    opts.source ?? process.env.PRODUCTION_DATABASE_URL ?? process.env.REPLIT_DATABASE_URL;
  const targetUrl =
    opts.target ?? process.env.STAGING_DATABASE_URL ?? process.env.DATABASE_URL;

  if (!sourceUrl) {
    console.error("Error: set PRODUCTION_DATABASE_URL or pass --source");
    process.exit(1);
  }
  if (!targetUrl) {
    console.error("Error: set STAGING_DATABASE_URL / DATABASE_URL or pass --target");
    process.exit(1);
  }
  if (sourceUrl === targetUrl) {
    console.error("Error: source and target URLs must differ");
    process.exit(1);
  }

  const mask = (url) => `${url.split("@")[0]}@***`;
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(" Production → Neon copy (read-only on source)");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(` Source: ${mask(sourceUrl)}`);
  console.log(` Target: ${mask(targetUrl)}`);
  console.log("");

  if (!opts.yes) {
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question("Continue? [y/N] ");
    rl.close();
    if (!/^[Yy]$/.test(answer.trim())) {
      console.log("Cancelled.");
      process.exit(0);
    }
  }

  const source = new Client({ connectionString: sourceUrl });
  const target = new Client({ connectionString: targetUrl });
  await source.connect();
  await target.connect();

  try {
    const tables = await listTables(source);
    console.log(`Tables: ${tables.join(", ")}`);
    let total = 0;
    for (const table of tables) {
      total += await copyTable(source, target, table);
    }
    console.log("");
    console.log(`Done. ${total} rows copied. Production unchanged.`);
  } finally {
    await source.end();
    await target.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
