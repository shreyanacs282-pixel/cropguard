/**
 * POST /api/analyze
 * -----------------
 * The core of the app. Takes one image, returns a full diagnosis.
 *
 * Form fields (multipart/form-data):
 *   image  (file, required)  the crop photo
 *   crop   (text, optional)  what the farmer thinks the crop is
 *   stage  (text, optional)  growth stage
 *   location (text, optional)
 *   save   (text, optional)  "true" to write the result into history
 *   thumbnail (text, optional) small data URL for the history card
 */

import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { analyzeImage } from '../services/aiService.js';
import { addRecord } from '../services/historyStore.js';

const router = Router();

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please attach a crop image in the "image" field.' });
    }

    const result = await analyzeImage(req.file, {
      crop: req.body.crop,
      stage: req.body.stage
    });

    // Saving is opt-in so the farmer stays in control of what is stored.
    let saved = null;
    if (String(req.body.save) === 'true') {
      saved = await addRecord({
        crop: result.crop,
        detection: result.detection,
        detectionKey: result.detectionKey,
        type: result.type,
        pathogen: result.pathogen,
        confidence: result.confidence,
        severity: result.severity,
        severityScore: result.severityScore,
        symptoms: result.symptoms,
        summary: result.summary,
        recommendations: result.recommendations,
        expertAdvice: result.expertAdvice,
        thumbnail: req.body.thumbnail || '',
        imageHash: result.imageHash,
        location: req.body.location || '',
        source: result.source
      });
    }

    res.json({
      success: true,
      data: result,
      savedId: saved ? String(saved._id) : null,
      disclaimer:
        'AI-based detection is an assistance tool and may not always be accurate. For serious crop damage or uncertain results, consult a qualified agricultural expert. Follow local agricultural recommendations and product labels before applying any treatment.'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
