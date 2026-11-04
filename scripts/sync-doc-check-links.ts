#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  getComparePaths,
  getLibraryContentRewrites,
  loadLibraryEntries,
} from "../src/lib/library-node.ts";

const START = "# preactpress-check-links:start";
const END = "# preactpress-check-links:end";
const checkOnly = process.argv.includes("--check");
const root = process.cwd();
const contentDir = path.join(root, "content");
const indexPath = path.join(contentDir, "index.md");

function walkMarkdownFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkMarkdownFiles(absolute);
    return entry.isFile() && entry.name.endsWith(".md") ? [absolute] : [];
  });
}

function sourceRoute(file: string): string | undefined {
  let relative = path.relative(contentDir, file).split(path.sep).join("/").replace(/\.md$/, "");
  if (relative.split("/").some((segment) => segment.startsWith("[") && segment.endsWith("]"))) {
    return undefined;
  }
  relative = relative.replace(/(^|\/)index$/, "");
  return relative ? `/${relative}` : "/";
}

const routes = new Set<string>();
for (const file of walkMarkdownFiles(contentDir)) {
  const route = sourceRoute(file);
  if (route) routes.add(route);
}
for (const route of Object.keys(getLibraryContentRewrites(root))) routes.add(route);
routes.add("/libraries/submit");
for (const entry of getComparePaths(root)) routes.add(`/compare/${entry.params.pair}`);
for (const entry of loadLibraryEntries(root)) {
  for (const tag of entry.tags) routes.add(`/tags/${tag}`);
}

const links = [...routes]
  .filter((route) => route !== "/")
  .sort()
  .map((route) => `  [${route}](${route})`)
  .join("\n");
const block = `${START}\n# Generated because catalog navigation is rendered by theme components and cannot be\n# discovered by the Markdown-only checker. Run pnpm sync:doc-check-links after route changes.\ncheckLinks: |-\n${links}\n${END}`;

const raw = fs.readFileSync(indexPath, "utf8");
const withoutLegacyBlock = raw.replace(
  /\n?<!-- preactpress-check-links:start -->[\s\S]*?<!-- preactpress-check-links:end -->\n?/,
  "\n",
);
const start = withoutLegacyBlock.indexOf(START);
const end = withoutLegacyBlock.indexOf(END);
const withoutCurrentBlock = start >= 0 && end >= start
  ? `${withoutLegacyBlock.slice(0, start)}${withoutLegacyBlock.slice(end + END.length)}`
  : withoutLegacyBlock;
const frontmatterEnd = withoutCurrentBlock.indexOf("\n---", 4);
if (frontmatterEnd < 0) throw new Error("content/index.md must contain YAML frontmatter");
const next = `${withoutCurrentBlock.slice(0, frontmatterEnd).trimEnd()}\n${block}${withoutCurrentBlock.slice(frontmatterEnd)}`;

if (next === raw) {
  console.log("Documentation check route graph is synchronized.");
} else if (checkOnly) {
  console.error("Documentation check route graph is stale. Run: pnpm sync:doc-check-links");
  process.exit(1);
} else {
  fs.writeFileSync(indexPath, next);
  console.log(`Synchronized ${routes.size - 1} documentation routes in content/index.md.`);
}
