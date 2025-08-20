import fs from 'node:fs/promises';
import path from 'node:path';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { config } from '../config.js';

export const saveFileToUploadDir = async (file) => {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.name),
    path.join(UPLOAD_DIR, file.name),
  );

  return `${config.domain}/uploads/${file.name}`;
};
