import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { Recipe } from "../db/models/recipes.js";

export const getAllRecipes = async ({
  page,
  perPage,
  category,
  ingredient,
  search,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  // Фільтр для пошуку
  const filter = {};

  if (category) {
    filter.category = category; // шукаємо по id категорії
  }

  if (ingredient) {
    filter["ingredients.id"] = ingredient; // шукаємо по id інгредієнта
  }

  if (search) {
    filter.title = { $regex: search, $options: "i" }; // пошук по назві (без урахування регістру)
  }

  // Запит до БД
  const recipesQuery = Recipe.find(filter)
    .populate("category", "name") // підтягнемо тільки name категорії
    .populate("ingredients.id"); // підтягнемо всі поля інгредієнтів

  const recipesCount = await Recipe.countDocuments(filter);

  const recipes = await recipesQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(recipesCount, perPage, page);

  return {
    data: recipes,
    ...paginationData,
  };
};
