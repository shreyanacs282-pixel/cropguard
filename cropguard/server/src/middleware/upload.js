/**
 * upload.js
 * ---------
 * Multer set up to keep the image in memory rather than writing it to disk.
 * The buffer goes straight to the model and is then discarded, so no photo
 * of a farmer's field is ever stored on the server.
 */

import multer from 'multer';
import { ALLOWED_TYPES, MAX_BYTES } from '../services/imagePreprocess.js';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_BYTES, files: 1 },
  fileFilter(req, file, cb) {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      return cb(new Error('Only JPG, PNG and WEBP images are supported.'));
    }
    cb(null, true);
  }
});
