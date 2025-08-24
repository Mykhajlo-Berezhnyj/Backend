import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticate } from "../middlewares/authenticate.js";
import * as recipesCtrl from "../controllers/recipes.js";

const router = Router();

router.get("/my", authenticate, ctrlWrapper(recipesCtrl.getMy));

export default router;