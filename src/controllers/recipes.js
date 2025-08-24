import createHttpError from 'http-errors';
import { getUserRecipes } from "../services/recipes.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import {
  getRecipeById,
  deleteFavoriteRecipeById,
  getAllRecipes,
  addFavoriteRecipe,
  getFavoriteRecipes,
  addOwnRecipes,
} from '../services/recipes.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseParamsForRecipes } from '../utils/parseFilterParams.js';

export const getAllRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { category, ingredient, search } = parseParamsForRecipes(req.query);

  const recipes = await getAllRecipes({
    page,
    perPage,
    category,
    ingredient,
    search,
  });

  res.json({
    status: 200,
    message: 'Recipes retrieved successfully',
    data: recipes,
  });
};

export const getRecipeByIdController = async (req, res, next) => {
  const { recipeId } = req.params;

  const recipe = await getRecipeById(recipeId);

  if (!recipe) {
    return next(createHttpError(404, 'Recipe not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found recipe with id ${recipeId}`,
    data: recipe,
  });
};

export const addToFavoriteController = async (req, res) => {
  const userId = req.user._id;
  const { recipeId } = req.params;

  const user = await addFavoriteRecipe(recipeId, userId);

  res.status(201).json({
    status: 201,
    message: 'Recipe added to favorites',
    data: user.favorites,
  });
};

export const deleteFavoriteRecipeByIdController = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    if (!recipeId) return next(createHttpError(400, 'Missing recipeId'));

    const user = await deleteFavoriteRecipeById(recipeId, req.user._id);
    if (!user) return next(createHttpError(404, 'User not found'));

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const { ENABLE_CLOUDINARY } = process.env;
export const addOwnRecipeController = async (req, res) => {
  let thumb = null;

  if (ENABLE_CLOUDINARY === 'true') {
    const result = await saveFileToCloudinary(req.file);
    thumb = result;
  } else {
    const result = await saveFileToUploadDir(req.file);
    thumb = result;
  }

  const newRecipes = await addOwnRecipes({
    ...req.body,
    thumb,
    owner: req.user.id,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created new recire!',
    data: newRecipes,
  });
};

export const getFavoriteRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const favoriteRecipes = await getFavoriteRecipes(req.user._id, {
    page,
    perPage,
  });

  if (!favoriteRecipes || favoriteRecipes.length === 0) {
    return res.status(404).json({
      status: 404,
      message: 'No favorites found',
      data: [],
    });
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully received favorites list',
    data: favoriteRecipes,
  });
};
export const getMy = async (req, res, next) => {
  try {
    const page  = Number(req.query.page) || 1;
    const limit = Number(req.query.limit ?? req.query.perPage) || 12;

    const { items, total, perPage } = await getUserRecipes(req.user._id, {
      page,
      perPage: limit,
    });

    const pagination = calculatePaginationData(total, page, perPage);

   res.status(200).json({
    status: 200,
    message: "Successfully fetched your recipes",
    data: {
      data: items,         
      page: pagination.page,
      perPage: pagination.perPage,
      totalItems: pagination.totalItems,
      totalPages: pagination.totalPages,
      hasPreviousPage: pagination.hasPreviousPage,
      hasNextPage: pagination.hasNextPage,
  },
});
  } catch (err) {
    next(err);
  }
};
