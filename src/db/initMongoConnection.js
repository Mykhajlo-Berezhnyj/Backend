import mongoose from "mongoose";
import { MONGODB_URI } from "../config.js";

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
};
