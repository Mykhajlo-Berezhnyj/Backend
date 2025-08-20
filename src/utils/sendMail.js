import createHttpError from 'http-errors';
import { config } from '../config.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: Number(config.smtp.port),
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

export const sendMail = async (option) => {
  try {
    await transporter.sendMail(option);
  } catch (error) {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
