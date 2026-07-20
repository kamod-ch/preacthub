#!/usr/bin/env node
/**
 * Migrates legacy library frontmatter to the PreactHub 0.1 catalog schema.
 * Does not invent verification data.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  mapLegacyCompatibility,
  mapLegacySsr,
  mapLegacyStatus,
  mapLegacyTypescript,
  npmPackageUrl,
  parseLibraryFrontmatterInput,
  type LibraryEntry,
} from "../src/lib/library-schema.ts";

const entriesDir = path.join(process.cwd(), "content", "libraries", "entries");
const dryRun = process.argv.includes("--dry-run");

function serializeEntry(entry: LibraryEntry, body: string): string {
  const frontmatter: Record<string, unknown> = {
    entryType: "library",
    name: entry.name,
    slug: entry.slug,
    shortDescription: entry.shortDescription,
    category: entry.category,
    compatibilityStatus: entry.compatibilityStatus,
    typescriptSupport: entry.typescriptSupport,
    ssrSupport: entry.ssrSupport,
    maintenanceStatus: entry.maintenanceStatus,
    tags: entry.tags,
  };

  if (entry.longDescription) frontmatter.longDescription = entry.longDescription;
  if (entry.categories.length > 1) frontmatter.categories = entry.categories.filter((slug) => slug !== entry.category);
  if (entry.packageName) frontmatter.packageName = entry.packageName;
  if (entry.repositoryUrl) frontmatter.repositoryUrl = entry.repositoryUrl;
  if (entry.npmUrl) frontmatter.npmUrl = entry.npmUrl;
  if (entry.documentationUrl) frontmatter.documentationUrl = entry.documentationUrl;
  if (entry.homepageUrl) frontmatter.homepageUrl = entry.homepageUrl;
  if (entry.license) frontmatter.license = entry.license;
  if (entry.testedPreactVersions.length) frontmatter.testedPreactVersions = entry.testedPreactVersions;
  if (entry.lastVerifiedAt) frontmatter.lastVerifiedAt = entry.lastVerifiedAt;
  if (entry.verificationSource) frontmatter.verificationSource = entry.verificationSource;
  if (entry.installCommand) frontmatter.installCommand = entry.installCommand;
  if (entry.minimalExample) frontmatter.minimalExample = entry.minimalExample;
  if (entry.limitations?.length) frontmatter.limitations = entry.limitations;
  if (entry.alternatives?.length) frontmatter.alternatives = entry.alternatives;
  if (entry.featured) frontmatter.featured = true;
  if (entry.islands) frontmatter.islands = true;
  if (entry.esm) frontmatter.esm = true;
  if (entry.bundleSize) frontmatter.bundleSize = entry.bundleSize;
  if (entry.qualityBadges.length) frontmatter.qualityBadges = entry.qualityBadges;
  if (entry.auditScore !== undefined) frontmatter.auditScore = entry.auditScore;
  if (entry.auditDate) frontmatter.auditDate = entry.auditDate;
  if (entry.auditUrl) frontmatter.auditUrl = entry.auditUrl;
  if (entry.notes?.length) frontmatter.notes = entry.notes;

  return matter.stringify(body.trimEnd() + "\n", frontmatter);
}

function migrateFile(filePath: string): boolean {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  if (parsed.data.entryType !== "library") return false;

  const relative = path.relative(path.join(process.cwd(), "content", "libraries"), filePath).split(path.sep).join("/");
  const entry = parseLibraryFrontmatterInput(parsed.data, relative);
  const next = serializeEntry(entry, parsed.content);

  if (next === raw) return false;
  if (!dryRun) fs.writeFileSync(filePath, next);
  return true;
}

let migrated = 0;
for (const file of fs.readdirSync(entriesDir).filter((name) => name.endsWith(".md"))) {
  if (migrateFile(path.join(entriesDir, file))) migrated += 1;
}

console.log(`${dryRun ? "Would migrate" : "Migrated"} ${migrated} library entries.`);

export { mapLegacyCompatibility, mapLegacySsr, mapLegacyStatus, mapLegacyTypescript, npmPackageUrl };
