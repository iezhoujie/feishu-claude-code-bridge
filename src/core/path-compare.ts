import { realpathSync } from 'node:fs';

function canonical(p: string): string {
  try {
    return realpathSync(p);
  } catch {
    return p;
  }
}

/** Compare two paths by what they actually point to on disk.
 *
 * String compare misses symlink/mount aliases — e.g. `/home/u` and
 * `/data00/home/u` resolve to the same inode but differ as strings, so a
 * session pinned to one form looks stale when the other form is computed
 * later. Resolve both sides through realpath before comparing; fall back to
 * the raw string if either side can't be resolved (path may not exist yet).
 */
export function samePath(a: string, b: string): boolean {
  if (a === b) return true;
  return canonical(a) === canonical(b);
}