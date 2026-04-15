import { useNotificationStore } from "../../domains/notifications/notification.store";

export default function NotificationCenter() {
  const { list, remove } = useNotificationStore();

  return (
    <div
      aria-live="polite"
      className="fixed top-4 right-4 space-y-2 z-50"
    >
      {list.map((n) => (
        <div
          key={n.id}
          onClick={() => remove(n.id)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow cursor-pointer"
        >
          {n.message}
        </div>
      ))}
    </div>
  );
}