import axios from "axios";

export const apiClient = async (url: string, options: any = {}) => {
  const sim = (window as any).__SIM__;

  /**
   * ✅ Controlled delay
   */
  if (sim?.slow) {
    await new Promise((r) => setTimeout(r, 2000));
  }

  /**
   * ✅ ONLY fail when explicitly enabled
   */
  if (sim?.fail) {
    throw new Error("Simulated API failure");
  }

  /**
   * ❌ REMOVE random failure (IMPORTANT)
   */
  // if (Math.random() < 0.2) { ... }  ❌ DELETE THIS

  const res = await axios(url, options);
  return res.data;
};