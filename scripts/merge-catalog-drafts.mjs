#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "./lib/candidate-import-lib.mjs";

const root = process.cwd();
const args = parseArgs(process.argv.slice(2));
const manifestPath = path.resolve(root, String(args.manifest ?? "data/import/preacthub-candidates.json"));
const draftsPath = path.resolve(
  root,
  String(args.drafts ?? args._[0] ?? "data/import/batch-01-catalog-drafts.json"),
);

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const drafts = JSON.parse(fs.readFileSync(draftsPath, "utf8"));

let merged = 0;
for (const candidate of manifest.candidates) {
  const draft = drafts[candidate.packageName] ?? drafts[`${candidate.packageName}/preact`];
  if (!draft) continue;
  candidate.catalogDraft = draft;
  merged += 1;
}

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Merged ${merged} catalogDraft entries from ${path.relative(root, draftsPath)}`);
