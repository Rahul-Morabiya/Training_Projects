import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import graphRoutes from "./routes/graph.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimit({
  windowMs: 60000,
  max: 50
}));

app.use("/graph", graphRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend running...");
});