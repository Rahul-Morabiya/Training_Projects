import React, { useMemo, useState } from "react";

const PAGE_SIZE = 14;

const ResourceListView = ({
  nodes,
  filters,
  search,
  region,
  onNodeClick
}) => {

  const [sortKey, setSortKey] = useState("type");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = nodes.filter((n) => {
      if (filters[n.type] === false) return false;
      if (region !== "all" && n.data.region !== region) return false;
      if (
        search &&
        !n.data.label.toLowerCase().includes(search.toLowerCase())
      ) return false;
      return true;
    });

    result.sort((a, b) => {
      if (sortKey === "name") {
        return a.data.label.localeCompare(b.data.label);
      }
      return a.type.localeCompare(b.type);
    });

    return result;
  }, [nodes, filters, search, region, sortKey]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div style={container}>
      
      {/* HEADER */}
      <div style={header}>
        <h2 style={{ margin: 0 }}>Resources</h2>

        <div>
          <select onChange={(e) => setSortKey(e.target.value)} style={select}>
            <option value="type">Sort by Type</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div style={tableWrapper}>
        <table style={table}>
          
          <thead style={thead}>
            <tr>
              <th style={th}>Type</th>
              <th style={th}>Name</th>
              <th style={th}>Region</th>
              <th style={th}>Details</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((n, i) => (
              <tr
                key={n.id}
                style={{
                  ...tr,
                  background: i % 2 === 0 ? "#020617" : "#020617"
                }}
                onClick={() => onNodeClick(n)}
              >
                <td style={td}>
                  <span style={typeBadge(n.type)}>
                    {n.type.toUpperCase()}
                  </span>
                </td>

                <td style={tdName}>{n.data.label}</td>

                <td style={td}>
                  <span style={regionBadge}>
                    {n.data.region}
                  </span>
                </td>

                <td style={td}>
                  {summary(n)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div style={pagination}>
        <button
          style={pageBtn}
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
        >
          Prev
        </button>

        <span style={{ color: "#9ca3af" }}>
          Page {page} / {totalPages}
        </span>

        <button
          style={pageBtn}
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

/* 🔥 STYLES */

const container = {
  padding: 20,
  background: "#020617",
  color: "white"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 15
};

const select = {
  background: "#111827",
  border: "1px solid #1e293b",
  color: "#cbd5f5",
  padding: "8px 12px",
  borderRadius: 8
};

const tableWrapper = {
  border: "1px solid #1e293b",
  borderRadius: 10,
  overflow: "hidden"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const thead = {
  background: "#020617",
  position: "sticky",
  top: 0,
  zIndex: 10
};

const th = {
  textAlign: "left",
  padding: "14px 16px",
  fontSize: 12,
  color: "#9ca3af",
  borderBottom: "1px solid #1e293b"
};

const tr = {
  cursor: "pointer",
  transition: "all 0.15s ease"
};

const td = {
  padding: "14px 16px",
  borderBottom: "1px solid #1e293b",
  fontSize: 13
};

const tdName = {
  ...td,
  fontWeight: 600
};

const pagination = {
  marginTop: 15,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const pageBtn = {
  background: "#111827",
  border: "1px solid #1e293b",
  color: "white",
  padding: "6px 12px",
  borderRadius: 6,
  cursor: "pointer"
};

/* 🔥 BADGES */

const typeBadge = (type) => ({
  padding: "4px 8px",
  borderRadius: 6,
  fontSize: 11,
  background: "#1e293b",
  border: "1px solid #334155",
  color: "#cbd5f5"
});

const regionBadge = {
  padding: "4px 8px",
  borderRadius: 6,
  fontSize: 11,
  background: "#0f172a",
  border: "1px solid #1e293b",
  color: "#93c5fd"
};

/* 🔥 SUMMARY */

const summary = (n) => {
  const d = n.data;

  if (n.type === "ec2") return `${d.instanceType} • ${d.state}`;
  if (n.type === "subnet") return `${d.cidr} • ${d.az}`;
  if (n.type === "vpc") return d.cidr;

  return "-";
};

export default ResourceListView;