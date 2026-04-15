import { analytics } from "../../core/analytics";

export default function AnalyticsDashboard() {
  const data = analytics.get();

  const success = data.filter((d) => d.event === "ORDER_SUCCESS").length;
  const fail = data.filter((d) => d.event === "ORDER_FAILED").length;

  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl p-4 shadow text-sm">

      <h2 className="font-semibold mb-3">Analytics</h2>

      {/* SUMMARY */}
      <div className="flex justify-between text-xs mb-3">
        <div className="text-green-500">Success: {success}</div>
        <div className="text-red-500">Fail: {fail}</div>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <div className="text-xs text-gray-400 text-center py-4">
          No events yet
        </div>
      )}

      {/* EVENT LOG */}
      <div className="max-h-40 overflow-auto space-y-1 text-xs text-gray-500">
        {data.map((d, i) => (
          <div key={i} className="flex justify-between">
            <span>{d.event}</span>
            <span>{new Date(d.time).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}