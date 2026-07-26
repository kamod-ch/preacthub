import { describe, expect, it } from "vitest";
import {
  countActiveDirectoryFilters,
  createDefaultDirectoryFilters,
  directoryEmptyStateMessage,
  DIRECTORY_SORT_OPTIONS,
  hasActiveDirectoryFilters,
  parseDirectoryFilters,
  serializeDirectoryFilters,
} from "../src/lib/directory-filters";

describe("directory filters", () => {
  it("exposes directory sort options including AI sorts", () => {
    expect(DIRECTORY_SORT_OPTIONS).toEqual([
      "recommended",
      "most-popular",
      "recently-updated",
      "recently-verified",
      "name",
    ]);
  });

  it("parses and serializes query params without duplicating filter state", () => {
    const params = new URLSearchParams(
      "q=router&category=routing&compatibilityStatus=native&maintenanceStatus=active&sort=name&typescript=true&ssr=true&page=2",
    );
    const filters = parseDirectoryFilters(params);
    expect(filters).toMatchObject({
      q: "router",
      category: "routing",
      compatibilityStatus: "native",
      maintenanceStatus: "active",
      sort: "name",
      typescript: true,
      ssr: true,
      page: 2,
    });

    const roundTrip = parseDirectoryFilters(serializeDirectoryFilters(filters));
    expect(roundTrip).toEqual(filters);
  });

  it("counts active filters and detects empty states", () => {
    const defaults = createDefaultDirectoryFilters();
    expect(countActiveDirectoryFilters(defaults)).toBe(0);
    expect(hasActiveDirectoryFilters(defaults)).toBe(false);
    expect(directoryEmptyStateMessage(defaults)).toBe("No tools match the current filters");

    const filtered = { ...defaults, q: "missing-library", compatibilityStatus: "native" as const };
    expect(countActiveDirectoryFilters(filtered)).toBe(2);
    expect(hasActiveDirectoryFilters(filtered)).toBe(true);
    expect(directoryEmptyStateMessage(filtered)).toBe('No tools found for "missing-library"');
  });
});
