import { Ingredients } from "../db/models/ingredients.js";

export const getIngredients = async () => {
  const data = await Ingredients.find();
  return data;
};
