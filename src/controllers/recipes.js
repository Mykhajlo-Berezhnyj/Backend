import createHttpError from "http-errors";
import {
  deleteFavoriteRecipeById,
  getFavoriteRecipes,
} from "../services/recipes.js";

// export const recipesController = async (req, res) => {};

export const deleteFavoriteRecipeByIdController = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    if (!recipeId) return next(createHttpError(400, "Missing recipeId"));

    const user = await deleteFavoriteRecipeById(recipeId, req.user._id);
    if (!user) return next(createHttpError(404, "User not found"));

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getFavoriteRecipesController = async (req, res, next) => {
  try {
    const favoriteRecipes = await getFavoriteRecipes(req.user._id);

    res.status(200).json(favoriteRecipes);
  } catch (error) {
    next(error);
  }
};
