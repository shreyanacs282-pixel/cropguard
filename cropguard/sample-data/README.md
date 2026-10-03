# Sample test data

| File | What it is |
|---|---|
| `sample-analyze-response.json` | Exactly what `POST /api/analyze` returns, so the frontend can be built or tested without the server. |
| `sample-history.json` | Three history records you can POST to `/api/history` to fill the dashboard for a demo. |
| `test-requests.http` | Every endpoint, ready to run. |

## Filling the dashboard before a demo

```bash
# with the server running
for i in 1 2 3; do
  curl -s -X POST http://localhost:5000/api/history \
    -H "Content-Type: application/json" \
    -d "$(node -e "console.log(JSON.stringify(require('./sample-history.json')[$i-1]))")" > /dev/null
done
```

## Test images

No crop photos are included, to keep the repository small and avoid licence
questions. For testing, any leaf photo works - the mock model is deterministic
on the image bytes, so the same photo always gives the same result.

For real test images, the PlantVillage dataset on Kaggle has around 54,000
labelled leaf photos across 14 crops and 38 classes, and is the usual starting
point for training the real model too.
