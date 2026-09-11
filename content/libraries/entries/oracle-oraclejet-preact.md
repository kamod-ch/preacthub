---
entryType: library
name: 'Oracle JET Preact'
slug: 'oracle-oraclejet-preact'
shortDescription: 'Oracle JET Redwood UI components implemented with Preact.'
category: 'ui'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'limited'
packageName: '@oracle/oraclejet-preact'
repositoryUrl: 'https://github.com/oracle/oraclejet'
documentationUrl: 'https://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html'
npmUrl: 'https://www.npmjs.com/package/@oracle/oraclejet-preact'
installCommand: 'npm install @oracle/oraclejet-preact'
featured: false
islands: false
esm: true
tags:
  - enterprise
  - oracle-jet
  - redwood
limitations:
  - 'Strongly tied to Oracle JET and Redwood design infrastructure—not a general-purpose design system.'
  - 'Components may import companion CSS; bundler must load ES, AMD, or CJS distributions consistently to avoid silent CSS failures.'
qualityBadges: []
alternatives:
  - kamod-ui
  - headlessui
---

## Introduction

`@oracle/oraclejet-preact` distributes Oracle JET UI components built on Preact. Imports use subpath exports such as `@oracle/oraclejet-preact/UNSAFE_Avatar`. Production builds ship minified with source maps in `es`, `amd`, and `cjs` formats.

## Installation

```bash
npm install @oracle/oraclejet-preact
```

## Preact configuration

Prefer the `es` distribution for modern bundlers with subpath export support. Webpack 4 or RequireJS projects must alias to `@oracle/oraclejet-preact/es` or `/amd` explicitly. Configure CSS loaders because components import `./Component.css` side effects.

## Example

```javascript
import { Avatar } from '@oracle/oraclejet-preact/UNSAFE_Avatar';

export default () => <Avatar initials="OJP" />;
```

## SSR notes

Node-based testing can use the `cjs` build with CSS stripped. Full SSR with styles requires bundler support for component CSS imports in the ES distribution.

## Islands notes

Enterprise JET widgets are usually part of a larger Oracle JET shell rather than ad-hoc islands, but individual components can hydrate when CSS and theme tokens are scoped.

## Known limitations

Mixing ES and AMD formats in one bundle causes silent CSS import failures. Jest projects should map subpaths to `@oracle/oraclejet-preact/cjs/$1`.

## Alternatives

Outside Oracle ecosystems, evaluate [Kamod UI](/libraries/kamod-ui) or [Headless UI](/libraries/headlessui) with Preact compat.

