import { Category } from "../db/models/categories.js";

export const getCategories = async () => {
  const ingredients = await Category.find();
  return ingredients;
};
