import { Schema, model } from "mongoose";

export const areaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: false, versionKey: false, strict: "throw" }
);

export const Area = model("Area", areaSchema);
