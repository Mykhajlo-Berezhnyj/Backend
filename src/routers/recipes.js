import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import { createAddOwnRecipeSchema } from "../validation/recipe.js";
import { upload } from "../middlewares/multer.js";
import {
  deleteFavoriteRecipeByIdController,
  addOwnRecipeController,
} from "../controllers/recipes.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  upload.single("thumb"),
  validateBody(createAddOwnRecipeSchema),
  ctrlWrapper(addOwnRecipeController)
);

router.delete(
  "/deleteFavoriteRecipe/:recipeId",
  isValidId("recipeId"),
  ctrlWrapper(deleteFavoriteRecipeByIdController)
);

export default router;
