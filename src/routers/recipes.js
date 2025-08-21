import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
// import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
// import { upload } from "../middlewares/multer.js";
import {
  deleteFavoriteRecipeByIdController,
  getFavoriteRecipesController,
} from "../controllers/recipes.js";

const router = Router();

router.use(authenticate);

router.delete(
  "/deleteFavoriteRecipe/:recipeId",
  isValidId("recipeId"),
  ctrlWrapper(deleteFavoriteRecipeByIdController)
);

router.get("/favoriteRecipes", ctrlWrapper(getFavoriteRecipesController));

export default router;
