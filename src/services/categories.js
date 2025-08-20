import { Category } from "../db/models/categories.js";

export const getCategories = async () => {
  const data = await Category.find();
  return data;
};
