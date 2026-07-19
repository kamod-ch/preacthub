---
entryType: library
name: Valibot
slug: valibot
shortDescription: >-
  Lightweight schema validation library focused on small bundles and composable
  parsing.
category: forms
compatibilityStatus: unverified
typescriptSupport: native
ssrSupport: supported
maintenanceStatus: active
tags:
  - validation
  - forms
  - schema
packageName: valibot
repositoryUrl: 'https://github.com/fabian-hiller/valibot'
npmUrl: 'https://www.npmjs.com/package/valibot'
documentationUrl: 'https://valibot.dev'
homepageUrl: 'https://valibot.dev'
license: MIT
installCommand: npm install valibot
alternatives:
  - zod
islands: true
esm: true
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

## Islands notes

When using this library inside an island, keep browser-specific setup inside the island component or an effect, and pass only serializable props from the server-rendered page.
