import express from "express";
import { fetchAWSResources } from "../services/awsService.js";
import { buildGraph } from "../utils/graphBuilder.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await fetchAWSResources();

    console.log("📦 FETCHED DATA:", data);

    const graph = buildGraph(data);

    console.log("📊 FINAL GRAPH:", graph);

    res.json(graph);
  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json({ error: "AWS fetch failed" });
  }
});

export default router;