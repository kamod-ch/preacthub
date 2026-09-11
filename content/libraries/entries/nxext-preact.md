---
entryType: library
name: 'Nxext Preact'
slug: 'nxext-preact'
shortDescription: 'Nx plugin generating and building Preact applications and libraries in Nx workspaces.'
category: 'build-tools'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'supported'
packageName: '@nxext/preact'
repositoryUrl: 'https://github.com/nxext/nx-extensions/tree/main/packages/preact'
documentationUrl: 'https://nxext.dev/docs/preact/overview'
homepageUrl: 'https://nxext.dev/'
npmUrl: 'https://www.npmjs.com/package/@nxext/preact'
license: 'MIT'
installCommand: 'npm install -D @nxext/preact'
featured: false
islands: false
esm: true
tags:
  - nx
  - monorepo
  - generator
limitations:
  - 'Peer dependencies target Nx 23.x packages; verify compatibility when upgrading Nx major versions.'
  - 'Opinionated Nx executors and generators—value appears inside Nx monorepos, not standalone Vite apps.'
qualityBadges: []
alternatives:
  - preact-cli
  - preact-preset-vite
---

## Introduction

`@nxext/preact` adds Preact application and library generators to [Nx](https://nx.dev) workspaces via the [Nxext](https://nxext.dev) project. It wires Preact build, test, and e2e targets into Nx's task graph.

## Installation

```bash
npm install -D @nxext/preact
```

## Preact configuration

After installation, generate a Preact app or library with Nx CLI. The plugin configures Vite-based Preact tooling consistent with other Nxext framework plugins.

## Example

```bash
nx g @nxext/preact:app my-app
nx g @nxext/preact:library my-lib

nx build my-app
nx test my-app
nx e2e my-app
```

## SSR notes

SSR support depends on the generated app template and chosen Nx targets. Review Nxext docs when adding custom server or prerender executors.

## Islands notes

Monorepo tooling only; island architecture is implemented in application code the generator scaffolds.

## Known limitations

Requires aligned `@nx/devkit`, `@nx/vite`, and related Nx 23 peer packages. Not a substitute for `@preact/preset-vite` outside Nx.

## Alternatives

Non-Nx projects use [Preact CLI](/libraries/preact-cli) or [@preact/preset-vite](/libraries/preact-preset-vite).

