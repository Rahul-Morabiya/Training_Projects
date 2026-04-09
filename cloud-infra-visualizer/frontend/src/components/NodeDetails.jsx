import React from "react";

const Row = ({ label, value }) => {
  if (value === undefined || value === null) return null;

  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ color: "#9ca3af", fontSize: 11 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 500 }}>
        {String(value)}
      </div>
    </div>
  );
};

const NodeDetails = ({ node, onClose }) => {
  if (!node) return null;

  const d = node.data;

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: 340,
        height: "100%",
        background: "#020617",
        color: "white",
        padding: 20,
        overflowY: "auto",
        borderLeft: "1px solid #1e293b",
        zIndex: 1000
      }}
    >
      <button
        onClick={onClose}
        style={{
          marginBottom: 16,
          padding: "6px 10px",
          background: "#1e293b",
          border: "none",
          color: "white",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        Close
      </button>

      <h3 style={{ marginBottom: 16 }}>Resource Details</h3>

      {/* 🔥 BASIC */}
      <Row label="ID" value={node.id} />
      <Row label="Type" value={node.type} />
      <Row label="Region" value={d.region} />

      <hr style={{ margin: "16px 0", borderColor: "#1e293b" }} />

      {/* 🔥 RESOURCE SPECIFIC */}
      <Row label="Instance Type" value={d.instanceType} />
      <Row label="State" value={d.state} />
      <Row label="Private IP" value={d.privateIp} />

      <Row label="CIDR Block" value={d.cidr} />
      <Row label="Availability Zone" value={d.az} />

      <Row label="Description" value={d.description} />

      <Row label="Engine" value={d.engine} />
      <Row label="Status" value={d.status} />

      <Row label="Created" value={d.created} />

      {/* ❌ REMOVED RAW DATA */}
    </div>
  );
};

export default NodeDetails;