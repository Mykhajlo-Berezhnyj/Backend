import { Area } from "../db/models/area.js";

export const getArea = async () => {
  const data = await Area.find();
  return data;
};
