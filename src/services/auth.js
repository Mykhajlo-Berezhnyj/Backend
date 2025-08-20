import createHttpError from 'http-errors';
import { User } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import { Session } from '../db/models/Session.js';
import {
  FIFTEEN_MINUTES,
  // TEMPLATES_DIR,
  THIRTY_DAY,
} from '../constants/index.js';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
// import { sendMail } from '../utils/sendMail.js';
// import path from 'node:path';
// import fs from 'node:fs/promises';
// import handlebars from 'handlebars';

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (user)
    throw createHttpError(409, 'Conflict error', {
      data: {
        message: 'Email is already in use',
      },
    });

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  // await sendMail({
  //   from: config.smtp.from,
  //   to: payload.email,
  //   subject: 'Hello',
  //   html: `<p>Hello, ${payload.name}. Congratulation on your succesfull registration</p>`,
  // });

  return await User.create({ ...payload, password: encryptedPassword });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
  };
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) throw createHttpError(401, 'User not found');

  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) throw createHttpError(401, 'Unauthorized');

  await Session.deleteOne({ userId: user._id });

  const newSession = createSession();

  return await Session.create({
    ...newSession,
    userId: user._id,
  });
};

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (!session) throw createHttpError(401, 'Session not found');

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) throw createHttpError(401, 'Session expired');

  const newSession = createSession();

  await Session.deleteOne({ _id: sessionId, refreshToken });

  return await Session.create({
    userId: session.userId,
    ...newSession,
  });
};

// export const requestResetToken = async (email) => {
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw createHttpError(404, 'User not found');
//   }

//   // const expires = 5;

//   // const resetToken = jwt.sign(
//   //   {
//   //     sub: user._id,
//   //     email,
//   //   },
//   //   config.secret,
//   //   {
//   //     expiresIn: `${expires}m`,
//   //   },
//   // );

//   // const link = `${config.domain}/reset-pwd?token=${resetToken}`;

//   // const resetPasswordTemplatePath = path.join(
//   //   TEMPLATES_DIR,
//   //   'reset-password-email.html',
//   // );

//   // const templateSource = await fs.readFile(resetPasswordTemplatePath, 'utf-8');

//   // const template = handlebars.compile(templateSource);

//   // const html = template({
//   //   name: user.name,
//   //   link: link,
//   //   expires,
//   // });

//   // await sendMail({
//   //   from: config.smtp.from,
//   //   to: email,
//   //   subject: 'Reset your password',
//   //   html,
//   // });
// };

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, config.secret);
  } catch (err) {
    if (err instanceof Error) {
      throw createHttpError(401, 'Unauthorized', {
        data: { message: err.message },
      });
    }
    throw err;
  }

  const user = await User.findOne({
    email: entries.email,
    _id: entries.sub,
  });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await User.findOneAndUpdate(
    {
      _id: user._id,
    },
    { password: encryptedPassword },
  );
};
