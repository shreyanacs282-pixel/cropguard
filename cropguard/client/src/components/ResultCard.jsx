import { useI18n } from '../i18n/index.jsx';
import SeverityBadge, { SEVERITY_STYLES } from './SeverityBadge.jsx';
import ConfidenceBar from './ConfidenceBar.jsx';
import { LeafIcon, BugIcon, CheckIcon, PhoneIcon } from './Icons.jsx';

/**
 * The visual result card: crop, detection, confidence, severity, symptoms.
 * This is the screen a farmer will look at longest, so it stays uncluttered.
 */
export default function ResultCard({ result, previewUrl }) {
  const { t } = useI18n();
  if (!result) return null;

  const healthy = result.type === 'healthy';
  const style = SEVERITY_STYLES[result.severity] || SEVERITY_STYLES.Low;
  const TypeIcon = healthy ? CheckIcon : result.type === 'pest' ? BugIcon : LeafIcon;

  return (
    <div className="space-y-4">
      <section className={`card overflow-hidden border-l-8 ${healthy ? 'border-l-leaf-500' : style.border}`}>
        <div className="grid gap-0 sm:grid-cols-[180px_1fr]">
          {previewUrl && (
            <img src={previewUrl} alt="Analyzed crop" className="h-40 w-full object-cover sm:h-full" />
          )}

          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge bg-leaf-50 text-leaf-800">
                <TypeIcon className="h-4 w-4" />
                {result.crop}
              </span>
              {!healthy && <SeverityBadge level={result.severity} />}
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-leaf-900 sm:text-3xl">
              {healthy ? t('result.healthy') : result.detection}
            </h2>
            {result.pathogen && !healthy && (
              <p className="mt-1 text-sm italic text-soil-600">{result.pathogen}</p>
            )}
            <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-soil-900">
              {healthy ? t('result.healthyText') : result.summary}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <ConfidenceBar value={result.confidence} label={t('result.confidence')} />
              {!healthy && (
                <ConfidenceBar
                  value={result.severityScore}
                  label={t('result.severity')}
                  colorClass={style.bar}
                />
              )}
            </div>

            {!healthy && (
              <p className="mt-3 text-sm text-soil-600">{t(`severity.${result.severity}.note`)}</p>
            )}
          </div>
        </div>
      </section>

      {result.symptoms?.length > 0 && (
        <section className="card-pad">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-soil-600">
            {t('result.symptoms')}
          </h3>
          <ul className="space-y-2">
            {result.symptoms.map((s, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-soil-900">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-leaf-500" />
                {s}
              </li>
            ))}
          </ul>
        </section>
      )}

      {result.expertAdvice && (
        <section className="card-pad bg-leaf-50/60">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-soil-600">
            <PhoneIcon className="h-4 w-4 text-leaf-600" /> {t('rec.expert')}
          </h3>
          <p className="text-[15px] leading-relaxed text-soil-900">{result.expertAdvice}</p>
        </section>
      )}
    </div>
  );
}
