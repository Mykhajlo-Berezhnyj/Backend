import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  addToFavoriteController,
  deleteFavoriteRecipeByIdController,
} from '../controllers/recipes.js';

const router = Router();

router.use(authenticate);

router.post(
  '/:recipeId',
  isValidId('recipeId'),
  ctrlWrapper(addToFavoriteController),
);

router.delete(
  '/deleteFavoriteRecipe/:recipeId',
  isValidId('recipeId'),
  ctrlWrapper(deleteFavoriteRecipeByIdController),
);

export default router;
