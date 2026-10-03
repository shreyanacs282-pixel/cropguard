import { useI18n } from '../i18n/index.jsx';
import { AlertIcon } from './Icons.jsx';

/**
 * The AI safety notice. It appears under every result and in the footer,
 * because a farmer may act on a single screen without reading the rest.
 */
export default function Disclaimer({ compact = false }) {
  const { t } = useI18n();

  return (
    <div
      role="note"
      className={`flex gap-3 rounded-xl2 border border-harvest-400/40 bg-harvest-100 text-soil-900 ${
        compact ? 'p-3 text-xs' : 'p-4 text-sm'
      }`}
    >
      <AlertIcon className={compact ? 'h-4 w-4 shrink-0 text-harvest-600' : 'h-5 w-5 shrink-0 text-harvest-600'} />
      <p className="leading-relaxed">{t('common.disclaimer')}</p>
    </div>
  );
}
