import { useNavigate } from "react-router-dom";
import ProductList from "../../components/cart/ProductList";
import CartPanel from "../../components/cart/CartPanel";
import ThemeToggle from "../../components/ui/ThemeToggle";

export default function CartPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0B0F1A] text-gray-900 dark:text-white">

      <div className="max-w-7xl mx-auto p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Cart</h1>
          <ThemeToggle />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-6">

          {/* LEFT: PRODUCTS */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-sm p-4 h-[600px] overflow-hidden">
            <ProductList />
          </div>

          {/* RIGHT: CART */}
          <div className="space-y-4">

            <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-sm p-4">
              <CartPanel />
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-medium shadow"
            >
              Proceed to Checkout
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}