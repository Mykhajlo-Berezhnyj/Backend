import { Schema, model } from 'mongoose';

export const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    area: {
      type: Schema.Types.ObjectId,
      ref: 'Area',
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
    },
    time: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
    },
    ingredients: [
      {
        id: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
        name: { type: String },
        measure: { type: String, required: true },
      },
    ],
  },
  { timestamps: true, versionKey: false, strict: 'throw' },
);

export const Recipe = model('Recipe', recipeSchema);
