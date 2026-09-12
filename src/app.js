import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import tradeRoutes from "./routes/trade.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "TradeLog API running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/trades", tradeRoutes);

export default app;