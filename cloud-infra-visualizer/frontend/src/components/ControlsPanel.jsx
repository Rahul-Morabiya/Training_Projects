import React from "react";

const ControlsPanel = ({
  filters,
  setFilters,
  layout,
  setLayout,
  search,
  setSearch,
  setRegion,
  view,
  setView
}) => {

  const toggle = (type) => {
    setFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div style={container}>

      <div style={left}>
        <div style={title}>Rahul's Cloud Visualizer</div>

        <div style={filtersWrap}>
          {["ec2","s3","rds","vpc","subnet","sg"].map(t => (
            <button
              key={t}
              onClick={() => toggle(t)}
              style={{
                ...chip,
                background: filters[t] === false ? "#020617" : "#1e293b",
                borderColor: filters[t] === false ? "#334155" : "#6366f1"
              }}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={right}>

        {/* 🔥 UPDATED SEGMENTED CONTROL */}
        <div style={segmented}>
          <button
            style={view === "graph" ? activeSeg : seg}
            onClick={() => setView("graph")}
          >
            Graph
          </button>

          <button
            style={view === "list" ? activeSeg : seg}
            onClick={() => setView("list")}
          >
            List
          </button>

          <button
            style={view === "architecture" ? activeSeg : seg}
            onClick={() => setView("architecture")}
          >
            Architecture
          </button>
        </div>

        <select value={layout} onChange={(e)=>setLayout(e.target.value)} style={select}>
          <option value="dag">DAG</option>
          <option value="free">Free</option>
        </select>

        <select onChange={(e)=>setRegion(e.target.value)} style={select}>
          <option value="all">All Regions</option>
          <option value="ap-south-1">Mumbai</option>
          <option value="us-east-1">Virginia</option>
        </select>

        <input
          placeholder="Search resources..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          style={searchBox}
        />
      </div>
    </div>
  );
};

/* STYLES */

const container = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "35px 24px",
  background: "#020617",
  borderBottom: "1px solid #1e293b"
};

const left = { display: "flex", alignItems: "center", gap: 20 };
const right = { display: "flex", alignItems: "center", gap: 14 };

const title = {
  fontWeight: 700,
  fontSize: 20,
  color: "white"
};

const filtersWrap = { display: "flex", gap: 10 };

const chip = {
  padding: "8px 14px",
  borderRadius: 8,
  border: "1px solid",
  color: "#cbd5f5",
  fontSize: 12,
  cursor: "pointer",
  fontWeight: 600
};

const segmented = {
  display: "flex",
  background: "#111827",
  borderRadius: 10,
  overflow: "hidden"
};

const seg = {
  padding: "8px 16px",
  border: "none",
  background: "transparent",
  color: "#9ca3af",
  cursor: "pointer"
};

const activeSeg = {
  ...seg,
  background: "#6366f1",
  color: "white"
};

const select = {
  background: "#111827",
  border: "1px solid #1e293b",
  color: "#cbd5f5",
  padding: "10px 12px",
  borderRadius: 8
};

const searchBox = {
  background: "#111827",
  border: "1px solid #1e293b",
  color: "white",
  padding: "10px 12px",
  borderRadius: 8,
  width: 220
};

export default ControlsPanel;