import { useCartStore } from "../../domains/cart/cart.store";
import { useOrderStore } from "../../domains/order/order.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNotificationStore } from "../../domains/notifications/notification.store";
import { analytics } from "../../core/analytics";
import {
  isCheckoutLocked,
  setCheckoutLock,
  clearCheckoutLock,
} from "../../core/checkoutLock";
import { getTabId } from "../../core/tabId";

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
    const e: any = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!/^\d{5,6}$/.test(form.zip)) e.zip = "Invalid ZIP";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCheckout = async () => {
    const lock = localStorage.getItem("checkout-lock");

    if (lock) {
  const parsed = JSON.parse(lock);
  if (parsed.owner !== getTabId()) {
    notify("Another tab is processing checkout", "error");
    return;
  }
}

    if (!navigator.onLine) {
      notify("Offline", "error");
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

    setCheckoutLock(); // 🔒 lock start

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

      useCartStore.setState({ itemsById: {}, itemIds: [] });

      notify("Order placed!", "success");

      navigate("/order");
    } catch {
      setState("ORDER_FAILED");
      notify("Order failed", "error");
    } finally {
      clearCheckoutLock(); // 🔓 unlock
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">

      <h2 className="font-semibold text-sm text-muted">
        Shipping Details
      </h2>

      {items.map((item: any) => (
        <div key={item.id} className="flex gap-2 text-sm">
          <img src={item.image} className="w-10 h-10" />
          <span>{item.title}</span>
        </div>
      ))}

      <div>Total: ₹{total}</div>

      <input className="input" placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}

      <input className="input" placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <input className="input" placeholder="City"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
      />

      <input className="input" placeholder="ZIP"
        value={form.zip}
        onChange={(e) => setForm({ ...form, zip: e.target.value })}
      />

      <button onClick={handleCheckout} className="primary-btn">
        Place Order
      </button>
    </div>
  );
}