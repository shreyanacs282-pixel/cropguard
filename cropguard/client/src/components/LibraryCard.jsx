import { useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { LeafIcon, BugIcon } from './Icons.jsx';

/**
 * One entry in the Disease & Pest Library.
 * The image path is a placeholder - drop real photos into
 * client/public/images/library/ using the same file names.
 */
export default function LibraryCard({ entry }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const Icon = entry.type === 'pest' ? BugIcon : LeafIcon;

  const Section = ({ title, items }) =>
    items?.length ? (
      <div className="mt-4">
        <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-soil-600">{title}</h4>
        <ul className="space-y-1.5">
          {items.map((x, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-soil-900">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-leaf-400" />{x}
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  return (
    <article className="card overflow-hidden">
      {/* Image placeholder: shows a coloured panel until a real photo is added. */}
      <div className="flex h-36 items-center justify-center bg-leaf-50">
        {entry.image && !imgFailed ? (
          <img src={entry.image} alt={entry.name} onError={() => setImgFailed(true)}
               className="h-full w-full object-cover" />
        ) : (
          <Icon className="h-12 w-12 text-leaf-300" />
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-leaf-900">{entry.name}</h3>
            {entry.pathogen && <p className="text-xs italic text-soil-600">{entry.pathogen}</p>}
          </div>
          <span className={`badge shrink-0 text-xs ${entry.type === 'pest' ? 'bg-harvest-100 text-harvest-600' : 'bg-leaf-100 text-leaf-800'}`}>
            {entry.type === 'pest' ? t('library.pests') : t('library.diseases')}
          </span>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-soil-900">{entry.summary}</p>

        <p className="mt-3 text-xs text-soil-600">
          <span className="font-semibold">{t('library.affects')}: </span>
          {entry.affectedCrops.join(', ')}
        </p>

        {open && (
          <div className="mt-2 border-t border-leaf-100 pt-2">
            <Section title={t('library.symptoms')} items={entry.symptoms} />
            <Section title={t('library.causes')} items={entry.causes} />
            <Section title={t('library.prevention')} items={entry.prevention} />
            <Section title={t('library.management')} items={[
              ...(entry.management?.immediate || []),
              ...(entry.management?.cultural || []),
              ...(entry.management?.biological || [])
            ]} />
            {entry.management?.chemical?.length > 0 && (
              <div className="mt-4 rounded-xl border border-clay-400/40 bg-clay-100 p-3">
                <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-clay-600">
                  {t('rec.chemical')}
                </h4>
                <ul className="space-y-1.5">
                  {entry.management.chemical.map((x, i) => (
                    <li key={i} className="text-sm leading-relaxed text-soil-900">{x}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs leading-relaxed text-soil-600">{t('rec.chemWarning')}</p>
              </div>
            )}
          </div>
        )}

        <button type="button" onClick={() => setOpen((v) => !v)}
                className="btn-ghost mt-3 px-0 font-semibold">
          {open ? t('common.back') : t('library.readMore')}
        </button>
      </div>
    </article>
  );
}
