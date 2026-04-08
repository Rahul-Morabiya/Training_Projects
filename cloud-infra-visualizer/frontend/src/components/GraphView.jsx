import React, { useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider
} from "reactflow";
import "reactflow/dist/style.css";

const getIcon = (type) => {
  const icons = {
    ec2: "🖥️",
    rds: "🗄️",
    s3: "🪣",
    vpc: "🌐",
    subnet: "📦",
    sg: "🛡️",
    region: "🌍"
  };
  return icons[type] || "⚪";
};

const typeColors = {
  ec2: "#ff9900",
  rds: "#3b82f6",
  s3: "#22c55e",
  vpc: "#a855f7",
  subnet: "#06b6d4",
  sg: "#f43f5e",
  region: "#eab308"
};

const FlowContent = ({ nodes, edges, onNodeClick }) => {

  const styledNodes = nodes.map((n) => ({
    ...n,
    type: "default",

    // ✅ KEEP ORIGINAL DATA + ADD UI LABEL
    data: {
      ...n.data,  // 🔥 CRITICAL FIX
      label: (
        <div
          style={{
            background: "#1e1e2f",
            border: `1px solid ${typeColors[n.type] || "#333"}`,
            borderRadius: 10,
            padding: 6,
            width: 110,
            textAlign: "center",
            color: "white",
            cursor: "pointer"
          }}
        >
          <div style={{ fontSize: 18 }}>
            {getIcon(n.type)}
          </div>

          <div
            style={{
              fontSize: 9,
              fontWeight: 600,
              wordBreak: "break-all"
            }}
          >
            {n.data.label}
          </div>
        </div>
      )
    }
  }));

  return (
    <ReactFlow
      nodes={styledNodes}
      edges={edges}
      fitView
      style={{ background: "#0f0f1a" }}
      onNodeClick={(e, node) => onNodeClick(node)}
    >
      <MiniMap />
      <Controls />
      <Background color="#333" gap={20} />
    </ReactFlow>
  );
};

const GraphView = (props) => {
  return (
    <div style={{ height: "90vh", background: "#0f0f1a" }}>
      <ReactFlowProvider>
        <FlowContent {...props} />
      </ReactFlowProvider>
    </div>
  );
};

export default GraphView;