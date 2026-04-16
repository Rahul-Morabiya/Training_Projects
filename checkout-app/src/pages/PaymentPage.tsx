import { useState } from "react";
import { useCartStore } from "../domains/cart/cart.store";
import { useOrderStore } from "../domains/order/order.store";
import { useNavigate } from "react-router-dom";
import { analytics } from "../core/analytics";

export default function PaymentPage() {
  const cart = useCartStore();
  const navigate = useNavigate();

  const addOrder = useOrderStore((s) => s.addOrder);
  const setCurrent = useOrderStore((s) => s.setCurrent);
  const setState = useOrderStore((s) => s.setState);

  const items = Object.values(cart.itemsById);

  const total = items.reduce(
    (sum: number, i: any) => sum + i.price * i.qty,
    0
  );

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    card: "",
  });

  const [error, setError] = useState("");

  const handlePay = async () => {
    const sim = (window as any).__SIM__;

    setError("");

    if (!form.name || !form.address || !form.city || !form.zip || !form.card) {
      setError("Please fill all details");
      return;
    }

    if (total <= 0) {
      setError("Invalid order total");
      return;
    }

    /**
     * 🚨 SIMULATION FAILURE
     */
    if (sim?.fail) {
      setState("ORDER_FAILED");

      analytics.track("ORDER_FAILED", {
        reason: "Simulated failure",
      });

      setError("Payment failed. Please try again.");
      return;
    }

    setState("ORDER_SUBMITTED");

    if (sim?.slow) {
      await new Promise((r) => setTimeout(r, 2000));
    }

    const orderId = Date.now().toString();

    addOrder({
      id: orderId,
      items,
      total,
      createdAt: Date.now(),
    });

    setCurrent(orderId);
    setState("ORDER_SUCCESS");

    analytics.track("ORDER_SUCCESS", {
      orderId,
      total,
      items: items.length,
    });

    useCartStore.setState({
      itemsById: {},
      itemIds: [],
    });

    navigate("/tracking");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Payment</h1>

        {/* 🔙 NAVIGATION OPTIONS */}
        <div className="flex gap-3 text-sm">
          <button
            onClick={() => navigate("/checkout")}
            className="text-muted hover:underline"
          >
            ← Back to Checkout
          </button>

          <button
            onClick={() => navigate("/")}
            className="text-muted hover:underline"
          >
            Back to Cart
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">

        {/* LEFT */}
        <div className="space-y-6">

          <div className="card space-y-4 sticky top-24">
            <h2 className="font-semibold text-lg">Order Summary</h2>

            {items.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-3 last:border-none"
              >
                <img
                  src={item.image}
                  className="w-14 h-14 object-contain bg-white rounded-lg"
                />

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium line-clamp-1">
                    {item.title}
                  </div>
                  <div className="text-xs text-muted">
                    ₹{item.price} × {item.qty}
                  </div>
                </div>

                <div className="text-sm font-semibold">
                  ₹{(item.price * item.qty).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="text-xl font-bold pt-2 ">
              Total: ₹{total.toFixed(2)}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* SHIPPING */}
          <div className="card space-y-4">
            <h2 className="font-semibold text-lg">Shipping Details</h2>

            <input
              className="input"
              placeholder="Full Name"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="input"
              placeholder="Address"
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                className="input"
                placeholder="City"
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
              />

              <input
                className="input"
                placeholder="ZIP Code"
                onChange={(e) =>
                  setForm({ ...form, zip: e.target.value })
                }
              />
            </div>
          </div>

          {/* PAYMENT */}
          <div className="card space-y-4">
            <h2 className="font-semibold text-lg">Card Details</h2>

            <input
              className="input"
              placeholder="Card Number (Mock)"
              onChange={(e) =>
                setForm({ ...form, card: e.target.value })
              }
            />
          </div>

          {/* ❌ ERROR MESSAGE */}
          {error && (
            <div className="text-sm text-red-500 bg-red-100 dark:bg-red-900/30 p-2 rounded">
              {error}
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handlePay}
            className="primary-btn text-lg hover:scale-[1.02] transition"
          >
            Pay ₹{total.toFixed(2)}
          </button>

        </div>
      </div>
    </div>
  );
}