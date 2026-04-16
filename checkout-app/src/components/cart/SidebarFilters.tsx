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
  sort,
  setSort,
}: any) {
  const views = ["grid", "compact", "list"];

  return (
    <div className="card space-y-5 sticky top-24">

      {/* VIEW */}
      <div className="sidebar-section">
        <div className="font-semibold mb-2">View</div>
        <div className="flex gap-2">
          {views.map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`${
                view === v ? "active-btn" : "btn"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* SORT */}
      <div className="sidebar-section">
        <div className="font-semibold mb-2">Sort By</div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input"
        >
          <option value="default">Default</option>
          <option value="price_low">Price Low → High</option>
          <option value="price_high">Price High → Low</option>
          <option value="rating">Rating</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* FILTERS */}
      <div>
        <div className="font-semibold mb-2">Filters</div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input mb-2"
        >
          {categories.map((c: string) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <div className="text-sm mb-1">
          Max Price: ₹{price}
        </div>

        <input
          type="range"
          min="0"
          max="1000"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="input mt-2"
        >
          <option value={0}>All</option>
          <option value={3}>3★+</option>
          <option value={4}>4★+</option>
        </select>

        <label className="flex items-center gap-2 mt-2 text-sm">
          <input
            type="checkbox"
            checked={inStock}
            onChange={() => setInStock(!inStock)}
          />
          In Stock Only
        </label>
      </div>
    </div>
  );
}