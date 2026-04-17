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
import DebugPanel from "../components/dev/DebugPanel";
import { apiClient } from "../core/apiClient";
import { useDebounce } from "../hooks/useDebounce";
import imageLogo from "../assets/CartifyLogo.png";

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

    // 🔥 helper: deterministic pseudo-random based on id
    const seeded = (id: number | string) => {
      let hash = 0;
      const str = String(id);
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash);
    };

    // 🔥 EXPAND DATASET
    const expanded = Array.from({ length: 30 }, (_, i) =>
      data.map((p) => {
        const uniqueId = `${p.id}-${i}`;
        const seed = seeded(uniqueId);

        return {
          ...p,
          id: uniqueId,

          // ✅ STABLE VALUES (NO RANDOM AFTER RENDER)
          rating: Number((3 + (seed % 20) / 10).toFixed(1)), // 3.0 - 5.0
          inventory: (seed % 10) + 1, // 1 - 10
        };
      })
    ).flat();

    setProducts(expanded);
  });
}, []);
  /**
   * RESET SCROLL WHEN FILTERS CHANGE 🔥
   */
  useEffect(() => {
    setVisibleCount(12);
  }, [category, price, rating, inStock, debouncedSearch, sort]);

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
   * PAGINATION
   */
  const visibleProducts = useMemo(() => {
    return sorted.slice(0, visibleCount);
  }, [sorted, visibleCount]);

  /**
   * 🔥 FIXED INFINITE SCROLL
   */
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleCount < sorted.length
        ) {
          setVisibleCount((prev) => prev + 8);
        }
      },
      {
        threshold: 0,               // 🔥 FIX
        rootMargin: "200px",        // 🔥 PRELOAD BEFORE END
      }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [visibleCount, sorted.length]);

  return (
    <div className="min-h-screen">

      {/* NAVBAR */}
      <div className="sticky top-0 z-50 navbar-glass">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">

          <img
            src={imageLogo}
            className="h-9 cursor-pointer hover:scale-110 transition"
            onClick={() => navigate("/")}
          />

          <input
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input flex-1"
          />

          <div className="flex items-center gap-3">
            <DevToggle />
            <NotificationBell />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* MAIN */}
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

            {/* LOADER */}
            <div
              ref={loaderRef}
              className="text-center text-muted py-6"
            >
              {visibleCount < sorted.length
                ? "Loading more..."
                : "No more products"}
            </div>
          </div>

          {/* CART */}
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

      {/* DEV PANELS */}
      <SimulationPanel />
      <AnalyticsDashboard />
      <DebugPanel />
    </div>
  );
}