# CropGuard API reference

Base URL in development: `http://localhost:5000`

Every response has the same envelope:

```json
{ "success": true,  "data": ... }
{ "success": false, "message": "one clear sentence" }
```

---

## POST /api/analyze

The main endpoint. Send one image, get a full diagnosis.

**Content type:** `multipart/form-data`

| Field | Type | Required | Notes |
|---|---|---|---|
| `image` | file | yes | JPG, PNG or WEBP, up to 8 MB |
| `crop` | text | no | What the farmer thinks the crop is; improves the result |
| `stage` | text | no | Growth stage |
| `location` | text | no | Village or district, stored with the record |
| `save` | text | no | `"true"` writes the result into history |
| `thumbnail` | text | no | Small data URL used by history cards |

**Response:** see `sample-data/sample-analyze-response.json`.

Key fields: `crop`, `detection`, `detectionKey`, `type` (`disease` / `pest` /
`healthy`), `confidence` (0-100), `severity` (`Low` / `Medium` / `High`),
`severityScore` (0-100), `symptoms[]`, `recommendations{immediate, cultural,
biological, chemical, preventive}`, `expertAdvice`.

The image is held in memory only and is never written to disk.

---

## GET /api/diseases
## GET /api/pests
## GET /api/library

The Disease & Pest Library. `/api/library` returns both types.

| Query | Example | Effect |
|---|---|---|
| `search` | `?search=tomato` | Matches name, pathogen, crops and symptoms |
| `crop` | `?crop=rice` | Only entries affecting that crop |

## GET /api/library/:key

One entry, e.g. `/api/library/early-blight`.

---

## GET /api/history

| Query | Default | Effect |
|---|---|---|
| `limit` | 50 | How many records |
| `type` | - | `disease`, `pest` or `healthy` |
| `crop` | - | Partial crop name match |

## POST /api/history

Save a record by hand. `crop` and `detection` are required; everything else
has a sensible default.

## GET /api/history/stats

The dashboard numbers: `total`, `healthy`, `diseases`, `pests`,
`highSeverity`, `averageConfidence`, `bySeverity`, `topCrops`, `recent`,
and `storage` (`mongodb` or `memory`).

## DELETE /api/history/:id

Remove one record.

---

## GET /api/health

Returns the storage backend and the active AI provider. Useful for
deployment checks.
