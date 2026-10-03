# Deploying CropGuard

Two pieces to deploy: the React build (static files) and the Express API.

---

## Quickest path for a demo

| Piece | Where | Why |
|---|---|---|
| Frontend | Vercel or Netlify | Free, connects to GitHub, deploys on push |
| API | Render or Railway | Free tier, Node support, environment variables |
| Database | MongoDB Atlas | Free 512 MB cluster, no card needed |

---

## 1. Database - MongoDB Atlas

1. Create a free M0 cluster at mongodb.com/atlas.
2. Database Access: add a user with a password.
3. Network Access: allow `0.0.0.0/0` for a hackathon (tighten later).
4. Copy the connection string into the API's `MONGODB_URI`.
5. Run `npm run seed` once to load the library.

You can skip this entirely - without `MONGODB_URI` the API keeps history in
memory, which is fine for a live demo but resets on restart.

## 2. API - Render

* New Web Service, point at the repo.
* Root directory: `server`
* Build command: `npm install`
* Start command: `npm start`
* Environment variables: `PORT` (Render sets it), `CLIENT_ORIGIN` (your
  frontend URL), `MONGODB_URI`, `AI_PROVIDER`.

Check `https://your-api.onrender.com/api/health` before moving on.

> Free instances sleep after inactivity and take ~30 s to wake. Open the API
> URL a minute before you present.

## 3. Frontend - Vercel

* Root directory: `client`
* Build command: `npm run build`
* Output directory: `dist`
* Environment variable: `VITE_API_BASE=https://your-api.onrender.com`

`VITE_API_BASE` replaces the dev proxy in production. Set it, or every API
call will 404 against the static host.

Add a `client/vercel.json` so deep links work with client-side routing:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

On Netlify, use `client/public/_redirects` containing `/* /index.html 200`.

---

## Serving both from one Node process

Simpler to demo, one URL, no CORS:

```bash
npm run build --prefix client
```

Then add to `server/src/index.js`, just before the `notFound` middleware:

```js
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.join(dir, '../../client/dist');

app.use(express.static(clientDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDist, 'index.html'));
});
```

## Docker, if you prefer

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY client/package*.json ./client/
RUN npm ci --prefix client
COPY client ./client
RUN npm run build --prefix client
COPY server/package*.json ./server/
RUN npm ci --prefix server --omit=dev
COPY server ./server
ENV PORT=5000
EXPOSE 5000
CMD ["npm", "start", "--prefix", "server"]
```

## Before you present

- [ ] `/api/health` responds
- [ ] The library loads on the deployed frontend
- [ ] One analysis runs end to end on a phone, on mobile data, not office wifi
- [ ] The dashboard has a few records in it already
- [ ] All three languages render (Kannada and Hindi need no extra font on any
      current phone, but check on the actual demo device)
- [ ] `.env` is not committed
