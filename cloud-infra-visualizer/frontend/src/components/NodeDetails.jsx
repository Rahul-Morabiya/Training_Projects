import React from "react";

const Row = ({ label, value }) => {
  if (value === undefined || value === null) return null;

  return (
    <div style={{ marginBottom: 8 }}>
      <span style={{ color: "#aaa" }}>{label}: </span>
      <span>{String(value)}</span>
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
        width: 320,
        height: "100%",
        background: "#111827",
        color: "white",
        padding: 16,
        overflowY: "auto",
        borderLeft: "1px solid #333",
        zIndex: 1000
      }}
    >
      <button onClick={onClose} style={{ marginBottom: 10 }}>
        Close
      </button>

      <h3 style={{ marginBottom: 10 }}>Node Details</h3>

      {/* 🔥 BASIC */}
      <Row label="ID" value={node.id} />
      <Row label="Type" value={node.type} />
      <Row label="Region" value={d.region} />

      <hr style={{ margin: "10px 0", borderColor: "#333" }} />

      {/* 🔥 SMART METADATA */}
      <Row label="Instance Type" value={d.instanceType} />
      <Row label="State" value={d.state} />
      <Row label="Private IP" value={d.privateIp} />

      <Row label="CIDR Block" value={d.cidr} />
      <Row label="Availability Zone" value={d.az} />

      <Row label="Description" value={d.description} />

      <Row label="Engine" value={d.engine} />
      <Row label="Status" value={d.status} />

      <Row label="Created" value={d.created} />

      {/* 🔥 RAW JSON (NOW WILL WORK IF ADDED LATER) */}
      {d.raw && (
        <>
          <hr style={{ margin: "10px 0", borderColor: "#333" }} />
          <h4>Raw Data</h4>
          <pre
            style={{
              fontSize: 11,
              background: "#1f2937",
              padding: 10,
              borderRadius: 6,
              overflowX: "auto"
            }}
          >
            {JSON.stringify(d.raw, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
};

export default NodeDetails;