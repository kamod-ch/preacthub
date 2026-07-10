---
entryType: library
name: Chart.js
slug: chart-js
description: Widely used canvas charting library with many available adapters.
category: charts
packageName: "chart.js"
repository: "https://github.com/chartjs/Chart.js"
documentation: "https://www.chartjs.org/"
homepage: "https://www.chartjs.org/"
compatibility: unknown
status: stable
typescript: true
ssr: false
islands: true
esm: true
license: MIT
tags:
  - charts
  - canvas
  - visualization
alternatives:
  - echarts
---

## Introduction

Chart.js is often used in dashboards and analytics views where canvas rendering is acceptable.

## Installation

```bash
npm install chart.js
```

## Preact configuration

Rendering is browser-oriented, so pair it with a thin Preact wrapper or direct canvas management.

## Example

```ts
import { Chart } from "chart.js/auto";

new Chart(canvas, {
  type: "line",
  data: { labels: ["Jan", "Feb"], datasets: [{ data: [3, 6] }] },
});
```

## SSR notes

Charts usually need client-only execution because they rely on canvas and layout measurements.

## Islands notes

When using this library inside an island, keep browser-specific setup inside the island component or an effect, and pass only serializable props from the server-rendered page.
