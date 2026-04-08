import React, { useEffect, useState } from "react";
import { fetchGraph } from "./api";
import GraphView from "./components/GraphView";
import ControlsPanel from "./components/ControlsPanel";
import NodeDetails from "./components/NodeDetails";
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

  useEffect(() => {
    fetchGraph().then(data => {
      // 🔥 DEBUG LOG
      console.log("🌐 FRONTEND RECEIVED:", data);

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

  const layoutedNodes = applyLayout(regionNodes, regionEdges, layout);

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
      />

      <GraphView
        nodes={layoutedNodes}
        edges={regionEdges}
        onNodeClick={setSelectedNode}
      />

      <NodeDetails
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </>
  );
}

export default App;