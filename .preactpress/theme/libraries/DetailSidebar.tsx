import { Alert, Button, Card, CardContent, CardHeader, CardTitle } from "@kamod-ch/ui";
import type { ComponentChildren } from "preact";
import { compareUrl, computeHealthScore, healthScoreInputFromLibrary } from "../../../src/lib/libraries";
import {
  buildSidebarExternalLinks,
  buildSidebarFacts,
  libraryCorrectionUrl,
  type LibraryFactRow,
} from "../../../src/lib/library-detail";
import type { PreactLibrary, ResolvedAlternative } from "../../../src/lib/libraries";
import { HealthScore } from "./HealthScore";

function SidebarMeta({ facts }: { facts: LibraryFactRow[] }) {
  return (
    <dl class="ph-sidebar-meta" aria-label="Library metadata">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function SidebarSection({
  label,
  children,
}: {
  label?: string;
  children: ComponentChildren;
}) {
  return (
    <section class="ph-sidebar-section">
      {label ? <h3 class="ph-sidebar-section-label">{label}</h3> : null}
      {children}
    </section>
  );
}

export function DetailCorrectionFooter({ library }: { library: PreactLibrary }) {
  return (
    <footer class="ph-sidebar-footer">
      <p>Is this information outdated?</p>
      <div class="ph-sidebar-footer-links">
        <a href={libraryCorrectionUrl(library)} target="_blank" rel="noopener noreferrer">
          Report outdated info
        </a>
        <span aria-hidden="true">·</span>
        <a href="/methodology">Methodology</a>
      </div>
    </footer>
  );
}

export function DetailCorrectionAlert({ library }: { library: PreactLibrary }) {
  return (
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
  );
}

export function DetailSidebar({
  library,
  alternatives,
  showHealthScore = true,
}: {
  library: PreactLibrary;
  alternatives: ResolvedAlternative[];
  showHealthScore?: boolean;
}) {
  const facts = buildSidebarFacts(library);
  const links = buildSidebarExternalLinks(library);
  const score = showHealthScore ? computeHealthScore(healthScoreInputFromLibrary(library)) : undefined;

  return (
    <aside class="ph-detail-sidebar ph-detail-sidebar-sticky">
      {score ? <HealthScore value={score} compact /> : null}

      <Card class="ph-sidebar-overview">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent class="ph-sidebar-overview-body">
          <SidebarSection>
            <SidebarMeta facts={facts} />
          </SidebarSection>

          {links.length ? (
            <SidebarSection label="Links">
              <div class="ph-sidebar-link-row">
                {links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                ))}
              </div>
            </SidebarSection>
          ) : null}

          {library.tags.length ? (
            <SidebarSection label="Topics">
              <div class="ph-tag-list">
                {library.tags.map((tag) => (
                  <a key={tag} href={`/libraries?q=${encodeURIComponent(tag)}`}>{tag}</a>
                ))}
              </div>
            </SidebarSection>
          ) : null}

          {alternatives.length ? (
            <SidebarSection label="Similar libraries">
              <div class="ph-detail-sidebar-alts">
                {alternatives.slice(0, 4).map((entry) => (
                  <div class="ph-detail-sidebar-alt" key={entry.route}>
                    <a href={entry.route}>{entry.name}</a>
                    <a class="ph-alt-compare" href={compareUrl(library.slug, entry.slug)}>Compare</a>
                  </div>
                ))}
              </div>
            </SidebarSection>
          ) : null}

          <DetailCorrectionFooter library={library} />
        </CardContent>
      </Card>
    </aside>
  );
}
