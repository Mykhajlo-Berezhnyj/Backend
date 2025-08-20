import dotenv from 'dotenv';
import { getEnvVariable } from './utils/getEnvVariable.js';

dotenv.config();

export const config = {
  port: Number(getEnvVariable('PORT', 3000)),
  db: {
    user: getEnvVariable('MONGODB_USER'),
    pass: getEnvVariable('MONGODB_PASSWORD'),
    url: getEnvVariable('MONGODB_URL'),
    name: getEnvVariable('MONGODB_DB'),
  },
  // smtp: {
  //   host: getEnvVariable('SMTP_HOST'),
  //   port: getEnvVariable('SMTP_PORT'),
  //   user: getEnvVariable('SMTP_USER'),
  //   pass: getEnvVariable('SMTP_PASSWORD'),
  //   from: getEnvVariable('SMTP_FROM'),
  // },
  // cloudinary: {
  //   name: getEnvVariable('CLOUD_NAME'),
  //   key: getEnvVariable('API_KEY'),
  //   secret: getEnvVariable('API_SECRET'),
  //   enable: getEnvVariable('ENABLE_CLOUDINARY'),
  // },
  // domain: getEnvVariable('APP_DOMAIN'),
  // secret: getEnvVariable('JWT_SECRET'),
};

export const MONGODB_URI = `mongodb+srv://${config.db.user}:${config.db.pass}@${config.db.url}/${config.db.name}?retryWrites=true&w=majority`;
