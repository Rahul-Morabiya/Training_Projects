import dagre from "dagre";

export const applyLayout = (nodes, edges, layout) => {

  if (layout === "dag") {
    const g = new dagre.graphlib.Graph();

    // ✅ TOP → BOTTOM layout (KEY FIX)
    g.setGraph({
      rankdir: "TB",
      nodesep: 80,
      ranksep: 120
    });

    g.setDefaultEdgeLabel(() => ({}));

    nodes.forEach((n) =>
      g.setNode(n.id, { width: 150, height: 70 })
    );

    edges.forEach((e) =>
      g.setEdge(e.source, e.target)
    );

    dagre.layout(g);

    return nodes.map((n) => {
      const pos = g.node(n.id);

      return {
        ...n,
        position: {
          x: pos.x - 75,   // center correction
          y: pos.y - 35
        }
      };
    });
  }

  // fallback random
  return nodes.map((n) => ({
    ...n,
    position: {
      x: Math.random() * 600,
      y: Math.random() * 400
    }
  }));
};