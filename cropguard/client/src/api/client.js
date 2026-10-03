/**
 * api/client.js
 * -------------
 * Every call to the backend lives here, so there is one place to change
 * if the API moves. In development Vite proxies /api to localhost:5000.
 */

const BASE = import.meta.env.VITE_API_BASE || '';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options);
  let body;
  try {
    body = await res.json();
  } catch {
    throw new Error('The server sent a reply the app could not read.');
  }
  if (!res.ok || body.success === false) {
    throw new Error(body.message || 'The request failed. Please try again.');
  }
  return body;
}

/**
 * POST /api/analyze - send one image and get a full diagnosis back.
 * @param {File} image
 * @param {{crop?:string, stage?:string, location?:string, save?:boolean, thumbnail?:string}} meta
 */
export async function analyzeCrop(image, meta = {}) {
  const form = new FormData();
  form.append('image', image);
  if (meta.crop) form.append('crop', meta.crop);
  if (meta.stage) form.append('stage', meta.stage);
  if (meta.location) form.append('location', meta.location);
  if (meta.thumbnail) form.append('thumbnail', meta.thumbnail);
  form.append('save', meta.save ? 'true' : 'false');

  const body = await request('/api/analyze', { method: 'POST', body: form });
  return body.data;
}

export async function getLibrary(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const body = await request(`/api/library${qs ? `?${qs}` : ''}`);
  return body.data;
}

export async function getDiseases(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const body = await request(`/api/diseases${qs ? `?${qs}` : ''}`);
  return body.data;
}

export async function getPests(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const body = await request(`/api/pests${qs ? `?${qs}` : ''}`);
  return body.data;
}

export async function getHistory(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const body = await request(`/api/history${qs ? `?${qs}` : ''}`);
  return body.data;
}

export async function saveAnalysis(record) {
  const body = await request('/api/history', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record)
  });
  return body.data;
}

export async function deleteAnalysis(id) {
  await request(`/api/history/${id}`, { method: 'DELETE' });
}

export async function getStats() {
  const body = await request('/api/history/stats');
  return body.data;
}
