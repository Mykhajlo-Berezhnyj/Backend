import { addOrder } from '../services/order.js';

export const addOrderController = async (req, res) => {
  const newOrder = await addOrder(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created new order!',
    data: newOrder,
  });
};
