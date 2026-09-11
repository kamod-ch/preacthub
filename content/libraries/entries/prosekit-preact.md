---
entryType: library
name: 'ProseKit Preact'
slug: 'prosekit-preact'
shortDescription: 'Preact components and hooks for ProseKit ProseMirror rich text editors.'
category: 'editors'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'limited'
packageName: '@prosekit/preact'
repositoryUrl: 'https://github.com/prosekit/prosekit/tree/master/packages/preact'
documentationUrl: 'https://prosekit.dev/frameworks/preact'
homepageUrl: 'https://prosekit.dev'
npmUrl: 'https://www.npmjs.com/package/@prosekit/preact'
license: 'MIT'
installCommand: 'npm install @prosekit/preact prosekit'
featured: false
islands: true
esm: true
tags:
  - editor
  - prosemirror
  - rich-text
limitations:
  - 'Upstream notes that most users install the main `prosekit` package and import from `prosekit/preact` instead of depending on `@prosekit/preact` directly.'
  - 'ProseMirror editors are client-heavy; SSR provides limited value beyond static placeholders.'
qualityBadges: []
alternatives:
  - monza-editor-preact
  - preact-richtextarea
---

## Introduction

`@prosekit/preact` provides Preact bindings for [ProseKit](https://prosekit.dev)—a ProseMirror toolkit. Export `ProseKit`, hooks such as `useEditor`, and node/mark view helpers for building rich text experiences.

## Installation

```bash
npm install @prosekit/preact prosekit
```

Import ProseKit base styles in your entry:

```ts
import 'prosekit/basic/style.css';
import 'prosekit/basic/typography.css';
```

## Preact configuration

Create an editor with `createEditor` from `prosekit/core`, wrap UI in `<ProseKit editor={editor}>`, and mount with `editor.mount(ref)`. Any subtree calling `useEditor()` must stay inside the provider.

## Example

```tsx
import { useMemo } from 'preact/hooks';
import { defineBasicExtension } from 'prosekit/basic';
import { createEditor } from 'prosekit/core';
import { ProseKit } from '@prosekit/preact';

export default function Editor() {
  const editor = useMemo(
    () => createEditor({ extension: defineBasicExtension() }),
    [],
  );

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} class="ProseMirror" />
    </ProseKit>
  );
}
```

## SSR notes

Editors require browser DOM and ProseMirror plugins. Render a static shell on the server and mount the editor after hydration.

## Islands notes

Rich text editors are classic island candidates because they pull large ProseMirror bundles and keyboard/focus logic.

## Known limitations

Heavier than textarea editors. Confirm extension and node-view APIs against [prosekit.dev](https://prosekit.dev/frameworks/preact) before production adoption.

## Alternatives

For lightweight code input see [Monza Editor Preact](/libraries/monza-editor-preact); for simpler rich text try [Preact RichTextArea](/libraries/preact-richtextarea).

