import { Router } from "express";

import { getCurrentUser, syncUser } from "../controllers/auth.controller.js";
import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken.js";

const router = Router();

router.post("/sync", verifyFirebaseToken, syncUser);

router.get("/me", verifyFirebaseToken, getCurrentUser);

export default router;