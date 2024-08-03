import { Diroute, Module } from "@/types/dirouted.type";
import { camelize } from "@/utils/camelize";

export function toDiroute(files: Record<string, Module>): Diroute {
  const diroutedRoute: Diroute = {};

  Object.entries(files).forEach(([filePath, module]) => {
    const segments = filePath
      .slice("/src/pages".length, -".tsx".length)
      .split("/")
      .map((segment) => (segment === "" ? "/" : segment));

    if (!module.default) {
      throw Error(`[@genr/dirouted]: Missing default export in ${filePath}`);
    }

    segments.reduce((parent, segment, idx) => {
      const isLast = idx === segments.length - 1;
      if (isLast) parent[camelize(segment)] = module.default;
      if (!isLast && !parent[segment]) parent[segment] = {};

      return parent[segment] as Diroute;
    }, diroutedRoute);
  });

  return diroutedRoute;
}
