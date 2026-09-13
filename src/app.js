import express from "express";
import cors from "cors";


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

import authRoutes from "./routes/auth.routes.js";
import tradeRoutes from "./routes/trade.routes.js";
import tradingOptionRoutes from "./routes/tradingOption.routes.js";



app.use("/api/auth", authRoutes);

app.use("/api/trading-options", tradingOptionRoutes);

app.use("/api/trades", tradeRoutes);

export default app;