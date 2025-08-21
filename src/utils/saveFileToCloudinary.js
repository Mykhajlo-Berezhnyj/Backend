import cloudinary from "cloudinary";
import fs from "node:fs/promises";
import { config } from "../config.js";
import createHttpError from "http-errors";

cloudinary.v2.config({
  secure: true,
  cloud_name: config.cloudinary.name,
  api_key: config.cloudinary.key,
  api_secret: config.cloudinary.secret,
});

export const saveFileToCloudinary = async (file) => {
  try {
    if (!file?.path) {
      throw createHttpError(400, "File path is missing");
    }
    const response = await cloudinary.v2.uploader.upload(file.path, {
      folder: "recipes_photos",
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: "image",
    });
    await fs.unlink(file.path);
    return response.secure_url;
  } catch (error) {
    throw createHttpError(500, "File upload to Cloudinary failed", {
      cause: error,
    });
  }
};
