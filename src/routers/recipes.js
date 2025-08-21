import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { addFavoriteRecipeController } from "../controllers/recipes.js";

const router = Router();

router.post(
  "/favorites/:recipeId",
  isValidId,
  authenticate,
  ctrlWrapper(addFavoriteRecipeController)
);

export default router;
