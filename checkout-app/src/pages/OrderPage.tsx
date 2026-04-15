import { useOrderStore } from "../domains/order/order.store";
import { useNavigate } from "react-router-dom";
import OrderTimeline from "../components/ui/OrderTimeline";

export default function OrderPage() {
  const { orders, currentOrderId, state } = useOrderStore();
  const navigate = useNavigate();

  const current = orders.find((o) => o.id === currentOrderId);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <h1 className="text-xl font-semibold">
        {state === "ORDER_SUCCESS"
          ? "✅ Order Successful"
          : state === "ORDER_FAILED"
          ? "❌ Order Failed"
          : "Processing Order..."}
      </h1>

      <OrderTimeline />
          
      {/* ✅ SUCCESS */}
      {state === "ORDER_SUCCESS" && current && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl space-y-3">
          {current.items.map((item: any) => (
            <div key={item.id} className="flex items-center gap-3 text-sm">
              <img src={item.image} className="w-12 h-12 object-contain" />
              <div className="flex-1">{item.title}</div>
              <div>x{item.qty}</div>
            </div>
          ))}

          <div className="font-semibold">
            Total: ₹{current.total.toFixed(2)}
          </div>
          
        </div>
      )}

      {/* ❌ FAILURE */}
      {state === "ORDER_FAILED" && (
        <div className="bg-red-100 p-4 rounded">
          Order could not be placed.
        </div>
      )}
      
      <button
        onClick={() => navigate("/")}
        className="primary-btn"
      >
        Back to Shopping
      </button>
    </div>
  );
}