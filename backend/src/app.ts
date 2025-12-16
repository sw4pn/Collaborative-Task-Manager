import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

// Routes
app.get("/", (_, res) => {
  res.send("Hello World!");
});
// Health Check Endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
