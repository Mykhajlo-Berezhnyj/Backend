import createHttpError from 'http-errors';
import {
  addFavoriteRecipe,
  deleteFavoriteRecipeById,
  getAllRecipes,
} from '../services/recipes.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseParamsForRecipes } from '../utils/parseFilterParams.js';

export const getAllRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { category, ingredient, search } = parseParamsForRecipes(req.query);

  const recipes = await getAllRecipes({
    page,
    perPage,
    category,
    ingredient,
    search,
  });

  res.json({
    status: 200,
    message: 'Recipes retrieved successfully',
    data: recipes,
  });
};

export const addToFavoriteController = async (req, res) => {
  const userId = req.user._id;
  const { recipeId } = req.params;

  const user = await addFavoriteRecipe(recipeId, userId);

  res.status(201).json({
    status: 201,
    message: 'Recipe added to favorites',
    data: user.favorites,
  });
};

export const deleteFavoriteRecipeByIdController = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    if (!recipeId) return next(createHttpError(400, 'Missing recipeId'));

    const user = await deleteFavoriteRecipeById(recipeId, req.user._id);
    if (!user) return next(createHttpError(404, 'User not found'));

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
