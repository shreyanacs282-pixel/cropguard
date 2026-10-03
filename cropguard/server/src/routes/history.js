/**
 * GET    /api/history        list saved detections (?limit= &type= &crop=)
 * POST   /api/history        save one detection
 * GET    /api/history/stats  dashboard numbers
 * GET    /api/history/:id    one record
 * DELETE /api/history/:id    remove one record
 */

import { Router } from 'express';
import { addRecord, listRecords, getRecord, deleteRecord, getStats } from '../services/historyStore.js';

const router = Router();

router.get('/stats', async (req, res, next) => {
  try {
    res.json({ success: true, data: await getStats() });
  } catch (err) { next(err); }
});

router.get('/', async (req, res, next) => {
  try {
    const data = await listRecords(req.query);
    res.json({ success: true, count: data.length, data });
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body || {};
    if (!body.crop || !body.detection) {
      return res.status(400).json({ success: false, message: 'crop and detection are required.' });
    }
    const saved = await addRecord({
      crop: body.crop,
      detection: body.detection,
      detectionKey: body.detectionKey || 'unknown',
      type: body.type || 'disease',
      pathogen: body.pathogen || '',
      confidence: Number(body.confidence) || 0,
      severity: body.severity || 'Low',
      severityScore: Number(body.severityScore) || 0,
      symptoms: body.symptoms || [],
      summary: body.summary || '',
      recommendations: body.recommendations || {},
      expertAdvice: body.expertAdvice || '',
      thumbnail: body.thumbnail || '',
      location: body.location || '',
      notes: body.notes || '',
      source: body.source || 'mock-model'
    });
    res.status(201).json({ success: true, data: saved });
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const record = await getRecord(req.params.id);
    if (!record) return res.status(404).json({ success: false, message: 'No record with that id.' });
    res.json({ success: true, data: record });
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const ok = await deleteRecord(req.params.id);
    if (!ok) return res.status(404).json({ success: false, message: 'No record with that id.' });
    res.json({ success: true });
  } catch (err) { next(err); }
});

export default router;
