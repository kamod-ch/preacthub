---
entryType: library
name: Valibot
slug: valibot
description: Lightweight schema validation library focused on small bundles and composable parsing.
category: forms
packageName: "valibot"
repository: "https://github.com/fabian-hiller/valibot"
documentation: "https://valibot.dev"
homepage: "https://valibot.dev"
compatibility: unknown
status: stable
typescript: true
ssr: true
islands: true
esm: true
license: MIT
tags:
  - validation
  - forms
  - schema
alternatives:
  - zod
---

## Introduction

Valibot is a compelling option when bundle size matters and you want modern schema composition.

## Installation

```bash
npm install valibot
```

## Preact configuration

No Preact-specific adapter is required for schema parsing.

## Example

```ts
import * as v from "valibot";

const schema = v.object({ email: v.pipe(v.string(), v.email()) });
```

## SSR notes

Pure validation logic works consistently across server and client rendering paths.
