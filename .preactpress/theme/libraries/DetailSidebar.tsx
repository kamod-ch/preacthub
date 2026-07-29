import { Alert, Button, Card, CardContent, CardHeader, CardTitle } from "@kamod-ch/ui";
import { compareUrl, computeHealthScore, healthScoreInputFromLibrary } from "../../../src/lib/libraries";
import {
  buildLibraryExternalLinks,
  buildLibraryFacts,
  libraryCorrectionUrl,
  type LibraryFactRow,
} from "../../../src/lib/library-detail";
import type { PreactLibrary, ResolvedAlternative } from "../../../src/lib/libraries";
import { HealthScore } from "./HealthScore";

function FactGrid({ facts }: { facts: LibraryFactRow[] }) {
  return (
    <div class="ph-fact-grid" aria-label="Key facts">
      {facts.map((fact) => (
        <div key={fact.label}>
          <span>{fact.label}</span>
          <strong>{fact.value}</strong>
        </div>
      ))}
    </div>
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
  const facts = buildLibraryFacts(library);
  const links = buildLibraryExternalLinks(library);
  const score = showHealthScore ? computeHealthScore(healthScoreInputFromLibrary(library)) : undefined;

  return (
    <aside class="ph-detail-sidebar ph-detail-sidebar-sticky">
      {score ? <HealthScore value={score} compact /> : null}

      <Card>
        <CardHeader>
          <CardTitle>At a glance</CardTitle>
        </CardHeader>
        <CardContent>
          <FactGrid facts={facts} />
        </CardContent>
      </Card>

      {links.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
          </CardHeader>
          <CardContent class="ph-detail-sidebar-links">
            {links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
                <span aria-hidden="true"> ↗</span>
              </a>
            ))}
          </CardContent>
        </Card>
      ) : null}

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

      {alternatives.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Similar libraries</CardTitle>
          </CardHeader>
          <CardContent class="ph-detail-sidebar-alts">
            {alternatives.slice(0, 4).map((entry) => (
              <div class="ph-detail-sidebar-alt" key={entry.route}>
                <a href={entry.route}>{entry.name}</a>
                <a class="ph-alt-compare" href={compareUrl(library.slug, entry.slug)}>Compare</a>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <DetailCorrectionAlert library={library} />
    </aside>
  );
}
