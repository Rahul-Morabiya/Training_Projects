const used = new Set<string>();

export const createKey = () => `key_${Date.now()}`;

export const isDuplicate = (k: string) => {
  if (used.has(k)) return true;
  used.add(k);
  return false;
};