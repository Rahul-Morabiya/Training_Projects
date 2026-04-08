import React from "react";

const NodeDetails = ({ node, onClose }) => {
  if (!node) return null;

  return (
    <div style={{
      position: "fixed",
      right: 0,
      top: 0,
      width: 300,
      height: "100%",
      background: "#1e1e1e",
      color: "white",
      padding: 15
    }}>
      <button onClick={onClose}>Close</button>

      <h3>Node Details</h3>
      <p>ID: {node.id}</p>
      <p>Type: {node.type}</p>
      <p>Region: {node.data.region}</p>

      <pre>{JSON.stringify(node.data, null, 2)}</pre>
    </div>
  );
};

export default NodeDetails;