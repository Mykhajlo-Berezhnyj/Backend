import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  addToFavoriteController,
  deleteFavoriteRecipeByIdController,
  getFavoriteRecipesController,
} from '../controllers/recipes.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getFavoriteRecipesController));

router.post(
  '/:recipeId',
  isValidId('recipeId'),
  ctrlWrapper(addToFavoriteController),
);

router.delete(
  '/:recipeId',
  isValidId('recipeId'),
  ctrlWrapper(deleteFavoriteRecipeByIdController),
);

export default router;
