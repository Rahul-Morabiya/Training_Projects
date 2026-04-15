export default function SidebarFilters({
  categories,
  category,
  setCategory,
  price,
  setPrice,
  rating,
  setRating,
  inStock,
  setInStock,
  view,
  setView,
}: any) {
  const views = [
    { key: "grid", label: "Grid" },
    { key: "compact", label: "Compact" },
    { key: "list", label: "List" },
  ];

  return (
    <div className="card space-y-5">

      {/* VIEW SWITCH */}
      <div>
        <div className="text-sm mb-2 font-medium">View</div>

        <div className="flex gap-2">
          {views.map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}   // ✅ FIXED
              className={`flex-1 ${
                view === v.key ? "active-btn" : "btn"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10" />

      {/* FILTERS */}
      <h2 className="font-semibold">Filters</h2>

      <div>
        <div className="text-sm mb-1">Category</div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        >
          {categories.map((c: string) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <div className="text-sm">Max Price: ₹{price}</div>
        <input
          type="range"
          min="0"
          max="1000"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <div className="text-sm mb-1">Rating</div>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="input"
        >
          <option value={0}>All</option>
          <option value={3}>3★ & above</option>
          <option value={4}>4★ & above</option>
        </select>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={inStock}
          onChange={() => setInStock(!inStock)}
        />
        In Stock Only
      </label>
    </div>
  );
}