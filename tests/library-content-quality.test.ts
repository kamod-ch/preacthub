import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";

const entriesDir = path.join(process.cwd(), "content", "libraries", "entries");
const requiredHeadings = [
  "Introduction",
  "Installation",
  "Preact configuration",
  "Example",
  "SSR notes",
];
const scaffoldPlaceholders = [
  "Add any setup notes here",
  "Document SSR behavior here",
  "Add limitations here",
  "https://example.com",
];

function libraryEntries() {
  return fs
    .readdirSync(entriesDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const absolute = path.join(entriesDir, file);
      const raw = fs.readFileSync(absolute, "utf8");
      const parsed = matter(raw);
      return { file: path.relative(process.cwd(), absolute), raw, content: parsed.content, data: parsed.data };
    })
    .filter((entry) => entry.data.entryType === "library");
}

function hasHeading(content: string, heading: string): boolean {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^##\\s+${escaped}\\s*$`, "im").test(content);
}

describe("library content quality", () => {
  const entries = libraryEntries();
  const slugs = new Set(entries.map((entry) => entry.data.slug));

  it("includes required detail-page headings", () => {
    const missing = entries.flatMap((entry) =>
      requiredHeadings
        .filter((heading) => !hasHeading(entry.content, heading))
        .map((heading) => `${entry.file}: missing ## ${heading}`),
    );

    expect(missing).toEqual([]);
  });

  it("includes islands notes for libraries that claim islands support", () => {
    const missing = entries
      .filter((entry) => entry.data.islands === true && !hasHeading(entry.content, "Islands notes"))
      .map((entry) => `${entry.file}: missing ## Islands notes`);

    expect(missing).toEqual([]);
  });

  it("does not contain scaffold placeholder text", () => {
    const leftovers = entries.flatMap((entry) =>
      scaffoldPlaceholders
        .filter((placeholder) => entry.raw.includes(placeholder))
        .map((placeholder) => `${entry.file}: contains placeholder ${JSON.stringify(placeholder)}`),
    );

    expect(leftovers).toEqual([]);
  });

  it("only references existing library slugs as alternatives", () => {
    const invalid = entries.flatMap((entry) =>
      (Array.isArray(entry.data.alternatives) ? entry.data.alternatives : [])
        .filter((slug) => typeof slug !== "string" || !slugs.has(slug))
        .map((slug) => `${entry.file}: unknown alternative ${JSON.stringify(slug)}`),
    );

    expect(invalid).toEqual([]);
  });

  it("requires audit evidence when ai-ready badge is set", () => {
    const invalid = entries
      .filter((entry) => Array.isArray(entry.data.qualityBadges) && entry.data.qualityBadges.includes("ai-ready"))
      .flatMap((entry) => {
        const issues: string[] = [];
        if (!entry.data.auditDate) issues.push(`${entry.file}: ai-ready missing auditDate`);
        if (typeof entry.data.auditScore !== "number" || entry.data.auditScore < 80) {
          issues.push(`${entry.file}: ai-ready missing auditScore >= 80`);
        }
        return issues;
      });

    expect(invalid).toEqual([]);
  });
});
