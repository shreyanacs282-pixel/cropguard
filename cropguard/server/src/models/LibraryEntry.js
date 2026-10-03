/**
 * LibraryEntry.js
 * ---------------
 * One disease or pest in the library collection.
 * Seeded from src/data/library.js by `npm run seed`.
 */

import mongoose from 'mongoose';

const libraryEntrySchema = new mongoose.Schema(
  {
    key:           { type: String, required: true, unique: true },
    name:          { type: String, required: true },
    type:          { type: String, enum: ['disease', 'pest', 'healthy'], required: true },
    pathogen:      { type: String, default: '' },
    affectedCrops: { type: [String], default: [] },
    image:         { type: String, default: '' },
    summary:       { type: String, default: '' },
    symptoms:      { type: [String], default: [] },
    causes:        { type: [String], default: [] },
    prevention:    { type: [String], default: [] },
    management: {
      immediate:  { type: [String], default: [] },
      cultural:   { type: [String], default: [] },
      biological: { type: [String], default: [] },
      chemical:   { type: [String], default: [] }
    }
  },
  { timestamps: true }
);

export const LibraryEntry =
  mongoose.models.LibraryEntry || mongoose.model('LibraryEntry', libraryEntrySchema);
