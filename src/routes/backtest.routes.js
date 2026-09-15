import { Router } from "express";
import { createBacktestEntry, deleteBacktestEntry, getBacktestEntries } from "../controllers/backtest.controller.js";
import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken.js";

const router = Router();

router.use(verifyFirebaseToken);

router.get("/", getBacktestEntries);
router.post("/", createBacktestEntry);
router.delete("/:id", deleteBacktestEntry);

export default router;