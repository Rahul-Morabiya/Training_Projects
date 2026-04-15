import { useDevMode } from "../../core/devMode";

export default function DevToggle() {
  const { enabled, toggle } = useDevMode();

  return (
    <button
      onClick={toggle}
      className={`px-2 py-1 text-xs rounded border ${
        enabled ? "bg-green-600 text-white" : "bg-gray-200"
      }`}
    >
      DEV
    </button>
  );
}