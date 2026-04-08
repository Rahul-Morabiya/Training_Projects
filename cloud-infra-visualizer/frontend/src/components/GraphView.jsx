import React from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider
} from "reactflow";
import "reactflow/dist/style.css";

const getIcon = (type) => `/icons/${type}.svg`;

const FlowContent = ({ nodes, edges, onNodeClick }) => {

  const styledNodes = nodes.map(n => ({
    ...n,
    type: "default", // ✅ FORCE DEFAULT TYPE
    data: {
      label: (
        <div style={{ textAlign: "center" }}>
          <img
            src={getIcon(n.type)}
            alt=""
            style={{ width: 40 }}
          />
          <div style={{ fontSize: 10 }}>{n.data.label}</div>
        </div>
      )
    }
  }));

  return (
    <ReactFlow
      nodes={styledNodes}
      edges={edges}
      fitView
      onNodeClick={(e, node) => onNodeClick(node)}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
};

const GraphView = (props) => {
  return (
    <div style={{ height: "90vh" }}>
      <ReactFlowProvider>
        <FlowContent {...props} />
      </ReactFlowProvider>
    </div>
  );
};

export default GraphView;