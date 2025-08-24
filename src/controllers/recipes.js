// src/controllers/recipes.js (фрагмент)
import { getUserRecipes } from "../services/recipes.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getMy = async (req, res, next) => {
  try {
    const page  = Number(req.query.page) || 1;
    const limit = Number(req.query.limit ?? req.query.perPage) || 12;

    const { items, total, perPage } = await getUserRecipes(req.user._id, {
      page,
      limit,
      category: req.query.category,
      ingredient: req.query.ingredient,
      search: req.query.search,
    });

    const pagination = calculatePaginationData(total, page, perPage);

    return res.status(200).json({
      status: 200,
      message: "Successfully fetched your recipes",
      data: items,
      pagination,
    });
  } catch (err) {
    next(err);
  }
};