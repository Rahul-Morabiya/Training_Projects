import CheckoutStepper from "../components/checkout/CheckoutStepper";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">Checkout</h1>

      <CheckoutStepper />

      <button
        onClick={() => navigate("/")}
        className="text-sm text-gray-400"
      >
        ← Back to Cart
      </button>
    </div>
  );
}