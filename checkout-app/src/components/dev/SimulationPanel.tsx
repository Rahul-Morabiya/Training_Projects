import { useState, useEffect } from "react";

export default function SimulationPanel() {
  const [fail, setFail] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    (window as any).__SIM__ = { fail, slow };
  }, [fail, slow]);

  return (
    <div className="fixed bottom-20 right-4 bg-white dark:bg-gray-900 shadow-xl p-3 text-xs rounded-xl z-40 w-48">
      <div className="font-semibold mb-2">Simulation</div>

      <label className="block">
        <input
          type="checkbox"
          checked={fail}
          onChange={(e) => setFail(e.target.checked)}
        />
        Force Failure
      </label>

      <label className="block">
        <input
          type="checkbox"
          checked={slow}
          onChange={(e) => setSlow(e.target.checked)}
        />
        Slow Network
      </label>
    </div>
  );
}