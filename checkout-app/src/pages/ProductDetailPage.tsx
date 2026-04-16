import { useLocation, useNavigate } from "react-router-dom";
import { useCartStore } from "../domains/cart/cart.store";
import { useNotificationStore } from "../domains/notifications/notification.store";

export default function ProductDetailPage() {
  const { state: product } = useLocation();
  const navigate = useNavigate();

  const add = useCartStore((s) => s.addItem);
  const notify = useNotificationStore((s) => s.add);

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      <button onClick={() => navigate(-1)} className="text-sm text-muted">
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-6">

        <img
          src={product.image}
          className="w-full h-80 object-contain bg-white rounded-xl p-4"
        />

        <div className="space-y-3">
          <h1 className="text-xl font-semibold">{product.title}</h1>

          <div className="text-yellow-500">⭐ {product.rating}</div>

          <p className="text-sm text-muted">{product.description}</p>

          <div className="text-2xl font-bold">₹{product.price}</div>

          <button
            onClick={() => {
              add({ ...product, qty: 1, basePrice: product.price });
              notify("Added to cart", "success");
            }}
            className="primary-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}