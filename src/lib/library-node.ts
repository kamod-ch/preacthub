import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { categories } from "./categories";
import {
  attachLegacyLibraryView,
  compareUrl,
  libraryUrl,
  sortLibraries,
  type LibraryDirectory,
  type LibraryStats,
  type PreactLibrary,
} from "./libraries";
import {
  categorySlugSet,
  parseLibraryFrontmatterInput,
  validateLibraryAlternatives,
  validateLibrarySlugMatchesFile,
  type LibraryEntry,
} from "./library-schema";

export { parseLibraryFrontmatterInput as parseLibraryFrontmatterRaw } from "./library-schema";

export function parseLibraryFrontmatter(frontmatter: unknown, file = "library.md"): PreactLibrary {
  const entry = parseLibraryFrontmatterInput(frontmatter, file);
  validateLibrarySlugMatchesFile(entry, file);
  return attachLegacyLibraryView(entry, libraryUrl(entry.slug), file);
}

export function validateLibraryCollection(libraries: PreactLibrary[]): void {
  const seen = new Map<string, string>();
  const knownSlugs = new Set(libraries.map((library) => library.slug));

  for (const library of libraries) {
    if (categorySlugSet.has(library.slug)) {
      throw new Error(
        `Library slug "${library.slug}" in ${library.file} collides with category "${library.slug}"`,
      );
    }

    const duplicate = seen.get(library.slug);
    if (duplicate) {
      throw new Error(`Duplicate library slug "${library.slug}" in ${duplicate} and ${library.file}`);
    }
    seen.set(library.slug, library.file);
    validateLibraryAlternatives(library, knownSlugs, library.file);
  }
}

function walkMarkdownFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(absolute));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(absolute);
    }
  }

  return files;
}

function markdownFileToRoute(relativeFile: string): string {
  let rel = relativeFile.split(path.sep).join("/");
  rel = rel.replace(/\.md$/i, "");
  rel = rel.replace(/\/index$/i, "");
  return rel ? `/${rel}` : "/";
}

export function getLibraryContentRewrites(root: string): Record<string, string> {
  const contentDir = path.join(root, "content", "libraries");
  const rewrites: Record<string, string> = {};

  const categoryDir = path.join(contentDir, "categories");
  if (fs.existsSync(categoryDir)) {
    for (const file of walkMarkdownFiles(categoryDir)) {
      const slug = path.basename(file, ".md");
      rewrites[`/libraries/${slug}`] = markdownFileToRoute(path.relative(path.join(root, "content"), file));
    }
  }

  const entriesDir = path.join(contentDir, "entries");
  if (fs.existsSync(entriesDir)) {
    const entries: Array<{ library: PreactLibrary; file: string }> = [];
    for (const file of walkMarkdownFiles(entriesDir)) {
      const raw = fs.readFileSync(file, "utf8");
      const parsed = matter(raw);
      if (parsed.data.entryType !== "library") continue;
      entries.push({
        library: parseLibraryFrontmatter(parsed.data, path.relative(contentDir, file)),
        file,
      });
    }

    validateLibraryCollection(entries.map((entry) => entry.library));

    for (const entry of entries) {
      rewrites[entry.library.route] = markdownFileToRoute(path.relative(path.join(root, "content"), entry.file));
    }
  }

  return rewrites;
}

export function getComparePaths(root: string): Array<{ params: { pair: string } }> {
  const directory = loadLibraryDirectory(root);
  const seen = new Set<string>();
  const paths: Array<{ params: { pair: string } }> = [];

  for (const library of directory.libraries) {
    for (const altSlug of library.alternatives ?? []) {
      if (library.slug === altSlug) continue;
      if (!directory.bySlug.has(altSlug)) continue;
      const pair = compareUrl(library.slug, altSlug).replace("/compare/", "");
      if (seen.has(pair)) continue;
      seen.add(pair);
      paths.push({ params: { pair } });
    }
  }

  return paths.sort((a, b) => a.params.pair.localeCompare(b.params.pair));
}

export function loadLibraryEntries(root: string): LibraryEntry[] {
  const contentDir = path.join(root, "content", "libraries", "entries");
  if (!fs.existsSync(contentDir)) return [];

  const entries: LibraryEntry[] = [];
  for (const absolute of walkMarkdownFiles(contentDir)) {
    const raw = fs.readFileSync(absolute, "utf8");
    const parsed = matter(raw);
    if (parsed.data.entryType !== "library") continue;
    const relativeFile = path.relative(path.join(root, "content", "libraries"), absolute).split(path.sep).join("/");
    entries.push(parseLibraryFrontmatterInput(parsed.data, relativeFile));
  }
  return entries;
}

export function loadLibraryDirectory(root: string): LibraryDirectory {
  const contentDir = path.join(root, "content", "libraries");
  const files = walkMarkdownFiles(contentDir).filter(
    (file) => !["index.md", "submit.md"].includes(path.relative(contentDir, file).split(path.sep).join("/")),
  );

  const libraries: PreactLibrary[] = [];
  for (const absolute of files) {
    const raw = fs.readFileSync(absolute, "utf8");
    const parsed = matter(raw);
    if (parsed.data.entryType !== "library") continue;
    libraries.push(
      parseLibraryFrontmatter(parsed.data, path.relative(contentDir, absolute).split(path.sep).join("/")),
    );
  }

  validateLibraryCollection(libraries);

  const sorted = sortLibraries(libraries, "recommended");
  const bySlug = new Map(sorted.map((library) => [library.slug, library]));
  const featured = sorted.filter((library) => library.featured);
  const categorySummaries = categories.map((category) => ({
    ...category,
    count: sorted.filter((library) => library.category === category.slug).length,
  }));
  const stats = {
    total: sorted.length,
    categories: categorySummaries.filter((category) => category.count > 0).length,
    verified: sorted.filter((library) => Boolean(library.lastVerifiedAt)).length,
    native: sorted.filter((library) => library.compatibilityStatus === "native").length,
    communityTested: sorted.filter((library) => library.compatibilityStatus === "community-tested").length,
    unverified: sorted.filter((library) => library.compatibilityStatus === "unverified").length,
  } satisfies LibraryStats;

  return { libraries: sorted, featured, categories: categorySummaries, stats, bySlug };
}

export function validateLibraryCatalog(root: string = process.cwd()): PreactLibrary[] {
  const directory = loadLibraryDirectory(root);
  return directory.libraries;
}
