---
entryType: library
name: TanStack Query
slug: tanstack-query
shortDescription: Async state management and data fetching for Preact applications.
category: data-fetching
compatibilityStatus: unverified
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - data-fetching
  - async-state
  - cache
packageName: '@tanstack/react-query'
repositoryUrl: 'https://github.com/TanStack/query'
npmUrl: 'https://www.npmjs.com/package/%40tanstack%2Freact-query'
documentationUrl: 'https://tanstack.com/query/latest'
homepageUrl: 'https://tanstack.com/query'
license: MIT
installCommand: npm install @tanstack/react-query
alternatives:
  - swr
featured: true
islands: true
esm: true
bundleSize: Medium
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
