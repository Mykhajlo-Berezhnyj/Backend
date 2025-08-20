import { Ingredients } from "../db/models/ingredients.js";

export const getIngredients = async () => {
  const ingredients = await Ingredients.find();
  return ingredients;
};
