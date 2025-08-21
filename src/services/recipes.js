import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { Recipe } from '../db/models/recipes.js';

import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import mongoose from 'mongoose';

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
    filter['ingredients.id'] = ingredient;
  }

  if (search) {
    filter.title = { $regex: search, $options: 'i' }; // пошук по назві (без урахування регістру)
  }

  console.log(filter);

  // Запит до БД
  const recipesQuery = Recipe.find(filter)
    .populate('category')
    .populate({ path: 'ingredients.id', select: 'name' });

  const recipesCount = await Recipe.countDocuments(filter);

  const recipes = await recipesQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(recipesCount, perPage, page);

  return {
    data: recipes,
    ...paginationData,
  };
};

export const addFavoriteRecipe = async (recipeId, userId) => {
  const user = await User.findById(userId);

  const alreadyFavorite = user.favoriteRecipes.some(
    (recipe) => recipe.toString() === recipeId.toString(),
  );

  if (!alreadyFavorite) {
    user.favoriteRecipes.push(recipeId);
    await user.save();
  }

  return user.favoriteRecipes;
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
