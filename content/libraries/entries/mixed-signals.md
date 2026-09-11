---
entryType: library
name: 'Mixed Signals'
slug: 'mixed-signals'
shortDescription: 'Transport-agnostic RPC and signal reflection built on Preact Signals Core.'
category: 'state-management'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'limited'
packageName: 'mixed-signals'
repositoryUrl: 'https://github.com/developit/mixed-signals'
documentationUrl: 'https://github.com/developit/mixed-signals'
npmUrl: 'https://www.npmjs.com/package/mixed-signals'
license: 'MIT'
installCommand: 'npm install mixed-signals'
featured: false
islands: true
esm: true
tags:
  - signals
  - rpc
  - realtime
limitations:
  - 'Requires configuring a transport (WebSocket, SSE, postMessage, etc.) and server-side model registration.'
  - 'Reconnection and authorization semantics depend on your RPC transport implementation.'
qualityBadges: []
alternatives:
  - preact-signals
---

## Introduction

Mixed Signals reflects server-side Preact models and signals—created with `@preact/signals-core`—to connected clients through a lightweight RPC protocol. Client facades stay in sync without manually mirroring every signal update.

## Installation

```bash
npm install mixed-signals
```

## Preact configuration

Use `mixed-signals/server` on the host and `mixed-signals/client` inside Preact components. Register models on the server RPC instance before accepting client connections.

## Example

```tsx
import { useSignal } from "@preact/signals";
import { RPCClient } from "mixed-signals/client";
import type { Root } from "./server";

const rpc = new RPCClient<Root>(transport);

export function TodoList() {
  const todos = useSignal(rpc.models.todos.all);
  return (
    <ul>
      {todos.value.map((todo) => (
        <li key={todo.text.value}>{todo.text.value}</li>
      ))}
    </ul>
  );
}
```

## SSR notes

Server models run outside typical Preact SSR trees. Render client proxies only after the RPC session is established.

## Islands notes

Real-time widgets backed by shared server state are natural island candidates; isolate RPC clients per island root.

## Known limitations

Verify transport security, reconnection and cleanup for your deployment. The protocol optimizes deltas but still requires a correctly configured server model registry.

## Alternatives

For local-only reactive state, use [Preact Signals](/libraries/preact-signals) without RPC overhead.

