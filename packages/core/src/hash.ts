/**
 * djb2 hash. Deterministic across runs and platforms. Used for stable lesson ids
 * and seeded variation in generated paths. Not for cryptographic use.
 */
export function djb2(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function hashId(prefix: string, ...parts: (string | number)[]): string {
  const h = djb2(parts.join('|')).toString(36);
  return `${prefix}_${h}`;
}
