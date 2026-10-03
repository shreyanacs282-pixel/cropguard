/**
 * historyStore.js
 * ---------------
 * One place that reads and writes detection history.
 *
 * It uses MongoDB when a database is connected and a plain array when it is
 * not, so the routes never have to care which one is active.
 */

import { randomUUID } from 'node:crypto';
import { isDbConnected } from '../config/db.js';
import { Analysis } from '../models/Analysis.js';

/** In-memory fallback. Newest first. Cleared when the server restarts. */
const memory = [];
const MEMORY_LIMIT = 200;

export async function addRecord(data) {
  if (isDbConnected()) {
    const doc = await Analysis.create(data);
    return doc.toObject();
  }
  const record = { _id: randomUUID(), createdAt: new Date().toISOString(), ...data };
  memory.unshift(record);
  if (memory.length > MEMORY_LIMIT) memory.pop();
  return record;
}

export async function listRecords({ limit = 50, type, crop } = {}) {
  if (isDbConnected()) {
    const query = {};
    if (type) query.type = type;
    if (crop) query.crop = new RegExp(crop, 'i');
    return Analysis.find(query).sort({ createdAt: -1 }).limit(Number(limit)).lean();
  }
  return memory
    .filter((r) => (!type || r.type === type) && (!crop || r.crop.toLowerCase().includes(String(crop).toLowerCase())))
    .slice(0, Number(limit));
}

export async function getRecord(id) {
  if (isDbConnected()) return Analysis.findById(id).lean();
  return memory.find((r) => r._id === id) || null;
}

export async function deleteRecord(id) {
  if (isDbConnected()) {
    const res = await Analysis.findByIdAndDelete(id);
    return Boolean(res);
  }
  const i = memory.findIndex((r) => r._id === id);
  if (i === -1) return false;
  memory.splice(i, 1);
  return true;
}

/** Numbers for the dashboard cards. */
export async function getStats() {
  const records = await listRecords({ limit: 1000 });

  const byCrop = {};
  const bySeverity = { Low: 0, Medium: 0, High: 0 };
  for (const r of records) {
    byCrop[r.crop] = (byCrop[r.crop] || 0) + 1;
    if (bySeverity[r.severity] !== undefined) bySeverity[r.severity] += 1;
  }

  return {
    total: records.length,
    healthy: records.filter((r) => r.type === 'healthy').length,
    diseases: records.filter((r) => r.type === 'disease').length,
    pests: records.filter((r) => r.type === 'pest').length,
    highSeverity: records.filter((r) => r.severity === 'High').length,
    averageConfidence: records.length
      ? Math.round(records.reduce((sum, r) => sum + (r.confidence || 0), 0) / records.length)
      : 0,
    bySeverity,
    topCrops: Object.entries(byCrop)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([crop, count]) => ({ crop, count })),
    recent: records.slice(0, 5),
    storage: isDbConnected() ? 'mongodb' : 'memory'
  };
}
