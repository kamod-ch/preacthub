#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const entriesDir = path.join(process.cwd(), "content", "libraries", "entries");
const checkOnly = process.argv.includes("--check");
const missing: string[] = [];
let updated = 0;

function yamlString(value: string): string {
  return JSON.stringify(value);
}

for (const file of fs.readdirSync(entriesDir).filter((name) => name.endsWith(".md")).sort()) {
  const absolute = path.join(entriesDir, file);
  const raw = fs.readFileSync(absolute, "utf8");
  const parsed = matter(raw);
  if (parsed.data.entryType !== "library") continue;

  const title = typeof parsed.data.title === "string" && parsed.data.title.trim();
  const description = typeof parsed.data.description === "string" && parsed.data.description.trim();
  if (title && description) continue;

  missing.push(file);
  if (checkOnly) continue;

  let next = raw;
  if (!title) {
    const name = String(parsed.data.name ?? parsed.data.slug ?? path.basename(file, ".md"));
    next = next.replace(/^(name:[^\n]*\n)/m, `$1title: ${yamlString(name)}\n`);
  }
  if (!description) {
    const summary = String(parsed.data.shortDescription ?? "").trim();
    if (!summary) throw new Error(`${file} has no shortDescription to use as page description`);
    next = next.replace(/^shortDescription:/m, `description: ${yamlString(summary)}\nshortDescription:`);
  }

  fs.writeFileSync(absolute, next);
  updated += 1;
}

if (checkOnly && missing.length > 0) {
  console.error(`Library documentation metadata is missing in ${missing.length} file(s):`);
  for (const file of missing) console.error(`- content/libraries/entries/${file}`);
  console.error("Run: pnpm sync:doc-metadata");
  process.exit(1);
}

console.log(checkOnly
  ? "Library documentation metadata is synchronized."
  : `Updated documentation metadata in ${updated} library entries.`);
