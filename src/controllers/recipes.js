import { getAllRecipes } from "../services/recipes.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

export const getAllRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { category, ingredient, search } = req.query;

  const recipes = await getAllRecipes({
    page,
    perPage,
    category,
    ingredient,
    search,
  });

  res.json({
    status: 200,
    message: "Recipes retrieved successfully",
    data: recipes,
  });
};
