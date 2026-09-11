---
entryType: library
name: 'Monza Editor Preact'
slug: 'monza-editor-preact'
shortDescription: 'Lightweight textarea-based code editor component for Preact.'
category: 'editors'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'limited'
packageName: '@monza-editor/preact'
repositoryUrl: 'https://github.com/raviqqe/monza-editor'
documentationUrl: 'https://raviqqe.com/monza-editor/'
npmUrl: 'https://www.npmjs.com/package/@monza-editor/preact'
license: 'MIT'
installCommand: 'npm install @monza-editor/preact'
featured: false
islands: true
esm: true
tags:
  - editor
  - code
  - textarea
limitations:
  - 'Syntax highlighting is supplied by a user-provided highlight function rather than built-in language packs.'
qualityBadges: []
---

## Introduction

Monza Editor wraps a textarea with syntax-highlight overlays. The `@monza-editor/preact` package exposes the Preact component while keeping the core editor bundle extremely small.

## Installation

```bash
npm install @monza-editor/preact
```

## Preact configuration

Provide a `highlight` function that converts source text into HTML annotated code. Style the editor with monospace `font-family` and optional CSS variables such as `--me-padding`.

## Example

```tsx
import { Editor } from "@monza-editor/preact";

function highlight(code: string) {
  return code.replace(/\b(const|return)\b/g, '<span class="kw">$1</span>');
}

export function SnippetField() {
  return <Editor value={'const answer = 42;'} highlight={highlight} onChange={() => {}} />;
}
```

## SSR notes

The editor relies on textarea selection and overlay synchronization that should be validated if you render initial HTML on the server.

## Islands notes

Code editors are commonly mounted as islands to defer highlight logic and keep static pages lean.

## Known limitations

Bring-your-own highlighter means you must sanitize or trust highlight output. For full IDE features, heavier editors may be more appropriate.

## Alternatives

See [Preact RichTextArea](/libraries/preact-richtextarea) for simpler text areas or evaluate full Monaco integrations separately.

