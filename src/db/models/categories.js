import { model, Schema } from 'mongoose';

export const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: false, versionKey: false },
);

export const Category = model('Category', categoriesSchema);
