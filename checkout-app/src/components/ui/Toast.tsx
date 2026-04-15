import { useEffect } from "react";

export default function Toast({ message, type, onClose }: any) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-sm z-50
      ${type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
    >
      {message}
    </div>
  );
}