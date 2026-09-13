import { Router } from "express";
import { addTradingOption, deleteTradingOption, getTradingOptions } from "../controllers/tradingOption.controller.js";
import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken.js";

const router = Router();

router.use(verifyFirebaseToken);

router.get("/", getTradingOptions);

router.post("/", addTradingOption);

router.delete("/:id", deleteTradingOption);

export default router;