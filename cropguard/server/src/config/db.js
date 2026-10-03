/**
 * db.js
 * -----
 * MongoDB connection, made optional on purpose.
 *
 * If MONGODB_URI is blank the server still runs and keeps history in memory.
 * That means a judge can clone the repo and run it without installing Mongo,
 * and you can turn the database on later by filling in one line of .env.
 */

import mongoose from 'mongoose';

let connected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log('[db] MONGODB_URI is empty - using the in-memory store.');
    console.log('[db] History will reset when the server restarts.');
    return false;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    connected = true;
    console.log('[db] Connected to MongoDB.');
    return true;
  } catch (err) {
    console.error('[db] Could not connect to MongoDB:', err.message);
    console.log('[db] Falling back to the in-memory store so the API still works.');
    return false;
  }
}

export function isDbConnected() {
  return connected && mongoose.connection.readyState === 1;
}
