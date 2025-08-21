import { getOwnRecipes } from "../services/recipes.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";


export const getOwn = async (req, res) => {

  const userId = req.user._id;

  const { page, limit } = parsePaginationParams(req.query, {
    page: 1,
    limit: 12,
  });

  const result = await getOwnRecipes(userId, { page, limit });
  res.json(result);
};