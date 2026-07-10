---
entryType: library
name: SWR
slug: swr
description: Data fetching with stale-while-revalidate semantics and a small API surface.
category: data-fetching
packageName: "swr"
repository: "https://github.com/vercel/swr"
documentation: "https://swr.vercel.app"
homepage: "https://swr.vercel.app"
compatibility: unknown
status: stable
typescript: true
ssr: true
islands: true
esm: true
license: MIT
tags:
  - data-fetching
  - caching
  - hooks
alternatives:
  - tanstack-query
---

## Introduction

SWR stays appealing when you want data fetching with a smaller mental model than larger query frameworks.

## Installation

```bash
npm install swr
```

## Preact configuration

Typically used via `preact/compat` when integrated into Preact applications.

## Example

```tsx
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function User() {
  const { data } = useSWR("/api/user", fetcher);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

## SSR notes

SSR behavior should be tested in the exact renderer and hydration strategy you use.

## Islands notes

Useful for isolated widgets that fetch server state after hydration.
