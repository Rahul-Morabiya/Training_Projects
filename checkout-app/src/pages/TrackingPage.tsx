import { useEffect, useState } from "react";
import { useOrderStore } from "../domains/order/order.store";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const steps = ["Ordered", "Packed", "Shipped", "Out for Delivery", "Delivered"];

export default function TrackingPage() {
  const { orders, currentOrderId } = useOrderStore();
  const navigate = useNavigate();

  /**
   * 🔥 FALLBACK FIX (CRITICAL)
   * If currentOrderId missing → use latest order
   */
  const current =
    orders.find((o) => o.id === currentOrderId) ||
    orders[0]; // fallback to latest

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!current) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) return prev;
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [current]);

  /**
   * ❌ NOTHING FOUND → SHOW UI (NOT BLANK)
   */
  if (!current) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center">

        <div className="text-xl font-semibold">
          No Order Found 🚫
        </div>

        <div className="text-sm text-muted">
          Looks like no order was created or state was reset.
        </div>

        <button
          onClick={() => navigate("/")}
          className="primary-btn"
        >
          Go Shopping
        </button>

      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      <h1 className="text-2xl font-semibold">Track Order</h1>

      {/* 🧭 STEP TRACKER */}
      <div className="flex items-center">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1">

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: i === currentStep ? 1.2 : 1 }}
              className={`px-3 py-1 rounded-full text-xs ${
                i <= currentStep
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              {s}
            </motion.div>

            {i !== steps.length - 1 && (
              <div
                className={`flex-1 h-[3px] mx-2 ${
                  i < currentStep ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* 📦 ITEMS */}
      <div className="card space-y-4">

        {current.items.map((item: any) => (
          <div key={item.id} className="flex items-center gap-4">

            <img
              src={item.image}
              className="w-14 h-14 object-contain bg-white rounded"
            />

            <div className="flex-1">
              <div className="text-sm">{item.title}</div>
              <div className="text-xs text-muted">
                ₹{item.price} × {item.qty}
              </div>
            </div>

            <div className="font-semibold">
              ₹{(item.price * item.qty).toFixed(2)}
            </div>

          </div>
        ))}

        <div className="text-right font-bold text-lg pt-2">
          Total: ₹{current.total.toFixed(2)}
        </div>

      </div>

      <button
        onClick={() => navigate("/")}
        className="text-sm text-muted hover:underline"
      >
        ← Back to Shopping
      </button>

    </div>
  );
}