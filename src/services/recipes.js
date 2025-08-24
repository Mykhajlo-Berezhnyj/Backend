import { Recipe } from "../db/models/recipes.js";

export const getUserRecipes = async (
  userId,
  { page = 1, limit = 12, category, ingredient, search } = {}
) => {
  const perPage = Number(limit) || 12;
  const currentPage = Number(page) || 1;
  const skip = (currentPage - 1) * perPage;

  const filter = { owner: userId };

  if (category) filter.category = category;                
  if (ingredient) filter["ingredients.id"] = ingredient;   
  if (search) filter.title = { $regex: search, $options: "i" };

  const [items, total] = await Promise.all([
    Recipe.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .select("title description thumb time calories createdAt")
      .lean(),
    Recipe.countDocuments(filter),
  ]);

  return { items, total, page: currentPage, perPage };
};