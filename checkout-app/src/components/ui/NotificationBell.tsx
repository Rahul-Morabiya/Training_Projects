import { useState, useMemo } from "react";
import { useNotificationStore } from "../../domains/notifications/notification.store";
import type { Notification } from "../../types/notification";

export default function NotificationBell() {
  // ✅ FIX: use selectors (NOT destructuring whole store)
  const list = useNotificationStore((s) => s.list);
  const remove = useNotificationStore((s) => s.remove);

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return list;
    return list.filter((n: Notification) => n.type === filter);
  }, [list, filter]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative text-xl"
      >
        🔔
        {list.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {list.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 card z-50 space-y-3">

          {/* FILTERS */}
          <div className="flex gap-2 text-xs">
            {["all", "success", "error", "warning", "info"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-1 rounded ${
                  filter === f ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* LIST */}
          <div className="max-h-60 overflow-auto space-y-2">
            {filtered.length === 0 && (
              <div className="text-sm text-muted text-center py-4">
                No notifications
              </div>
            )}

            {filtered.map((n: Notification) => (
              <div
                key={n.id}
                onClick={() => remove(n.id)}
                className="text-sm p-2 rounded bg-gray-100 dark:bg-gray-800 cursor-pointer hover:bg-gray-200"
              >
                {n.message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}