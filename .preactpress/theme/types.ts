import type { CategorySummary, PreactLibrary } from "../../src/lib/libraries";
import type { HomeDirectoryInsights } from "../../src/lib/directory-insights";
import type { LibraryCategory } from "../../src/lib/categories";
import type { LibraryEditorialContent } from "../../src/lib/library-detail";

export interface LibraryDirectoryMeta {
  libraries: PreactLibrary[];
  featured: PreactLibrary[];
  categories: CategorySummary[];
  stats: {
    total: number;
    categories: number;
    verified: number;
    native: number;
    lastUpdatedAt?: string;
  };
  home?: HomeDirectoryInsights;
  currentCategory?: LibraryCategory;
}

export interface SubmissionMeta {
  issueTemplate: string;
  issueUrl: string;
}

export interface ThemeMetaRecord extends Record<string, unknown> {
  libraryDirectory?: LibraryDirectoryMeta;
  library?: PreactLibrary;
  libraryAlternatives?: import("../../src/lib/libraries").ResolvedAlternative[];
  libraryEditorial?: LibraryEditorialContent;
  libraryCategory?: LibraryCategory;
  librarySubmission?: SubmissionMeta;
  compareLibraries?: [PreactLibrary, PreactLibrary];
  unknownLibrarySlug?: string;
}
