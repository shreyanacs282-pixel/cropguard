import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { getHistory, deleteAnalysis } from '../api/client.js';
import SeverityBadge from '../components/SeverityBadge.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { LeafIcon, XIcon } from '../components/Icons.jsx';

/** Detection history: a table on wide screens, cards on a phone. */
export default function History() {
  const { t } = useI18n();
  const [records, setRecords] = useState(null);
  const [error, setError] = useState('');

  function load() {
    getHistory({ limit: 100 }).then(setRecords).catch((e) => setError(e.message));
  }
  useEffect(load, []);

  async function remove(id) {
    if (!window.confirm(t('history.confirmDelete'))) return;
    try {
      await deleteAnalysis(id);
      setRecords((rs) => rs.filter((r) => r._id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  const fmt = (d) => new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

  if (error) return <div className="container-page py-12"><p className="text-clay-600">{error}</p></div>;
  if (!records) return <div className="container-page py-12"><p className="text-soil-600">{t('common.loading')}</p></div>;

  return (
    <div className="container-page py-8 sm:py-12">
      <h1 className="section-title">{t('history.title')}</h1>
      <p className="mt-2 text-soil-600">{t('history.subtitle')}</p>

      {records.length === 0 ? (
        <div className="mt-6">
          <EmptyState message={t('history.empty')} actionLabel={t('home.cta')} actionTo="/analyze" />
        </div>
      ) : (
        <>
          {/* Phone layout */}
          <div className="mt-6 grid gap-3 md:hidden">
            {records.map((r) => (
              <div key={r._id} className="card flex items-center gap-3 p-3">
                {r.thumbnail
                  ? <img src={r.thumbnail} alt="" className="h-14 w-14 rounded-lg object-cover" />
                  : <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-leaf-50">
                      <LeafIcon className="h-6 w-6 text-leaf-400" />
                    </span>}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-leaf-900">{r.detection}</p>
                  <p className="truncate text-sm text-soil-600">{r.crop} · {r.confidence}%</p>
                  <p className="text-xs text-soil-300">{fmt(r.createdAt)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <SeverityBadge level={r.severity} className="text-xs" />
                  <button type="button" onClick={() => remove(r._id)}
                          aria-label={t('history.delete')} className="text-soil-300 hover:text-clay-600">
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop layout */}
          <div className="card mt-6 hidden overflow-hidden md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-leaf-50 text-xs uppercase tracking-wide text-soil-600">
                <tr>
                  <th className="px-5 py-3 font-medium">{t('history.date')}</th>
                  <th className="px-5 py-3 font-medium">{t('history.crop')}</th>
                  <th className="px-5 py-3 font-medium">{t('history.detection')}</th>
                  <th className="px-5 py-3 font-medium">{t('history.confidence')}</th>
                  <th className="px-5 py-3 font-medium">{t('history.severity')}</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r._id} className="border-t border-leaf-50">
                    <td className="whitespace-nowrap px-5 py-3 text-soil-600">{fmt(r.createdAt)}</td>
                    <td className="px-5 py-3 text-soil-900">{r.crop}</td>
                    <td className="px-5 py-3 font-semibold text-leaf-900">{r.detection}</td>
                    <td className="px-5 py-3 tabular-nums text-soil-900">{r.confidence}%</td>
                    <td className="px-5 py-3"><SeverityBadge level={r.severity} className="text-xs" /></td>
                    <td className="px-5 py-3 text-right">
                      <button type="button" onClick={() => remove(r._id)}
                              className="text-soil-300 hover:text-clay-600" aria-label={t('history.delete')}>
                        <XIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
