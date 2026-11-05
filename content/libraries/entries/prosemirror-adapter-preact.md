---
entryType: library
name: ProseMirror Adapter for Preact
slug: prosemirror-adapter-preact
shortDescription: Preact adapter for rendering ProseMirror node views and plugin views with Preact components and hooks.
category: editors
packageName: '@prosemirror-adapter/preact'
repositoryUrl: 'https://github.com/prosekit/prosemirror-adapter/tree/main/packages/preact'
npmUrl: 'https://www.npmjs.com/package/@prosemirror-adapter/preact'
documentationUrl: 'https://github.com/prosekit/prosemirror-adapter/tree/main/packages/preact#readme'
homepageUrl: 'https://github.com/prosekit/prosemirror-adapter'
license: MIT
compatibilityStatus: native
typescriptSupport: native
ssrSupport: limited
maintenanceStatus: active
installCommand: npm install @prosemirror-adapter/preact prosemirror-model prosemirror-state prosemirror-view
tags:
  - prosemirror
  - editor
  - node-view
  - hooks
limitations:
  - ProseMirror's EditorView is DOM-dependent and should be created on the client.
  - 'The adapter requires familiarity with ProseMirror state, schemas and view lifecycles.'
  - 'The official example imports StrictMode from preact/compat, although the adapter itself targets Preact.'
lastVerifiedAt: '2026-11-05'
verificationSource: 'https://github.com/prosekit/prosemirror-adapter/tree/main/packages/preact#readme'
lastReleaseAt: '2026-09-28'
lastCommitAt: '2026-09-28'
repositoryArchived: false
notes:
  - 'Evidence level: documented.'
  - 'Latest npm version checked: 0.5.6.'
  - The repository provides a dedicated Preact package and StackBlitz-linked Preact example.
title: ProseMirror Adapter for Preact
description: Preact adapter for rendering ProseMirror node views and plugin views with Preact components and hooks.
featured: false
islands: true
esm: true
qualityBadges: []
alternatives:
  - prosekit-preact
  - preact-richtextarea
---

## Introduction

`@prosemirror-adapter/preact` connects ProseMirror node, mark, plugin and widget views to Preact components. It provides Preact-specific providers, factory hooks and context hooks around the ProseMirror view lifecycle.

## Installation

```bash
npm install @prosemirror-adapter/preact prosemirror-model prosemirror-state prosemirror-view
```

## Preact configuration

Wrap the editor subtree with `ProsemirrorAdapterProvider`. Create view factories inside that provider and destroy every `EditorView` when its host component unmounts.

## Example

```tsx
import {
  ProsemirrorAdapterProvider,
  useNodeViewContext,
  useNodeViewFactory,
} from '@prosemirror-adapter/preact';
import { useEffect, useRef } from 'preact/hooks';
import type { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

function ParagraphView() {
  const { contentRef, selected } = useNodeViewContext();
  return <div ref={contentRef} data-selected={selected || undefined} />;
}

function Editor({ state }: { state: EditorState }) {
  const host = useRef<HTMLDivElement>(null);
  const nodeViewFactory = useNodeViewFactory();

  useEffect(() => {
    if (!host.current) return;
    const view = new EditorView(host.current, {
      state,
      nodeViews: {
        paragraph: nodeViewFactory({
          component: ParagraphView,
          as: 'div',
          contentAs: 'p',
        }),
      },
    });
    return () => view.destroy();
  }, [nodeViewFactory, state]);

  return <div ref={host} />;
}

export function EditorShell({ state }: { state: EditorState }) {
  return (
    <ProsemirrorAdapterProvider>
      <Editor state={state} />
    </ProsemirrorAdapterProvider>
  );
}
```

## SSR notes

The adapter package can be imported during SSR, but ProseMirror's `EditorView` requires browser DOM. Render a static shell or serialized document on the server and create the editor after hydration.

## Islands notes

Editors are good island boundaries because ProseMirror, schemas and extension code are client-heavy. Keep one provider and one editor lifecycle inside each island.

## Known limitations

This is an adapter rather than a complete editor toolkit. Applications still need ProseMirror schemas, state, commands and plugins, and must manage `EditorView.destroy()` during cleanup.

## Alternatives

Use [ProseKit Preact](/libraries/prosekit-preact) for a higher-level ProseMirror toolkit or [Preact RichTextArea](/libraries/preact-richtextarea) for a simpler editing surface.
