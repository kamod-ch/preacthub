#!/usr/bin/env node
/**
 * Prints a verification checklist for a library entry (dry-run by default).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const AI_READY_MIN_AUDIT_SCORE = 80;

const entriesDir = path.join(process.cwd(), "content", "libraries", "entries");

function parseArgs(argv) {
  const slugIndex = argv.indexOf("--slug");
  return {
    slug: slugIndex >= 0 ? argv[slugIndex + 1] : undefined,
    dryRun: argv.includes("--dry-run") || !argv.includes("--write"),
  };
}

function loadEntry(slug) {
  const file = path.join(entriesDir, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  return { file, raw, data: parsed.data };
}

function resolveCompatibilityStatus(data) {
  return data.compatibilityStatus ?? data.compatibility ?? "unknown";
}

function resolveMaintenanceStatus(data) {
  return data.maintenanceStatus ?? data.status ?? "unknown";
}

function resolveTypescriptSupport(data) {
  if (data.typescriptSupport) return data.typescriptSupport;
  if (typeof data.typescript === "boolean") return data.typescript ? "native" : "none";
  return "unknown";
}

function resolveSsrSupport(data) {
  if (data.ssrSupport) return data.ssrSupport;
  if (typeof data.ssr === "boolean") return data.ssr ? "supported" : "unsupported";
  return "unknown";
}

function printChecklist(entry) {
  const data = entry.data;
  const compatibilityStatus = resolveCompatibilityStatus(data);
  const maintenanceStatus = resolveMaintenanceStatus(data);
  const typescriptSupport = resolveTypescriptSupport(data);
  const ssrSupport = resolveSsrSupport(data);
  const lastVerifiedAt = data.lastVerifiedAt ?? data.lastVerified ?? "not set";

  console.log(`Library verification checklist: ${data.name} (${data.slug})`);
  console.log(`File: ${entry.file}`);
  console.log("");
  console.log("Metadata snapshot:");
  console.log(`- compatibilityStatus: ${compatibilityStatus}`);
  console.log(`- maintenanceStatus: ${maintenanceStatus}`);
  console.log(`- typescriptSupport/ssrSupport/islands/esm: ${typescriptSupport}/${ssrSupport}/${data.islands}/${data.esm}`);
  console.log(`- lastVerifiedAt: ${lastVerifiedAt}`);
  console.log(`- verificationSource: ${data.verificationSource ?? "not set"}`);
  console.log(`- testedPreactVersions: ${(data.testedPreactVersions ?? []).join(", ") || "not set"}`);
  console.log(`- qualityBadges: ${(data.qualityBadges ?? []).join(", ") || "none"}`);
  console.log(`- auditScore/auditDate: ${data.auditScore ?? "not set"} / ${data.auditDate ?? "not set"}`);
  console.log("");
  console.log("Manual verification steps:");
  console.log(`1. npm install ${data.packageName ?? data.slug}`);
  console.log("2. Import the primary API in a small Preact/Vite reproduction.");
  if (ssrSupport === "supported" || ssrSupport === "limited") {
    console.log("3. Verify SSR rendering path.");
  }
  if (data.islands) console.log("4. Verify island-scoped initialization and cleanup.");
  console.log("5. Record testedPreactVersions when verification is complete.");
  console.log("6. Set lastVerifiedAt and verificationSource only after completing the checks above.");
  const docsUrl = data.documentationUrl ?? data.documentation ?? data.homepageUrl ?? data.homepage;
  if (docsUrl) {
    console.log("");
    console.log("AI readiness audit (optional):");
    console.log(`- kamod-ai-audit audit ${docsUrl} --output ./reports/${data.slug}`);
    console.log(`- To award ai-ready: auditScore >= ${AI_READY_MIN_AUDIT_SCORE}, auditDate set, no high issues in agent_readiness/accessibility/structured_data`);
  }
  if ((data.qualityBadges ?? []).includes("ai-ready")) {
    if (data.auditScore === undefined || data.auditScore < AI_READY_MIN_AUDIT_SCORE || !data.auditDate) {
      console.warn("\nWarning: ai-ready badge is present but audit evidence is incomplete.");
    }
  } else if (data.auditScore !== undefined && data.auditScore >= AI_READY_MIN_AUDIT_SCORE) {
    console.warn("\nNote: auditScore meets ai-ready threshold but badge is not set.");
  }
}

const { slug, dryRun } = parseArgs(process.argv.slice(2));
if (!slug) {
  console.error("Usage: npm run verify:library -- --slug <slug> [--dry-run]");
  process.exitCode = 1;
} else {
  const entry = loadEntry(slug);
  if (!entry) {
    console.error(`Unknown library slug: ${slug}`);
    process.exitCode = 1;
  } else {
    printChecklist(entry);
    if (dryRun) console.log("\nDry run only — no files were modified.");
  }
}
