import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const EXPECTED_CANDIDATE_COUNT = 200;

export const PLACEHOLDER_PATTERNS = [
  "Add any setup notes here",
  "Document SSR behavior here",
  "Add limitations here",
  "https://example.com",
  "__NAME__",
  "__SLUG__",
  "Short description.",
];

export function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) {
      out._.push(arg);
      continue;
    }
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      out[key] = true;
      continue;
    }
    out[key] = next;
    i += 1;
  }
  return out;
}

export function slugify(value) {
  return (
    String(value)
      .trim()
      .toLowerCase()
      .replace(/^@/, "")
      .replace(/\//g, "-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "library"
  );
}

export function stripMarkdownInlineCode(value) {
  return String(value).trim().replace(/^`+/, "").replace(/`+$/, "");
}

export function normalizePackageName(name) {
  return stripMarkdownInlineCode(name).toLowerCase();
}

export function normalizeRepositoryUrl(url) {
  if (!url) return "";
  let normalized = String(url).trim();
  normalized = normalized.replace(/#.*$/, "");
  normalized = normalized.replace(/\/+$/, "");
  try {
    const parsed = new URL(normalized);
    parsed.hostname = parsed.hostname.toLowerCase();
    if (parsed.hostname === "www.github.com") parsed.hostname = "github.com";
    const pathname = parsed.pathname.replace(/\.git$/i, "").replace(/\/+$/, "");
    return `${parsed.origin}${pathname}`.replace(/\/+$/, "");
  } catch {
    return normalized.replace(/\.git$/i, "").replace(/\/+$/, "").toLowerCase();
  }
}

export function parseDocAndNpm(cell) {
  const parts = String(cell)
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean);
  let documentationUrl = "";
  let npmUrl = "";
  for (const part of parts) {
    if (/npmjs\.com\/package/i.test(part)) npmUrl = part;
    else if (!documentationUrl) documentationUrl = part;
    else if (!npmUrl && /npmjs\.com/i.test(part)) npmUrl = part;
  }
  return { documentationUrl, npmUrl };
}

export function parseCandidatesMarkdown(source) {
  const lines = source.split(/\r?\n/);
  const meta = {
    schemaVersion: 1,
    expectedCandidateCount: EXPECTED_CANDIDATE_COUNT,
    includedCandidateCount: 0,
    complete: false,
    includedReports: [],
    missingReports: "",
  };

  const yamlBlock = source.match(/```yaml\n([\s\S]*?)```/);
  if (yamlBlock) {
    for (const line of yamlBlock[1].split("\n")) {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (key === "expectedCandidateCount" || key === "includedCandidateCount" || key === "schemaVersion") {
        meta[key] = Number(rawValue);
      } else if (key === "complete") {
        meta.complete = rawValue.trim() === "true";
      } else if (key === "includedReports") {
        meta.includedReports = rawValue
          .replace(/^\[/, "")
          .replace(/\]$/, "")
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean);
      } else if (key === "missingReports") {
        meta.missingReports = rawValue.trim();
      } else {
        meta[key] = rawValue.trim();
      }
    }
  }

  const candidates = [];
  for (const line of lines) {
    if (!/^\|\s*\d+\s*\|/.test(line)) continue;
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());
    if (cells.length < 7) continue;
    const [indexRaw, reportDate, priorityRaw, packageName, reportedCategory, repositoryUrl, docsCell, notes] = cells;
    if (indexRaw === "#" || indexRaw === "---") continue;

    const { documentationUrl, npmUrl } = parseDocAndNpm(docsCell);
    const reportedLimitations = [];
    const limitationMatch = String(notes).match(/verify ([^.]+)\./i);
    if (limitationMatch) reportedLimitations.push(limitationMatch[1]);

    const cleanPackageName = stripMarkdownInlineCode(packageName);
    candidates.push({
      index: Number(indexRaw),
      name: cleanPackageName,
      packageName: cleanPackageName,
      repositoryUrl,
      documentationUrl,
      npmUrl,
      reportDate,
      priority: Number(priorityRaw),
      reportedCategory,
      reportedCompatibility: notes,
      reportedActivity: "",
      reportedLimitations,
      status: "pending",
      importDecision: "pending",
      decisionReason: "",
      mappedCategory: "",
    });
  }

  meta.includedCandidateCount = candidates.length;
  return { meta, candidates };
}

