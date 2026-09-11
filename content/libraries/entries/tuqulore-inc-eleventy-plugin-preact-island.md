---
entryType: library
name: 'Eleventy Preact Island Plugin'
slug: 'tuqulore-inc-eleventy-plugin-preact-island'
shortDescription: 'Eleventy plugin for server-rendered Preact components with is-land partial hydration.'
category: 'ssr'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'bundled-types'
ssrSupport: 'supported'
packageName: '@tuqulore-inc/eleventy-plugin-preact-island'
repositoryUrl: 'https://github.com/tuqulore/website-boilerplate/tree/main/packages/eleventy-plugin-preact-island'
documentationUrl: 'https://website.tuqulore.workers.dev/en/plugins/eleventy-plugin-preact-island/'
homepageUrl: 'https://github.com/tuqulore/website-boilerplate'
npmUrl: 'https://www.npmjs.com/package/@tuqulore-inc/eleventy-plugin-preact-island'
license: 'MIT'
installCommand: 'npm install -D @11ty/eleventy preact @tuqulore-inc/eleventy-plugin-preact-island'
featured: false
islands: true
esm: true
tags:
  - eleventy
  - islands
  - partial-hydration
limitations:
  - "Requires Node.js 20+, Eleventy 3+, Preact 10+, and the plugin's `.client.*` file convention."
  - 'The browser setup loads the Preact runtime through an injected esm.sh import map unless you replace the default bundling arrangement.'
qualityBadges: []
alternatives:
  - astro-preact
  - fresh
  - preact-iso
---

## Introduction

`@tuqulore-inc/eleventy-plugin-preact-island` adds server-rendered Preact islands to Eleventy using `@11ty/is-land`. It discovers `.client.js`, `.client.jsx`, `.client.ts`, and `.client.tsx` entries, bundles them with esbuild, and coordinates their SSR and browser module URLs.

## Installation

```bash
npm install -D @11ty/eleventy preact @tuqulore-inc/eleventy-plugin-preact-island
```

## Preact configuration

Register the plugin in `eleventy.config.js`. It reads Eleventy's input, output, and path-prefix settings directly. The installed Preact version is auto-detected and pinned in the generated esm.sh import map.

```js
import preactIsland from '@tuqulore-inc/eleventy-plugin-preact-island';

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(preactIsland);
}
```

## Example

```jsx
import { clientComponent } from '@tuqulore-inc/eleventy-plugin-preact-island/island';
import { useState } from 'preact/hooks';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

export default clientComponent(Counter, import.meta.url);
```

Render that client component with the plugin's `<Island component={Counter} on="interaction" />` wrapper from an SSR Preact template.

## SSR notes

The component is rendered to HTML during the Eleventy build. Props are serialized with `devalue`, including values such as Date, Map, and Set, and reused when the browser hydrates the island.

## Islands notes

Hydration is controlled by `is-land`; the default trigger is interaction. Other trigger names can be supplied through `on`, while parameterized media triggers require writing the raw `<is-land>` element.

## Known limitations

Set `bundle: false` only when another bundler emits client files at the exact URLs expected by the resolver. The ecosystem and documentation are smaller than Astro or Fresh.

## Alternatives

Compare [Astro Preact](/libraries/astro-preact), [Fresh](/libraries/fresh), or [Preact ISO](/libraries/preact-iso) for larger islands and SSR ecosystems.

