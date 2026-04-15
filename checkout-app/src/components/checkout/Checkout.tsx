import { useCartStore } from "../../domains/cart/cart.store";
import { useOrderStore } from "../../domains/order/order.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNotificationStore } from "../../domains/notifications/notification.store";
import { analytics } from "../../core/analytics";

export default function Checkout() {
  const cart = useCartStore();
  const notify = useNotificationStore((s) => s.add);

  const setState = useOrderStore((s) => s.setState);
  const addOrder = useOrderStore((s) => s.addOrder);
  const setCurrent = useOrderStore((s) => s.setCurrent);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });

  const [errors, setErrors] = useState<any>({});

  const items = Object.values(cart.itemsById);
  const total = items.reduce(
    (sum, i: any) => sum + i.price * i.qty,
    0
  );

  const validate = () => {
    const newErrors: any = {};

    if (!form.name.trim()) newErrors.name = "Required";
    if (!form.address.trim()) newErrors.address = "Required";
    if (!form.city.trim()) newErrors.city = "Required";
    if (!/^\d{5,6}$/.test(form.zip)) newErrors.zip = "Invalid ZIP";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!navigator.onLine) {
      notify("You are offline", "error");
      setState("ORDER_FAILED");
      return;
    }

    const sim = (window as any).__SIM__;
    if (sim?.fail) {
      notify("Simulated failure", "error");
      setState("ORDER_FAILED");
      return;
    }

    if (!validate()) {
      notify("Fix form errors", "error");
      return;
    }

    if (total <= 0) {
      notify("Cart total cannot be ₹0", "error");
      setState("ORDER_FAILED");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      setState("CHECKOUT_VALIDATED");
      await new Promise((r) => setTimeout(r, 300));

      setState("ORDER_SUBMITTED");
      await new Promise((r) => setTimeout(r, 400));

      const orderId = Date.now().toString();

      addOrder({
        id: orderId,
        items,
        total,
        createdAt: Date.now(),
      });

      setCurrent(orderId);

      setState("ORDER_SUCCESS");

      analytics.track("ORDER_SUCCESS");

      useCartStore.setState({
        itemsById: {},
        itemIds: [],
      });

      notify("Order placed!", "success");

      navigate("/order");
    } catch {
      setState("ORDER_FAILED");
      notify("Order failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">

      {/* 🧾 REVIEW WITH IMAGES */}
      <div className="space-y-2">
        {items.map((item: any) => (
          <div key={item.id} className="flex items-center gap-3 text-sm">
            <img src={item.image} className="w-10 h-10 object-contain" />
            <div className="flex-1">{item.title}</div>
            <div>x{item.qty}</div>
          </div>
        ))}
      </div>

      <div className="font-semibold">Total: ₹{total.toFixed(2)}</div>

      {/* 📦 FORM */}
      <div className="font-bold ">Enter your Shipping Details</div>
      <input
        placeholder="Name"
        className="input"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}

      <input
        placeholder="Address"
        className="input"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      {errors.address && <div className="text-red-500 text-xs">{errors.address}</div>}

      <input
        placeholder="City"
        className="input"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
      />
      {errors.city && <div className="text-red-500 text-xs">{errors.city}</div>}

      <input
        placeholder="ZIP"
        className="input"
        value={form.zip}
        onChange={(e) => setForm({ ...form, zip: e.target.value })}
      />
      {errors.zip && <div className="text-red-500 text-xs">{errors.zip}</div>}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="primary-btn"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}