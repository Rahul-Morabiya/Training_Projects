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
    setFilters((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div
      style={{
        padding: 15,
        background: "#1e1e2f",
        color: "white",
        borderBottom: "1px solid #333",
        display: "flex",
        gap: 20,
        flexWrap: "wrap",
        alignItems: "center"
      }}
    >
      <div>
        <strong>Filters:</strong>
        {["ec2", "s3", "rds", "vpc", "subnet", "sg"].map((t) => (
          <label key={t} style={{ marginLeft: 10 }}>
            <input
              type="checkbox"
              checked={filters[t] ?? true}
              onChange={() => toggle(t)}
            />
            {t}
          </label>
        ))}
      </div>

      <div>
        <strong>Layout:</strong>
        <select
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          style={inputStyle}
        >
          <option value="dag">DAG</option>
          <option value="free">Free</option>
        </select>
      </div>

      <div>
        <strong>Region:</strong>
        <select
          onChange={(e) => setRegion(e.target.value)}
          style={inputStyle}
        >
          <option value="all">All</option>
          <option value="ap-south-1">Mumbai</option>
          <option value="us-east-1">Virginia</option>
        </select>
      </div>

      <div>
        <strong>Search:</strong>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />
      </div>
    </div>
  );
};

const inputStyle = {
  marginLeft: 8,
  background: "#2a2a3a",
  border: "none",
  padding: 6,
  color: "white",
  borderRadius: 5
};

export default ControlsPanel;