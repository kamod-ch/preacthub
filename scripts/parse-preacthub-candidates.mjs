#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  buildImportReport,
  classifyCandidate,
  findDuplicateCandidates,
  loadExistingCatalog,
  mapReportedCategory,
  parseCandidatesMarkdown,
  slugify,
} from "./lib/candidate-import-lib.mjs";

const root = process.cwd();
const sourcePath = path.join(root, "docs", "import", "preacthub-candidates.md");
const manifestPath = path.join(root, "data", "import", "preacthub-candidates.json");
const reportPath = path.join(root, "docs", "import", "preacthub-import-report.md");

const source = fs.readFileSync(sourcePath, "utf8");
const { meta, candidates } = parseCandidatesMarkdown(source);
const existing = loadExistingCatalog(root);
const duplicates = findDuplicateCandidates(candidates);

for (const candidate of candidates) {
  const decision = classifyCandidate(candidate, existing);
  candidate.importDecision = decision.importDecision;
  candidate.decisionReason = decision.decisionReason;
  if (decision.packageName) candidate.packageName = decision.packageName;
  if (decision.name) candidate.name = decision.name;
  candidate.mappedCategory = mapReportedCategory(candidate.reportedCategory);
  candidate.slug = slugify(candidate.packageName);
}

const manifest = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString().slice(0, 10),
  sourceFile: "docs/import/preacthub-candidates.md",
  meta,
  duplicateWarnings: duplicates,
  candidates,
};

fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${buildImportReport({ meta, candidates, existing, duplicates })}\n`);

console.log(`Wrote ${path.relative(root, manifestPath)} (${candidates.length} candidates)`);
console.log(`Wrote ${path.relative(root, reportPath)}`);

if (candidates.length !== meta.expectedCandidateCount) {
  console.warn(
    `Warning: expected ${meta.expectedCandidateCount} candidates but parsed ${candidates.length}. Full import is blocked until source is complete.`,
  );
  process.exitCode = 2;
}
