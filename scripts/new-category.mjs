#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const templatePath = path.join(root, "scripts", "templates", "category.md");
const outputDir = path.join(root, "content", "libraries", "categories");
const categoriesFile = path.join(root, "src", "lib", "categories.ts");

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
    .replace(/^-+|-+$/g, "") || "category";
}

const args = parseArgs(process.argv.slice(2));
const name = String(args.name ?? "New Category").trim();
const slug = slugify(args.slug ?? name);
const title = String(args.title ?? name).trim();
const description = String(args.description ?? `Discover ${title.toLowerCase()} libraries for Preact.`);
const body = String(args.body ?? `${title} libraries and implementation guides.`);
const icon = String(args.icon ?? "◧");
const file = path.join(outputDir, `${slug}.md`);

if (!fs.existsSync(templatePath)) fail(`missing template: ${path.relative(root, templatePath)}`);
if (!fs.existsSync(categoriesFile)) fail(`missing categories file: ${path.relative(root, categoriesFile)}`);
if (fs.existsSync(file)) fail(`file already exists: ${path.relative(root, file)}`);

const source = fs.readFileSync(categoriesFile, "utf8");
if (source.includes(`slug: "${slug}"`)) fail(`category slug already exists in ${path.relative(root, categoriesFile)}`);

const template = fs.readFileSync(templatePath, "utf8")
  .replaceAll("__TITLE__", title)
  .replaceAll("__DESCRIPTION__", description)
  .replaceAll("__BODY__", body);

const marker = "] as const satisfies readonly LibraryCategory[];";
if (!source.includes(marker)) fail("could not find categories array marker");

const insertion = `  {\n    slug: "${slug}",\n    name: "${name}",\n    description: "${description.replaceAll('"', '\\"')}",\n    icon: "${icon.replaceAll('"', '\\"')}",\n  },\n`;
const nextSource = source.replace(marker, `${insertion}${marker}`);

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(file, template);
fs.writeFileSync(categoriesFile, nextSource);

console.log(`Created ${path.relative(root, file)}`);
console.log(`Updated ${path.relative(root, categoriesFile)}`);
console.log("Next: review category copy, then run pnpm run typecheck && pnpm run check && pnpm run build");
