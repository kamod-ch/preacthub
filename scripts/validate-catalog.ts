import { validateLibraryCatalog } from "../src/lib/library-node.js";

try {
  const libraries = validateLibraryCatalog(process.cwd());
  console.log(`PreactHub catalog validation passed (${libraries.length} libraries).`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
