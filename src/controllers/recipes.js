import createHttpError from "http-errors";
import { addFavoriteRecipe } from "../services/recipes.js";

export const addFavoriteRecipeController = async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.params;

  const recipe = await addFavoriteRecipe(userId, recipeId);

  if (!recipe) {
    throw createHttpError.NotFound("Recipe not found");
  }

  res.status(200).json({
    status: 200,
    message: "Recipe added to favorites",
    data: recipe,
  });
};
