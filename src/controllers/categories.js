import { getCategories } from "../services/categories.js";

export const getCategoriesController = async (req, res) => {
  const category = await getCategories();
  res.status(200).json({
    status: 200,
    message: "Successfully found category!",
    data: category,
  });
};
