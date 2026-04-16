import { motion } from "framer-motion";
import { useCartStore } from "../../domains/cart/cart.store";

export default function ProductGrid({ products, view, onSelect }: any) {
  const add = useCartStore((s) => s.addItem);

  const layout =
    view === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      : view === "compact"
      ? "grid grid-cols-3 md:grid-cols-6"
      : "flex flex-col";

  return (
    <div className={`${layout} gap-5`}>
      {products.map((p: any) => (
        <motion.div
          key={p.id}
          whileHover={{ scale: 1.03 }}
          className="card flex flex-col h-full"
        >
          {/* IMAGE */}
          <img
            src={p.image}
            className="h-28 mx-auto object-contain product-img cursor-pointer"
            onClick={() => onSelect(p)}
          />

          {/* CONTENT */}
          <div className="flex flex-col flex-grow mt-2">

            {/* TITLE (fixed height for alignment) */}
            <div className="text-sm line-clamp-2 min-h-[40px]">
              {p.title}
            </div>

            {/* RATING */}
            <div className="text-yellow-500 text-xs mt-1">
              ⭐ {p.rating}
            </div>

            {/* STOCK */}
            <div className="text-xs text-red-500 min-h-[18px]">
              Only {p.inventory} left
            </div>

            {/* PRICE */}
            <div className="font-semibold text-lg mt-1">
              ₹{p.price}
            </div>

            {/* PUSH BUTTON DOWN */}
            <div className="mt-auto pt-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() =>
                  add({ ...p, qty: 1, basePrice: p.price })
                }
                className="primary-btn"
              >
                Add
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}