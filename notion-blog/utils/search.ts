export function search(target: string, query: string): boolean {
  if (!query) return true;
  return target.toLowerCase().includes(query.toLowerCase());
}
