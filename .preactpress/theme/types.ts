import type { CategorySummary, HealthScoreResult, PreactLibrary, ResolvedAlternative } from "../../src/lib/libraries";
import type { LibraryCategory } from "../../src/lib/categories";

export interface LibraryDirectoryMeta {
  libraries: PreactLibrary[];
  featured: PreactLibrary[];
  categories: CategorySummary[];
  stats: {
    total: number;
    categories: number;
    verified: number;
    native: number;
  };
  currentCategory?: LibraryCategory;
}

export interface SubmissionMeta {
  issueTemplate: string;
  issueUrl: string;
}

export interface ThemeMetaRecord extends Record<string, unknown> {
  libraryDirectory?: LibraryDirectoryMeta;
  library?: PreactLibrary;
  libraryAlternatives?: ResolvedAlternative[];
  libraryHealthScore?: HealthScoreResult;
  libraryCategory?: LibraryCategory;
  librarySubmission?: SubmissionMeta;
}
