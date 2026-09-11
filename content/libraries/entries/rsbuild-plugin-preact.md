---
entryType: library
name: 'Rsbuild Preact Plugin'
slug: 'rsbuild-plugin-preact'
shortDescription: 'Official Rsbuild plugin for Preact JSX, compat aliases and Prefresh HMR.'
category: 'build-tools'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'supported'
packageName: '@rsbuild/plugin-preact'
repositoryUrl: 'https://github.com/web-infra-dev/rsbuild/tree/main/packages/plugin-preact'
documentationUrl: 'https://rsbuild.rs/plugins/list/plugin-preact'
npmUrl: 'https://www.npmjs.com/package/@rsbuild/plugin-preact'
license: 'MIT'
installCommand: 'npm install -D @rsbuild/plugin-preact'
featured: false
islands: false
esm: true
tags:
  - rsbuild
  - bundler
  - prefresh
limitations:
  - '@rsbuild/plugin-preact v2 requires Rsbuild 2.x; use v1 on Rsbuild 1.x projects.'
qualityBadges: []
alternatives:
  - preact-preset-vite
---

## Introduction

`@rsbuild/plugin-preact` is the official Rsbuild plugin for Preact applications. It wires JSX compilation, optional React compatibility aliases and Prefresh-powered hot module replacement into Rsbuild config.

## Installation

```bash
npm install -D @rsbuild/plugin-preact
```

## Preact configuration

Register the plugin in your Rsbuild configuration:

```ts
import { pluginPreact } from "@rsbuild/plugin-preact";

export default {
  plugins: [pluginPreact()],
};
```

Disable React aliases or Prefresh through `reactAliasesEnabled` and `prefreshEnabled` when you need stricter control.

## Example

```ts
import { pluginPreact } from "@rsbuild/plugin-preact";

export default {
  plugins: [
    pluginPreact({
      reactAliasesEnabled: true,
      prefreshEnabled: true,
    }),
  ],
};
```

## SSR notes

Rsbuild handles server and client bundles; verify SSR-specific externals and rendering entry points in your deployment target.

## Islands notes

Build-tooling only. Island architectures inherit whatever client entries Rsbuild emits.

## Known limitations

Match plugin major versions to your Rsbuild release. Custom refresh scopes can be configured through `preactRefreshOptions`.

## Alternatives

Vite-based projects typically use [@preact/preset-vite](/libraries/preact-preset-vite) instead.

