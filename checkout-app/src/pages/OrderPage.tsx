import { useOrderStore } from "../domains/order/order.store";
import { useNavigate } from "react-router-dom";

export default function OrderPage() {
  const { orders, currentOrderId } = useOrderStore();
  const navigate = useNavigate();

  const current = orders.find((o) => o.id === currentOrderId);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 ">
      

      
      <h1 className="text-xl font-semibold">Order Success</h1>
    <div className="text-white">
      {current && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
          <div className="text-sm mb-2 ">
            Order ID: {current.id}
          </div>

          {current.items.map((item: any) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.title}</span>
              <span>x{item.qty}</span>
            </div>
          ))}

          <div className="mt-3 font-semibold">
            Total: ₹{current.total.toFixed(2)}
          </div>
        </div>
      )}
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