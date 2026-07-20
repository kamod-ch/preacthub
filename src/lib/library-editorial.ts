import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { PreactLibrary } from "./libraries";

export interface LibraryEditorialContent {
  whenToUse?: string;
  example?: { code: string; language: string };
  limitations: string[];
  supplementalSections: Array<{ title: string; body: string }>;
}

const STRUCTURED_SECTIONS = new Set([
  "installation",
  "example",
  "known limitations",
  "alternatives",
  "when to use",
  "when to use it",
]);

function normalizeHeading(value: string): string {
  return value.trim().toLowerCase();
}

function extractFencedCode(section: string): { code: string; language: string } | undefined {
  const match = section.match(/```(\w+)?\n([\s\S]*?)```/);
  if (!match) return undefined;
  return {
    language: match[1] || "tsx",
    code: match[2]?.trim() ?? "",
  };
}

function parseLimitationItems(section: string): string[] {
  return section
    .split("\n")
    .map((line) => line.replace(/^[-*]\s+/, "").trim())
    .filter((line) => line.length > 0 && !line.startsWith("```"));
}

function parseParagraph(section: string): string | undefined {
  const text = section
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ")
    .trim();
  return text || undefined;
}

export function extractLibraryEditorialFromMarkdown(
  markdown: string,
  library: Pick<PreactLibrary, "minimalExample" | "limitations" | "notes">,
): LibraryEditorialContent {
  const parsed = matter(markdown);
  const sections: Array<{ key: string; title: string; body: string }> = [];
  let currentHeading = "";
  let currentLines: string[] = [];

  for (const line of parsed.content.split("\n")) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      if (currentHeading) {
        sections.push({
          key: normalizeHeading(currentHeading),
          title: currentHeading,
          body: currentLines.join("\n").trim(),
        });
      }
      currentHeading = heading[1] ?? "";
      currentLines = [];
      continue;
    }
    currentLines.push(line);
  }
  if (currentHeading) {
    sections.push({
      key: normalizeHeading(currentHeading),
      title: currentHeading,
      body: currentLines.join("\n").trim(),
    });
  }

  const sectionMap = new Map(sections.map((section) => [section.key, section]));

  const whenToUseSection =
    sectionMap.get("when to use it") ??
    sectionMap.get("when to use") ??
    (library.notes?.length ? library.notes.join(" ") : undefined);

  const exampleSection = sectionMap.get("example");
  const exampleFromMarkdown = exampleSection ? extractFencedCode(exampleSection.body) : undefined;
  const example = library.minimalExample
    ? { code: library.minimalExample, language: "tsx" }
    : exampleFromMarkdown;

  const limitationsSection = sectionMap.get("known limitations");
  const limitations = library.limitations?.length
    ? library.limitations
    : limitationsSection
      ? parseLimitationItems(limitationsSection.body)
      : [];

  const supplementalSections = sections
    .filter((section) => !STRUCTURED_SECTIONS.has(section.key))
    .map((section) => ({
      title: section.title,
      body: parseParagraph(section.body) ?? section.body.trim(),
    }))
    .filter((section) => section.body.length > 0);

  return {
    whenToUse: whenToUseSection
      ? parseParagraph(typeof whenToUseSection === "string" ? whenToUseSection : whenToUseSection.body) ??
        (typeof whenToUseSection === "string" ? whenToUseSection.trim() : whenToUseSection.body.trim())
      : undefined,
    example: example?.code ? example : undefined,
    limitations,
    supplementalSections,
  };
}

export function loadLibraryEditorial(root: string, library: PreactLibrary): LibraryEditorialContent {
  const absolute = path.join(root, "content", "libraries", library.file);
  if (!fs.existsSync(absolute)) {
    return {
      limitations: library.limitations ?? [],
      supplementalSections: [],
    };
  }
  return extractLibraryEditorialFromMarkdown(fs.readFileSync(absolute, "utf8"), library);
}
