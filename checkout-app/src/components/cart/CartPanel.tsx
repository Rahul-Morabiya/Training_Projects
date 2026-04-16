import { useMemo, useState } from "react";
import { useCartStore } from "../../domains/cart/cart.store";

export default function CartPanel() {
  const itemsById = useCartStore((s) => s.itemsById);
  const itemIds = useCartStore((s) => s.itemIds);

  const remove = useCartStore((s) => s.removeItem);
  const decrement = useCartStore((s) => s.decrementItem);
  const add = useCartStore((s) => s.addItem);

  const [hovered, setHovered] = useState<any>(null);

  const items = useMemo(() => {
    return itemIds.map((id) => itemsById[id]);
  }, [itemIds, itemsById]);

  const total = useMemo(() => {
    return items.reduce(
      (sum, i: any) => sum + i.price * i.qty,
      0
    );
  }, [items]);

  if (!items.length) {
    return (
      <div className="text-center text-gray-400 text-sm py-10">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="space-y-4 relative">

      {/* 🔥 CART ITEMS */}
      {items.map((item: any) => (
        <div
          key={item.id}
          onMouseEnter={() => setHovered(item)}
          onMouseLeave={() => setHovered(null)}
          className="flex items-center gap-3 border-b pb-3 hover:bg-white/5 p-2 rounded-lg transition cursor-pointer"
        >
          {/* IMAGE */}
          <img
            src={item.image}
            className="w-12 h-12 object-contain bg-white rounded"
          />

          {/* TEXT */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">
              {item.title}
            </div>
            <div className="text-xs text-gray-500">
              ₹{item.price}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => decrement(String(item.id))}
              className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded hover:scale-105"
            >
              −
            </button>

            <span>{item.qty}</span>

            <button
              onClick={() => add(item)}
              className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded hover:scale-105"
            >
              +
            </button>

            <button
              onClick={() => remove(String(item.id))}
              className="text-red-500 text-xs ml-2 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* 🔥 TOTAL */}
      <div className="text-right font-semibold pt-2">
        Total: ₹{total.toFixed(2)}
      </div>

      {/* 🔥 HOVER CARD */}
      {hovered && (
  <div className="absolute right-full top-4 mr-6 w-72 z-[9999]">

    <div className="
      backdrop-blur-xl
      bg-white/10
      border border-white/20
      shadow-2xl
      rounded-2xl
      p-4
      animate-fadeIn
      scale-100
      transition-all
    ">

      {/* IMAGE */}
      <div className="bg-white rounded-lg p-2 mb-3">
        <img
          src={hovered.image}
          className="w-full h-36 object-contain"
        />
      </div>

      {/* TITLE */}
      <div className="text-sm font-semibold leading-snug mb-2 text-white">
        {hovered.title}
      </div>

      {/* PRICE INFO */}
      <div className="text-xs text-gray-300 mb-1">
        ₹{hovered.price} × {hovered.qty}
      </div>

      <div className="text-lg font-bold text-blue-400">
        ₹{(hovered.price * hovered.qty).toFixed(2)}
      </div>

    </div>
  </div>
)}
    </div>
  );
}