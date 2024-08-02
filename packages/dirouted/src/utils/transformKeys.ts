export function transformKeys<T>(obj: Record<string, T>) {
  const output: Record<string, T> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = key.replace("/src/pages", "");
    output[newKey] = value;
  }

  return output;
}
