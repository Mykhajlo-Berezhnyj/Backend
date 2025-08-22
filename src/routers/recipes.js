import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import favoriteRouter from './favorites.js';
import {
  getRecipeByIdController,
  getAllRecipesController,
} from '../controllers/recipes.js';

const router = Router();

router.use('/favorites', favoriteRouter);

router.get('/', ctrlWrapper(getAllRecipesController));

router.get(
  '/:recipeId',
  isValidId('recipeId'),
  ctrlWrapper(getRecipeByIdController),
);

export default router;
