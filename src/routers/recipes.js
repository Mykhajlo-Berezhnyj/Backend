import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from "../middlewares/multer.js";
import favoriteRouter from './favorites.js';
import {getRecipeByIdController, 
addToFavoriteController,
deleteFavoriteRecipeByIdController,
} from '../controllers/recipes.js';

const router = Router();

router.get('/:id', isValidId('id'), ctrlWrapper(getRecipeByIdController));

router.use(authenticate);

router.use('/favorite', favoriteRouter);

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
