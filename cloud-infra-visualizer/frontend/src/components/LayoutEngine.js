import dagre from "dagre";

export const applyLayout = (nodes, edges, layout) => {

  if (layout === "dag") {
    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: "TB" });
    g.setDefaultEdgeLabel(() => ({}));

    nodes.forEach(n => g.setNode(n.id, { width: 180, height: 80 }));
    edges.forEach(e => g.setEdge(e.source, e.target));

    dagre.layout(g);

    return nodes.map(n => {
      const pos = g.node(n.id);
      return { ...n, position: { x: pos.x, y: pos.y } };
    });
  }

  return nodes.map(n => ({
    ...n,
    position: { x: Math.random() * 800, y: Math.random() * 600 }
  }));
};