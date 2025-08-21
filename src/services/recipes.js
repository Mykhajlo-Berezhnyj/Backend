import { Recipe } from "../db/models/recipes.js";

export const getOwnRecipes = async (userId, { page, limit }) => {
  const skip = (page - 1) * limit;
  const filter = { owner: userId };

  const [data, total] = await Promise.all([
    Recipe.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("title description thumb time calories createdAt"),
    Recipe.countDocuments(filter),
  ]);

  return {
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};