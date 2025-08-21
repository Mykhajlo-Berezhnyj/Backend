import { Recipe } from "../db/models/recipes.js";
import { User } from "../db/models/user.js";
import createHttpError from "http-errors";

export const addFavoriteRecipe = async (userId, recipeId) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw createHttpError.NotFound("Recipe not found");
  }

  const user = await User.findById(userId);

  const isFavorite = user.favorites.includes(recipeId);
  if (isFavorite) {
    throw createHttpError.Conflict("Recipe already in favorites");
  }
  user.favorites.push(recipeId);
  await user.save();

  return recipe;
};
