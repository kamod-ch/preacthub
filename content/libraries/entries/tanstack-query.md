---
entryType: library
name: TanStack Query
slug: tanstack-query
description: Async state management and data fetching for Preact applications.
category: data-fetching
packageName: "@tanstack/react-query"
repository: "https://github.com/TanStack/query"
documentation: "https://tanstack.com/query/latest"
homepage: "https://tanstack.com/query"
compatibility: unknown
status: stable
typescript: true
ssr: true
islands: true
esm: true
license: MIT
bundleSize: Medium
tags:
  - data-fetching
  - async-state
  - cache
featured: true
alternatives:
  - swr
---

## Introduction

TanStack Query is a popular choice for server-state caching, retries and background revalidation.

## Installation

```bash
npm install @tanstack/react-query
```

## Preact configuration

In many Preact projects this package is used through `preact/compat`. Verify your app-level aliasing before recommending it for production.

## Example

```tsx
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const client = new QueryClient();

function Posts() {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => fetch("/api/posts").then((res) => res.json()),
  });

  return <pre>{JSON.stringify(query.data, null, 2)}</pre>;
}

export function App() {
  return <QueryClientProvider client={client}><Posts /></QueryClientProvider>;
}
```

## SSR notes

The package supports hydration patterns, but compatibility details should be verified in the exact Preact stack you run.

## Islands notes

Can be useful inside data-heavy interactive islands.

## Known limitations

Treat current compatibility as not yet verified in this directory.
