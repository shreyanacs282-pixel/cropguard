/**
 * seed.js
 * -------
 * Copies the disease and pest library into MongoDB.
 *
 *   npm run seed
 *
 * Safe to run more than once - existing entries are updated, not duplicated.
 * Skip it entirely if you are running without a database.
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import { LIBRARY } from './library.js';
import { LibraryEntry } from '../models/LibraryEntry.js';

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.log('MONGODB_URI is empty. Nothing to seed - the app reads library.js directly.');
  process.exit(0);
}

await mongoose.connect(uri);

for (const entry of LIBRARY) {
  await LibraryEntry.updateOne({ key: entry.key }, { $set: entry }, { upsert: true });
  console.log('  seeded', entry.key);
}

console.log(`\nDone. ${LIBRARY.length} entries are in the library collection.`);
await mongoose.disconnect();
