import createHttpError from 'http-errors';
import {
  getRecipeById,
  deleteFavoriteRecipeById,
  addFavoriteRecipe,
  getFavoriteRecipes,
} from '../services/recipes.js';

export const recipesController = async (req, res) => {};

export const getRecipeByIdController = async (req, res, next) => {
  const { id } = req.params;

  const recipe = await getRecipeById(id);

  if (!recipe) {
    return next(createHttpError(404, 'Recipe not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found recipe with id ${id}`,
    data: recipe,
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

export const getFavoriteRecipesController = async (req, res) => {
  const favoriteRecipes = await getFavoriteRecipes(req.user._id);

  if (!favoriteRecipes || favoriteRecipes.data.length === 0) {
    return res.status(404).json({
      status: 404,
      message: 'No favorites found',
      data: [],
    });
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully received favorites list',
    data: favoriteRecipes.data,
    pagination: favoriteRecipes.pagination,
  });
};
