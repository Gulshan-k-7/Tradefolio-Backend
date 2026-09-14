import { Router } from "express";
import { addFund, deleteFund, getFunds } from "../controllers/fund.controller.js";
import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken.js";

const router = Router();

router.use(verifyFirebaseToken);

router.get("/", getFunds);
router.post("/", addFund);
router.delete("/:id", deleteFund);

export default router;