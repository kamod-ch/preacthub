import { Alert, Button, Card, CardContent, CardHeader, CardTitle } from "@kamod-ch/ui";
import { compareUrl, compatibilityStatusLabel } from "../../../src/lib/libraries";
import {
  buildLibraryExternalLinks,
  buildLibraryFacts,
  compatibilityStatusDescription,
  libraryCorrectionUrl,
  resolveInstallCommand,
  type LibraryEditorialContent,
} from "../../../src/lib/library-detail";
import { categoryRoute, type LibraryCategory } from "../../../src/lib/categories";
import {
  buildMaintenanceSignals,
  computedMaintenanceLabel,
} from "../../../src/lib/maintenance-computed";
import { pricingModelLabel } from "../../../src/lib/project-types";
import type { PreactLibrary, ResolvedAlternative } from "../../../src/lib/libraries";
import { CodeBlock } from "./CodeBlock";
import { compatibilityCalloutClass } from "./compatibility-colors";
import { CompatibilityBadge, MaintenanceBadge } from "./LibraryBadge";

const VITE_COMPAT_SNIPPET = `resolve: {
  alias: {
    react: "preact/compat",
    "react-dom/test-utils": "preact/test-utils",
    "react-dom": "preact/compat",
    "react/jsx-runtime": "preact/jsx-runtime",
  },
}`;

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a class="ph-external-link" href={href} target="_blank" rel="noopener noreferrer">
      <span>{label}</span>
      <span class="ph-external-link-indicator" aria-hidden="true">↗</span>
      <span class="ph-sr-only"> (opens in new tab)</span>
    </a>
  );
}

