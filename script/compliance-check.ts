#!/usr/bin/env tsx
/**
 * Batch 6 compliance harness:
 * - Forbidden-phrase scan on product UI + guide data
 * - Settlement factor library quality (sources, questions, prep fields)
 * - Guided-summary compliance unit tests
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getFactorGuideQualityReport,
  getFactorLibraryCoverage,
} from "../client/src/lib/settlement-factors.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

type ScanRule = {
  id: string;
  pattern: RegExp;
  /** Skip the match when the full line matches any pattern. */
  lineAllow?: RegExp[];
  /** Skip entire files matching any pattern. */
  skipFiles?: RegExp[];
};

type ScanHit = {
  rule: string;
  file: string;
  line: number;
  text: string;
};

const PRODUCT_PAGE_FILES = fs
  .readdirSync(path.join(ROOT, "client/src/pages"))
  .filter((name) => name.endsWith(".tsx"))
  .map((name) => path.join("client/src/pages", name));

const PRODUCT_SCAN_FILES = [
  ...PRODUCT_PAGE_FILES,
  "client/src/components/guided-summary-panel.tsx",
  "client/src/components/landing-dashboard-preview.tsx",
  "client/src/lib/settlement-factors.ts",
];

const CONTENT_SCAN_ROOT = "client/src/pages/content";

const PRODUCT_RULES: ScanRule[] = [
  { id: "court-would", pattern: /\bcourt would\b/i },
  { id: "judge-would", pattern: /\bjudge would\b/i },
  { id: "court-will-order", pattern: /\bcourt will (?:order|award|give)\b/i },
  { id: "you-are-entitled", pattern: /\byou(?:'re| are) entitled\b/i, lineAllow: [/href=["']\/what-am-i-entitled/i] },
  { id: "legal-entitlement", pattern: /\blegal entitlement\b/i },
  { id: "ring-fenced", pattern: /\bring[- ]fenc/i },
  { id: "strongly-advise", pattern: /\bstrongly advise\b/i },
  { id: "you-should-accept", pattern: /\byou should accept\b/i },
  { id: "you-should-reject", pattern: /\byou should reject\b/i },
  { id: "push-for", pattern: /\bpush for\b/i },
  { id: "hide-assets", pattern: /\bhide assets\b/i },
  { id: "conceal-assets", pattern: /\bconceal assets\b/i },
  { id: "guaranteed-outcome", pattern: /\bguaranteed (?:outcome|result|split|award)\b/i },
];

const CONTENT_RULES: ScanRule[] = [
  { id: "court-would", pattern: /\bcourt would\b/i },
  { id: "judge-would", pattern: /\bjudge would\b/i },
  { id: "ring-fenced", pattern: /\bring[- ]fenc/i },
  { id: "strongly-advise", pattern: /\bstrongly advise\b/i },
  { id: "you-should-accept", pattern: /\byou should accept\b/i },
  { id: "you-should-reject", pattern: /\byou should reject\b/i },
];

const FILE_ALLOWLIST: RegExp[] = [
  /refund-policy\.tsx$/,
  /universal-credit-after-divorce-uk\.tsx$/,
  /server\/guided-summary\/prompt\.ts$/,
  /server\/guided-summary\/compliance\.ts$/,
];

function walkTsxFiles(dir: string): string[] {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkTsxFiles(rel));
    else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) out.push(rel);
  }
  return out;
}

function isAllowlistedFile(relPath: string) {
  return FILE_ALLOWLIST.some((pattern) => pattern.test(relPath));
}

function scanFile(relPath: string, rules: ScanRule[]): ScanHit[] {
  if (isAllowlistedFile(relPath)) return [];

  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return [];

  const lines = fs.readFileSync(abs, "utf8").split("\n");
  const hits: ScanHit[] = [];

  for (const rule of rules) {
    if (rule.skipFiles?.some((pattern) => pattern.test(relPath))) continue;

    lines.forEach((text, index) => {
      if (!rule.pattern.test(text)) return;
      if (rule.lineAllow?.some((allow) => allow.test(text))) return;
      hits.push({
        rule: rule.id,
        file: relPath,
        line: index + 1,
        text: text.trim(),
      });
    });
  }

  return hits;
}

function runPhraseScans() {
  const productHits = PRODUCT_SCAN_FILES.flatMap((file) =>
    scanFile(file.replace(/\\/g, "/"), PRODUCT_RULES),
  );

  const contentFiles = walkTsxFiles(CONTENT_SCAN_ROOT);
  const contentHits = contentFiles.flatMap((file) => scanFile(file, CONTENT_RULES));

  return [...productHits, ...contentHits];
}

function runFactorQualityChecks() {
  const coverage = getFactorLibraryCoverage();
  const quality = getFactorGuideQualityReport();
  return { coverage, quality };
}

function runGuidedSummaryTests() {
  const testFile = path.join(ROOT, "server/guided-summary/compliance.test.ts");
  const result = spawnSync(
    process.execPath,
    ["--import", "tsx", "--test", testFile],
    { cwd: ROOT, encoding: "utf8", stdio: "pipe" },
  );
  return result;
}

function main() {
  let failed = false;

  console.log("=== Compliance: forbidden phrases ===");
  const hits = runPhraseScans();
  if (hits.length === 0) {
    console.log("OK — no forbidden phrases found on product or content surfaces.");
  } else {
    failed = true;
    console.error(`FAIL — ${hits.length} forbidden phrase hit(s):`);
    for (const hit of hits) {
      console.error(`  [${hit.rule}] ${hit.file}:${hit.line}`);
      console.error(`    ${hit.text}`);
    }
  }

  console.log("\n=== Compliance: settlement factor library ===");
  const { coverage, quality } = runFactorQualityChecks();
  console.log(`Coverage: ${coverage.enriched}/${coverage.total} factors with userQuestion`);
  if (!coverage.complete) {
    failed = true;
    console.error("FAIL — missing userQuestion enrichment:", coverage.missing.join(", "));
  } else {
    console.log("OK — all factors have userQuestion enrichment.");
  }

  if (!quality.ok) {
    failed = true;
    console.error(`FAIL — ${quality.issues.length} factor quality issue(s):`);
    for (const issue of quality.issues.slice(0, 10)) {
      console.error(`  ${issue.title}: missing ${issue.missing.join(", ")}`);
    }
    if (quality.issues.length > 10) {
      console.error(`  … and ${quality.issues.length - 10} more`);
    }
  } else {
    console.log(`OK — ${quality.factorCount} enriched factors have source URLs and prep fields.`);
  }

  console.log("\n=== Compliance: guided-summary phrase guard ===");
  const testResult = runGuidedSummaryTests();
  if (testResult.status === 0) {
    console.log("OK — guided-summary compliance tests passed.");
  } else {
    failed = true;
    console.error("FAIL — guided-summary compliance tests failed.");
    if (testResult.stdout) console.error(testResult.stdout);
    if (testResult.stderr) console.error(testResult.stderr);
  }

  if (failed) process.exit(1);
  console.log("\nAll compliance checks passed.");
}

main();
