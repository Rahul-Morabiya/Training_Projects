import { useEffect, useState } from "react";

export default function CommandPalette({ onSearch, onCheckout }: any) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center pt-32 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 w-[400px] shadow-xl">
        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Search or run command..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
        />

        <button
          onClick={onCheckout}
          className="w-full text-left p-2 hover:bg-gray-100 rounded"
        >
          Trigger Checkout
        </button>
      </div>
    </div>
  );
}