import { useState } from "preact/hooks";

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function PackageNameChip({
  packageName,
  npmUrl,
  variant = "default",
}: {
  packageName: string;
  npmUrl?: string;
  variant?: "default" | "compact";
}) {
  const [copied, setCopied] = useState(false);
  const compact = variant === "compact";
  const registryUrl = npmUrl ?? `https://www.npmjs.com/package/${encodeURIComponent(packageName)}`;

  async function copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(packageName);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  function handleCopyClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    void copy();
  }

  function stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  return (
    <div
      class={`ph-package-chip ${compact ? "ph-package-chip--compact" : ""}`}
      onClick={compact ? stopPropagation : undefined}
    >
      {compact ? (
        <span class="ph-package-chip-registry ph-package-chip-registry--static" aria-hidden="true">
          npm
        </span>
      ) : (
        <a
          href={registryUrl}
          class="ph-package-chip-registry"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${packageName} on npm`}
        >
          npm
          <span class="ph-external-link-indicator" aria-hidden="true">↗</span>
        </a>
      )}
      <code class="ph-package-chip-name">{packageName}</code>
      <button
        type="button"
        class="ph-package-chip-copy"
        onClick={handleCopyClick}
        aria-label={copied ? "Copied" : `Copy ${packageName}`}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        {!compact ? (
          <span class="ph-package-chip-copy-label" aria-live="polite" aria-atomic="true">
            {copied ? "Copied" : "Copy"}
          </span>
        ) : (
          <span class="ph-sr-only" aria-live="polite" aria-atomic="true">
            {copied ? "Copied" : ""}
          </span>
        )}
      </button>
    </div>
  );
}
