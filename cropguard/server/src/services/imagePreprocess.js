/**
 * imagePreprocess.js
 * ------------------
 * Everything that happens to the image BEFORE it reaches the model.
 *
 * Right now it validates the upload and reports basic facts about it.
 * When you connect a real CNN you will also resize to the model's input
 * size (commonly 224x224) and normalise the pixel values here - the
 * function signature will not change, so nothing else in the app breaks.
 *
 * To add real resizing:
 *   npm install sharp
 *   const buffer = await sharp(file.buffer).resize(224, 224).toBuffer();
 */

import crypto from 'node:crypto';

/** File types the API accepts. */
export const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/** Largest upload we accept, in bytes. */
export const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

/** Input size a typical image-classification model expects. */
export const MODEL_INPUT_SIZE = 224;

export class ImageError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

/**
 * Validate and prepare an uploaded image.
 *
 * @param {{buffer: Buffer, mimetype: string, size: number, originalname: string}} file
 * @returns {{buffer: Buffer, mimetype: string, sizeBytes: number, hash: string,
 *            fingerprint: number, targetSize: number, base64: string}}
 */
export function preprocessImage(file) {
  if (!file || !file.buffer) {
    throw new ImageError('No image was uploaded. Send a file in the "image" field.');
  }
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    throw new ImageError('Only JPG, PNG and WEBP images are supported.');
  }
  if (file.size > MAX_BYTES) {
    throw new ImageError('That image is larger than 8 MB. Take the photo at a smaller size.');
  }

  // A stable fingerprint of the image bytes. The mock model uses it so the
  // same photo always returns the same result during a demo.
  const hash = crypto.createHash('sha256').update(file.buffer).digest('hex');
  const fingerprint = parseInt(hash.slice(0, 8), 16) >>> 0; // keep it unsigned

  return {
    buffer: file.buffer,
    mimetype: file.mimetype,
    sizeBytes: file.size,
    hash,
    fingerprint,
    targetSize: MODEL_INPUT_SIZE,
    // Handy for sending to a hosted model API that accepts base64.
    base64: file.buffer.toString('base64')
  };
}
