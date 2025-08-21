import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticate } from "../middlewares/authenticate.js";
import * as recipesCtrl from "../controllers/recipes.js";

const router = Router();

router.get("/mine", authenticate, ctrlWrapper(recipesCtrl.getOwn));

export default router;