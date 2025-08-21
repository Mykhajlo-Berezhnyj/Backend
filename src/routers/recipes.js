import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getAllRecipesController } from '../controllers/recipes.js';
import favoriteRouter from './favorites.js';

const router = Router();

router.get('/', ctrlWrapper(getAllRecipesController));

// router.use(authenticate);

router.use('/favorite', favoriteRouter);

// router.post(
//   '/:recipeId',
//   isValidId('recipeId'),
//   ctrlWrapper(addToFavoriteController),
// );

// router.delete(
//   '/deleteFavoriteRecipe/:recipeId',
//   isValidId('recipeId'),
//   ctrlWrapper(deleteFavoriteRecipeByIdController),
// );

export default router;
