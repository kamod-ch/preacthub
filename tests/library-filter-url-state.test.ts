import { afterEach, describe, expect, it, vi } from "vitest";
import { readFilters, writeFilters } from "../.preactpress/theme/libraries/filter-url-state";

function installWindow(href: string) {
  let currentUrl = new URL(href);
  const win = {
    get location() {
      return currentUrl;
    },
    history: {
      replaceState: vi.fn((_state: unknown, _title: string, url: string | URL | null | undefined) => {
        currentUrl = new URL(String(url), currentUrl.origin);
      }),
    },
  };

  vi.stubGlobal("window", win);
  return win;
}

describe("library filter URL state", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("reads all supported filters from the current query string", () => {
    installWindow(
      "https://example.test/libraries?q=router&category=routing&compatibility=native&status=stable&sort=name&typescript=true&ssr=true&islands=true",
    );

    expect(readFilters()).toEqual({
      q: "router",
      category: "routing",
      compatibility: "native",
      status: "stable",
      sort: "name",
      typescript: true,
      ssr: true,
      islands: true,
    });
  });

  it("writes filters to the URL while omitting default values", () => {
    const win = installWindow("https://example.test/libraries?category=ui");

    writeFilters({
      q: "router",
      category: "all",
      compatibility: "all",
      status: "all",
      sort: "recommended",
      typescript: false,
      ssr: true,
      islands: false,
    });

    expect(win.location.pathname).toBe("/libraries");
    expect(win.location.search).toBe("?q=router&ssr=true");
    expect(win.history.replaceState).toHaveBeenCalledWith({}, "", "/libraries?q=router&ssr=true");
  });

  it("uses documented defaults for missing values and preserves current invalid value behavior", () => {
    installWindow("https://example.test/libraries?compatibility=invalid&status=invalid&sort=invalid&typescript=yes");

    expect(readFilters()).toEqual({
      q: undefined,
      category: undefined,
      compatibility: "invalid",
      status: "invalid",
      sort: "invalid",
      typescript: false,
      ssr: false,
      islands: false,
    });
  });
});
