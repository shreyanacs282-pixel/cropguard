/**
 * errorHandler.js
 * ---------------
 * Every failure leaves through here, so the React app always receives
 * { success: false, message } and can show one clear line to the farmer.
 */

export function notFound(req, res) {
  res.status(404).json({ success: false, message: `No route for ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.status || (err.code === 'LIMIT_FILE_SIZE' ? 400 : 500);
  const message =
    err.code === 'LIMIT_FILE_SIZE'
      ? 'That image is larger than 8 MB. Take the photo at a smaller size.'
      : err.message || 'Something went wrong on the server.';

  if (status >= 500) console.error('[error]', err);
  res.status(status).json({ success: false, message });
}
