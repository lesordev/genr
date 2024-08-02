import { BaseComponent, DiroutedNode } from "@/types/dirouted.type";

export function setTree(
  obj: DiroutedNode,
  segments: string[],
  value: DiroutedNode | BaseComponent | undefined
) {
  segments.reduce((acc, key, i) => {
    if (acc[key] === undefined) acc[key] = {};
    if (i === segments.length - 1) acc[key] = value;

    return acc[key] as DiroutedNode;
  }, obj);
}
