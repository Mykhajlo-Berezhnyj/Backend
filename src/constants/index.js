import path from 'node:path';

export const SORT_CONTACTS = {
  ASC: 'asc',
  DESC: 'desc',
};

export const TOKEN_LIFE_TIME = 2 * 60 * 60 * 1000;

export const THIRTY_DAY = 30 * 24 * 60 * 60 * 1000;

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'src', 'temp');

export const UPLOAD_DIR = path.join(process.cwd(), 'src', 'uploads');

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
