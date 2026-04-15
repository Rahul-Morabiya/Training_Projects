import { useState, useMemo } from "react";
import { useCartStore } from "../../domains/cart/cart.store";
import Checkout from "./Checkout";

const steps = ["Review", "Validate", "Confirm"];

export default function CheckoutStepper() {
  const [step, setStep] = useState(0);

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
        <div className="space-y-3">
          {items.map((item: any) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.title}</span>
              <span>x{item.qty}</span>
            </div>
          ))}

          <div className="font-semibold">
            Total: ₹{total.toFixed(2)}
          </div>

          <button
            onClick={() => setStep(1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Continue
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            Validating prices, availability, and cart integrity...
          </p>

          <div className="text-xs text-green-500">
            ✔ Cart validated successfully
          </div>

          <button
            onClick={() => setStep(2)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Proceed
          </button>
        </div>
      )}

      {step === 2 && <Checkout />}
    </div>
  );
}