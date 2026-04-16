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
    <div className="
  fixed bottom-6 left-6 z-[9999]
  w-72 rounded-xl p-4 transition-all
  bg-[#1e293b]
  text-white
  border border-blue-500/20
  shadow-lg
">

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