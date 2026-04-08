import express from "express";
import { fetchAWSResources } from "../services/awsService.js";
import { buildGraph } from "../utils/graphBuilder.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await fetchAWSResources();
    const graph = buildGraph(data);
    res.json(graph);
  } catch (err) {
    res.status(500).json({ error: "AWS fetch failed" });
  }
});

export default router;