export function loadExistingCatalog(root) {
  const entriesDir = path.join(root, "content", "libraries", "entries");
  const entries = [];
  if (!fs.existsSync(entriesDir)) return entries;

  for (const file of fs.readdirSync(entriesDir).filter((name) => name.endsWith(".md"))) {
    const absolute = path.join(entriesDir, file);
    const parsed = matter(fs.readFileSync(absolute, "utf8"));
    if (parsed.data.entryType !== "library") continue;
    entries.push({
      file: path.relative(root, absolute),
      slug: parsed.data.slug,
      name: parsed.data.name,
      packageName: parsed.data.packageName,
      repositoryUrl: parsed.data.repositoryUrl ?? parsed.data.repository,
    });
  }
  return entries;
}

const MONOREPO_ALIASES = {
  "statelyai/xstate": ["@xstate/store-preact", "@xstate/store-react"],
  "jovidecroock/pracht": ["@pracht/test", "@pracht/vite-plugin"],
  "tanstack/charts": ["@tanstack/charts"],
};

export function classifyCandidate(candidate, existing) {
  const pkg = normalizePackageName(candidate.packageName);
  const repo = normalizeRepositoryUrl(candidate.repositoryUrl);

  const byPackage = existing.find(
    (entry) => entry.packageName && normalizePackageName(entry.packageName) === pkg,
  );
  if (byPackage) {
    return {
      importDecision: "rejected",
      decisionReason: `Package already listed as slug "${byPackage.slug}" (${byPackage.file}).`,
    };
  }

  const byRepo = existing.find(
    (entry) => entry.repositoryUrl && normalizeRepositoryUrl(entry.repositoryUrl) === repo,
  );
  if (byRepo && !candidate.packageName.includes("/")) {
    return {
      importDecision: "needs-review",
      decisionReason: `Repository matches existing slug "${byRepo.slug}" but package name differs.`,
    };
  }

  const bySlug = existing.find((entry) => entry.slug === slugify(candidate.packageName));
  if (bySlug) {
    return {
      importDecision: "rejected",
      decisionReason: `Slug "${bySlug.slug}" already exists (${bySlug.file}).`,
    };
  }

  if (candidate.packageName === "@pracht/test" || candidate.packageName === "@pracht/vite-plugin") {
    const pracht = existing.find((entry) => entry.slug === "pracht");
    if (pracht) {
      return {
        importDecision: "enrich-existing",
        decisionReason: `Subpackage of existing Pracht entry (${pracht.slug}); extend that entry instead of creating a standalone catalog page.`,
      };
    }
  }

  if (candidate.packageName === "@xstate/store-preact") {
    const xstate = existing.find((entry) => entry.slug === "xstate");
    if (xstate) {
      return {
        importDecision: "new",
        decisionReason:
          "Official dedicated Preact adapter package; complements the existing XState core entry with framework-specific bindings.",
      };
    }
  }

  if (candidate.packageName === "@tanstack/charts/preact") {
    return {
      importDecision: "new",
      decisionReason:
        "Preact adapter is exported from @tanstack/charts/preact subpath; catalog entry uses @tanstack/charts as installable packageName.",
      packageName: "@tanstack/charts",
      name: "TanStack Charts (Preact)",
    };
  }

  for (const [repoKey, packages] of Object.entries(MONOREPO_ALIASES)) {
    if (repo.includes(repoKey) && packages.includes(candidate.packageName)) {
      const sibling = existing.find(
        (entry) =>
          entry.repositoryUrl &&
          normalizeRepositoryUrl(entry.repositoryUrl).includes(repoKey) &&
          entry.packageName !== candidate.packageName,
      );
      if (sibling) {
        return {
          importDecision: "new",
          decisionReason: `Standalone package within monorepo already tracked as "${sibling.slug}"; this package exposes a separate Preact-facing API.`,
        };
      }
    }
  }

  return {
    importDecision: "new",
    decisionReason: "No matching package, repository or slug in the current catalog.",
  };
}

