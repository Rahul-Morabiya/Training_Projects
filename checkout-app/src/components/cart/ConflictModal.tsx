import { motion } from "framer-motion";
import { useCartStore } from "../../domains/cart/cart.store";
import { storage } from "../../core/storage";

interface Props {
  isOpen: boolean;
  onMerge: () => void;
  onReload: () => void;
  onIgnore: () => void;
}

export default function ConflictModal({
  isOpen,
  onMerge,
  onReload,
  onIgnore,
}: Props) {
  const localCart = useCartStore();
  const external = storage.get<any>("cart-store");

  if (!isOpen || !external) return null;

  const externalItems = external.state?.itemsById || {};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 w-[500px] shadow-xl"
      >
        <h2 className="text-lg font-semibold mb-3">
          Cart Conflict Detected
        </h2>

        <div className="max-h-60 overflow-auto text-sm space-y-2 mb-4">
          {Object.keys(externalItems).map((id) => {
            const local = localCart.itemsById[id];
            const remote = externalItems[id];

            if (!local || local.qty !== remote.qty) {
              return (
                <div key={id} className="flex justify-between">
                  <span>{remote.title}</span>
                  <span className="text-red-500">
                    {local?.qty || 0} → {remote.qty}
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onMerge}
            className="bg-blue-600 text-white py-2 rounded-lg"
          >
            Merge Changes
          </button>

          <button
            onClick={onReload}
            className="bg-gray-200 py-2 rounded-lg"
          >
            Reload Cart
          </button>

          <button
            onClick={onIgnore}
            className="text-red-500 text-sm"
          >
            Ignore
          </button>
        </div>
      </motion.div>
    </div>
  );
}