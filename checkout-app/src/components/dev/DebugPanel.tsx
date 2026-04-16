import { useEffect, useState } from "react";
import { useCartStore } from "../../domains/cart/cart.store";
import { useOrderStore } from "../../domains/order/order.store";
import { getDevMode, subscribeDevMode } from "../../core/devMode";

export default function DebugPanel() {
  const [visible, setVisible] = useState(getDevMode());

  // Subscribe to dev mode toggle
  useEffect(() => {
    subscribeDevMode(setVisible);
  }, []);

  const cart = useCartStore();
  const order = useOrderStore();

  if (!visible) return null;

  return (
    <div
      className="
  fixed bottom-[220px] right-6 z-[9999]
  w-80 rounded-xl p-4
  bg-[#1e293b]
  text-white
  border border-blue-500/20
  shadow-2xl
  text-xs
"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <div className="font-semibold text-sm">Debug Panel</div>
        <div className="text-green-400 text-[10px]">DEV MODE</div>
      </div>

      {/* CART DEBUG */}
      <div className="mb-3">
        <div className="font-medium mb-1 text-blue-300">Cart</div>
        <div className="text-gray-300">
          Items: {cart.itemIds.length}
        </div>
        <div className="text-gray-300">
          Version: {cart.version}
        </div>
      </div>

      {/* ORDER DEBUG */}
      <div className="mb-3">
        <div className="font-medium mb-1 text-purple-300">Order</div>
        <div className="text-gray-300">
          State: {order.state}
        </div>
        <div className="text-gray-300">
          Current ID: {order.currentOrderId || "None"}
        </div>
      </div>

      {/* SIMULATION STATUS */}
      <div className="mb-3">
        <div className="font-medium mb-1 text-yellow-300">Simulation</div>
        <div className="text-gray-300">
          Fail: {(window as any).__SIM__?.fail ? "ON" : "OFF"}
        </div>
        <div className="text-gray-300">
          Slow: {(window as any).__SIM__?.slow ? "ON" : "OFF"}
        </div>
      </div>

      {/* SYSTEM INFO */}
      <div>
        <div className="font-medium mb-1 text-green-300">System</div>
        <div className="text-gray-300">
          Online: {navigator.onLine ? "YES" : "NO"}
        </div>
        <div className="text-gray-300">
          Time: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}