export function mapReportedCategory(reportedCategory) {
  const normalized = String(reportedCategory).toLowerCase();
  if (normalized.includes("chart")) return "charts";
  if (normalized.includes("test")) return "testing";
  if (normalized.includes("state") || normalized.includes("signal")) return "state-management";
  if (normalized.includes("ssr") || normalized.includes("full-stack")) return "ssr";
  if (normalized.includes("editor") || normalized.includes("rich text")) return "editors";
  if (normalized.includes("build") || normalized.includes("compiler") || normalized.includes("rsbuild") || normalized.includes("vite plugin") || normalized.includes("hmr")) {
    return "build-tools";
  }
  if (normalized.includes("grid") || normalized.includes("spreadsheet")) return "ui";
  if (normalized.includes("pdf") || normalized.includes("document")) return "developer-tools";
  if (normalized.includes("styling")) return "developer-tools";
  if (normalized.includes("browser extension")) return "developer-tools";
  if (normalized.includes("mobile")) return "state-management";
  if (normalized.includes("accessibility") || normalized.includes("developer tool")) return "developer-tools";
  if (normalized.includes("documentation")) return "developer-tools";
  if (normalized.includes("distribution")) return "developer-tools";
  if (normalized.includes("opencomponents")) return "developer-tools";
  if (normalized.includes("microfrontend")) return "developer-tools";
  if (normalized.includes("e-commerce") || normalized.includes("shopify")) return "developer-tools";
  if (normalized.includes("data import") || normalized.includes("csv")) return "forms";
  if (normalized.includes("education") || normalized.includes("assessment")) return "ui";
  if (normalized.includes("enterprise ui") || normalized.includes("accessible ui")) return "ui";
  if (normalized.includes("ai /")) return "developer-tools";
  if (normalized.includes("content") || normalized.includes("hast")) return "developer-tools";
  if (normalized.includes("ssg") || normalized.includes("islands")) return "ssr";
  if (normalized.includes("monorepos") || normalized.includes("nx")) return "developer-tools";
  if (normalized.includes("ui") || normalized.includes("design system") || normalized.includes("toast")) return "ui";
  if (normalized.includes("framework interoperability")) return "developer-tools";
  return "developer-tools";
}

export function findDuplicateCandidates(candidates) {
  const byPackage = new Map();
  const byRepo = new Map();
  const duplicates = [];

  for (const candidate of candidates) {
    const pkg = normalizePackageName(candidate.packageName);
    const repo = normalizeRepositoryUrl(candidate.repositoryUrl);

    if (byPackage.has(pkg)) {
      duplicates.push({
        type: "packageName",
        value: pkg,
        indices: [byPackage.get(pkg).index, candidate.index],
      });
    } else {
      byPackage.set(pkg, candidate);
    }

    if (repo) {
      if (byRepo.has(repo)) {
        duplicates.push({
          type: "repositoryUrl",
          value: repo,
          indices: [byRepo.get(repo).index, candidate.index],
        });
      } else {
        byRepo.set(repo, candidate);
      }
    }
  }

  return duplicates;
}

export function assertNoPlaceholders(content) {
  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (content.includes(pattern)) {
      throw new Error(`Placeholder content detected: ${JSON.stringify(pattern)}`);
    }
  }
}