function LibraryFacts({ facts }: { facts: ReturnType<typeof buildLibraryFacts> }) {
  return (
    <dl class="ph-library-facts">
      {facts.map((fact) => (
        <div class="ph-library-fact" key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function LibraryDetailPage({
  library,
  category,
  alternatives,
  relatedProjects = [],
  editorial,
}: {
  library: PreactLibrary;
  category?: LibraryCategory;
  alternatives: ResolvedAlternative[];
  relatedProjects?: PreactLibrary[];
  editorial: LibraryEditorialContent;
}) {
  const facts = buildLibraryFacts(library);
  const links = buildLibraryExternalLinks(library);
  const installCommand = resolveInstallCommand(library);
  const limitations = editorial.limitations;
  const isAi = library.catalogDomain === "ai";
  const maintenance = isAi ? buildMaintenanceSignals(library) : undefined;

  return (
    <article class="ph-library-page">
      <header class="ph-library-header">
        <div class="ph-library-header-top">
          <div class="ph-section-eyebrow">{isAi ? "AI Tool" : "Library"}</div>
          {category ? (
            <a class="ph-category-chip ph-category-chip-link" href={categoryRoute(category.slug)}>
              {category.name}
            </a>
          ) : null}
        </div>
        <h1>{library.name}</h1>
        <p class="ph-library-lead">{library.description}</p>

        <div class={compatibilityCalloutClass(library.compatibilityStatus)} aria-labelledby={`${library.slug}-compatibility-title`}>
          <div class="ph-compatibility-callout-badge">
            {!isAi ? (
              <>
                <CompatibilityBadge value={library.compatibilityStatus} size="md" />
                <MaintenanceBadge value={library.maintenanceStatus} />
              </>
            ) : maintenance ? (
              <span class="ph-meta-chip">{computedMaintenanceLabel(maintenance.computedStatus)}</span>
            ) : null}
          </div>
          <div>
            <h2 id={`${library.slug}-compatibility-title`} class="ph-compatibility-callout-title">
              {isAi ? library.name : compatibilityStatusLabel(library.compatibilityStatus)}
            </h2>
            <p>
              {isAi
                ? library.description
                : compatibilityStatusDescription(library.compatibilityStatus)}
            </p>
          </div>
        </div>

        {links.length ? (
          <nav class="ph-library-links" aria-label="External resources">
            <ul class="ph-library-link-list">
              {links.map((link) => (
                <li key={link.href}>
                  <ExternalLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {library.packageName ? (
          <p class="ph-package-name">
            <span class="ph-package-name-label">Package</span>
            <code class="ph-package-name-value">{library.packageName}</code>
          </p>
        ) : null}
      </header>

      <section class="ph-detail-grid">
        <div class="ph-detail-main">
          <Card>
            <CardHeader>
              <CardTitle>Facts at a glance</CardTitle>
            </CardHeader>
            <CardContent>
              <LibraryFacts facts={facts} />
            </CardContent>
          </Card>

          {installCommand ? <CodeBlock title="Installation" code={installCommand} /> : null}
          {library.compatibilityStatus === "compat" ? (
            <CodeBlock title="Vite configuration" code={VITE_COMPAT_SNIPPET} language="ts" />
          ) : null}
          {editorial.example ? (
            <CodeBlock
              title="Preact example"
              code={editorial.example.code}
              language={editorial.example.language}
            />
          ) : null}

          {editorial.whenToUse ? (
            <section class="ph-detail-section" aria-labelledby={`${library.slug}-when-to-use`}>
              <h2 id={`${library.slug}-when-to-use`}>When to use it</h2>
              <p>{editorial.whenToUse}</p>
            </section>
          ) : null}

          {limitations.length ? (
            <section class="ph-detail-section" aria-labelledby={`${library.slug}-limitations`}>
              <h2 id={`${library.slug}-limitations`}>Known limitations</h2>
              <ul class="ph-limitations-list">
                {limitations.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          ) : null}

          {editorial.supplementalSections.map((section) => (
            <section class="ph-detail-section" key={section.title} aria-labelledby={`${library.slug}-${section.title}`}>
              <h2 id={`${library.slug}-${section.title}`}>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}

          {isAi && library.useCases?.length ? (
            <section class="ph-detail-section" aria-labelledby={`${library.slug}-use-cases`}>
              <h2 id={`${library.slug}-use-cases`}>Use Cases</h2>
              <ul>{library.useCases.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          ) : null}

          {isAi && library.keyFeatures?.length ? (
            <section class="ph-detail-section" aria-labelledby={`${library.slug}-key-features`}>
              <h2 id={`${library.slug}-key-features`}>Key Features</h2>
              <ul>{library.keyFeatures.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          ) : null}

          {isAi && library.supportedProviders?.length ? (
            <section class="ph-detail-section" aria-labelledby={`${library.slug}-providers`}>
              <h2 id={`${library.slug}-providers`}>Supported Providers</h2>
              <ul>{library.supportedProviders.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          ) : null}

          {isAi && library.pricing?.model ? (
            <section class="ph-detail-section" aria-labelledby={`${library.slug}-pricing`}>
              <h2 id={`${library.slug}-pricing`}>Pricing</h2>
              <p>{pricingModelLabel(library.pricing.model)}</p>
            </section>
          ) : null}

          {isAi && maintenance ? (
            <section class="ph-detail-section" aria-labelledby={`${library.slug}-maintenance`}>
              <h2 id={`${library.slug}-maintenance`}>Maintenance Status</h2>
              <p>Computed status: {computedMaintenanceLabel(maintenance.computedStatus)}</p>
              <ul>
                <li>License: {maintenance.hasLicense ? "Available" : "Not recorded"}</li>
                <li>Documentation: {maintenance.hasDocumentation ? "Available" : "Not recorded"}</li>
                <li>TypeScript support: {maintenance.typescriptSupport ? "Yes" : "No or unknown"}</li>
                {maintenance.openSource !== undefined ? (
                  <li>Open source: {maintenance.openSource ? "Yes" : "No"}</li>
                ) : null}
              </ul>
            </section>
          ) : null}

          {alternatives.length ? (
            <section class="ph-detail-section" aria-labelledby={`${library.slug}-alternatives`}>
              <h2 id={`${library.slug}-alternatives`}>Alternatives</h2>
              <ul class="ph-alt-list ph-alt-list-detail">
                {alternatives.map((entry) => (
                  <li class="ph-alt-item" key={entry.route}>
                    <a href={entry.route}>{entry.name}</a>
                    <a class="ph-alt-compare" href={compareUrl(library.slug, entry.slug)}>Compare</a>
                  </li>
                ))}
              </ul>
              {category ? (
                <p class="ph-related-collection">
                  Browse more in <a href={categoryRoute(category.slug)}>{category.name}</a>
                  {isAi ? (
                    <> or explore <a href="/ai">AI tools</a>.</>
                  ) : (
                    <> or explore the full <a href="/libraries">library directory</a>.</>
                  )}
                </p>
              ) : null}
            </section>
          ) : null}

          {relatedProjects.length ? (
            <section class="ph-detail-section" aria-labelledby={`${library.slug}-related`}>
              <h2 id={`${library.slug}-related`}>Related Projects</h2>
              <ul class="ph-alt-list ph-alt-list-detail">
                {relatedProjects.map((entry) => (
                  <li class="ph-alt-item" key={entry.route}>
                    <a href={entry.route}>{entry.name}</a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside class="ph-detail-sidebar">
          {library.tags.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Topics</CardTitle>
              </CardHeader>
              <CardContent class="ph-tag-list">
                {library.tags.map((tag) => (
                  <a key={tag} href={`/libraries?q=${encodeURIComponent(tag)}`}>{tag}</a>
                ))}
              </CardContent>
            </Card>
          ) : null}

          <Alert>
            <strong>Is this information outdated?</strong>
            <p class="ph-muted">
              PreactHub is curated in GitHub. Submit a correction or updated compatibility notes.
            </p>
            <div class="ph-hero-actions">
              <Button href="/submit" variant="outline" size="sm">Submit a library</Button>
              <Button href="/methodology" variant="ghost" size="sm">Methodology</Button>
              <Button href={libraryCorrectionUrl(library)} variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">
                Report outdated info
              </Button>
            </div>
          </Alert>
        </aside>
      </section>
    </article>
  );
}

export function LibraryNotFound({ slug }: { slug: string }) {
  return (
    <section class="ph-not-found" aria-labelledby="library-not-found-title">
      <div class="ph-section-eyebrow">404</div>
      <h1 id="library-not-found-title">Library not found</h1>
      <p class="ph-muted">
        There is no catalog entry for <code>{slug}</code>. It may have moved or has not been published yet.
      </p>
      <div class="ph-hero-actions">
        <Button href="/libraries" class="ph-button-primary">Browse libraries</Button>
        <Button href="/submit" variant="outline">Submit a library</Button>
      </div>
    </section>
  );
}
