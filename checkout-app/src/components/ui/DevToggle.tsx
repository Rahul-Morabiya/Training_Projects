import { useEffect, useState } from "react";
import {
  getDevMode,
  toggleDevMode,
  subscribeDevMode,
} from "../../core/devMode";

export default function DevToggle() {
  const [enabled, setEnabled] = useState(getDevMode());

  useEffect(() => {
    subscribeDevMode(setEnabled);
  }, []);

  return (
    <button
      onClick={toggleDevMode}
      className={`px-3 py-1 rounded text-xs font-medium transition ${
        enabled
          ? "bg-green-600 text-white"
          : "bg-gray-300 text-black"
      }`}
    >
      DEV
    </button>
  );
}