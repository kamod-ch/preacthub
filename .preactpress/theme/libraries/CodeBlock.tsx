import { useState } from "preact/hooks";

type CodeBlockProps = {
  title: string;
  code: string;
  language?: string;
};

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

function bashTokenClass(line: string): string {
  const trimmed = line.trim();
  if (!trimmed) return "plain";
  if (/^(npm|pnpm|yarn|npx|bun)\b/.test(trimmed)) return "cmd";
  if (/^(cd|export|alias)\b/.test(trimmed)) return "keyword";
  if (trimmed.startsWith("#")) return "comment";
  return "plain";
}

function renderBashLine(line: string) {
  const match = line.match(/^(npm|pnpm|yarn|npx|bun)(\s+)(install|add|create|run|dlx)(\s+)(.+)$/);
  if (match) {
    return (
      <>
        <span class="ph-code-token-cmd">{match[1]}</span>
        <span class="ph-code-token-keyword">
          {match[2]}
          {match[3]}
        </span>
        <span class="ph-code-token-string">
          {match[4]}
          {match[5]}
        </span>
      </>
    );
  }

  const className = `ph-code-token-${bashTokenClass(line)}`;
  return <span class={className}>{line || " "}</span>;
}

function editorTokenClass(line: string): string {
  const trimmed = line.trim();
  if (!trimmed) return "plain";
  if (/^(import|export|const|let|return|from|alias)\b/.test(trimmed)) return "keyword";
  if (trimmed.includes("'") || trimmed.includes('"')) return "string";
  if (trimmed.includes("//")) return "comment";
  return "plain";
}

function renderEditorLine(line: string, index: number) {
  const tokenClass = editorTokenClass(line);
  return (
    <span class="ph-code-editor-line" key={index}>
      <span class="ph-code-editor-gutter" aria-hidden="true">
        {index + 1}
      </span>
      <span class={`ph-code-token-${tokenClass}`}>{line || " "}</span>
    </span>
  );
}

function isTerminalLanguage(language: string): boolean {
  return language === "bash" || language === "sh" || language === "shell";
}

function editorTabLabel(title: string, language: string): string {
  if (/vite/i.test(title)) return "vite.config.ts";
  if (language === "ts") return `${title.toLowerCase().replace(/\s+/g, "-")}.ts`;
  if (language === "js") return `${title.toLowerCase().replace(/\s+/g, "-")}.js`;
  return title;
}

export function CodeBlock({ title, code, language = "bash" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");
  const terminal = isTerminalLanguage(language);

  async function copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div class={`ph-code-card ${terminal ? "ph-code-card-terminal" : "ph-code-card-editor"}`} aria-label={title}>
      <div class="ph-code-topbar">
        <div class="ph-code-window-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        {terminal ? (
          <span class="ph-code-topbar-title">Terminal</span>
        ) : (
          <span class="ph-code-editor-tab">{editorTabLabel(title, language)}</span>
        )}
        <button type="button" class="ph-code-copy" onClick={copy} aria-label={`Copy ${title}`}>
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span class="ph-code-copy-label" aria-live="polite" aria-atomic="true">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
      </div>
      <pre class="ph-pre" data-language={language}>
        <code>
          {terminal
            ? lines.map((line, index) => (
                <span class="ph-code-terminal-line" key={index}>
                  <span class="ph-code-terminal-prompt" aria-hidden="true">
                    <span class="ph-code-terminal-path">~</span>
                    <span class="ph-code-terminal-caret">%</span>
                  </span>
                  <span class="ph-code-terminal-cmd">{renderBashLine(line)}</span>
                  {index === lines.length - 1 && line.trim() ? (
                    <span class="ph-code-terminal-cursor" aria-hidden="true" />
                  ) : null}
                </span>
              ))
            : lines.map((line, index) => renderEditorLine(line, index))}
        </code>
      </pre>
    </div>
  );
}
