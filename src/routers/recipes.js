import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import favoriteRouter from './favorites.js';
import {
  getRecipeByIdController,
  getAllRecipesController,
  addToFavoriteController,
  deleteFavoriteRecipeByIdController,
  getFavoriteRecipesController,
} from '../controllers/recipes.js';

const router = Router();

router.get('/', ctrlWrapper(getAllRecipesController));

router.get('/:id', isValidId('id'), ctrlWrapper(getRecipeByIdController));

router.use(authenticate);

router.use('/favorite', favoriteRouter);

router.post(
  '/favorites/:id',
  isValidId('recipeId'),
  ctrlWrapper(addToFavoriteController),
);

router.delete(
  '/favorites/:id',
  isValidId('recipeId'),
  ctrlWrapper(deleteFavoriteRecipeByIdController),
);

router.get(
  '/favorites',
  ctrlWrapper(getFavoriteRecipesController),
);

export default router;
