import { useOrderStore } from "../domains/order/order.store";
import { useNavigate } from "react-router-dom";

export default function OrderPage() {
  const { orders, currentOrderId } = useOrderStore();
  const navigate = useNavigate();

  const current = orders.find((o) => o.id === currentOrderId);

  if (!current) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-xl font-semibold text-red-500">
          Order Failed or Not Found
        </h1>

        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <h1 className="text-xl font-semibold text-green-500">
        Order Successful
      </h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl space-y-3">

        <div className="text-sm">
          Order ID: {current.id}
        </div>

        {current.items.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center gap-3"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              className="w-12 h-12 object-contain bg-white rounded"
            />

            <div className="flex-1 text-sm">
              {item.title}
            </div>

            <div className="text-sm">
              x{item.qty}
            </div>
          </div>
        ))}

        <div className="mt-3 font-semibold">
          Total: ₹{current.total.toFixed(2)}
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Back to Shopping
      </button>
    </div>
  );
}