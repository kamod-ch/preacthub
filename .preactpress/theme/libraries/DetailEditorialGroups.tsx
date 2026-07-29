import type { ComponentChildren } from "preact";
import { Card } from "@kamod-ch/ui";
import { compareUrl } from "../../../src/lib/libraries";
import type { EditorialGroup } from "../../../src/lib/detail-sections";
import type { ResolvedAlternative } from "../../../src/lib/libraries";

function EditorialGroupCard({ group }: { group: EditorialGroup }) {
  return (
    <Card class="ph-editorial-group">
      <div class="ph-editorial-group-header">
        <h3>{group.title}</h3>
      </div>
      <div class="ph-editorial-group-body">
        {group.sections.map((section) => (
          <div class="ph-editorial-section" key={section.title}>
            {group.sections.length > 1 ? <h4>{section.title}</h4> : null}
            <p>{section.body}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function DetailEditorialGroups({ groups }: { groups: EditorialGroup[] }) {
  if (!groups.length) return null;

  return (
    <div class="ph-editorial-groups">
      {groups.map((group) => (
        <EditorialGroupCard key={group.id} group={group} />
      ))}
    </div>
  );
}

export function DetailLimitations({
  limitations,
  slug,
}: {
  limitations: string[];
  slug: string;
}) {
  if (!limitations.length) return null;

  const primary = limitations.slice(0, 3);
  const extra = limitations.slice(3);

  return (
    <section class="ph-detail-section" aria-labelledby={`${slug}-limitations`}>
      <h2 id={`${slug}-limitations`}>Known limitations</h2>
      <ul class="ph-limitations-list">
        {primary.map((item) => <li key={item}>{item}</li>)}
      </ul>
      {extra.length ? (
        <details class="ph-score-details ph-limitations-more">
          <summary>Show {extra.length} more limitation{extra.length === 1 ? "" : "s"}</summary>
          <ul class="ph-limitations-list">
            {extra.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </details>
      ) : null}
    </section>
  );
}

export function DetailAlternativesList({
  librarySlug,
  alternatives,
  categoryLink,
  browseMoreSuffix,
}: {
  librarySlug: string;
  alternatives: ResolvedAlternative[];
  categoryLink?: { href: string; label: string };
  browseMoreSuffix?: ComponentChildren;
}) {
  if (!alternatives.length) return null;

  return (
    <section class="ph-detail-section" aria-labelledby={`${librarySlug}-alternatives`}>
      <h2 id={`${librarySlug}-alternatives`}>Alternatives</h2>
      <ul class="ph-alt-list ph-alt-list-detail">
        {alternatives.map((entry) => (
          <li class="ph-alt-item" key={entry.route}>
            <a href={entry.route}>{entry.name}</a>
            <a class="ph-alt-compare" href={compareUrl(librarySlug, entry.slug)}>Compare</a>
          </li>
        ))}
      </ul>
      {categoryLink ? (
        <p class="ph-related-collection">
          Browse more in <a href={categoryLink.href}>{categoryLink.label}</a>
          {browseMoreSuffix}
        </p>
      ) : null}
    </section>
  );
}
