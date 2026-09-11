---
entryType: library
name: 'Preliquify Preact'
slug: 'preliquify-preact'
shortDescription: 'Preact bindings to compile components into Shopify Liquid with client hydration.'
category: 'developer-tools'
compatibilityStatus: 'native'
maintenanceStatus: 'active'
typescriptSupport: 'native'
ssrSupport: 'limited'
packageName: '@preliquify/preact'
repositoryUrl: 'https://github.com/MichaelNusair/preliquify/tree/main/packages/preact'
documentationUrl: 'https://github.com/MichaelNusair/preliquify#readme'
homepageUrl: 'https://github.com/MichaelNusair/preliquify#readme'
npmUrl: 'https://www.npmjs.com/package/@preliquify/preact'
license: 'MIT'
installCommand: 'npm install -D @preliquify/cli @preliquify/preact'
featured: false
islands: true
esm: true
tags:
  - shopify
  - liquid
  - themekit
limitations:
  - 'Specialized for Shopify Liquid theme workflows—not a general Preact UI library.'
  - 'Components must use Preliquify primitives (`For`, `Conditional`, `$` expressions) instead of raw JavaScript array methods for Liquid-safe compilation.'
qualityBadges: []
alternatives:
  - preact-custom-element
---

## Introduction

`@preliquify/preact` lets you author Preact components that compile to Shopify Liquid snippets plus client bundles for hydration. Primitives such as `For`, `Conditional`, and `$` generate Liquid control flow at build time while sharing one component definition for runtime hydration.

## Installation

```bash
npm install -D @preliquify/cli @preliquify/preact
```

## Preact configuration

Configure `@preliquify/cli` with entry snippets and output directories, then export snippets via `createLiquidSnippet` from `@preliquify/preact`. Default JSX import source is Preact.

## Example

```tsx
import { createLiquidSnippet, For, Conditional, $ } from "@preliquify/preact";

function ProductCard({ product, showPrice }) {
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <Conditional when={showPrice}>
        <p className="price">${product.price}</p>
      </Conditional>
    </div>
  );
}

export default createLiquidSnippet(ProductCard, {
  product: "product",
  showPrice: "showPrice",
});
```

Build with `preliquify build`, then render in Liquid:

```liquid
{% render 'ProductCard-prlq', product: product, showPrice: true %}
```

## SSR notes

Liquid templates render on Shopify at request time; Preliquify client bundles hydrate in the browser. Build-time compilation replaces SSR in the traditional Preact sense.

## Islands notes

Each compiled snippet behaves like a Shopify island: Liquid outputs static HTML, client bundles attach interactivity.

## Known limitations

Avoid JavaScript `.map()` on Liquid props—use `<For each={$.var('products')} as="product">` instead. Requires theme asset wiring for runtime scripts.

## Alternatives

For non-Shopify embedding, [Preact Custom Element](/libraries/preact-custom-element) wraps components as standard web components.

