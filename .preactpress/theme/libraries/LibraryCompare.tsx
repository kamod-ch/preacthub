import type { ComponentChildren } from "preact";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@kamod-ch/ui";
import { getCategory } from "../../../src/lib/categories";
import {
  computeHealthScore,
  formatAuditSummary,
  formatDate,
  maintenanceStatusLabel,
  ssrSupportLabel,
  typescriptSupportLabel,
  type PreactLibrary,
} from "../../../src/lib/libraries";
import { CompatibilityBadge, QualityBadge, StatusBadge } from "./LibraryBadge";
import { HealthScore } from "./HealthScore";
import { yesNoUnknown } from "../utils";

function CompareCell({ label, children }: { label: string; children: ComponentChildren }) {
  return (
    <div class="ph-compare-cell">
      <span class="ph-compare-cell-label">{label}</span>
      <div class="ph-compare-cell-value">{children}</div>
    </div>
  );
}

function RuntimeRow({ library }: { library: PreactLibrary }) {
  return (
    <div class="ph-compare-runtime">
      <span class={library.typescript ? "ph-runtime-yes" : "ph-runtime-no"}>{library.typescript ? "TypeScript" : "No TS"}</span>
      <span class={library.ssr ? "ph-runtime-yes" : "ph-runtime-no"}>{library.ssr ? "SSR" : "No SSR"}</span>
      <span class={library.islands ? "ph-runtime-yes" : "ph-runtime-no"}>{library.islands ? "Islands" : "No islands"}</span>
      <span class={library.esm ? "ph-runtime-yes" : "ph-runtime-no"}>{library.esm ? "ESM" : "No ESM"}</span>
    </div>
  );
}

export function LibraryCompare({ libraries }: { libraries: [PreactLibrary, PreactLibrary] }) {
  const [left, right] = libraries;

  return (
    <article class="ph-compare-page">
      <header class="ph-page-intro">
        <div class="ph-section-eyebrow">Compare</div>
        <h1>{left.name} vs {right.name}</h1>
        <p class="ph-muted">Side-by-side compatibility, runtime support and editorial notes for Preact projects.</p>
        <div class="ph-compare-actions">
          <Button href="/libraries" class="ph-button-primary">Start browsing libraries</Button>
        </div>
      </header>

      <div class="ph-compare-grid">
        {[left, right].map((library) => {
          const category = getCategory(library.category);
          const score = computeHealthScore({
            compatibilityStatus: library.compatibilityStatus,
            maintenanceStatus: library.maintenanceStatus,
            typescriptSupport: library.typescriptSupport,
            ssrSupport: library.ssrSupport,
            islands: library.islands,
            esm: library.esm,
            lastVerifiedAt: library.lastVerifiedAt,
          });
          return (
            <Card key={library.slug} class="ph-compare-card">
              <CardHeader>
                <div class="ph-card-badges">
                  <CompatibilityBadge value={library.compatibilityStatus} />
                  <StatusBadge value={library.maintenanceStatus} />
                </div>
                <CardTitle>{library.name}</CardTitle>
                <p class="ph-library-description">{library.description}</p>
                {library.packageName ? <p class="ph-package-name">{library.packageName}</p> : null}
              </CardHeader>
              <CardContent class="ph-compare-card-body">
                <CompareCell label="Category"><strong>{category?.name ?? library.category}</strong></CompareCell>
                <CompareCell label="Compatibility"><CompatibilityBadge value={library.compatibilityStatus} /></CompareCell>
                <CompareCell label="Maintenance"><strong>{maintenanceStatusLabel(library.maintenanceStatus)}</strong></CompareCell>
                <CompareCell label="Runtime"><RuntimeRow library={library} /></CompareCell>
                <CompareCell label="Verified"><strong>{formatDate(library.lastVerifiedAt)}</strong></CompareCell>
                <CompareCell label="Tested with">
                  <strong>{library.testedPreactVersions.length ? `Preact ${library.testedPreactVersions.join(", ")}` : "Not documented"}</strong>
                </CompareCell>
                <CompareCell label="License"><strong>{library.license ?? "Unknown"}</strong></CompareCell>
                <CompareCell label="Bundle size"><strong>{library.bundleSize ?? "Not documented"}</strong></CompareCell>
                {library.qualityBadges.length ? (
                  <CompareCell label="Quality badges">
                    <div class="ph-quality-badge-list">
                      {library.qualityBadges.map((badge) => <QualityBadge key={badge} value={badge} />)}
                    </div>
                  </CompareCell>
                ) : null}
                {formatAuditSummary(library) ? (
                  <CompareCell label="AI audit">
                    <strong>{formatAuditSummary(library)}</strong>
                    {library.auditUrl ? (
                      <div><a href={library.auditUrl} target="_blank" rel="noopener noreferrer">View report</a></div>
                    ) : null}
                  </CompareCell>
                ) : null}
                {library.limitations?.length ? (
                  <CompareCell label="Limitations">
                    <ul class="ph-compare-limitations">
                      {library.limitations.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </CompareCell>
                ) : null}
                <div class="ph-compare-score-wrap">
                  <HealthScore value={score} compact />
                </div>
                <Button href={library.route} variant="outline" size="sm" class="ph-compare-detail-link">
                  View {library.name} profile
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <section class="ph-compare-summary">
        <h2>At a glance</h2>
        <div class="ph-compare-table-wrap">
          <table class="ph-compare-table">
            <thead>
              <tr>
                <th scope="col">Attribute</th>
                <th scope="col">{left.name}</th>
                <th scope="col">{right.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Compatibility</th>
                <td><CompatibilityBadge value={left.compatibilityStatus} /></td>
                <td><CompatibilityBadge value={right.compatibilityStatus} /></td>
              </tr>
              <tr>
                <th scope="row">Maintenance</th>
                <td>{maintenanceStatusLabel(left.maintenanceStatus)}</td>
                <td>{maintenanceStatusLabel(right.maintenanceStatus)}</td>
              </tr>
              <tr>
                <th scope="row">TypeScript</th>
                <td>{typescriptSupportLabel(left.typescriptSupport)}</td>
                <td>{typescriptSupportLabel(right.typescriptSupport)}</td>
              </tr>
              <tr>
                <th scope="row">SSR</th>
                <td>{ssrSupportLabel(left.ssrSupport)}</td>
                <td>{ssrSupportLabel(right.ssrSupport)}</td>
              </tr>
              <tr>
                <th scope="row">Islands</th>
                <td>{yesNoUnknown(left.islands, "Limited")}</td>
                <td>{yesNoUnknown(right.islands, "Limited")}</td>
              </tr>
              <tr>
                <th scope="row">Last verified</th>
                <td>{formatDate(left.lastVerifiedAt)}</td>
                <td>{formatDate(right.lastVerifiedAt)}</td>
              </tr>
              <tr>
                <th scope="row">AI audit</th>
                <td>{formatAuditSummary(left) ?? "Not audited"}</td>
                <td>{formatAuditSummary(right) ?? "Not audited"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
