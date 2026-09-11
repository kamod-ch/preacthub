---
entryType: library
name: 'hast-util-to-jsx-runtime'
slug: 'hast-util-to-jsx-runtime'
shortDescription: 'Transforms HAST syntax trees into Preact VNodes through the automatic JSX runtime.'
category: 'developer-tools'
compatibilityStatus: 'native'
maintenanceStatus: 'maintenance'
typescriptSupport: 'bundled-types'
ssrSupport: 'supported'
packageName: 'hast-util-to-jsx-runtime'
repositoryUrl: 'https://github.com/syntax-tree/hast-util-to-jsx-runtime'
documentationUrl: 'https://github.com/syntax-tree/hast-util-to-jsx-runtime#readme'
homepageUrl: 'https://github.com/syntax-tree/hast-util-to-jsx-runtime#readme'
npmUrl: 'https://www.npmjs.com/package/hast-util-to-jsx-runtime'
license: 'MIT'
installCommand: 'npm install hast-util-to-jsx-runtime preact'
featured: false
islands: false
esm: true
tags:
  - hast
  - content
  - jsx-runtime
limitations:
  - 'Framework-neutral transformer rather than a Preact component library; callers must provide the correct JSX runtime and handle untrusted-tree policies.'
  - 'ESM-only and requires Node.js 16 or newer; custom components and MDX expressions require additional configuration.'
qualityBadges: []
alternatives:
  - preact-markup
  - htm
---

## Introduction

`hast-util-to-jsx-runtime` converts a HAST tree into values created by an automatic JSX runtime. Passing `Fragment`, `jsx`, and `jsxs` from `preact/jsx-runtime` produces Preact VNodes, which is useful for unified-based content pipelines and renderers such as PreactPress.

## Installation

```bash
npm install hast-util-to-jsx-runtime preact
```

## Preact configuration

Supply Preact's automatic runtime functions and set `elementAttributeNameCase: 'html'`. The HTML attribute mode matters because Preact's runtime accepts HTML-style property names rather than React's property casing for this conversion.

```js
import { Fragment, jsx, jsxs } from 'preact/jsx-runtime';
```

## Example

```js
import { h } from 'hastscript';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, jsx, jsxs } from 'preact/jsx-runtime';
import render from 'preact-render-to-string';

const vnode = toJsxRuntime(h('h1', 'Hello'), {
  Fragment,
  jsx,
  jsxs,
  elementAttributeNameCase: 'html'
});

console.log(render(vnode));
```

## SSR notes

The transformation itself does not require a DOM. Resulting VNodes can be passed to `preact-render-to-string`, while caller-provided custom components determine whether the complete tree remains server-safe.

## Islands notes

The utility only constructs VNodes and does not serialize props, emit client modules, or hydrate islands. An SSG or framework must define those boundaries around the converted content.

## Known limitations

Treat untrusted HAST carefully: pass through only intended properties and components. MDX nodes can throw unless configured, and source-position behavior depends on development runtime options.

## Alternatives

For rendering HTML strings in Preact, compare [Preact Markup](/libraries/preact-markup); for authoring VNodes with tagged templates, see [HTM](/libraries/htm).

