import { useNotificationStore } from "../../domains/notifications/notification.store";
import Toast from "./Toast";
import type { Notification } from "../../types/notification";

export default function NotificationCenter() {
  // ✅ FIX: selector-based
  const list = useNotificationStore((s) => s.list);
  const remove = useNotificationStore((s) => s.remove);

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {list.slice(0, 3).map((n: Notification) => (
        <Toast
          key={n.id}
          message={n.message}
          type={n.type}
          onClose={() => remove(n.id)}
        />
      ))}
    </div>
  );
}