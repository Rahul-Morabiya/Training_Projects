import React, { useEffect, useState } from "react";
import { fetchGraph } from "./api";
import GraphView from "./components/GraphView";
import ControlsPanel from "./components/ControlsPanel";
import NodeDetails from "./components/NodeDetails";
import ResourceListView from "./components/ResourceListView";
import ArchitectureView from "./components/ArchitectureView"; // 🔥 NEW
import { useGraphFilter } from "./hooks/useGraphFilter";
import { applyLayout } from "./components/LayoutEngine";

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [filters, setFilters] = useState({});
  const [layout, setLayout] = useState("dag");
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  const [selectedNode, setSelectedNode] = useState(null);

  // 🔥 UPDATED
  const [view, setView] = useState("graph"); // graph | list | architecture

  useEffect(() => {
    fetchGraph().then(data => {
      setNodes(data.nodes);
      setEdges(data.edges);
    });
  }, []);

  const { nodes: filteredNodes, edges: filteredEdges } =
    useGraphFilter(nodes, edges, filters, search);

  const regionNodes = filteredNodes.filter(n =>
    region === "all" ? true : n.data.region === region
  );

  const ids = new Set(regionNodes.map(n => n.id));

  const regionEdges = filteredEdges.filter(e =>
    ids.has(e.source) && ids.has(e.target)
  );

const layoutedNodes =
  layout === "dag"
    ? applyLayout(regionNodes, regionEdges, layout)
    : regionNodes;
  return (
    <>
      <ControlsPanel
        filters={filters}
        setFilters={setFilters}
        layout={layout}
        setLayout={setLayout}
        search={search}
        setSearch={setSearch}
        setRegion={setRegion}
        view={view}
        setView={setView}
      />

      {/* 🔥 VIEW SWITCH */}
      {view === "graph" && (
        <GraphView
          nodes={layoutedNodes}
          edges={regionEdges}
          onNodeClick={setSelectedNode}
          selectedNode={selectedNode}
        />
      )}

      {view === "list" && (
        <ResourceListView
          nodes={nodes}
          filters={filters}
          search={search}
          region={region}
          onNodeClick={setSelectedNode}
        />
      )}

      {view === "architecture" && (
        <ArchitectureView
          nodes={nodes}
          edges={edges}
          onNodeClick={setSelectedNode}
        />
      )}

      <NodeDetails
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </>
  );
}

export default App;