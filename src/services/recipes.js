import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import { Recipe } from '../db/models/recipes.js';
// import { Category } from "../db/models/categories.js";
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
// import mongoose from 'mongoose';

export const getAllRecipes = async ({
  page,
  perPage,
  category,
  ingredient,
  search,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (ingredient && ingredient.length) {
  filter['ingredients.id'] = { $all: Array.isArray(ingredient) ? ingredient : [ingredient] };
}

  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }

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

export const addOwnRecipes = async (payload) => {
  return await Recipe.create(payload);
};

export const getRecipeById = async (recipeId) =>
  await Recipe.findById(recipeId).populate({
    path: 'ingredients',
    select: 'name',
  });

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

export const getFavoriteRecipes = async (userId, { page, perPage }) => {
  const user = await User.findById(userId).populate({
    path: 'favoriteRecipes',
    options: {
      skip: (page - 1) * perPage,
      limit: perPage,
    },
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const totalCount = await User.aggregate([
    { $match: { _id: user._id } },
    { $project: { count: { $size: '$favoriteRecipes' } } },
  ]);

  const count = totalCount[0]?.count || 0;

  const paginationData = calculatePaginationData(count, perPage, page);

  return {
    data: user.favoriteRecipes,
    ...paginationData,
  };
};
export const getUserRecipes = async (userId, { page, perPage }) => {
  const skip = (page - 1) * perPage;

  const [items, total] = await Promise.all([
    Recipe.find({ owner: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .populate('category')
      .populate({ path: 'ingredients.id', select: 'name' })
      .lean(),
    Recipe.countDocuments({ owner: userId }),
  ]);

  const paginationData = calculatePaginationData(total, perPage, page);

  return { data: items, ...paginationData };
};
