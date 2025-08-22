import createHttpError from "http-errors";
import {
  addOwnRecipes,
  deleteFavoriteRecipeById,
} from "../services/recipes.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";

export const deleteFavoriteRecipeByIdController = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    if (!recipeId) return next(createHttpError(400, "Missing recipeId"));

    const user = await deleteFavoriteRecipeById(recipeId, req.user._id);
    if (!user) return next(createHttpError(404, "User not found"));

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const { ENABLE_CLOUDINARY } = process.env;
export const addOwnRecipeController = async (req, res) => {
  let thumb = null;

  if (ENABLE_CLOUDINARY === "true") {
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
    message: "Successfully created new recire!",
    data: newRecipes,
  });
};
