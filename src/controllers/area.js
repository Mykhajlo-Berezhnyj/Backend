import { getArea } from "../services/area.js";

export const getAreaController = async (req, res) => {
  const area = await getArea();
  res.status(200).json({
    status: 200,
    message: "Successfully found category!",
    data: area,
  });
};
