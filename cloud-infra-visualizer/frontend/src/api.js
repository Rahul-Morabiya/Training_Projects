export const fetchGraph = async () => {
  try {
    const res = await fetch("http://localhost:5000/graph");

    if (!res.ok) throw new Error("Fetch failed");

    return await res.json();
  } catch (err) {
    console.error(err);
    return { nodes: [], edges: [] };
  }
};