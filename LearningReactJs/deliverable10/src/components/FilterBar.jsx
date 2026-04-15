const FilterBar = ({ setFilter, setSearch }) => {
  return (
    <div className="card">
      <input placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />

      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default FilterBar;