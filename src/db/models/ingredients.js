import { model, Schema } from "mongoose";

export const ingredientsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: false, versionKey: false }
);

export const Ingredients = model("Ingredient", ingredientsSchema);
