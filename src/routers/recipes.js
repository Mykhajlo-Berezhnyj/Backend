import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";
import { getAllRecipesController } from "../controllers/recipes.js";

const router = Router();
router.get("/", ctrlWrapper(getAllRecipesController));

export default router;
