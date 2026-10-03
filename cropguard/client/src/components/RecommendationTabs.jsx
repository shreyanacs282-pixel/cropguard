import { useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { AlertIcon, CheckIcon } from './Icons.jsx';

/**
 * The five management categories asked for in the brief.
 * Chemical control carries its own warning and is never shown as a cure.
 */
const TABS = [
  { key: 'immediate',  label: 'rec.immediate' },
  { key: 'cultural',   label: 'rec.cultural' },
  { key: 'biological', label: 'rec.biological' },
  { key: 'chemical',   label: 'rec.chemical' },
  { key: 'preventive', label: 'rec.preventive' }
];

export default function RecommendationTabs({ recommendations = {} }) {
  const { t } = useI18n();
  const [active, setActive] = useState('immediate');
  const items = recommendations[active] || [];

  return (
    <section className="card-pad">
      <h3 className="section-title mb-4 text-xl sm:text-2xl">{t('rec.title')}</h3>

      <div role="tablist" className="-mx-1 mb-5 flex flex-wrap gap-2 border-b border-leaf-100 pb-3">
        {TABS.map((tab) => {
          const selected = active === tab.key;
          const count = (recommendations[tab.key] || []).length;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(tab.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selected ? 'bg-leaf-700 text-white' : 'bg-leaf-50 text-leaf-800 hover:bg-leaf-100'
              }`}
            >
              {t(tab.label)}
              {count > 0 && (
                <span className={`ml-1.5 text-xs ${selected ? 'text-leaf-100' : 'text-soil-600'}`}>{count}</span>
              )}
            </button>
          );
        })}
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-soil-600">{t('rec.empty')}</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3">
              {active === 'immediate' ? (
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf-100 text-xs font-bold text-leaf-800">
                  {i + 1}
                </span>
              ) : (
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />
              )}
              <span className="text-[15px] leading-relaxed text-soil-900">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {active === 'chemical' && items.length > 0 && (
        <div className="mt-5 flex gap-3 rounded-xl border border-clay-400/40 bg-clay-100 p-4">
          <AlertIcon className="h-5 w-5 shrink-0 text-clay-600" />
          <p className="text-sm leading-relaxed text-soil-900">{t('rec.chemWarning')}</p>
        </div>
      )}
    </section>
  );
}
