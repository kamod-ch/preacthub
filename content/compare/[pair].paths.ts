import { getComparePaths } from "../../src/lib/library-node";

export default {
  paths() {
    return getComparePaths(process.cwd());
  },
};