export function buildImportReport({ meta, candidates, existing, duplicates }) {
  const byPriority = { 1: 0, 2: 0, 3: 0 };
  const byCategory = new Map();
  const decisions = { new: 0, "enrich-existing": 0, "replace-or-redirect": 0, rejected: 0, "needs-review": 0, pending: 0 };
  const existingMatches = [];
  const unclear = [];
  const upstreamIssues = [];

  for (const candidate of candidates) {
    byPriority[candidate.priority] = (byPriority[candidate.priority] ?? 0) + 1;
    byCategory.set(candidate.reportedCategory, (byCategory.get(candidate.reportedCategory) ?? 0) + 1);
    decisions[candidate.importDecision] = (decisions[candidate.importDecision] ?? 0) + 1;

    if (candidate.importDecision === "rejected" || candidate.importDecision === "enrich-existing") {
      existingMatches.push(candidate);
    }
    if (candidate.importDecision === "needs-review") unclear.push(candidate);
    if (candidate.upstreamStatus === "unreachable" || candidate.upstreamStatus === "missing") {
      upstreamIssues.push(candidate);
    }
  }

  const lines = [
    "# PreactHub candidate import report",
    "",
    `Generated from \`docs/import/preacthub-candidates.md\` on ${new Date().toISOString().slice(0, 10)}.`,
    "",
    "## Summary",
    "",
    `- Expected candidates (source metadata): **${meta.expectedCandidateCount}**`,
    `- Parsed candidates in file: **${candidates.length}**`,
    `- Source marked complete: **${meta.complete ? "yes" : "no"}**`,
    `- Missing report period: **${meta.missingReports || "none declared"}**`,
    `- Existing catalog entries scanned: **${existing.length}**`,
    "",
    "## Counts by priority",
    "",
    "| Priority | Count |",
    "|---:|---:|",
    `| 1 | ${byPriority[1] ?? 0} |`,
    `| 2 | ${byPriority[2] ?? 0} |`,
    `| 3 | ${byPriority[3] ?? 0} |`,
    "",
    "## Counts by reported category",
    "",
    "| Reported category | Count |",
    "|---|---:|",
    ...[...byCategory.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([category, count]) => `| ${category} | ${count} |`),
    "",
    "## Import decisions",
    "",
    "| Decision | Count |",
    "|---|---:|",
    ...Object.entries(decisions).map(([decision, count]) => `| ${decision} | ${count} |`),
    "",
  ];

  if (candidates.length !== EXPECTED_CANDIDATE_COUNT) {
    lines.push(
      "## Blocking discrepancy",
      "",
      `The source file declares **${EXPECTED_CANDIDATE_COUNT}** expected candidates but only **${candidates.length}** table rows were parsed.`,
      "Add the missing daily reports (2026-08-22 through 2026-09-07) before running a full catalog import.",
      "",
    );
  }

  if (duplicates.length) {
    lines.push("## Possible duplicate candidates", "");
    for (const duplicate of duplicates) {
      lines.push(`- ${duplicate.type} \`${duplicate.value}\` — rows ${duplicate.indices.join(", ")}`);
    }
    lines.push("");
  }

  if (existingMatches.length) {
    lines.push("## Already present or merge candidates", "");
    for (const candidate of existingMatches) {
      lines.push(`- \`${candidate.packageName}\` → **${candidate.importDecision}**: ${candidate.decisionReason}`);
    }
    lines.push("");
  }

  if (unclear.length) {
    lines.push("## Needs review", "");
    for (const candidate of unclear) {
      lines.push(`- \`${candidate.packageName}\` — ${candidate.decisionReason}`);
    }
    lines.push("");
  }

  if (upstreamIssues.length) {
    lines.push("## Upstream issues", "");
    for (const candidate of upstreamIssues) {
      lines.push(`- \`${candidate.packageName}\` — ${candidate.upstreamStatus}: ${candidate.upstreamNote ?? ""}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}
