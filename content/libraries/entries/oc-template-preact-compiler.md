---
entryType: library
name: 'OpenComponents Preact Compiler'
slug: 'oc-template-preact-compiler'
shortDescription: 'Compiler for building Preact components in the OpenComponents template system.'
category: 'build-tools'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'bundled-types'
ssrSupport: 'supported'
packageName: 'oc-template-preact-compiler'
repositoryUrl: 'https://github.com/opencomponents/vite-templates'
documentationUrl: 'https://github.com/opencomponents/vite-templates/tree/main/packages/oc-template-preact-compiler'
homepageUrl: 'https://opencomponents.github.io/'
npmUrl: 'https://www.npmjs.com/package/oc-template-preact-compiler'
license: 'MIT'
installCommand: 'npm install oc-template-preact-compiler oc-template-preact preact'
featured: false
islands: false
esm: true
tags:
  - opencomponents
  - compiler
  - vite
limitations:
  - 'Only useful inside the OpenComponents architecture; it is not a general-purpose Preact compiler or Vite preset.'
  - 'The package depends on the OC template and Vite compiler lifecycle, so upgrades should be coordinated across the OpenComponents packages.'
qualityBadges: []
alternatives:
  - preact-preset-vite
  - rsbuild-plugin-preact
---

## Introduction

`oc-template-preact-compiler` is the compiler module for OpenComponents entries that use the `oc-template-preact` template. It connects the OC compilation lifecycle to Preact and Vite and re-exports the matching template API.

## Installation

```bash
npm install oc-template-preact-compiler oc-template-preact preact
```

In a normal OpenComponents project, prefer the official Preact template or scaffold so compiler and template versions remain aligned.

## Preact configuration

Declare the Preact template and compiler through OpenComponents rather than adding this package as a generic Preact plugin. The package has a Preact 10 peer requirement but also carries OC-specific compiler dependencies.

## Example

A component's OC metadata selects the Preact template; the OC CLI then invokes this compiler during packaging:

```json
{
  "name": "hello-preact",
  "version": "1.0.0",
  "oc": {
    "files": { "template": { "type": "oc-template-preact" } }
  }
}
```

Use the current OpenComponents Preact starter as the canonical source for the complete descriptor shape.

## SSR notes

OpenComponents compiles templates for server-side rendering and delivery through an OC registry. Rendering behavior belongs to the paired `oc-template-preact` package and OC runtime, not to a standalone Preact SSR API exposed by this compiler.

## Islands notes

The compiler targets independently delivered OpenComponents rather than a first-class partial-hydration API. Treat an OC component as an integration boundary, but do not assume island-style selective hydration without validating the host setup.

## Known limitations

This is infrastructure for one component platform, with very brief package-level documentation. Follow the OpenComponents Vite templates repository and keep compiler, template, and CLI versions compatible.

## Alternatives

For ordinary Preact applications, use [Preact Preset Vite](/libraries/preact-preset-vite) or [Rsbuild Plugin Preact](/libraries/rsbuild-plugin-preact).

