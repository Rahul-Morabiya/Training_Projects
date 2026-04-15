import { motion } from "framer-motion";
import { useCartStore } from "../../domains/cart/cart.store";

export default function ProductGrid({ products, view, onSelect }: any) {
  const add = useCartStore((s) => s.addItem);

  const layout =
    view === "grid"
      ? "grid grid-cols-2 md:grid-cols-4"
      : view === "compact"
      ? "grid grid-cols-3 md:grid-cols-6"
      : "flex flex-col";

  return (
    <div className={`${layout} gap-4`}>
      {products.map((p: any) => (
        <motion.div key={p.id} whileHover={{ scale: 1.03 }} className="card">

          <img
            src={p.image}
            className="h-24 mx-auto object-contain cursor-pointer"
            onClick={() => onSelect(p)}
          />

          <div className="text-sm mt-2 line-clamp-2">
            {p.title}
          </div>

          <div className="text-yellow-500 text-xs">
            ⭐ {p.rating}
          </div>

          <div className="text-xs text-red-500">
            Only {p.inventory} left
          </div>

          <div className="font-semibold mt-1">
            ₹{p.price}
          </div>

          <button
            onClick={() => add({ ...p, qty: 1, basePrice: p.price })}
            className="primary-btn mt-2"
          >
            Add
          </button>
        </motion.div>
      ))}
    </div>
  );
}