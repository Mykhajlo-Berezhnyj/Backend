import { Recipe } from "../db/models/recipes.js"; 
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getOwn = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage ?? req.query.limit) || 12;
    const skip = (page - 1) * perPage;

    const [items, total] = await Promise.all([
      Recipe.find({ owner: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage)
        .select("title description thumb time calories createdAt"),
      Recipe.countDocuments({ owner: req.user._id }),
    ]);

    const pagination = calculatePaginationData(total, page, perPage);

    res.status(200).json({
      status: 200,
      message: "Successfully fetched your recipes",
      data: items,
      ...pagination, 
    });
  } catch (err) {
    next(err);
  }
};