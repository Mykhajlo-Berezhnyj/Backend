import mongoose from 'mongoose';

// import { User } from '../db/models/user';
// import { getArea } from '../services/area';
// import { getCategories } from '../services/categories';
// import { getIngredients } from '../services/ingredients';

const parseFilter = (input, validList, options = { multiple: false }) => {
  if (!input) return undefined;

  let values = [];

  if (Array.isArray(input)) {
    values = input;
  } else if (typeof input === 'string' && input.includes(',')) {
    values = input.split(',').map((v) => v.trim());
  } else if (typeof input === 'string') {
    values = [input];
  } else {
    return undefined;
  }

  const filtered = values.filter((v) => validList.includes(v));

  if (filtered.length === 0) return undefined;

  return options.multiple ? filtered : filtered[0];
};

export const parseFilterParams = (query, user) => {
  const validCategories = getCategories();
  const validIngredients = getIngredients();
  const validArea = getArea();

  const category = parseFilter(query.category, validCategories, {
    multiple: false,
  });
  const ingredients = parseFilter(query.ingredients, validIngredients, {
    multiple: true,
  });

  const area = parseFilter(query.area, validArea, { multiple: false });

  const filter = {};

  const { favoritesFilter } = query;
  const userFavorites = Array.isArray(user?.favorites) ? user.favorites : [];

  if (favoritesFilter === 'favorite') {
    filter._id = { $in: userFavorites };
  } else if (favoritesFilter === 'unfavorite') {
    filter._id = { $nin: userFavorites };
  }

  if (category) filter.category = category;
  if (ingredients) filter.ingredients = { $all: ingredients };
  if (area) filter.area = area;

  return filter;
};

export const parseParamsForRecipes = (query) => {
  // перевіряємо, чи рядок є валідним ObjectId
  const parseObjectId = (value) => {
    if (!value) return undefined;
    return mongoose.Types.ObjectId.isValid(value) ? value : undefined;
  };

  // обрізаємо рядки та ігноруємо порожні
  const parseString = (value) => {
    if (!value || typeof value !== 'string') return undefined;
    const trimmed = value.trim();
    return trimmed === '' ? undefined : trimmed;
  };

  return {
    category: parseObjectId(query.category),
    ingredient: parseObjectId(query.ingredient),
    search: parseString(query.search),
  };
};
