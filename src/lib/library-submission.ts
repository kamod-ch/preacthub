import { z } from "zod";
import { categories, type LibraryCategorySlug } from "./categories";
import { compatibilityStatusValues, type CompatibilityStatus } from "./library-schema";

export const PREACTHUB_GITHUB_REPO = "kamod-ch/preacthub";
export const LIBRARY_SUBMISSION_TEMPLATE = "library-submission.yml";
export const LIBRARY_CORRECTION_TEMPLATE = "library-correction.yml";

const categorySlugValues = categories.map((category) => category.slug) as [
  LibraryCategorySlug,
  ...LibraryCategorySlug[],
];

const optionalTrimmedString = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().optional(),
);

const optionalHttpUrl = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z
    .string()
    .url("Enter a valid http(s) URL")
    .refine((url) => /^https?:\/\//.test(url), "Enter a valid http(s) URL")
    .optional(),
);

export const librarySubmissionFormSchema = z.object({
  projectName: z.string().trim().min(2, "Project name must be at least 2 characters"),
  packageName: optionalTrimmedString,
  repositoryUrl: z
    .string()
    .trim()
    .url("Enter a valid repository URL")
    .refine((value) => /^https?:\/\//.test(value), "Repository URL must start with http:// or https://"),
  documentationUrl: optionalHttpUrl,
  category: z.enum(categorySlugValues),
  compatibilityStatus: z.enum(compatibilityStatusValues),
  testedPreactVersion: optionalTrimmedString,
  explanation: z
    .string()
    .trim()
    .min(
      20,
      "Add at least 20 characters explaining compatibility and why this belongs in the catalog",
    ),
  isMaintainer: z.boolean(),
});

export type LibrarySubmissionFormInput = z.infer<typeof librarySubmissionFormSchema>;

export type LibrarySubmissionFieldErrors = Partial<Record<keyof LibrarySubmissionFormInput, string>>;

export function validateLibrarySubmissionForm(input: unknown):
  | { success: true; data: LibrarySubmissionFormInput }
  | { success: false; errors: LibrarySubmissionFieldErrors } {
  const result = librarySubmissionFormSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: LibrarySubmissionFieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !errors[key as keyof LibrarySubmissionFormInput]) {
      errors[key as keyof LibrarySubmissionFormInput] = issue.message;
    }
  }
  return { success: false, errors };
}

export function buildSubmissionIssueTitle(projectName: string): string {
  return `Library submission: ${projectName.trim()}`;
}

export function buildSubmissionIssueBody(data: LibrarySubmissionFormInput): string {
  return [
    "## Library",
    `- Name: ${data.projectName}`,
    `- Package: ${data.packageName ?? "—"}`,
    `- Repository: ${data.repositoryUrl}`,
    `- Documentation: ${data.documentationUrl ?? "—"}`,
    "",
    "## Compatibility",
    `- Category: ${data.category}`,
    `- Claimed compatibility: ${data.compatibilityStatus}`,
    `- Tested Preact version: ${data.testedPreactVersion ?? "—"}`,
    `- Submitter is maintainer: ${data.isMaintainer ? "yes" : "no"}`,
    "",
    "## Explanation",
    data.explanation,
  ].join("\n");
}

export function buildSubmissionIssueUrl(
  data: LibrarySubmissionFormInput,
  repo: string = PREACTHUB_GITHUB_REPO,
  template: string = LIBRARY_SUBMISSION_TEMPLATE,
): string {
  const url = new URL(`https://github.com/${repo}/issues/new`);
  url.searchParams.set("template", template);
  url.searchParams.set("title", buildSubmissionIssueTitle(data.projectName));
  url.searchParams.set("library-name", data.projectName);
  if (data.packageName) url.searchParams.set("package-name", data.packageName);
  url.searchParams.set("repository", data.repositoryUrl);
  if (data.documentationUrl) url.searchParams.set("documentation", data.documentationUrl);
  url.searchParams.set("category", data.category);
  url.searchParams.set("compatibility-status", data.compatibilityStatus);
  if (data.testedPreactVersion) url.searchParams.set("tested-preact-version", data.testedPreactVersion);
  url.searchParams.set("explanation", data.explanation);
  if (data.isMaintainer) url.searchParams.set("is-maintainer", "true");
  url.searchParams.set("body", buildSubmissionIssueBody(data));
  return url.toString();
}

export function buildBlankSubmissionIssueUrl(
  repo: string = PREACTHUB_GITHUB_REPO,
  template: string = LIBRARY_SUBMISSION_TEMPLATE,
): string {
  const url = new URL(`https://github.com/${repo}/issues/new`);
  url.searchParams.set("template", template);
  return url.toString();
}

export function buildCorrectionIssueUrl(
  library: Pick<{ slug: string; name: string }, "slug" | "name">,
  repo: string = PREACTHUB_GITHUB_REPO,
  template: string = LIBRARY_CORRECTION_TEMPLATE,
): string {
  const url = new URL(`https://github.com/${repo}/issues/new`);
  url.searchParams.set("template", template);
  url.searchParams.set("title", `Correct ${library.name} catalog entry`);
  url.searchParams.set("library-slug", library.slug);
  url.searchParams.set("library-name", library.name);
  return url.toString();
}

export function compatibilityStatusOptionLabel(value: CompatibilityStatus): string {
  switch (value) {
    case "native":
      return "Native Preact";
    case "compat":
      return "Works with preact/compat";
    case "community-tested":
      return "Community tested";
    case "experimental":
      return "Experimental";
    case "unverified":
      return "Unverified (not yet reviewed)";
    case "inactive":
      return "Inactive / not recommended";
  }
}
