import React from "react";

const ControlsPanel = ({
  filters,
  setFilters,
  layout,
  setLayout,
  search,
  setSearch,
  setRegion
}) => {

  const toggle = (type) => {
    setFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div style={{ padding: 10, background: "#eee" }}>
      <h3>Filters</h3>

      {["ec2","s3","rds","vpc","subnet","sg"].map(t => (
        <label key={t}>
          <input
            type="checkbox"
            checked={filters[t] ?? true}
            onChange={() => toggle(t)}
          />
          {t}
        </label>
      ))}

      <h3>Layout</h3>
      <select value={layout} onChange={e => setLayout(e.target.value)}>
        <option value="dag">DAG</option>
        <option value="free">Free</option>
      </select>

      <h3>Region</h3>
      <select onChange={e => setRegion(e.target.value)}>
        <option value="all">All</option>
        <option value="ap-south-1">Mumbai</option>
        <option value="us-east-1">Virginia</option>
      </select>

      <h3>Search</h3>
      <input value={search} onChange={e => setSearch(e.target.value)} />
    </div>
  );
};

export default ControlsPanel;