import { useEffect, useState } from "react";
import { analytics } from "../../core/analytics";
import { getDevMode, subscribeDevMode } from "../../core/devMode";

export default function AnalyticsDashboard() {
  const [visible, setVisible] = useState(getDevMode());
  const [data, setData] = useState(analytics.get());

  useEffect(() => {
    subscribeDevMode(setVisible);
  }, []);

  /**
   * 🔥 LIVE UPDATE
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setData([...analytics.get()]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const success = data.filter((d) => d.event === "ORDER_SUCCESS").length;
  const fail = data.filter((d) => d.event === "ORDER_FAILED").length;

  return (
    <div className="fixed bottom-4 left-4 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-xl text-xs z-[9999] w-64">

      <h2 className="font-semibold mb-2">Analytics</h2>

      <div>Success: {success}</div>
      <div>Failures: {fail}</div>

      <div className="mt-3 max-h-40 overflow-auto text-gray-500">
        {data.map((d, i) => (
          <div key={i}>
            {d.event} - {new Date(d.time).toLocaleTimeString()}
          </div>
        ))}
      </div>
    </div>
  );
}