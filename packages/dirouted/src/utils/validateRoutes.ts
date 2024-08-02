import { Module } from "@/types/dirouted.type";

export function validateRoutes(modules: Record<string, Module>) {
  const isExistPath: Record<string, boolean> = {};

  for (const key of Object.keys(modules)) {
    if (!key.endsWith("page.tsx")) continue;

    const path = key.slice(0, -"page.tsx".length).replace(/\(.*\)\//, "");

    if (isExistPath[path]) {
      throw new Error(`Duplicate path: ${path}`);
    } else {
      isExistPath[path] = true;
    }
  }
}
