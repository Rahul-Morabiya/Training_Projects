import { motion } from "framer-motion";
import { useCartStore } from "../../domains/cart/cart.store";

export default function ProductModal({ product, onClose }: any) {
  const add = useCartStore((s) => s.addItem);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-[#111827] p-6 rounded-xl w-[400px]"
      >
        <img src={product.image} className="h-40 mx-auto" />

        <h2 className="mt-4 font-semibold">{product.title}</h2>

        <div className="text-yellow-500">
          ⭐ {product.rating}
        </div>

        <div className="text-red-500 text-sm">
          Only {product.inventory} left
        </div>

        <p className="text-sm mt-2">{product.description}</p>

        <div className="mt-3 font-semibold">
          ₹{product.price}
        </div>

        <button
          onClick={() => {
            add({ ...product, qty: 1, basePrice: product.price });
            onClose();
          }}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
        >
          Add to Cart
        </button>

        <button onClick={onClose} className="mt-2 w-full border py-2 rounded">
          Close
        </button>
      </motion.div>
    </div>
  );
}