import { describe, expect, it } from "vitest";
import {
  buildSubmissionIssueBody,
  buildSubmissionIssueTitle,
  buildSubmissionIssueUrl,
  buildCorrectionIssueUrl,
  validateLibrarySubmissionForm,
  type LibrarySubmissionFormInput,
} from "../src/lib/library-submission";

const validSubmission: LibrarySubmissionFormInput = {
  projectName: "Preact Signals",
  packageName: "@preact/signals",
  repositoryUrl: "https://github.com/preactjs/signals",
  documentationUrl: "https://preactjs.com/guide/v10/signals/",
  category: "state-management",
  compatibilityStatus: "native",
  testedPreactVersion: "10.26.x",
  explanation: "Official reactive primitives from the Preact team with documented SSR support.",
  isMaintainer: false,
};

describe("library submission form", () => {
  it("accepts a complete valid submission", () => {
    const result = validateLibrarySubmissionForm(validSubmission);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.projectName).toBe("Preact Signals");
    }
  });

  it("requires project name, repository URL and explanation", () => {
    const result = validateLibrarySubmissionForm({
      projectName: "A",
      repositoryUrl: "not-a-url",
      category: "ui",
      compatibilityStatus: "unverified",
      explanation: "too short",
      isMaintainer: false,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.projectName).toMatch(/at least 2 characters/);
      expect(result.errors.repositoryUrl).toBeDefined();
      expect(result.errors.explanation).toMatch(/at least 20 characters/);
    }
  });

  it("allows optional package, documentation and tested version to be omitted", () => {
    const result = validateLibrarySubmissionForm({
      projectName: "Tiny Lib",
      repositoryUrl: "https://github.com/example/tiny-lib",
      category: "developer-tools",
      compatibilityStatus: "community-tested",
      explanation: "Community-maintained notes exist for Preact 10 projects.",
      isMaintainer: true,
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.packageName).toBeUndefined();
      expect(result.data.documentationUrl).toBeUndefined();
      expect(result.data.testedPreactVersion).toBeUndefined();
    }
  });

  it("rejects invalid documentation URLs", () => {
    const result = validateLibrarySubmissionForm({
      ...validSubmission,
      documentationUrl: "ftp://docs.example.com",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.documentationUrl).toMatch(/valid http/);
    }
  });
});

describe("submission issue URL generation", () => {
  it("builds a GitHub issue URL with encoded query parameters", () => {
    const url = buildSubmissionIssueUrl(validSubmission);
    const parsed = new URL(url);
    expect(parsed.origin + parsed.pathname).toBe("https://github.com/kamod-ch/preacthub/issues/new");
    expect(parsed.searchParams.get("template")).toBe("library-submission.yml");
    expect(parsed.searchParams.get("title")).toBe("Library submission: Preact Signals");
    expect(parsed.searchParams.get("package-name")).toBe("@preact/signals");
    expect(parsed.searchParams.get("compatibility-status")).toBe("native");
    expect(parsed.searchParams.get("category")).toBe("state-management");
  });

  it("encodes special characters in titles and explanations", () => {
    const url = buildSubmissionIssueUrl({
      ...validSubmission,
      projectName: 'Signals & "Hooks"',
      explanation: "Works with Preact 10 — tested in SSR + islands (100% coverage).",
    });
    const parsed = new URL(url);

    expect(parsed.searchParams.get("title")).toBe('Library submission: Signals & "Hooks"');
    expect(parsed.searchParams.get("explanation")).toBe(
      "Works with Preact 10 — tested in SSR + islands (100% coverage).",
    );
    expect(buildSubmissionIssueTitle('Signals & "Hooks"')).toBe('Library submission: Signals & "Hooks"');
  });

  it("includes maintainer flag only when checked", () => {
    const maintainerUrl = buildSubmissionIssueUrl({ ...validSubmission, isMaintainer: true });
    const guestUrl = buildSubmissionIssueUrl({ ...validSubmission, isMaintainer: false });

    expect(maintainerUrl).toContain("is-maintainer=true");
    expect(guestUrl).not.toContain("is-maintainer=");
  });

  it("builds a readable issue body preview", () => {
    const body = buildSubmissionIssueBody(validSubmission);
    expect(body).toContain("## Library");
    expect(body).toContain("- Name: Preact Signals");
    expect(body).toContain("- Claimed compatibility: native");
    expect(body).toContain("Official reactive primitives");
  });

  it("builds correction issue URLs with library context", () => {
    const url = buildCorrectionIssueUrl({ slug: "preact-signals", name: "Preact Signals" });
    const parsed = new URL(url);
    expect(parsed.searchParams.get("template")).toBe("library-correction.yml");
    expect(parsed.searchParams.get("library-slug")).toBe("preact-signals");
    expect(parsed.searchParams.get("title")).toBe("Correct Preact Signals catalog entry");
  });
});
