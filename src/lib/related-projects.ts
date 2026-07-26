import type { PreactLibrary } from "./libraries";

const MAX_RELATED = 6;

interface ScoredCandidate {
  library: PreactLibrary;
  score: number;
}

/**
 * Finds related projects using prioritized matching:
 * 1. Same subcategory
 * 2. Same primary category
 * 3. Shared tags
 * 4. Same runtime
 * 5. Same project type
 * 6. Similar hosting type
 */
export function findRelatedProjects(
  source: PreactLibrary,
  allLibraries: PreactLibrary[],
  bySlug: Map<string, PreactLibrary>,
): PreactLibrary[] {
  const seen = new Set<string>([source.slug]);
  const candidates: ScoredCandidate[] = [];

  for (const candidate of allLibraries) {
    if (candidate.slug === source.slug) continue;

    let score = 0;

    const sourceSubs = new Set(source.subcategories ?? []);
    const candidateSubs = candidate.subcategories ?? [];
    const sharedSubs = candidateSubs.filter((s) => sourceSubs.has(s));
    if (sharedSubs.length) score += 100 * sharedSubs.length;

    if (candidate.category === source.category) score += 50;

    const sourceCategories = new Set(source.categories);
    if (sourceCategories.has(candidate.category)) score += 30;
    for (const cat of candidate.categories) {
      if (sourceCategories.has(cat)) score += 10;
    }

    const sourceTags = new Set(source.tags);
    for (const tag of candidate.tags) {
      if (sourceTags.has(tag)) score += 5;
    }

    const sourceRuntimes = new Set(source.runtimes ?? []);
    for (const runtime of candidate.runtimes ?? []) {
      if (sourceRuntimes.has(runtime)) score += 3;
    }

    if (
      source.projectType &&
      candidate.projectType &&
      source.projectType === candidate.projectType
    ) {
      score += 2;
    }

    if (
      source.hostingType &&
      candidate.hostingType &&
      source.hostingType === candidate.hostingType
    ) {
      score += 1;
    }

    if (score > 0) {
      candidates.push({ library: candidate, score });
    }
  }

  candidates.sort(
    (a, b) => b.score - a.score || a.library.name.localeCompare(b.library.name),
  );

  const result: PreactLibrary[] = [];
  for (const { library } of candidates) {
    if (seen.has(library.slug)) continue;
    seen.add(library.slug);
    result.push(library);
    if (result.length >= MAX_RELATED) break;
  }

  for (const altSlug of source.alternatives ?? []) {
    if (result.length >= MAX_RELATED) break;
    const alt = bySlug.get(altSlug);
    if (alt && !seen.has(alt.slug)) {
      seen.add(alt.slug);
      result.push(alt);
    }
  }

  return result.slice(0, MAX_RELATED);
}
