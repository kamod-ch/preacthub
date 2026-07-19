#!/usr/bin/env node
/**
 * Audits key PreactHub static HTML pages with Kamod AI Audit.
 * Requires: npm run build && @kamod-ai-audit/core built (see package.json prepare script).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");

const MIN_OVERALL_SCORE = Number(process.env.AUDIT_MIN_SCORE ?? 75);
const BLOCKING_CATEGORIES = ["agent_readiness", "accessibility", "structured_data"];
const MAX_BLOCKING_HIGH = Number(process.env.AUDIT_MAX_HIGH ?? 3);

const PAGES = [
  { id: "home", file: "index.html" },
  { id: "libraries", file: "libraries/index.html" },
  { id: "library-detail", file: "libraries/entries/preact-signals/index.html" },
  { id: "compare", file: "compare/preact-signals-vs-nanostores/index.html" },
  { id: "submit", file: "libraries/submit/index.html" },
];

async function loadAudit() {
  try {
    return await import("@kamod-ai-audit/core");
  } catch {
    const candidates = [
      path.resolve(root, "../kamod-ai-audit/packages/core/dist/index.js"),
      path.resolve(root, "kamod-ai-audit/packages/core/dist/index.js"),
    ];
    const sibling = candidates.find((candidate) => existsSync(candidate));
    if (!sibling) {
      throw new Error(
        "Could not load @kamod-ai-audit/core. Run `npm run prepare:audit` or build kamod-ai-audit first.",
      );
    }
    return import(sibling);
  }
}

function countBlockingHighIssues(report) {
  return report.categoryScores
    .filter((entry) => BLOCKING_CATEGORIES.includes(entry.category))
    .flatMap((entry) => entry.issues)
    .filter((issue) => issue.severity === "high" || issue.severity === "critical").length;
}

function parseArgs(argv) {
  const outputIndex = argv.indexOf("--output");
  return {
    outputDir: outputIndex >= 0 ? argv[outputIndex + 1] : undefined,
  };
}

async function main() {
  const { outputDir } = parseArgs(process.argv.slice(2));
  const { audit } = await loadAudit();
  const failures = [];
  const summaries = [];

  for (const page of PAGES) {
    const absolute = path.join(distDir, page.file);
    if (!existsSync(absolute)) {
      failures.push(`${page.id}: missing built file ${page.file}`);
      continue;
    }

    const report = await audit(absolute);
    const blockingHigh = countBlockingHighIssues(report);
    summaries.push({
      id: page.id,
      file: page.file,
      overallScore: report.overallScore,
      blockingHigh,
      categories: Object.fromEntries(report.categoryScores.map((entry) => [entry.category, entry.score])),
      topFixes: report.topFixes.slice(0, 3).map((issue) => issue.title),
    });

    if (outputDir) {
      const pageDir = path.join(outputDir, page.id);
      await mkdir(pageDir, { recursive: true });
      await writeFile(path.join(pageDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
    }

    if (report.overallScore < MIN_OVERALL_SCORE) {
      failures.push(`${page.id}: overall score ${report.overallScore} < ${MIN_OVERALL_SCORE}`);
    }
    if (blockingHigh > MAX_BLOCKING_HIGH) {
      failures.push(`${page.id}: ${blockingHigh} high/critical issues in ${BLOCKING_CATEGORIES.join(", ")} (max ${MAX_BLOCKING_HIGH})`);
    }
  }

  console.log("PreactHub site audit summary:");
  for (const summary of summaries) {
    console.log(
      `- ${summary.id}: ${summary.overallScore}/100, blocking high=${summary.blockingHigh}, top fix: ${summary.topFixes[0] ?? "none"}`,
    );
  }

  if (failures.length) {
    console.error("\nAudit failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
    return;
  }

  console.log(`\nAll ${summaries.length} pages passed audit thresholds.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
