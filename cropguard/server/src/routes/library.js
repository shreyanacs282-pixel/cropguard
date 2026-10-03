/**
 * GET /api/diseases
 * GET /api/pests
 * GET /api/library         (both, plus ?search= and ?crop=)
 * GET /api/library/:key    (one entry)
 *
 * Reads from MongoDB when it is connected, and from src/data/library.js
 * when it is not, so the library always works.
 */

import { Router } from 'express';
import { LIBRARY } from '../data/library.js';
import { LibraryEntry } from '../models/LibraryEntry.js';
import { isDbConnected } from '../config/db.js';

const router = Router();

async function loadAll() {
  if (isDbConnected()) {
    const docs = await LibraryEntry.find().lean();
    if (docs.length) return docs;
  }
  return LIBRARY;
}

function filterEntries(entries, { type, search, crop }) {
  let out = entries;
  if (type) out = out.filter((e) => e.type === type);
  if (crop) {
    const c = String(crop).toLowerCase();
    out = out.filter((e) => e.affectedCrops.some((x) => x.toLowerCase().includes(c)));
  }
  if (search) {
    const q = String(search).toLowerCase();
    out = out.filter((e) =>
      [e.name, e.pathogen, e.summary, ...e.affectedCrops, ...e.symptoms]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }
  return out;
}

router.get('/library', async (req, res, next) => {
  try {
    const all = await loadAll();
    const data = filterEntries(all, req.query).filter((e) => e.type !== 'healthy');
    res.json({ success: true, count: data.length, data });
  } catch (err) { next(err); }
});

router.get('/library/:key', async (req, res, next) => {
  try {
    const all = await loadAll();
    const entry = all.find((e) => e.key === req.params.key);
    if (!entry) return res.status(404).json({ success: false, message: 'No library entry with that key.' });
    res.json({ success: true, data: entry });
  } catch (err) { next(err); }
});

router.get('/diseases', async (req, res, next) => {
  try {
    const all = await loadAll();
    const data = filterEntries(all, { ...req.query, type: 'disease' });
    res.json({ success: true, count: data.length, data });
  } catch (err) { next(err); }
});

router.get('/pests', async (req, res, next) => {
  try {
    const all = await loadAll();
    const data = filterEntries(all, { ...req.query, type: 'pest' });
    res.json({ success: true, count: data.length, data });
  } catch (err) { next(err); }
});

export default router;
