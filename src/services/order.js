import { Order } from "../db/models/order.js";

export const addOrder = async (payload) => {
    return await Order.create(payload);
  };