import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import { Recipe } from '../db/models/recipes.js';

export const addFavoriteRecipe = async (recipeId, userId) => {
  const user = await User.findById(userId);

  const alreadyFavorite = user.favorites.some(
    (recipe) => recipe.toString() === recipeId.toString(),
  );

  if (!alreadyFavorite) {
    user.favorites.push(recipeId);
    await user.save();
  }

  return user;
};

export const deleteFavoriteRecipeById = async (recipeId, userId) => {
  const user = await User.findById(userId);

  const recipeExists = user.favoriteRecipes.some(
    (recipe) => recipe._id.toString() === recipeId.toString(),
  );

  if (!recipeExists) {
    throw createHttpError(404, 'Recipe not found in user favorites');
  }

  user.favoriteRecipes = user.favoriteRecipes.filter(
    (recipe) => recipe._id.toString() !== recipeId.toString(),
  );

  await user.save();

  const updatedUser = await User.findById(userId).populate('favoriteRecipes');

  return updatedUser;
};
