import React, { useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider
} from "reactflow";
import "reactflow/dist/style.css";

import AwsNode from "./AwsNode"; // ✅ IMPORT

// ✅ REGISTER CUSTOM NODE
const nodeTypes = {
  aws: AwsNode
};

const FlowContent = ({ nodes, edges, onNodeClick, selectedNode }) => {

  const connected = useMemo(() => {
    if (!selectedNode) return new Set();

    const set = new Set([selectedNode.id]);
    const stack = [selectedNode.id];

    while (stack.length) {
      const curr = stack.pop();

      edges.forEach(e => {
        if (e.source === curr && !set.has(e.target)) {
          set.add(e.target);
          stack.push(e.target);
        }
        if (e.target === curr && !set.has(e.source)) {
          set.add(e.source);
          stack.push(e.source);
        }
      });
    }

    return set;
  }, [selectedNode, edges]);

  // ✅ ONLY CHANGE HERE
  const styledNodes = nodes.map(n => {
    const isConnected = connected.has(n.id);

    return {
  ...n,
  type: "aws",
  draggable: true, // 🔥 ADD THIS
  data: {
    ...n.data,
    type: n.type
  },
  style: {
    opacity: selectedNode
      ? (isConnected ? 1 : 0.15)
      : 1
  }
};
  });

  // ❗ EDGES UNCHANGED (AS YOU ASKED)
  const styledEdges = edges.map((e, index) => {
  const isActive =
    selectedNode &&
    (e.source === selectedNode.id || e.target === selectedNode.id);

  // 🔥 OFFSET CALCULATION (KEY FIX)
  const offset = (index % 3) * 14; // stagger labels

  return {
    ...e,
    type: "default",
    animated: true,

    label: e.data?.label,

    labelStyle: {
      fill: "#e5e7eb",
      fontSize: 10,
      fontWeight: 500
    },

    labelBgStyle: {
      fill: "#020617",
      fillOpacity: 0.9,
      rx: 4,
      ry: 4
    },

    labelBgPadding: [6, 3],
    labelShowBg: true,

    // 🔥 KEY FIX
    labelX: (e.labelX || 0) + offset,
    labelY: (e.labelY || 0) + offset,

    style: {
      stroke: isActive ? "#ffffff" : "#64748b",
      strokeWidth: isActive ? 2.5 : 1.6,
      strokeDasharray: "8 6",
      opacity: selectedNode ? (isActive ? 1 : 0.1) : 0.85
    }
  };
});

  return (
  <ReactFlow
    nodes={styledNodes}
    edges={styledEdges}
    nodeTypes={nodeTypes}
    fitView
    onNodeClick={(e, node) => onNodeClick(node)}

    nodesDraggable={true}
    nodesConnectable={false}
    elementsSelectable={true}

    panOnDrag={true}
    panOnScroll={true}
    snapToGrid={false}

    style={{ background: "#020617" }}
  >
    {/* 🔥 ADD THESE BACK */}
    <MiniMap style={{ background: "#020617" }} />
    <Controls />   {/* ✅ THIS IS YOUR MISSING UI */}
    <Background color="#1e293b" gap={32} />
  </ReactFlow>
);
};

const GraphView = (props) => (
  <div style={{ height: "90vh" }}>
    <ReactFlowProvider>
      <FlowContent {...props} />
    </ReactFlowProvider>
  </div>
);

export default GraphView;