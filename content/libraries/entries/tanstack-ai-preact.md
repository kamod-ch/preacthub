---
entryType: library
name: TanStack AI Preact
slug: tanstack-ai-preact
shortDescription: 'Official Preact hooks and headless UI bindings for typed streaming chat, tool calls, approvals and AI message parts.'
category: data-fetching
packageName: '@tanstack/ai-preact'
repositoryUrl: 'https://github.com/TanStack/ai/tree/main/packages/ai-preact'
npmUrl: 'https://www.npmjs.com/package/@tanstack/ai-preact'
documentationUrl: 'https://tanstack.com/ai/latest/docs/framework/preact/overview'
homepageUrl: 'https://tanstack.com/ai'
license: MIT
compatibilityStatus: native
typescriptSupport: native
ssrSupport: limited
maintenanceStatus: active
installCommand: npm install @tanstack/ai @tanstack/ai-preact
tags:
  - ai
  - streaming
  - chat
  - tool-calling
  - typescript
limitations:
  - The Preact package is client-facing and normally depends on a separate server chat endpoint.
  - Provider adapters and optional MCP UI support require additional packages.
  - The 1.0 API is new and should receive an integration test before a verified badge is assigned.
lastVerifiedAt: '2026-11-05'
verificationSource: 'https://tanstack.com/ai/latest/docs/framework/preact/overview'
lastReleaseAt: '2026-10-29'
lastCommitAt: '2026-11-05'
repositoryArchived: false
notes:
  - 'Evidence level: documented.'
  - 'Latest npm version checked: 1.0.1.'
  - Official docs provide a Preact-specific createChatHook workflow and typed component slots.
title: TanStack AI Preact
description: 'Official Preact hooks and headless UI bindings for typed streaming chat, tool calls, approvals and AI message parts.'
featured: false
islands: true
esm: true
qualityBadges: []
alternatives:
  - vercel-ai-sdk
---

## Introduction

`@tanstack/ai-preact` provides official Preact hooks and headless UI bindings for TanStack AI. It supports typed streaming messages, tool calls, approval interrupts and custom Preact renderers for each message part.

## Installation

```bash
npm install @tanstack/ai @tanstack/ai-preact
```

Install a provider adapter such as `@tanstack/ai-openai` on the server when required.

## Preact configuration

Create the chat binding once at module scope with `createChatHook`. Point `fetchServerSentEvents` at a server endpoint and supply Preact components for the layout, messages and part types.

## Example

```tsx
import { fetchServerSentEvents } from '@tanstack/ai-preact';
import { createChatHook } from '@tanstack/ai-preact/ui';

const { useAppChat } = createChatHook({
  options: { connection: fetchServerSentEvents('/api/chat') },
  components: {
    layout: props => <section><props.Messages /></section>,
    message: props => <article><props.Parts /></article>,
  },
  partsComponents: {
    text: props => <p>{props.part.content}</p>,
    fallback: () => null,
  },
});

export function Chat() {
  const chat = useAppChat({ threadId: 'support' });
  return <chat.AppChat />;
}
```

## SSR notes

The Preact hooks are client-facing, while model credentials and provider calls belong in a server endpoint. Render a stable chat shell during SSR and start streaming only after client interaction or hydration.

## Islands notes

A chat interface is a natural island. Scope one chat instance to the island, abort active streams during teardown and avoid shipping provider secrets to the browser.

## Known limitations

Provider adapters and MCP UI support require additional packages. The 1.0 API is recent, so test stream cancellation, tool updates and unmount behavior before production use.

## Alternatives

For another provider-agnostic streaming toolkit, compare [Vercel AI SDK](/libraries/vercel-ai-sdk).
