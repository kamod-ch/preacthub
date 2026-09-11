#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  assertNoPlaceholders,
  loadExistingCatalog,
  normalizePackageName,
  normalizeRepositoryUrl,
  parseArgs,
  slugify,
} from "./lib/candidate-import-lib.mjs";

const root = process.cwd();
const defaultManifest = path.join(root, "data", "import", "preacthub-candidates.json");
const entriesDir = path.join(root, "content", "libraries", "entries");
const REQUIRED_HEADINGS = [
  "Introduction",
  "Installation",
  "Preact configuration",
  "Example",
  "SSR notes",
  "Islands notes",
  "Known limitations",
  "Alternatives",
];

function fail(message) {
  console.error(`preacthub-import: ${message}`);
  process.exit(1);
}

function parseList(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function yamlString(value) {
  if (value.includes("'") && value.includes('"')) {
    return JSON.stringify(value);
  }
  if (value.includes("'")) return JSON.stringify(value);
  return `'${value}'`;
}

function buildMarkdown(draft) {
  const lines = ["---", "entryType: library"];
  const frontmatterKeys = [
    ["name", draft.name],
    ["slug", draft.slug],
    ["shortDescription", draft.shortDescription],
    ["category", draft.category],
    ["compatibilityStatus", draft.compatibilityStatus],
    ["maintenanceStatus", draft.maintenanceStatus],
    ["typescriptSupport", draft.typescriptSupport],
    ["ssrSupport", draft.ssrSupport],
    ["packageName", draft.packageName],
    ["repositoryUrl", draft.repositoryUrl],
    ["documentationUrl", draft.documentationUrl],
    ["homepageUrl", draft.homepageUrl],
    ["npmUrl", draft.npmUrl],
    ["license", draft.license],
    ["installCommand", draft.installCommand],
    ["featured", draft.featured ?? false],
    ["islands", draft.islands ?? false],
    ["esm", draft.esm ?? true],
  ];

  for (const [key, value] of frontmatterKeys) {
    if (value === undefined || value === null || value === "") continue;
    if (typeof value === "boolean") lines.push(`${key}: ${value}`);
    else lines.push(`${key}: ${yamlString(String(value))}`);
  }

  if (Array.isArray(draft.tags) && draft.tags.length) {
    lines.push("tags:");
    for (const tag of draft.tags) lines.push(`  - ${tag}`);
  }

  if (Array.isArray(draft.limitations) && draft.limitations.length) {
    lines.push("limitations:");
    for (const limitation of draft.limitations) lines.push(`  - ${yamlString(limitation)}`);
  }

  lines.push("qualityBadges: []");

  if (Array.isArray(draft.alternatives) && draft.alternatives.length) {
    lines.push("alternatives:");
    for (const alternative of draft.alternatives) lines.push(`  - ${alternative}`);
  }

  lines.push("---", "");

  for (const heading of REQUIRED_HEADINGS) {
    const body = draft.sections?.[heading];
    if (!body) fail(`Missing editorial section "${heading}" for ${draft.packageName ?? draft.slug}`);
    lines.push(`## ${heading}`, "", body.trim(), "");
  }

  return `${lines.join("\n")}\n`;
}

function compareCandidates(a, b) {
  if (a.priority !== b.priority) return a.priority - b.priority;
  if (a.reportDate !== b.reportDate) return a.reportDate.localeCompare(b.reportDate);
  return a.index - b.index;
}

function summarizeDrafts(drafts) {
  console.log("");
  console.log("Import summary");
  console.log("==============");
  for (const draft of drafts) {
    console.log(`- ${draft.packageName ?? draft.slug} → ${draft.slug}.md (${draft.category}, ${draft.compatibilityStatus})`);
  }
  console.log(`Total: ${drafts.length} file(s)`);
}

const args = parseArgs(process.argv.slice(2));
const manifestPath = path.resolve(root, String(args.report ?? args.manifest ?? defaultManifest));
const write = Boolean(args.write);
const dryRun = !write;
const skipExisting = Boolean(args["skip-existing"]);
const priority = args.priority ? Number(args.priority) : undefined;
const limit = args.limit ? Number(args.limit) : undefined;
const offset = args.offset ? Number(args.offset) : 0;
const only = parseList(args.only);

if (!fs.existsSync(manifestPath)) fail(`manifest not found: ${path.relative(root, manifestPath)}`);

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const existing = loadExistingCatalog(root);
const knownSlugs = new Set(existing.map((entry) => entry.slug));
const knownPackages = new Set(
  existing.filter((entry) => entry.packageName).map((entry) => normalizePackageName(entry.packageName)),
);
const knownRepos = new Set(
  existing.filter((entry) => entry.repositoryUrl).map((entry) => normalizeRepositoryUrl(entry.repositoryUrl)),
);

let candidates = manifest.candidates.filter((candidate) => candidate.importDecision === "new");
if (priority) candidates = candidates.filter((candidate) => candidate.priority === priority);
if (only.length) {
  const onlySet = new Set(only.map((name) => normalizePackageName(name)));
  candidates = candidates.filter((candidate) => onlySet.has(normalizePackageName(candidate.packageName)));
}
candidates = candidates.sort(compareCandidates);
if (offset) candidates = candidates.slice(offset);
if (limit !== undefined) candidates = candidates.slice(0, limit);

const drafts = [];
const skipped = [];
const warnings = [];

for (const candidate of candidates) {
  if (!candidate.catalogDraft) {
    fail(`Candidate ${candidate.packageName} is missing catalogDraft editorial content`);
  }

  const draft = {
    ...candidate.catalogDraft,
    slug: candidate.catalogDraft.slug ?? slugify(candidate.packageName),
    packageName: candidate.catalogDraft.packageName ?? candidate.packageName,
  };

  if (knownSlugs.has(draft.slug)) {
    if (skipExisting) {
      skipped.push({
        packageName: draft.packageName ?? candidate.packageName,
        slug: draft.slug,
      });
      continue;
    }
    fail(
      `Slug collision: ${draft.slug}.md already exists (batch likely imported already — re-run with --skip-existing or continue with the next priority)`,
    );
  }

  const pkg = draft.packageName ? normalizePackageName(draft.packageName) : "";
  if (pkg && knownPackages.has(pkg)) {
    warnings.push(`package duplicate warning: ${draft.packageName} already in catalog`);
  }

  const repo = draft.repositoryUrl ? normalizeRepositoryUrl(draft.repositoryUrl) : "";
  if (repo && knownRepos.has(repo)) {
    warnings.push(`repository duplicate warning: ${repo} already in catalog`);
  }

  const content = buildMarkdown(draft);
  assertNoPlaceholders(content);
  drafts.push({ candidate, draft, content, file: path.join(entriesDir, `${draft.slug}.md`) });
}

if (skipped.length) {
  console.log("");
  console.log("Skipped (already in catalog)");
  console.log("==========================");
  for (const entry of skipped) {
    console.log(`- ${entry.packageName} → ${entry.slug}.md`);
  }
  console.log(`Total skipped: ${skipped.length}`);
}

if (!drafts.length) {
  if (skipped.length) {
    console.log("\nAll matching candidates are already imported.");
    process.exit(0);
  }
  console.log("No candidates matched the current filters.");
  process.exit(0);
}

summarizeDrafts(drafts.map(({ draft }) => draft));
for (const warning of warnings) console.warn(`Warning: ${warning}`);

if (dryRun) {
  console.log("\nDry run only — no files were written. Re-run with --write to create entries.");
  process.exit(0);
}

for (const item of drafts) {
  if (fs.existsSync(item.file)) fail(`Refusing to overwrite existing file: ${path.relative(root, item.file)}`);
  fs.mkdirSync(entriesDir, { recursive: true });
  fs.writeFileSync(item.file, item.content);
  console.log(`Created ${path.relative(root, item.file)}`);
}

console.log(`\nWrote ${drafts.length} catalog entr${drafts.length === 1 ? "y" : "ies"}.`);
