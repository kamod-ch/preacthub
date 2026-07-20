import { describe, expect, it } from "vitest";
import { readFilters, writeFilters } from "../.preactpress/theme/libraries/filter-url-state";

describe("library filter URL state", () => {
  it("round-trips canonical compatibilityStatus filters", () => {
    installWindow("https://example.test/libraries?compatibilityStatus=native&maintenanceStatus=active&sort=name");
    const filters = readFilters();
    expect(filters).toMatchObject({
      compatibilityStatus: "native",
      maintenanceStatus: "active",
      sort: "name",
    });
  });

  it("maps legacy compatibility query params to compatibilityStatus", () => {
    installWindow("https://example.test/libraries?compatibility=native&status=stable");
    const filters = readFilters();
    expect(filters.compatibilityStatus).toBe("native");
  });

  it("writes canonical query params", () => {
    installWindow("https://example.test/libraries");
    writeFilters({
      q: "router",
      category: "routing",
      compatibilityStatus: "native",
      maintenanceStatus: "active",
      sort: "name",
      typescript: true,
      ssr: true,
    });
    expect(window.location.pathname).toBe("/libraries");
    expect(window.location.search).toBe(
      "?q=router&category=routing&compatibilityStatus=native&maintenanceStatus=active&sort=name&typescript=true&ssr=true",
    );
  });
});

function installWindow(url: string) {
  const parsed = new URL(url);
  const storage: Record<string, string> = {};
  global.window = {
    location: {
      pathname: parsed.pathname,
      search: parsed.search,
      href: url,
    },
    history: {
      pushState: (_state: unknown, _title: string, nextUrl: string | URL) => {
        const next = new URL(String(nextUrl), url);
        global.window.location.pathname = next.pathname;
        global.window.location.search = next.search;
        global.window.location.href = next.href;
      },
      replaceState: (_state: unknown, _title: string, nextUrl: string | URL) => {
        const next = new URL(String(nextUrl), url);
        global.window.location.pathname = next.pathname;
        global.window.location.search = next.search;
        global.window.location.href = next.href;
      },
    },
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => true,
    clearTimeout: () => undefined,
    setTimeout: (fn: () => void) => {
      fn();
      return 0;
    },
    localStorage: {
      getItem: (key: string) => storage[key] ?? null,
      setItem: (key: string, value: string) => {
        storage[key] = value;
      },
    },
  } as unknown as Window & typeof globalThis;
}
