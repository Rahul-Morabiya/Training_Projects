import { useEffect, useState } from "react";
import { getDevMode, subscribeDevMode } from "../../core/devMode";

export default function SimulationPanel() {
  const [visible, setVisible] = useState(getDevMode());
  const [fail, setFail] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    subscribeDevMode(setVisible);
  }, []);

  /**
   * 🔥 GLOBAL SIMULATION STATE
   */
  useEffect(() => {
    (window as any).__SIM__ = { fail, slow };
  }, [fail, slow]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 right-4 bg-white dark:bg-gray-900 shadow-xl p-3 text-xs rounded-xl z-[9999] w-52">

      <div className="font-semibold mb-2">Simulation</div>

      <label className="block">
        <input
          type="checkbox"
          onChange={(e) => setFail(e.target.checked)}
        />
        Force Failure
      </label>

      <label className="block">
        <input
          type="checkbox"
          onChange={(e) => setSlow(e.target.checked)}
        />
        Slow Network
      </label>
    </div>
  );
}