import { describe, expect, it } from "vitest";
import {
  buildDetailTocEntries,
  groupEditorialSections,
  LIBRARY_DETAIL_TABS,
} from "../src/lib/detail-sections";

describe("detail sections", () => {
  it("groups editorial sections by topic", () => {
    const groups = groupEditorialSections([
      { title: "Introduction", body: "Overview copy" },
      { title: "SSR notes", body: "SSR guidance" },
      { title: "Islands notes", body: "Islands guidance" },
      { title: "Preact configuration", body: "Alias setup" },
      { title: "Custom section", body: "Extra detail" },
    ]);

    expect(groups.map((group) => group.id)).toEqual(["overview", "runtime", "integration", "other"]);
    expect(groups.find((group) => group.id === "runtime")?.sections).toHaveLength(2);
  });

  it("filters tabs based on available content", () => {
    const tabs = buildDetailTocEntries(LIBRARY_DETAIL_TABS, false, true, false);
    expect(tabs.map((tab) => tab.id)).toEqual(["overview", "compatibility"]);
  });
});
