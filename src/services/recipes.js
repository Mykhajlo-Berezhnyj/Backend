import { Recipe } from "../db/models/recipes.js";

export const getUserRecipes = async (userId, { page = 1, limit = 12 }) => {
  const perPage = Number(limit) || 12;
  const currentPage = Number(page) || 1;
  const skip = (currentPage - 1) * perPage;

  const [items, total] = await Promise.all([
    Recipe.find({ owner: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .select("title description thumb time calories createdAt")
      .lean(),
    Recipe.countDocuments({ owner: userId }),
  ]);

  return { items, total, page: currentPage, perPage };
};