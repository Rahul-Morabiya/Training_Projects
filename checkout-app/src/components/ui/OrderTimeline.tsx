import { useOrderStore } from "../../domains/order/order.store";

const steps = [
  "CART_READY",
  "CHECKOUT_VALIDATED",
  "ORDER_SUBMITTED",
  "ORDER_SUCCESS",
];

export default function OrderTimeline() {
  const state = useOrderStore((s) => s.state);

  return (
    <div className="mt-4">

      <div className="flex items-center gap-2">

        {steps.map((step, i) => {
          const currentIndex = steps.indexOf(state);

          const isDone = currentIndex > i || state === "ORDER_SUCCESS";
          const isActive =
            step === state && state !== "ORDER_SUCCESS";

          return (
            <div key={step} className="flex items-center flex-1">

              {/* STEP */}
              <div
                className={`px-3 py-1 rounded-full text-xs transition-all
                  ${
                    isDone
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-blue-600 text-white scale-105"
                      : "bg-gray-300 text-gray-500"
                  }`}
              >
                {step.replaceAll("_", " ")}
              </div>

              {/* LINE */}
              {i !== steps.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-2 transition-all ${
                    currentIndex > i || state === "ORDER_SUCCESS"
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* FAILURE */}
      {state === "ORDER_FAILED" && (
        <div className="mt-3 text-red-500 text-sm font-medium">
          ❌ Order Failed
        </div>
      )}
    </div>
  );
}