/**
 * index.js
 * --------
 * CropGuard API server.
 *
 *   npm run dev     start with auto-reload on http://localhost:5000
 *   npm start       start normally
 *   npm run seed    copy the disease/pest library into MongoDB
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { connectDB, isDbConnected } from './config/db.js';
import analyzeRoutes from './routes/analyze.js';
import libraryRoutes from './routes/library.js';
import historyRoutes from './routes/history.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
// Thumbnails are small data URLs, so allow a slightly larger JSON body.
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check - useful when deploying.
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    storage: isDbConnected() ? 'mongodb' : 'memory',
    aiProvider: process.env.AI_PROVIDER || 'mock',
    time: new Date().toISOString()
  });
});

app.use('/api/analyze', analyzeRoutes);
app.use('/api', libraryRoutes);        // /api/diseases, /api/pests, /api/library
app.use('/api/history', historyRoutes);

app.use(notFound);
app.use(errorHandler);

await connectDB();

app.listen(PORT, () => {
  console.log(`\n  CropGuard API running at http://localhost:${PORT}`);
  console.log(`  Analysis engine: ${process.env.AI_PROVIDER || 'mock'}`);
  console.log(`  Storage: ${isDbConnected() ? 'MongoDB' : 'in-memory'}\n`);
});
