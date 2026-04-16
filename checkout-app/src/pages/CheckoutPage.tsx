import CheckoutStepper from "../components/checkout/CheckoutStepper";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      
      <div className="max-w-4xl mx-auto p-6 space-y-6">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold">
          Checkout
        </h1>

        {/* STEPPER (Review → Validate → Confirm UI) */}
        <div className="card">
          <CheckoutStepper />
        </div>

        

        {/* BACK */}
        <button
          onClick={() => navigate("/")}
          className="text-sm text-muted hover:underline"
        >
          ← Back to Cart
        </button>

      </div>

    </div>
  );
}