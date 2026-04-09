import React from "react";
import { Handle, Position } from "reactflow";


const typeStyles = {
  ec2: { border: "#f59e0b", icon: "🖥️" },
  rds: { border: "#3b82f6", icon: "🗄️" },
  s3: { border: "#22c55e", icon: "🪣" },
  vpc: { border: "#8b5cf6", icon: "🌐" },
  subnet: { border: "#06b6d4", icon: "📦" },
  sg: { border: "#ef4444", icon: "🛡️" },
  region: { border: "#eab308", icon: "🌍" }
};

const AwsNode = ({ data, selected }) => {
  const style = typeStyles[data.type] || {};

  return (
    <div
      style={{
        width: 140,
        padding: "10px 8px",
        borderRadius: 12,
        background: "#020617",
        border: `1.5px solid ${style.border}`,
        boxShadow: selected
          ? `0 0 15px ${style.border}`
          : "0 4px 12px rgba(0,0,0,0.4)",
        textAlign: "center",
        color: "white",
        fontSize: 11,
        fontWeight: 500,
        transition: "all 0.2s ease"
      }}
    >
      <div style={{ fontSize: 18, marginBottom: 4 }}>
        {style.icon}
      </div>

      <div style={{ wordBreak: "break-word" }}>
        {data.label}
      </div>
      <Handle type="target" position={Position.Top} />
<Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default AwsNode;