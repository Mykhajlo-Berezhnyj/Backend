import { getCategories } from "../services/categories.js";

export const getCategoriesController = async (req, res) => {
  const ingredients = await getCategories();
  res.status(200).json({
    status: 200,
    message: "Successfully found ingredients!",
    data: ingredients,
  });
};
