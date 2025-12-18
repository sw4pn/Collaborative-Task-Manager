import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { notFoundHandler } from "./middlewares/not-found.middleware";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

// Routes
app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
