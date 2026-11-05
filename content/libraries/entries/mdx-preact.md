---
entryType: library
name: MDX Preact
slug: mdx-preact
shortDescription: Official Preact context provider for supplying and merging custom components used by compiled MDX content.
category: developer-tools
packageName: '@mdx-js/preact'
repositoryUrl: 'https://github.com/mdx-js/mdx/tree/main/packages/preact'
npmUrl: 'https://www.npmjs.com/package/@mdx-js/preact'
documentationUrl: 'https://mdxjs.com/packages/preact/'
homepageUrl: 'https://mdxjs.com/'
license: MIT
compatibilityStatus: native
typescriptSupport: bundled-types
ssrSupport: supported
maintenanceStatus: active
installCommand: npm install @mdx-js/preact
tags:
  - mdx
  - markdown
  - content
  - context
  - components
limitations:
  - The package provides component context and is not required for every MDX and Preact setup.
  - Compilation and bundler integration require other MDX packages.
  - Untrusted MDX content requires a separate security model.
lastVerifiedAt: '2026-11-05'
verificationSource: 'https://mdxjs.com/packages/preact/'
lastReleaseAt: '2025-08-29'
lastCommitAt: '2026-11-04'
repositoryArchived: false
notes:
  - 'Evidence level: documented.'
  - 'Latest npm version checked: 3.1.1.'
  - The official docs identify the package as a context-based component provider for Preact and MDX.
title: MDX Preact
description: Official Preact context provider for supplying and merging custom components used by compiled MDX content.
featured: false
islands: false
esm: true
qualityBadges: []
alternatives:
  - preact-markup
  - hast-util-to-jsx-runtime
  - preactpress
---

## Introduction

`@mdx-js/preact` is the official MDX context provider for Preact. It supplies and merges the component map used when compiled MDX renders headings, links, code blocks or custom elements.

## Installation

```bash
npm install @mdx-js/preact
```

An MDX compiler integration such as `@mdx-js/rollup`, `@mdx-js/esbuild` or `@mdx-js/loader` is also required.

## Preact configuration

Configure the compiler with `providerImportSource: '@mdx-js/preact'` when using context. The package is ESM-only.

## Example

```tsx
import { MDXProvider } from '@mdx-js/preact';
import Post from './post.mdx';

const components = {
  a: props => <a {...props} rel="external" />,
  em: props => <i {...props} />,
};

export function Article() {
  return (
    <MDXProvider components={components}>
      <Post />
    </MDXProvider>
  );
}
```

## SSR notes

The provider and compiled MDX output can render on the server. Use the same component map on server and client, and keep browser-only components behind client boundaries.

## Known limitations

The provider is optional when components are passed directly to compiled MDX. It does not compile MDX by itself, and untrusted MDX requires a separate content security and execution policy.

## Alternatives

Use [Preact Markup](/libraries/preact-markup) for rendering HTML through VDOM, [hast-util-to-jsx-runtime](/libraries/hast-util-to-jsx-runtime) for HAST conversion or [PreactPress](/libraries/preactpress) for a Preact documentation stack.
