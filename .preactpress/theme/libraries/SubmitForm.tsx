import { useMemo, useState } from "preact/hooks";
import { Button, Input, NativeSelect, Textarea } from "@kamod-ch/ui";
import { categories, type LibraryCategorySlug } from "../../../src/lib/categories";
import { compatibilityValues, statusValues } from "../../../src/lib/libraries";

const GITHUB_ISSUE_BASE = "https://github.com/kamod-ch/preacthub/issues/new";

export function SubmitForm({ issueUrl }: { issueUrl: string }) {
  const [name, setName] = useState("");
  const [packageName, setPackageName] = useState("");
  const [repository, setRepository] = useState("");
  const [category, setCategory] = useState<LibraryCategorySlug>(categories[0]?.slug ?? "ui");
  const [compatibility, setCompatibility] = useState<(typeof compatibilityValues)[number]>("unknown");
  const [status, setStatus] = useState<(typeof statusValues)[number]>("stable");
  const [notes, setNotes] = useState("");

  const previewUrl = useMemo(() => {
    const title = name.trim() ? `Library submission: ${name.trim()}` : "Library submission";
    const body = [
      "## Library",
      `- Name: ${name.trim() || "—"}`,
      `- Package: ${packageName.trim() || "—"}`,
      `- Repository: ${repository.trim() || "—"}`,
      "",
      "## Compatibility",
      `- Category: ${category}`,
      `- Preact compatibility: ${compatibility}`,
      `- Status: ${status}`,
      "",
      "## Notes",
      notes.trim() || "Add tested Preact version, SSR/islands notes, limitations and example repo.",
    ].join("\n");

    const url = new URL(issueUrl || GITHUB_ISSUE_BASE);
    url.searchParams.set("title", title);
    url.searchParams.set("body", body);
    return url.toString();
  }, [category, compatibility, issueUrl, name, notes, packageName, repository, status]);

  const checklist = [
    { label: "Library name", done: Boolean(name.trim()) },
    { label: "Package name", done: Boolean(packageName.trim()) },
    { label: "Repository URL", done: Boolean(repository.trim()) },
    { label: "Compatibility notes", done: notes.trim().length >= 20 },
  ];
  const completed = checklist.filter((item) => item.done).length;

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
          <span>Library name</span>
          <Input value={name} onInput={(event) => setName(event.currentTarget.value)} placeholder="e.g. Preact Signals" />
        </label>
        <label class="ph-filter-field">
          <span>Package name</span>
          <Input value={packageName} onInput={(event) => setPackageName(event.currentTarget.value)} placeholder="e.g. @preact/signals" />
        </label>
        <label class="ph-filter-field">
          <span>Repository URL</span>
          <Input value={repository} onInput={(event) => setRepository(event.currentTarget.value)} placeholder="https://github.com/..." />
        </label>
        <label class="ph-filter-field">
          <span>Category</span>
          <NativeSelect value={category} onChange={(event) => setCategory(event.currentTarget.value as LibraryCategorySlug)}>
            {categories.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.name}</option>)}
          </NativeSelect>
        </label>
        <label class="ph-filter-field">
          <span>Preact compatibility</span>
          <NativeSelect value={compatibility} onChange={(event) => setCompatibility(event.currentTarget.value as typeof compatibility)}>
            {compatibilityValues.map((value) => <option key={value} value={value}>{value}</option>)}
          </NativeSelect>
        </label>
        <label class="ph-filter-field">
          <span>Status</span>
          <NativeSelect value={status} onChange={(event) => setStatus(event.currentTarget.value as typeof status)}>
            {statusValues.map((value) => <option key={value} value={value}>{value}</option>)}
          </NativeSelect>
        </label>
        <label class="ph-filter-field ph-submit-notes">
          <span>Compatibility notes</span>
          <Textarea
            value={notes}
            rows={6}
            placeholder="Tested Preact version, SSR/islands notes, known limitations, example repository..."
            onInput={(event) => setNotes(event.currentTarget.value)}
          />
        </label>
      </div>

      <div class="ph-submit-actions">
        <Button href={previewUrl} class="ph-button-primary">Create GitHub submission</Button>
        <a class="ph-submit-fallback" href={issueUrl}>Use blank issue template instead</a>
      </div>
    </div>
  );
}
