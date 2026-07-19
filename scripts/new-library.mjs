#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const templatePath = path.join(root, "scripts", "templates", "library.md");
const outputDir = path.join(root, "content", "libraries", "entries");

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
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

function fail(message) {
  console.error(`preacthub: ${message}`);
  process.exit(1);
}

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "library";
}

function mapLegacyCompatibility(value) {
  switch (value) {
    case "native":
      return "native";
    case "compat":
      return "compat";
    case "partial":
      return "experimental";
    case "incompatible":
      return "inactive";
    default:
      return "unverified";
  }
}

function mapLegacyMaintenance(status, compatibilityStatus) {
  if (status === "deprecated") return "archived";
  if (compatibilityStatus === "experimental" || status === "experimental") return "active";
  return "active";
}

const args = parseArgs(process.argv.slice(2));
const name = String(args.name ?? "New Library").trim();
const slug = slugify(args.slug ?? name);
const file = path.join(outputDir, `${slug}.md`);
const packageName = String(args.package ?? slug);
const compatibilityStatus = args.compatibilityStatus ?? mapLegacyCompatibility(String(args.compatibility ?? "unverified"));
const maintenanceStatus = args.maintenanceStatus ?? mapLegacyMaintenance(String(args.status ?? "stable"), compatibilityStatus);

if (!fs.existsSync(templatePath)) fail(`missing template: ${path.relative(root, templatePath)}`);
if (fs.existsSync(file)) fail(`file already exists: ${path.relative(root, file)}`);

const template = fs.readFileSync(templatePath, "utf8");
const content = template
  .replaceAll("__NAME__", name)
  .replaceAll("__SLUG__", slug)
  .replaceAll("__DESCRIPTION__", String(args.description ?? "Short description."))
  .replaceAll("__CATEGORY__", String(args.category ?? "ui"))
  .replaceAll("__PACKAGE_NAME__", packageName)
  .replaceAll("__REPOSITORY_URL__", String(args.repository ?? "https://github.com/example/repo"))
  .replaceAll("__DOCUMENTATION_URL__", String(args.documentation ?? "https://example.com/docs"))
  .replaceAll("__HOMEPAGE_URL__", String(args.homepage ?? "https://example.com"))
  .replaceAll("__NPM_URL__", String(args.npm ?? `https://www.npmjs.com/package/${encodeURIComponent(packageName)}`))
  .replaceAll("__COMPATIBILITY_STATUS__", String(compatibilityStatus))
  .replaceAll("__MAINTENANCE_STATUS__", String(maintenanceStatus))
  .replaceAll("__TYPESCRIPT_SUPPORT__", String(args.typescriptSupport ?? (args.typescript === "false" ? "none" : "native")))
  .replaceAll("__SSR_SUPPORT__", String(args.ssrSupport ?? (args.ssr === "false" ? "unsupported" : "supported")))
  .replaceAll("__ISLANDS__", String(args.islands ?? true))
  .replaceAll("__ESM__", String(args.esm ?? true))
  .replaceAll("__LICENSE__", String(args.license ?? "MIT"))
  .replaceAll("__TAG_ONE__", String(args.tag ?? slug));

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(file, content);

console.log(`Created ${path.relative(root, file)}`);
console.log("Next: edit the placeholders, then run npm run validate:catalog && npm run check && npm run build");
