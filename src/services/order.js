import { Order } from '../db/models/order.js';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { sendMail } from '../utils/sendMail.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';
import { TEMPLATES_DIR } from '../constants/index.js';

export const addOrder = async (payload) => {
  const order = await Order.create(payload);

  const expires = 24;

  const confirmOrderToken = jwt.sign(
    {
      sub: order._id,
      email: order.email,
    },
    config.secret,
    {
      expiresIn: `${expires}h`,
    },
  );

  const link = `${config.domain}/orders/${order.carId}/${order._id}?token=${confirmOrderToken}`;

  const confirmOrderTemplatePath = path.join(
    TEMPLATES_DIR,
    'confirm-order-email.html',
  );

  const templateSource = await fs.readFile(confirmOrderTemplatePath, 'utf-8');

  const template = handlebars.compile(templateSource);

  const html = template({
    email: order.email,
    name: order.name,
    orderId: order._id,
    carId: order.carId,
    bookingDate: order.bookingDate,
    orderDate: order.createdAt,
    link: link,
    expires,
  });

  await sendMail({
    from: config.smtp.from,
    to: order.email,
    subject: 'Confirm your orders',
    html,
  });
  return order;
};

export const confirmOrder = async (payload) => {
  const { token } = payload;
  const decoded = jwt.verify(token, config.secret);
  const orderId = decoded.sub;

  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  if (order.status === 'confirmed') {
    return { alreadyConfirmed: true };
  }

  order.isConfirmed = "true";
  await order.save();

  return order;

};
