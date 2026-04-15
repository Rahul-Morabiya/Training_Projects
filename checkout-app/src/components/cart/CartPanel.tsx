import { useMemo } from "react";
import { useCartStore } from "../../domains/cart/cart.store";

export default function CartPanel() {
  /**
   * ✅ SAFE: primitive subscriptions
   */
  const itemsById = useCartStore((s) => s.itemsById);
  const itemIds = useCartStore((s) => s.itemIds);

  const remove = useCartStore((s) => s.removeItem);
  const decrement = useCartStore((s) => s.decrementItem);
  const add = useCartStore((s) => s.addItem);

  /**
   * ✅ Derived data INSIDE component (stable)
   */
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
    <div className="space-y-4">
      {items.map((item: any) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b pb-3 dark:border-gray-700"
        >
          <div>
            <div className="text-sm font-medium">{item.title}</div>
            <div className="text-xs text-gray-500">
              ₹{item.price}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => decrement(String(item.id))}
              className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"
            >
              −
            </button>

            <span>{item.qty}</span>

            <button
              onClick={() => add(item)}
              className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"
            >
              +
            </button>

            <button
              onClick={() => remove(String(item.id))}
              className="text-red-500 text-xs ml-2"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-right font-semibold pt-2">
        Total: ₹{total.toFixed(2)}
      </div>
    </div>
  );
}