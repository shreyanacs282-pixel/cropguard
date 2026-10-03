# CropGuard

**Early Detection and Management of Crop Diseases and Pest Infestations**

*Detect Early. Protect Crops. Grow Better.*

A farmer photographs an affected leaf. CropGuard identifies the crop, the
likely disease or pest, how confident it is, how severe the damage is, and
what to do about it - in English, Kannada or Hindi.

---

## What is in the box

* **React + Vite + Tailwind frontend** - mobile-first, camera capture, three
  languages, six pages
* **Node + Express API** - five endpoints, clean separation between routes and
  the model
* **MongoDB via Mongoose** - completely optional; the app runs without it
* **A mock AI service** - deterministic, so demos are repeatable, and built to
  be replaced by a real model by editing one file
* **A 15-entry disease and pest library** - real symptoms, causes, prevention
  and management for common Indian crops

---

## Run it

Needs Node 18 or newer. MongoDB is optional.

```bash
git clone <your-repo-url> cropguard
cd cropguard

# install both halves
npm run install:all

# backend config
cp server/.env.example server/.env      # works as-is; leave MONGODB_URI blank

# start the API and the web app together
npm install          # for concurrently
npm run dev
```

* Web app: http://localhost:5173
* API: http://localhost:5000
* Health check: http://localhost:5000/api/health

Prefer two terminals?

```bash
npm run dev:server    # terminal 1
npm run dev:client    # terminal 2
```

### With MongoDB

```bash
# server/.env
MONGODB_URI=mongodb://127.0.0.1:27017/cropguard
```

```bash
npm run seed    # loads the disease and pest library into the database
```

Without it, history lives in memory and resets when the server restarts -
which is perfectly fine for a demo.

---

## Folder structure

```
cropguard/
├── package.json                 # runs both halves together
├── README.md
│
├── server/                      # Node + Express API
│   ├── .env.example
│   └── src/
│       ├── index.js             # app entry point
│       ├── config/db.js         # optional MongoDB connection
│       ├── models/
│       │   ├── Analysis.js      # one saved detection
│       │   └── LibraryEntry.js  # one disease or pest
│       ├── routes/
│       │   ├── analyze.js       # POST /api/analyze
│       │   ├── library.js       # GET  /api/diseases, /api/pests, /api/library
│       │   └── history.js       # GET/POST/DELETE /api/history, /api/history/stats
│       ├── services/
│       │   ├── aiService.js     # <- THE ONLY FILE THE REAL MODEL TOUCHES
│       │   ├── imagePreprocess.js
│       │   └── historyStore.js  # MongoDB or in-memory, one interface
│       ├── middleware/
│       │   ├── upload.js        # multer, memory storage
│       │   └── errorHandler.js
│       └── data/
│           ├── library.js       # the 15 diseases and pests
│           └── seed.js          # npm run seed
│
├── client/                      # React + Vite + Tailwind
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js           # proxies /api to the server
│   ├── public/images/library/   # drop real photos here
│   └── src/
│       ├── main.jsx
│       ├── App.jsx              # routes
│       ├── index.css            # Tailwind + component classes
│       ├── api/client.js        # every fetch call lives here
│       ├── i18n/                # en.js, kn.js, hi.js + provider
│       ├── components/          # Navbar, ImageUploader, ResultCard, ...
│       └── pages/               # Home, Analyze, Library, Dashboard, History, About
│
├── docs/
│   ├── API.md                   # endpoint reference
│   ├── MODEL_INTEGRATION.md     # swapping in a real trained model
│   └── DEPLOYMENT.md
│
└── sample-data/                 # test payloads and ready-made requests
```

---

## The flow

```
Farmer opens the site
   -> Analyze Crop
   -> uploads or captures a photo
   -> preview appears
   -> Analyze
   -> POST /api/analyze  (multipart image + optional crop, stage, location)
   -> image validated and prepared (services/imagePreprocess.js)
   -> model predicts a label and a confidence (services/aiService.js)
   -> label is matched to the library, which supplies symptoms and management
   -> crop, detection, confidence and severity shown on the result card
   -> five management tabs: immediate, cultural, biological, chemical, preventive
   -> result saved to history, dashboard counters update
```

---

## API

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/analyze` | Analyze one crop image |
| `GET` | `/api/diseases` | Disease library (`?search=`, `?crop=`) |
| `GET` | `/api/pests` | Pest library |
| `GET` | `/api/library` | Both, plus `/api/library/:key` |
| `GET` | `/api/history` | Saved detections |
| `POST` | `/api/history` | Save a detection |
| `GET` | `/api/history/stats` | Dashboard numbers |
| `DELETE` | `/api/history/:id` | Remove a record |
| `GET` | `/api/health` | Storage and AI provider in use |

Full details in [docs/API.md](docs/API.md). Ready-to-run requests in
`sample-data/test-requests.http`.

---

## Connecting your trained model

`server/src/services/aiService.js` is the only file that knows how a
prediction is made. Your model needs to return three things:

```json
{ "label": "early-blight", "confidence": 0.94, "severityScore": 58 }
```

`label` must match a `key` in `server/src/data/library.js` - that is how the
symptoms and recommendations get attached.

Then in `server/.env`:

```
AI_PROVIDER=http
MODEL_API_URL=http://localhost:8000/predict
```

A complete FastAPI example, an ONNX-in-Node alternative, and training notes
are in [docs/MODEL_INTEGRATION.md](docs/MODEL_INTEGRATION.md).

---

## Adding a language

1. Copy `client/src/i18n/en.js`, translate the values, keep every key.
2. Import it in `client/src/i18n/index.jsx` and add it to `LANGUAGES`.

Missing keys fall back to English, so a half-finished translation never
leaves a blank screen.

---

## Adding a disease or pest

Add one object to the array in `server/src/data/library.js`, following the
shape of the entries already there. It appears in the library immediately, and
becomes available to the model as soon as you train that class. Run
`npm run seed` if you are using MongoDB. Put a photo at
`client/public/images/library/<key>.jpg` - until you do, the card shows an
icon.

---

## Honest limits

* The bundled classifier is a **mock**. It is deterministic on the image
  bytes, which makes demos repeatable, but it does not look at the plant.
  Say so when you present - judges respect it, and the architecture is the
  point.
* Chemical recommendations are illustrative. The product label and the local
  agriculture department always override them.
* A single photo cannot see root disease, nutrient deficiency below ground,
  or how much of the field is affected. The app tells farmers to walk the
  field and says when to call a human.

> AI-based detection is an assistance tool and may not always be accurate. For
> serious crop damage or uncertain results, consult a qualified agricultural
> expert. Follow local agricultural recommendations and product labels before
> applying any treatment.

---

## Deploying

Vercel for the frontend, Render for the API, MongoDB Atlas for the database -
all free tiers. Step by step in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md),
including a single-process option that serves both from one URL.
