import { motion } from "framer-motion";
import { useState } from "react";
import CartPanel from "./CartPanel";

export default function BottomSheetCart() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        Cart
      </button>

      {open && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          drag="y"
          onDragEnd={(e, info) => {
            if (info.offset.y > 100) setOpen(false);
          }}
          className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 shadow-xl z-50"
        >
          <CartPanel />
        </motion.div>
      )}
    </>
  );
}