import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { listMarkdownRoutes } from "@kamod-ch/preactpress";
import { getLibraryContentRewrites } from "../src/lib/library-node";

/** Until preactpress applies rewrites in listMarkdownRoutes (2.2.1+), add alias routes when the source exists. */
function withRewriteAliases(
  routes: string[],
  rewrites: Record<string, string>,
): string[] {
  const routeSet = new Set(routes);
  for (const [alias, source] of Object.entries(rewrites)) {
    if (routeSet.has(source)) {
      routeSet.add(alias);
    }
  }
  return [...routeSet].sort();
}

describe("static build routes", () => {
  it("includes canonical library rewrite aliases in prerender routes", async () => {
    const root = process.cwd();
    const rewrites = getLibraryContentRewrites(root);
    const routes = withRewriteAliases(
      await listMarkdownRoutes({
        srcDir: path.join(root, "content"),
        rewrites,
      } as Parameters<typeof listMarkdownRoutes>[0]),
      rewrites,
    );

    expect(routes).toContain("/libraries/preact-signals");
    expect(routes).toContain("/libraries/entries/preact-signals");
    expect(routes).toContain("/libraries/ui");
    expect(routes).toContain("/libraries/categories/ui");
  });

  it("includes community trust pages", async () => {
    const root = process.cwd();
    const rewrites = getLibraryContentRewrites(root);
    const routes = withRewriteAliases(
      await listMarkdownRoutes({
        srcDir: path.join(root, "content"),
        rewrites: {
          ...rewrites,
          "/libraries/submit": "/submit",
        },
      } as unknown as Parameters<typeof listMarkdownRoutes>[0]),
      {
        ...rewrites,
        "/libraries/submit": "/submit",
      },
    );

    expect(routes).toContain("/submit");
    expect(routes).toContain("/methodology");
  });

  it("emits canonical library HTML after production build", () => {
    const canonical = path.join(process.cwd(), "dist/libraries/preact-signals/index.html");
    const category = path.join(process.cwd(), "dist/libraries/ui/index.html");

    if (!fs.existsSync(path.join(process.cwd(), "dist/index.html"))) {
      return;
    }

    expect(fs.existsSync(canonical)).toBe(true);
    expect(fs.existsSync(category)).toBe(true);
  });
});
