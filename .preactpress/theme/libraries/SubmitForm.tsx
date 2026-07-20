import { useMemo, useState } from "preact/hooks";
import { Button, Input, NativeSelect, Textarea } from "@kamod-ch/ui";
import { categories, type LibraryCategorySlug } from "../../../src/lib/categories";
import { compatibilityStatusValues } from "../../../src/lib/libraries";
import {
  buildBlankSubmissionIssueUrl,
  buildSubmissionIssueBody,
  buildSubmissionIssueUrl,
  compatibilityStatusOptionLabel,
  validateLibrarySubmissionForm,
  type LibrarySubmissionFieldErrors,
  type LibrarySubmissionFormInput,
} from "../../../src/lib/library-submission";

const emptyForm: LibrarySubmissionFormInput = {
  projectName: "",
  packageName: undefined,
  repositoryUrl: "",
  documentationUrl: undefined,
  category: categories[0]?.slug ?? "ui",
  compatibilityStatus: "unverified",
  testedPreactVersion: undefined,
  explanation: "",
  isMaintainer: false,
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p class="ph-field-error" role="alert">{message}</p>;
}

export function SubmitForm({ issueUrl }: { issueUrl: string }) {
  const [form, setForm] = useState<LibrarySubmissionFormInput>(emptyForm);
  const [packageNameInput, setPackageNameInput] = useState("");
  const [documentationInput, setDocumentationInput] = useState("");
  const [testedVersionInput, setTestedVersionInput] = useState("");
  const [touched, setTouched] = useState<Partial<Record<keyof LibrarySubmissionFormInput, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validation = useMemo(() => {
    return validateLibrarySubmissionForm({
      ...form,
      packageName: packageNameInput,
      documentationUrl: documentationInput,
      testedPreactVersion: testedVersionInput,
    });
  }, [documentationInput, form, packageNameInput, testedVersionInput]);

  const errors: LibrarySubmissionFieldErrors = validation.success ? {} : validation.errors;
  const showError = (field: keyof LibrarySubmissionFormInput) =>
    Boolean(errors[field] && (submitAttempted || touched[field]));

  const previewBody = validation.success ? buildSubmissionIssueBody(validation.data) : "";
  const previewUrl = validation.success ? buildSubmissionIssueUrl(validation.data) : "";
  const blankIssueUrl = issueUrl || buildBlankSubmissionIssueUrl();

  const checklist = [
    { label: "Project name", done: form.projectName.trim().length >= 2 },
    { label: "Repository URL", done: Boolean(form.repositoryUrl.trim()) && !errors.repositoryUrl },
    { label: "Category and compatibility", done: Boolean(form.category && form.compatibilityStatus) },
    { label: "Short explanation", done: form.explanation.trim().length >= 20 },
  ];
  const completed = checklist.filter((item) => item.done).length;

  function updateField<K extends keyof LibrarySubmissionFormInput>(
    field: K,
    value: LibrarySubmissionFormInput[K],
  ): void {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function markTouched(field: keyof LibrarySubmissionFormInput): void {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  return (
    <div class="ph-submit-form">
      <div class="ph-submit-progress" aria-live="polite">
        Submission checklist: {completed}/{checklist.length} complete
      </div>
      <ul class="ph-submit-checklist">
        {checklist.map((item) => (
          <li key={item.label} class={item.done ? "done" : undefined}>{item.label}</li>
        ))}
      </ul>

      <div class="ph-submit-fields">
        <label class="ph-filter-field">
          <span>Project name</span>
          <Input
            value={form.projectName}
            aria-invalid={showError("projectName") ? "true" : undefined}
            onInput={(event) => updateField("projectName", event.currentTarget.value)}
            onBlur={() => markTouched("projectName")}
            placeholder="e.g. Preact Signals"
            required
          />
          <FieldError message={showError("projectName") ? errors.projectName : undefined} />
        </label>

        <label class="ph-filter-field">
          <span>Package name <span class="ph-muted">(optional)</span></span>
          <Input
            value={packageNameInput}
            aria-invalid={showError("packageName") ? "true" : undefined}
            onInput={(event) => setPackageNameInput(event.currentTarget.value)}
            onBlur={() => markTouched("packageName")}
            placeholder="e.g. @preact/signals"
          />
          <FieldError message={showError("packageName") ? errors.packageName : undefined} />
        </label>

        <label class="ph-filter-field">
          <span>Repository URL</span>
          <Input
            value={form.repositoryUrl}
            type="url"
            aria-invalid={showError("repositoryUrl") ? "true" : undefined}
            onInput={(event) => updateField("repositoryUrl", event.currentTarget.value)}
            onBlur={() => markTouched("repositoryUrl")}
            placeholder="https://github.com/..."
            required
          />
          <FieldError message={showError("repositoryUrl") ? errors.repositoryUrl : undefined} />
        </label>

        <label class="ph-filter-field">
          <span>Documentation URL <span class="ph-muted">(optional)</span></span>
          <Input
            value={documentationInput}
            type="url"
            aria-invalid={showError("documentationUrl") ? "true" : undefined}
            onInput={(event) => setDocumentationInput(event.currentTarget.value)}
            onBlur={() => markTouched("documentationUrl")}
            placeholder="https://preactjs.com/guide/v10/signals/"
          />
          <FieldError message={showError("documentationUrl") ? errors.documentationUrl : undefined} />
        </label>

        <label class="ph-filter-field">
          <span>Category</span>
          <NativeSelect
            value={form.category}
            onChange={(event) => updateField("category", event.currentTarget.value as LibraryCategorySlug)}
          >
            {categories.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.name}</option>)}
          </NativeSelect>
        </label>

        <label class="ph-filter-field">
          <span>Claimed compatibility status</span>
          <NativeSelect
            value={form.compatibilityStatus}
            onChange={(event) =>
              updateField("compatibilityStatus", event.currentTarget.value as typeof form.compatibilityStatus)}
          >
            {compatibilityStatusValues.map((value) => (
              <option key={value} value={value}>{compatibilityStatusOptionLabel(value)}</option>
            ))}
          </NativeSelect>
          <p class="ph-muted ph-submit-help">
            Choose the status that best matches your evidence. See the <a href="/methodology">methodology</a> for definitions.
          </p>
        </label>

        <label class="ph-filter-field">
          <span>Tested Preact version <span class="ph-muted">(optional)</span></span>
          <Input
            value={testedVersionInput}
            aria-invalid={showError("testedPreactVersion") ? "true" : undefined}
            onInput={(event) => setTestedVersionInput(event.currentTarget.value)}
            onBlur={() => markTouched("testedPreactVersion")}
            placeholder="e.g. 10.26.x"
          />
          <FieldError message={showError("testedPreactVersion") ? errors.testedPreactVersion : undefined} />
        </label>

        <label class="ph-filter-field ph-submit-notes">
          <span>Short explanation</span>
          <Textarea
            value={form.explanation}
            rows={6}
            aria-invalid={showError("explanation") ? "true" : undefined}
            placeholder="Why should this library be listed? Mention tested setup, SSR/islands notes and known limitations..."
            onInput={(event) => updateField("explanation", event.currentTarget.value)}
            onBlur={() => markTouched("explanation")}
            required
          />
          <FieldError message={showError("explanation") ? errors.explanation : undefined} />
        </label>

        <label class="ph-filter-field ph-submit-checkbox">
          <input
            type="checkbox"
            checked={form.isMaintainer}
            onChange={(event) => updateField("isMaintainer", event.currentTarget.checked)}
          />
          <span>I am a maintainer or regular contributor of this project</span>
        </label>
      </div>

      <section class="ph-submit-preview" aria-labelledby="submit-preview-title">
        <div class="ph-section-eyebrow">Preview</div>
        <h2 id="submit-preview-title" class="ph-submit-preview-title">GitHub issue preview</h2>
        <p class="ph-muted">
          {validation.success
            ? "This is the issue body that will open on GitHub. Review it before submitting."
            : "Complete the required fields to preview the GitHub issue."}
        </p>
        <pre class="ph-submit-preview-body">{previewBody || "—"}</pre>
      </section>

      <div class="ph-submit-actions">
        {validation.success ? (
          <Button href={previewUrl} class="ph-button-primary">Create GitHub submission</Button>
        ) : (
          <Button
            type="button"
            class="ph-button-primary"
            onClick={() => setSubmitAttempted(true)}
          >
            Complete required fields
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          onClick={() => setSubmitAttempted(true)}
        >
          Show validation errors
        </Button>
        <a class="ph-submit-fallback" href={blankIssueUrl}>Use blank issue template instead</a>
      </div>
    </div>
  );
}
