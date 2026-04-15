import { useCartStore } from "../../domains/cart/cart.store";
import { useOrderStore } from "../../domains/order/order.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const cart = useCartStore();

  const setState = useOrderStore((s) => s.setState);
  const addOrder = useOrderStore((s) => s.addOrder);
  const setCurrent = useOrderStore((s) => s.setCurrent);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (loading) return;

    setLoading(true);

    setState("CHECKOUT_VALIDATED");

    try {
      setState("ORDER_SUBMITTED");

      const items = Object.values(cart.itemsById);
      const total = items.reduce(
        (sum, i: any) => sum + i.price * i.qty,
        0
      );

      const orderId = Date.now().toString();

      addOrder({
        id: orderId,
        items,
        total,
        createdAt: Date.now(),
      });

      setCurrent(orderId);

      setState("ORDER_SUCCESS");

      useCartStore.setState({
        itemsById: {},
        itemIds: [],
      });

      navigate("/order");
    } catch {
      setState("ORDER_FAILED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-green-600 text-white px-6 py-3 rounded-xl w-full"
    >
      {loading ? "Processing..." : "Place Order"}
    </button>
  );
}