# Replacing the mock model with a real trained model

The mock classifier exists so the app runs end to end on day one. Swapping in
a real model touches **one file**: `server/src/services/aiService.js`.

Nothing in the React app, the database or the API contract changes.

---

## What the app needs from your model

Just three values:

```json
{ "label": "early-blight", "confidence": 0.94, "severityScore": 58 }
```

* `label` must match a `key` in `server/src/data/library.js`. That is how the
  symptoms and the five recommendation categories get attached to a
  prediction. Add a new key to `library.js` for every new class you train.
* `confidence` may be 0-1 or 0-100; the server handles both.
* `severityScore` is optional (0-100). If you have no severity model, leave it
  out and the server estimates it from confidence.

---

## Option A: a Python model behind an HTTP service (recommended)

Keep the model in Python, where PyTorch and TensorFlow live, and let Node talk
to it over HTTP. This is the easiest path and the one the code already
supports.

**1. Write a small FastAPI service**

```python
# model_service/main.py
import base64, io
from fastapi import FastAPI
from pydantic import BaseModel
from PIL import Image
import torch
from torchvision import transforms

app = FastAPI()
model = torch.load("cropguard_model.pt", map_location="cpu")
model.eval()

CLASSES = ["early-blight", "late-blight", "rice-blast", "healthy"]  # your label order

prep = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
])

class Req(BaseModel):
    image: str          # base64
    mimetype: str | None = None
    cropHint: str | None = None

@app.post("/predict")
def predict(req: Req):
    img = Image.open(io.BytesIO(base64.b64decode(req.image))).convert("RGB")
    with torch.no_grad():
        probs = torch.softmax(model(prep(img).unsqueeze(0))[0], dim=0)
    idx = int(probs.argmax())
    return {
        "label": CLASSES[idx],
        "confidence": float(probs[idx]),
        "severityScore": int(float(probs[idx]) * 80),   # replace with a real measure
    }
```

```bash
pip install fastapi uvicorn pillow torch torchvision
uvicorn main:app --port 8000
```

**2. Point CropGuard at it** - in `server/.env`:

```
AI_PROVIDER=http
MODEL_API_URL=http://localhost:8000/predict
```

Restart the server. That is the whole change.

---

## Option B: run the model inside Node

Use this if you exported to ONNX or TensorFlow.js and want one process.

```bash
npm install onnxruntime-node sharp --prefix server
```

Then add a third provider in `aiService.js`:

```js
import ort from 'onnxruntime-node';
import sharp from 'sharp';

const session = await ort.InferenceSession.create('./model/cropguard.onnx');
const CLASSES = ['early-blight', 'late-blight', 'rice-blast', 'healthy'];

async function onnxPredict(processed, { crop } = {}) {
  const { data } = await sharp(processed.buffer)
    .resize(224, 224).removeAlpha().raw().toBuffer({ resolveWithObject: true });

  // HWC uint8 -> CHW float32, normalised
  const f = new Float32Array(3 * 224 * 224);
  const mean = [0.485, 0.456, 0.406], std = [0.229, 0.224, 0.225];
  for (let i = 0; i < 224 * 224; i++)
    for (let c = 0; c < 3; c++)
      f[c * 224 * 224 + i] = (data[i * 3 + c] / 255 - mean[c]) / std[c];

  const out = await session.run({ input: new ort.Tensor('float32', f, [1, 3, 224, 224]) });
  const logits = Array.from(Object.values(out)[0].data);
  const max = Math.max(...logits);
  const exps = logits.map((v) => Math.exp(v - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map((v) => v / sum);
  const idx = probs.indexOf(Math.max(...probs));

  return buildResult({ key: CLASSES[idx], confidence: probs[idx] * 100,
                       severityScore: probs[idx] * 80, crop, source: 'onnx-model' });
}
```

Register it in the `analyzeImage` switch and set `AI_PROVIDER=onnx`.

---

## Training the model

1. **Data.** The PlantVillage dataset (Kaggle, ~54,000 labelled leaf images,
   38 classes) is the standard starting point. Field photos from your own
   district are worth far more than extra PlantVillage images, because
   PlantVillage is shot on a plain background and real photos are not.
2. **Model.** Fine-tune a pretrained backbone rather than training from
   scratch: ResNet-50, EfficientNet-B0 or MobileNetV3 if the model must run on
   a phone. Freeze the backbone for the first few epochs, then unfreeze.
3. **Augmentation.** Random crop, flip, rotation, and heavy colour jitter.
   Colour jitter matters most - farmers shoot in every kind of light.
4. **Split.** Split by *source image*, not by augmented copy, or your accuracy
   will look far better than it is.
5. **Report.** Give a confusion matrix, not just accuracy. Lookalike pairs
   (early blight vs late blight, bacterial vs fungal leaf spot) are where the
   model will actually fail, and judges will ask.
6. **Severity.** A second head, or a simple ratio of lesion pixels to leaf
   pixels from a segmentation model, gives a far more honest severity score
   than deriving it from confidence.

## Rules that must survive the swap

* Never report a confidence the model did not produce.
* Keep the `healthy` class. A model that cannot say "nothing is wrong" will
  send farmers out to spray healthy fields.
* Keep the disclaimer on every result screen.
