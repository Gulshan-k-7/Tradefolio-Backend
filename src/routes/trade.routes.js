import { Router } from "express";

import { createTrade, getTrades, updateTrade, deleteTrade } from "../controllers/trade.controller.js";
import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken.js";

const router = Router();

router.use(verifyFirebaseToken);

router.post("/create-trade",  createTrade);

router.get("/get-trades", getTrades);

router.patch("/:id", updateTrade);
router.delete("/:id", deleteTrade);

export default router;