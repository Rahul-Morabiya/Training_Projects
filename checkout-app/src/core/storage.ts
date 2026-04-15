export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};