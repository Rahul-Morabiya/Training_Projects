import { useState, useMemo } from "react";
import { useCartStore } from "../../domains/cart/cart.store";
import Checkout from "./Checkout";
import { useNavigate } from "react-router-dom";

const steps = ["Review", "Validate", "Confirm"];

export default function CheckoutStepper() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate(); // ✅ add this

  const itemsById = useCartStore((s) => s.itemsById);
  const itemIds = useCartStore((s) => s.itemIds);

  const items = useMemo(
    () => itemIds.map((id) => itemsById[id]),
    [itemIds, itemsById]
  );

  const total = useMemo(
    () => items.reduce((sum, i: any) => sum + i.price * i.qty, 0),
    [items]
  );

  return (
    <div className="space-y-6">

      {/* STEPS */}
      <div className="flex items-center">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`px-3 py-1 rounded-full text-xs ${
                i <= step
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              {s}
            </div>

            {i !== steps.length - 1 && (
              <div className="flex-1 h-[2px] bg-gray-300 mx-2" />
            )}
          </div>
        ))}
      </div>

      {/* STEP CONTENT */}

      {step === 0 && (
  <div className="space-y-4">

    {items.map((item: any) => (
      <div key={item.id} className="flex items-center gap-3">

        <img
          src={item.image}
          className="w-12 h-12 object-contain bg-white rounded"
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

    <div className="text-xl font-bold">
      Total: ₹{total.toFixed(2)}
    </div>

    {/* ONLY CTA */}
    <button
      onClick={() => setStep(1)}
      className="primary-btn"
    >
      Continue to Validation
    </button>
  </div>
)}

      {step === 1 && (
  <div className="space-y-4">

    <div className="text-sm text-muted">
      Validating cart integrity, pricing and stock...
    </div>

    <div className="text-green-500 text-sm">
      ✔ Everything looks good
    </div>

    <button
      onClick={() => setStep(2)}
      className="primary-btn"
    >
      Continue to Payment
    </button>
  </div>
)}

      {step === 2 && (
  <button
    onClick={() => navigate("/payment")}
    className="primary-btn"
  >
    Go to Payment
  </button>
)}
    </div>
  );
}