import React, { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCartStore } from "../../domains/cart/cart.store";

export default function ProductList({ products = [] }: any) {
  const parentRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);

  const rowVirtualizer = useVirtualizer({
    count: products.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 110,
    overscan: 6,
  });

  return (
    <div ref={parentRef} className="h-full overflow-auto">

      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((v) => {
          const p = products[v.index];

          return (
            <div
              key={v.key}
              style={{
                position: "absolute",
                top: 0,
                transform: `translateY(${v.start}px)`,
                width: "100%",
              }}
            >
              <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl mb-3">

                {/* IMAGE */}
                <img
                  src={p.image}
                  className="w-14 h-14 object-contain bg-white rounded"
                />

                {/* TEXT */}
                <div className="flex-1">
                  <div className="text-sm font-medium line-clamp-2">
                    {p.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    ₹{p.price}
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={() =>
                    addItem({
                      ...p,
                      qty: 1,
                      basePrice: p.price,
                    })
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Add
                </button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}