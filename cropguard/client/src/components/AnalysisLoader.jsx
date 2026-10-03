import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { LeafIcon } from './Icons.jsx';

/**
 * The loading screen shown while /api/analyze is running.
 * The steps are cosmetic, but they tell the farmer the app is working and
 * roughly what it is doing.
 */
export default function AnalysisLoader() {
  const { t } = useI18n();
  const steps = [t('analyze.loading1'), t('analyze.loading2'), t('analyze.loading3'), t('analyze.loading4')];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 900);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <div className="card-pad text-center">
      <div className="relative mx-auto h-24 w-24">
        <span className="absolute inset-0 animate-ping rounded-full bg-leaf-200 opacity-60" />
        <span className="absolute inset-2 rounded-full bg-leaf-100" />
        <LeafIcon className="absolute inset-0 m-auto h-11 w-11 animate-pulse text-leaf-600" />
      </div>

      <p className="mt-5 text-lg font-semibold text-leaf-900">{t('analyze.analyzing')}</p>

      <ol className="mx-auto mt-5 max-w-sm space-y-2 text-left">
        {steps.map((s, i) => (
          <li key={s} className={`flex items-center gap-3 text-sm ${i <= step ? 'text-leaf-800' : 'text-soil-300'}`}>
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${i < step ? 'bg-leaf-600' : i === step ? 'bg-leaf-400 animate-pulse' : 'bg-soil-100'}`} />
            {s}
          </li>
        ))}
      </ol>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-leaf-50">
        <div
          className="h-full rounded-full bg-leaf-500 transition-all duration-700"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
