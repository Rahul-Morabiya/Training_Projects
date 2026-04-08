import { useMemo } from "react";

export const useGraphFilter = (nodes, edges, filters, search) => {
  return useMemo(() => {
    const filteredNodes = nodes.filter(n =>
      (filters[n.type] ?? true) &&
      n.data.label.toLowerCase().includes(search.toLowerCase())
    );

    const ids = new Set(filteredNodes.map(n => n.id));

    const filteredEdges = edges.filter(e =>
      ids.has(e.source) && ids.has(e.target)
    );

    return { nodes: filteredNodes, edges: filteredEdges };
  }, [nodes, edges, filters, search]);
};