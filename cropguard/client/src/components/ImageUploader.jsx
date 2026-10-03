import { useRef, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { CameraIcon, UploadIcon, XIcon } from './Icons.jsx';

/**
 * ImageUploader
 * -------------
 * Handles all three ways a farmer can give us a photo:
 *   - tapping the box (opens the gallery, or the camera on the camera button)
 *   - dragging a file onto the box on a desktop
 *   - the device camera, via capture="environment"
 *
 * It also makes a small thumbnail so history cards have a picture without
 * storing the full-size photo.
 *
 * @param {(file: File|null, previewUrl: string|null, thumbnail: string|null) => void} onChange
 */
export default function ImageUploader({ file, previewUrl, onChange, disabled }) {
  const { t } = useI18n();
  const galleryRef = useRef(null);
  const cameraRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  function makeThumbnail(f) {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(f);
      img.onload = () => {
        try {
          const scale = 200 / Math.max(img.width, img.height);
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        } catch {
          resolve(null);
        } finally {
          URL.revokeObjectURL(url);
        }
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  async function accept(f) {
    if (!f) return;
    if (!f.type.startsWith('image/')) {
      setError('Please choose an image file (JPG, PNG or WEBP).');
      return;
    }
    if (f.size > 8 * 1024 * 1024) {
      setError('That image is larger than 8 MB. Take the photo at a smaller size.');
      return;
    }
    setError('');
    const thumb = await makeThumbnail(f);
    onChange(f, URL.createObjectURL(f), thumb);
  }

  function clear() {
    setError('');
    if (galleryRef.current) galleryRef.current.value = '';
    if (cameraRef.current) cameraRef.current.value = '';
    onChange(null, null, null);
  }

  return (
    <div>
      {/* Two hidden inputs: one opens the gallery, one opens the camera. */}
      <input
        ref={galleryRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
        onChange={(e) => accept(e.target.files?.[0])}
      />
      <input
        ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden"
        onChange={(e) => accept(e.target.files?.[0])}
      />

      {!previewUrl ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); accept(e.dataTransfer.files?.[0]); }}
          className={`rounded-xl2 border-2 border-dashed p-6 text-center transition sm:p-10 ${
            dragOver ? 'border-leaf-500 bg-leaf-50' : 'border-leaf-200 bg-white'
          }`}
        >
          <CameraIcon className="mx-auto h-12 w-12 text-leaf-500" />
          <p className="mt-3 text-lg font-semibold text-leaf-900">{t('upload.cta')}</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-soil-600">{t('upload.drag')}</p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button type="button" className="btn-primary" disabled={disabled}
              onClick={() => cameraRef.current?.click()}>
              <CameraIcon className="h-5 w-5" /> {t('upload.camera')}
            </button>
            <button type="button" className="btn-outline" disabled={disabled}
              onClick={() => galleryRef.current?.click()}>
              <UploadIcon className="h-5 w-5" /> {t('upload.choose')}
            </button>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-xl2 border border-leaf-100 bg-leaf-50">
          <img src={previewUrl} alt="Selected crop" className="max-h-80 w-full object-cover" />
          <button
            type="button" onClick={clear} disabled={disabled}
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-sm font-medium text-white backdrop-blur"
          >
            <XIcon className="h-4 w-4" /> {t('upload.change')}
          </button>
          <p className="truncate px-4 py-2 text-xs text-soil-600">{file?.name}</p>
        </div>
      )}

      {error && <p className="mt-3 text-sm font-medium text-clay-600">{error}</p>}
    </div>
  );
}
