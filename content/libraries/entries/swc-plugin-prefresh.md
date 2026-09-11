---
entryType: library
name: 'SWC Plugin Prefresh'
slug: 'swc-plugin-prefresh'
shortDescription: 'SWC plugin implementing Prefresh createContext memoization for Preact HMR.'
category: 'build-tools'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'unsupported'
packageName: '@swc/plugin-prefresh'
repositoryUrl: 'https://github.com/swc-project/plugins/tree/main/packages/prefresh'
documentationUrl: 'https://github.com/swc-project/plugins/tree/main/packages/prefresh'
homepageUrl: 'https://swc.rs'
npmUrl: 'https://www.npmjs.com/package/@swc/plugin-prefresh'
license: 'Apache-2.0'
installCommand: 'npm install -D @swc/plugin-prefresh'
featured: false
islands: false
esm: true
tags:
  - swc
  - hmr
  - prefresh
limitations:
  - "Must be paired with SWC's built-in React Refresh transform (`jsc.transform.react.refresh`); this plugin only handles Prefresh-specific `createContext` memoization."
  - 'Major versions track SWC core releases; align plugin version with your `@swc/core` toolchain.'
qualityBadges: []
alternatives:
  - prefresh
  - preact-preset-vite
---

## Introduction

`@swc/plugin-prefresh` is the SWC port of the [Prefresh Babel plugin](https://github.com/preactjs/prefresh/tree/main/packages/babel). It memoizes `createContext` across hot updates while SWC's React Refresh transform handles component signatures.

## Installation

```bash
npm install -D @swc/plugin-prefresh
```

## Preact configuration

Add the plugin under `jsc.experimental.plugins` and enable React Refresh in development:

```json
{
  "jsc": {
    "experimental": {
      "plugins": [["@swc/plugin-prefresh", { "library": ["preact", "preact/compat", "react"] }]]
    },
    "parser": { "jsx": true },
    "transform": {
      "react": { "development": true, "refresh": true }
    }
  }
}
```

## Example

```json
{
  "jsc": {
    "experimental": {
      "plugins": [
        ["@swc/plugin-prefresh", { "library": ["preact-like-framework"] }]
      ]
    },
    "transform": {
      "react": { "development": true, "refresh": true }
    }
  }
}
```

Customize the `library` array when Preact is imported under an alias.

## SSR notes

Development-only compiler plugin. Production builds should disable `refresh` and omit the Prefresh plugin.

## Islands notes

Build-time tooling only; island architectures inherit whatever HMR config your SWC pipeline applies to client entries.

## Known limitations

Requires coordinating SWC core and plugin major versions. Vite-first projects often use [@preact/preset-vite](/libraries/preact-preset-vite) instead of manual SWC wiring.

## Alternatives

See [Prefresh](/libraries/prefresh) for Babel/Vite integrations or [@preact/preset-vite](/libraries/preact-preset-vite) for batteries-included Preact HMR.

