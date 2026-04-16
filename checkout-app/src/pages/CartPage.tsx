import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProductGrid from "../components/cart/ProductGrid";
import ProductModal from "../components/cart/ProductModal";
import CartPanel from "../components/cart/CartPanel";
import SidebarFilters from "../components/cart/SidebarFilters";
import ThemeToggle from "../components/ui/ThemeToggle";
import NotificationBell from "../components/ui/NotificationBell";
import DevToggle from "../components/ui/DevToggle";
import SimulationPanel from "../components/dev/SimulationPanel";
import AnalyticsDashboard from "../components/dev/AnalyticsDashboard";
import { apiClient } from "../core/apiClient";
import { useDebounce } from "../hooks/useDebounce";
import imageLogo from "../assets/CartifyLogo.png";
import DebugPanel from "../components/dev/DebugPanel";

export default function CartPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("default");

  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(1000);
  const [rating, setRating] = useState(0);
  const [inStock, setInStock] = useState(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const [visibleCount, setVisibleCount] = useState(12);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  /**
   * FETCH PRODUCTS
   */
  useEffect(() => {
    apiClient("https://fakestoreapi.com/products").then((data: any[]) => {
      const enhanced = data.map((p) => ({
        ...p,
        rating: Number((Math.random() * 2 + 3).toFixed(1)),
        inventory: Math.floor(Math.random() * 10) + 1,
      }));
      setProducts(enhanced);
    });
  }, []);

  /**
   * CATEGORIES
   */
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  /**
   * FILTER
   */
  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (
        debouncedSearch &&
        !p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      ) return false;

      if (category !== "all" && p.category !== category) return false;
      if (p.price > price) return false;
      if (p.rating < rating) return false;
      if (inStock && p.inventory <= 0) return false;

      return true;
    });
  }, [products, debouncedSearch, category, price, rating, inStock]);

  /**
   * SORT
   */
  const sorted = useMemo(() => {
    const arr = [...filtered];

    if (sort === "price_low") arr.sort((a, b) => a.price - b.price);
    if (sort === "price_high") arr.sort((a, b) => b.price - a.price);
    if (sort === "rating") arr.sort((a, b) => b.rating - a.rating);
    if (sort === "name") arr.sort((a, b) => a.title.localeCompare(b.title));

    return arr;
  }, [filtered, sort]);

  /**
   * PAGINATION (INFINITE SCROLL)
   */
  const visibleProducts = useMemo(() => {
    return sorted.slice(0, visibleCount);
  }, [sorted, visibleCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 8);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">

      {/* 🔥 NAVBAR */}
      <div className="sticky top-0 z-50 navbar-glass">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">

          {/* LOGO */}
          <img
            src={imageLogo}
            className="h-9 cursor-pointer hover:scale-110 transition"
            onClick={() => navigate("/")}
          />

          {/* SEARCH */}
          <input
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input flex-1"
          />

          {/* RIGHT CONTROLS */}
          <div className="flex items-center gap-3">
            <DevToggle />
            <NotificationBell />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* 🔥 MAIN */}
      <div className="max-w-7xl mx-auto p-6">

        <div className="grid md:grid-cols-[240px_1fr_280px] gap-6">

          {/* SIDEBAR */}
          <div className="sticky top-24 h-fit">
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
              sort={sort}
              setSort={setSort}
            />
          </div>

          {/* PRODUCTS */}
          <div>
            <ProductGrid
              products={visibleProducts}
              view={view}
              onSelect={setSelected}
            />

            <div
              ref={loaderRef}
              className="text-center text-muted py-4"
            >
              Loading more...
            </div>
          </div>

          {/* CART PANEL */}
          <div className="sticky top-24 space-y-3">
            <CartPanel />

            <button
              onClick={() => navigate("/checkout")}
              className="primary-btn"
            >
              Checkout
            </button>
          </div>

        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}

      {/* 🔥 DEV PANELS (GLOBAL) */}
      <SimulationPanel />
<AnalyticsDashboard />
<DebugPanel />

    </div>
  );
}