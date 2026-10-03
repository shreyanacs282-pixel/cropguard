import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/index.jsx';
import { analyzeCrop } from '../api/client.js';
import ImageUploader from '../components/ImageUploader.jsx';
import AnalysisLoader from '../components/AnalysisLoader.jsx';
import ResultCard from '../components/ResultCard.jsx';
import RecommendationTabs from '../components/RecommendationTabs.jsx';
import Disclaimer from '../components/Disclaimer.jsx';
import { AlertIcon, CameraIcon } from '../components/Icons.jsx';

const CROPS = ['Tomato','Rice (paddy)','Wheat','Cotton','Chilli','Brinjal','Maize','Sugarcane',
               'Groundnut','Banana','Grapes','Mango','Onion','Potato','Soybean','Coffee'];

const STAGES = [
  { value: '',                     key: 'analyze.stage.none' },
  { value: 'Seedling / nursery',   key: 'analyze.stage.seedling' },
  { value: 'Vegetative',           key: 'analyze.stage.vegetative' },
  { value: 'Flowering',            key: 'analyze.stage.flowering' },
  { value: 'Fruiting / grain fill',key: 'analyze.stage.fruiting' },
  { value: 'Near harvest',         key: 'analyze.stage.harvest' }
];

/**
 * The full demo workflow lives on this page:
 * upload -> preview -> analyze -> result -> recommendations -> saved to history.
 */
export default function Analyze() {
  const { t } = useI18n();

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [crop, setCrop] = useState('');
  const [stage, setStage] = useState('');
  const [location, setLocation] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  function handleImage(f, url, thumb) {
    setFile(f);
    setPreviewUrl(url);
    setThumbnail(thumb);
    setResult(null);
    setError('');
  }

  async function handleAnalyze() {
    if (!file) { setError(t('analyze.errorNoImage')); return; }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      // save:true writes the result straight into history, matching the
      // demo workflow in the brief.
      const data = await analyzeCrop(file, { crop, stage, location, thumbnail, save: true });
      setResult(data);
    } catch (err) {
      setError(err.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setFile(null); setPreviewUrl(null); setThumbnail(null);
    setResult(null); setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <h1 className="section-title">{t('analyze.title')}</h1>
      <p className="mt-2 max-w-xl text-soil-600">{t('analyze.subtitle')}</p>

      {!result && !loading && (
        <div className="mt-6 space-y-5">
          <ImageUploader file={file} previewUrl={previewUrl} onChange={handleImage} disabled={loading} />

          <div className="card-pad grid gap-4 sm:grid-cols-3">
            <div>
              <label className="label" htmlFor="crop">{t('analyze.cropLabel')}</label>
              <input id="crop" list="crop-options" className="input" value={crop}
                     onChange={(e) => setCrop(e.target.value)}
                     placeholder={t('analyze.cropPlaceholder')} autoComplete="off" />
              <datalist id="crop-options">
                {CROPS.map((c) => <option key={c} value={c} />)}
              </datalist>
            </div>

            <div>
              <label className="label" htmlFor="stage">{t('analyze.stageLabel')}</label>
              <select id="stage" className="input" value={stage} onChange={(e) => setStage(e.target.value)}>
                {STAGES.map((s) => <option key={s.key} value={s.value}>{t(s.key)}</option>)}
              </select>
            </div>

            <div>
              <label className="label" htmlFor="location">{t('analyze.locationLabel')}</label>
              <input id="location" className="input" value={location}
                     onChange={(e) => setLocation(e.target.value)} autoComplete="off" />
            </div>

            <div className="sm:col-span-3">
              <button type="button" className="btn-primary w-full sm:w-auto" onClick={handleAnalyze} disabled={!file}>
                <CameraIcon className="h-5 w-5" /> {t('analyze.button')}
              </button>
            </div>
          </div>

          {error && (
            <p className="flex items-center gap-2 rounded-xl bg-clay-100 px-4 py-3 text-sm font-medium text-clay-600">
              <AlertIcon className="h-5 w-5 shrink-0" /> {error}
            </p>
          )}

          <section className="card-pad">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-soil-600">
              {t('analyze.tipsTitle')}
            </h2>
            <ul className="space-y-2">
              {['analyze.tip1','analyze.tip2','analyze.tip3','analyze.tip4'].map((k) => (
                <li key={k} className="flex gap-3 text-[15px] leading-relaxed text-soil-900">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-leaf-500" />{t(k)}
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {loading && <div className="mt-6"><AnalysisLoader /></div>}

      {result && !loading && (
        <div className="mt-6 space-y-4">
          <ResultCard result={result} previewUrl={previewUrl} />
          <RecommendationTabs recommendations={result.recommendations} />
          <Disclaimer />

          <div className="flex flex-wrap gap-3">
            <button type="button" className="btn-outline" onClick={reset}>{t('analyze.newScan')}</button>
            <Link to="/history" className="btn-ghost">{t('nav.history')}</Link>
            <span className="badge bg-leaf-100 text-leaf-800">{t('analyze.saved')}</span>
          </div>
        </div>
      )}
    </div>
  );
}
