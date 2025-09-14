import { addOrder, confirmOrder } from '../services/order.js';

export const addOrderController = async (req, res) => {
  const newOrder = await addOrder(req.body);
  res.status(201).json({
    status: 201,
    message:
      'Successfully created new order! Confirm link email has been successfully sent.',
    data: newOrder,
  });
};

export const confirmOrderController = async (req, res) => {
  const order = await confirmOrder(req.body);

  if (order.alreadyConfirmed) {
    return res.json({
      message: 'Order was already confirmed',
      order,
    });
  }

  res.json({
    message: 'Order confirmed successfully',
    order,
  });
};
