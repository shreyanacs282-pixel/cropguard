/**
 * Analysis.js
 * -----------
 * One saved detection. This is the "history" collection.
 */

import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema(
  {
    crop:          { type: String, required: true },
    detection:     { type: String, required: true },
    detectionKey:  { type: String, required: true },
    type:          { type: String, enum: ['disease', 'pest', 'healthy'], required: true },
    pathogen:      { type: String, default: '' },
    confidence:    { type: Number, min: 0, max: 100, required: true },
    severity:      { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    severityScore: { type: Number, min: 0, max: 100, default: 0 },
    symptoms:      { type: [String], default: [] },
    summary:       { type: String, default: '' },
    recommendations: {
      immediate:  { type: [String], default: [] },
      cultural:   { type: [String], default: [] },
      biological: { type: [String], default: [] },
      chemical:   { type: [String], default: [] },
      preventive: { type: [String], default: [] }
    },
    expertAdvice:  { type: String, default: '' },
    // Small JPEG data URL of the photo, so history can show a thumbnail.
    thumbnail:     { type: String, default: '' },
    imageHash:     { type: String, default: '', index: true },
    notes:         { type: String, default: '' },
    location:      { type: String, default: '' },
    source:        { type: String, default: 'mock-model' }
  },
  { timestamps: true }
);

export const Analysis = mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema);
