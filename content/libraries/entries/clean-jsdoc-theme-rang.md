---
entryType: library
name: 'Clean JSDoc Theme Rang'
slug: 'clean-jsdoc-theme-rang'
shortDescription: 'Preact component library, MDX map and island registry for Clean JSDoc Theme v5.'
category: 'developer-tools'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'supported'
packageName: '@clean-jsdoc-theme/rang'
repositoryUrl: 'https://github.com/ankitskvmdam/clean-jsdoc-theme'
documentationUrl: 'https://github.com/ankitskvmdam/clean-jsdoc-theme/blob/master/docs/ARCHITECTURE.md'
npmUrl: 'https://www.npmjs.com/package/@clean-jsdoc-theme/rang'
license: 'MIT'
installCommand: 'npm install @clean-jsdoc-theme/rang'
featured: false
islands: true
esm: true
tags:
  - documentation
  - islands
  - mdx
limitations:
  - 'Designed for Clean JSDoc Theme v5 page shells rather than general-purpose app UI.'
  - 'Reuse outside the dwar/rang architecture requires reviewing island registry contracts.'
qualityBadges: []
---

## Introduction

`@clean-jsdoc-theme/rang` is the native Preact surface for Clean JSDoc Theme v5. It provides SSR chrome (`Layout`, `Header`, `Footer`), interactive documentation islands (`Sidebar`, `ThemeToggle`, `CtrlK`, code tabs and copy helpers) and the `defaultMdxComponents` map used by the theme renderer.

## Installation

```bash
npm install @clean-jsdoc-theme/rang
```

## Preact configuration

Import chrome, islands and MDX helpers directly from `@clean-jsdoc-theme/rang`. Pair the package with `@clean-jsdoc-theme/utils` island names through the exported `ISLAND_REGISTRY` when wiring hydration entry points.

## Example

```tsx
import { Layout, Header, Sidebar, defaultMdxComponents } from "@clean-jsdoc-theme/rang";

export function DocsPage({ children }: { children: preact.ComponentChildren }) {
  return (
    <Layout>
      <Header />
      <Sidebar />
      <main>{children}</main>
    </Layout>
  );
}

export { defaultMdxComponents };
```

## SSR notes

Chrome components are SSR-only while islands render meaningful initial HTML and hydrate for keyboard handling, theme persistence, clipboard actions and navigation affordances.

## Islands notes

Each island listed in `ISLAND_REGISTRY` is bundled as its own ESM chunk by the theme pipeline. Scope hydration roots per island name (`sidebar`, `theme-toggle`, `cmdk`, and others) to avoid duplicate client controllers.

## Known limitations

The package is tightly coupled to Clean JSDoc Theme infrastructure. Using individual islands in unrelated Preact apps may require replicating locale and theme providers exported alongside the components.

## Alternatives

For general documentation sites outside Clean JSDoc Theme, compare with [PreactPress](/libraries/preactpress) or your static-site generator of choice.

