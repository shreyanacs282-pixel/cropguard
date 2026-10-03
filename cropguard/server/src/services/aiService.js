/**
 * aiService.js
 * ------------
 * The ONLY file that knows how a prediction is produced.
 *
 * Two providers are built in and chosen with AI_PROVIDER in .env:
 *
 *   mock  - the built-in demo classifier (no model needed)
 *   http  - POSTs the image to your own trained-model service
 *
 * Both return exactly the same object shape, so the routes, the database
 * and the React app never change when you swap one for the other.
 *
 * See docs/MODEL_INTEGRATION.md for the full swap instructions.
 */

import { LIBRARY, LIBRARY_BY_KEY } from '../data/library.js';
import { preprocessImage } from './imagePreprocess.js';

/* --------------------------------------------------------------------- *
 * Shared helpers
 * --------------------------------------------------------------------- */

/** Turn a confidence-weighted damage score into a severity band. */
export function toSeverity(score) {
  if (score < 34) return 'Low';
  if (score < 67) return 'Medium';
  return 'High';
}

/**
 * Build the full API result from a raw model prediction.
 * A real model only needs to give us { key, confidence, severityScore }.
 */
function buildResult({ key, confidence, severityScore, crop, source }) {
  const entry = LIBRARY_BY_KEY[key] || LIBRARY_BY_KEY['healthy'];
  const isHealthy = entry.type === 'healthy';

  return {
    crop: crop || entry.affectedCrops[0],
    detection: entry.name,
    detectionKey: entry.key,
    type: entry.type,                       // disease | pest | healthy
    pathogen: entry.pathogen,
    confidence: Math.round(confidence),
    severity: isHealthy ? 'Low' : toSeverity(severityScore),
    severityScore: isHealthy ? 0 : Math.round(severityScore),
    symptoms: entry.symptoms.slice(0, 4),
    summary: entry.summary,
    recommendations: {
      immediate: entry.management.immediate,
      cultural: entry.management.cultural,
      biological: entry.management.biological,
      chemical: isHealthy ? [] : entry.management.chemical,
      preventive: entry.prevention
    },
    expertAdvice: isHealthy
      ? 'Nothing to treat. Keep scouting weekly and record what you see.'
      : 'Contact your Krishi Vigyan Kendra or state agriculture officer if the affected area doubles within a week of treatment, if more than a quarter of the field is affected, or if you are unsure about this result.',
    source,                                 // "mock-model" | "http-model"
    analyzedAt: new Date().toISOString()
  };
}

/* --------------------------------------------------------------------- *
 * Provider 1: the built-in mock classifier
 * --------------------------------------------------------------------- */

const DEMO_KEYS = LIBRARY.filter((e) => e.type !== 'healthy').map((e) => e.key);

/**
 * A stand-in for a trained CNN.
 *
 * It is deterministic: the same image always produces the same result, so a
 * hackathon demo never surprises you. If the farmer named a crop, it picks a
 * detection that actually affects that crop.
 */
function mockPredict(processed, { crop } = {}) {
  const fp = processed.fingerprint;

  // Roughly one image in eight comes back healthy.
  const healthy = fp % 8 === 0;
  if (healthy) {
    return buildResult({
      key: 'healthy',
      confidence: 88 + (fp % 9),
      severityScore: 0,
      crop: crop || 'Unidentified crop',
      source: 'mock-model'
    });
  }

  // Prefer a detection that matches the crop the farmer typed.
  let pool = DEMO_KEYS;
  if (crop) {
    const wanted = String(crop).toLowerCase();
    const matching = DEMO_KEYS.filter((k) =>
      LIBRARY_BY_KEY[k].affectedCrops.some((c) => c.toLowerCase().includes(wanted) || wanted.includes(c.toLowerCase()))
    );
    if (matching.length) pool = matching;
  }

  const key = pool[fp % pool.length];
  const entry = LIBRARY_BY_KEY[key];

  return buildResult({
    key,
    // Plain division rather than bit shifts: JavaScript bitwise operators
    // work on signed 32-bit integers and would turn a large hash negative.
    confidence: 72 + (Math.floor(fp / 7) % 24),        // 72 - 95
    severityScore: 15 + (Math.floor(fp / 131) % 78),   // 15 - 92
    crop: crop || entry.affectedCrops[0],
    source: 'mock-model'
  });
}

/* --------------------------------------------------------------------- *
 * Provider 2: your own trained model, behind an HTTP endpoint
 * --------------------------------------------------------------------- */

/**
 * Expected response from MODEL_API_URL:
 *   { "label": "early-blight", "confidence": 0.94, "severityScore": 55 }
 *
 * `label` must match a `key` in data/library.js so the recommendations
 * can be looked up. See docs/MODEL_INTEGRATION.md.
 */
async function httpPredict(processed, { crop } = {}) {
  const url = process.env.MODEL_API_URL;
  if (!url) throw new Error('AI_PROVIDER=http but MODEL_API_URL is not set in .env');

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.MODEL_API_KEY ? { Authorization: `Bearer ${process.env.MODEL_API_KEY}` } : {})
    },
    body: JSON.stringify({
      image: processed.base64,
      mimetype: processed.mimetype,
      inputSize: processed.targetSize,
      cropHint: crop || null
    })
  });

  if (!res.ok) throw new Error(`Model service replied ${res.status}`);
  const data = await res.json();

  const confidence = data.confidence > 1 ? data.confidence : data.confidence * 100;
  return buildResult({
    key: data.label,
    confidence,
    severityScore: data.severityScore ?? confidence * 0.7,
    crop: data.crop || crop,
    source: 'http-model'
  });
}

/* --------------------------------------------------------------------- *
 * Public entry point - this is what the route calls
 * --------------------------------------------------------------------- */

export async function analyzeImage(file, context = {}) {
  const processed = preprocessImage(file);
  const provider = (process.env.AI_PROVIDER || 'mock').toLowerCase();

  const started = Date.now();
  const result = provider === 'http'
    ? await httpPredict(processed, context)
    : await mockPredict(processed, context);

  return {
    ...result,
    imageHash: processed.hash,
    imageSizeBytes: processed.sizeBytes,
    processingMs: Date.now() - started
  };
}
