import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProductGrid from "../components/cart/ProductGrid";
import ProductModal from "../components/cart/ProductModal";
import CartPanel from "../components/cart/CartPanel";
import SidebarFilters from "../components/cart/SidebarFilters";
import ThemeToggle from "../components/ui/ThemeToggle";
import { apiClient } from "../core/apiClient";
import { useDebounce } from "../hooks/useDebounce";
import imageLogo from "../assets/CartifyLogo.png";

export default function CartPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  const [view, setView] = useState("grid");

  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(1000);
  const [rating, setRating] = useState(0);
  const [inStock, setInStock] = useState(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const [visibleCount, setVisibleCount] = useState(12);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    apiClient("https://fakestoreapi.com/products").then((data: any[]) => {
      const expanded = Array.from({ length: 20 }, () => data).flat();

      const enhanced = expanded.map((p) => ({
        ...p,
        rating: Number((Math.random() * 2 + 3).toFixed(1)),
        inventory: Math.floor(Math.random() * 10) + 1,
      }));

      setProducts(enhanced);
    });
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (
        debouncedSearch &&
        !p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
        return false;

      if (category !== "all" && p.category !== category) return false;
      if (p.price > price) return false;
      if (p.rating < rating) return false;
      if (inStock && p.inventory <= 0) return false;

      return true;
    });
  }, [products, debouncedSearch, category, price, rating, inStock]);

  const visibleProducts = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 12);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">

      {/* NAVBAR */}
      <div className="sticky top-0 z-50 backdrop-blur bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">

          {/* LOGO */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={imageLogo}
              alt="Cartify Logo"
              className="h-10 w-auto object-contain hover:scale-105 transition"
            />
          </div>

          {/* SEARCH */}
          <div className="flex-1">
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input w-full"
            />
          </div>

          {/* THEME */}
          <ThemeToggle />
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">

        <div className="grid md:grid-cols-[250px_1fr_300px] gap-6">

          {/* SIDEBAR */}
          <SidebarFilters
            categories={categories}
            category={category}
            setCategory={setCategory}
            price={price}
            setPrice={setPrice}
            rating={rating}
            setRating={setRating}
            inStock={inStock}
            setInStock={setInStock}
            view={view}
            setView={setView}
          />

          {/* PRODUCTS */}
          <div>
            <ProductGrid
              products={visibleProducts}
              view={view}
              onSelect={setSelected}
            />

            <div ref={loaderRef} className="text-center text-sm text-muted">
              Loading more...
            </div>
          </div>

          {/* CART */}
          <div className="sticky top-24 h-fit space-y-3">
            <CartPanel />

            <button
              onClick={() => navigate("/checkout")}
              className="primary-btn w-full"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}