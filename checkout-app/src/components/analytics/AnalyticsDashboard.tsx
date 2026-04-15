import { analytics } from "../../core/analytics";

export default function AnalyticsDashboard() {
  const data = analytics.get();

  const success = data.filter((d) => d.event === "ORDER_SUCCESS").length;
  const fail = data.filter((d) => d.event === "ORDER_FAILED").length;

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h2 className="font-semibold mb-2">Analytics</h2>

      <div>Success: {success}</div>
      <div>Failures: {fail}</div>

      <div className="mt-3 text-xs text-gray-500 max-h-40 overflow-auto">
        {data.map((d, i) => (
          <div key={i}>
            {d.event} - {new Date(d.time).toLocaleTimeString()}
          </div>
        ))}
      </div>
    </div>
  );
}