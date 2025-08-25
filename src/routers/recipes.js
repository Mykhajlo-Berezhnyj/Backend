import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { createAddOwnRecipeSchema } from '../validation/recipe.js';
import { upload } from '../middlewares/multer.js';
import {
  deleteFavoriteRecipeByIdController,
  addOwnRecipeController,
  getRecipeByIdController,
  getAllRecipesController,
  getUserRecipesController,
} from '../controllers/recipes.js';
import favoriteRouter from './favorites.js';

const router = Router();

router.get('/my', authenticate, ctrlWrapper(getUserRecipesController));

router.get(
  '/:recipeId',
  isValidId('recipeId'),
  ctrlWrapper(getRecipeByIdController),
);

router.use('/favorites', favoriteRouter);

router.get('/', ctrlWrapper(getAllRecipesController));

router.post(
  '/',
  authenticate,
  upload.single('thumb'),
  validateBody(createAddOwnRecipeSchema),
  ctrlWrapper(addOwnRecipeController),
);

router.delete(
  '/deleteFavoriteRecipe/:recipeId',
  authenticate,
  isValidId('recipeId'),
  ctrlWrapper(deleteFavoriteRecipeByIdController),
);

export default router;
