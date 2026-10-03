import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { getLibrary } from '../api/client.js';
import LibraryCard from '../components/LibraryCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { SearchIcon } from '../components/Icons.jsx';

/** Searchable Disease & Pest Library. Filtering happens in the browser so
 *  typing feels instant; the API also supports ?search= for larger datasets. */
export default function Library() {
  const { t } = useI18n();
  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getLibrary()
      .then(setEntries)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      if (filter !== 'all' && e.type !== filter) return false;
      if (!q) return true;
      return [e.name, e.pathogen, e.summary, ...(e.affectedCrops || []), ...(e.symptoms || [])]
        .join(' ').toLowerCase().includes(q);
    });
  }, [entries, query, filter]);

  const tabs = [
    { key: 'all',     label: t('library.all') },
    { key: 'disease', label: t('library.diseases') },
    { key: 'pest',    label: t('library.pests') }
  ];

  return (
    <div className="container-page py-8 sm:py-12">
      <h1 className="section-title">{t('library.title')}</h1>
      <p className="mt-2 max-w-xl text-soil-600">{t('library.subtitle')}</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-soil-300" />
          <input
            className="input pl-11" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder={t('library.search')} type="search"
          />
        </div>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button key={tab.key} type="button" onClick={() => setFilter(tab.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === tab.key ? 'bg-leaf-700 text-white' : 'bg-white text-leaf-800 hover:bg-leaf-50'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="mt-8 text-soil-600">{t('common.loading')}</p>}
      {error && <p className="mt-8 text-clay-600">{error}</p>}

      {!loading && !error && (
        visible.length === 0
          ? <div className="mt-6"><EmptyState message={t('library.empty')} /></div>
          : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((e) => <LibraryCard key={e.key} entry={e} />)}
            </div>
          )
      )}
    </div>
  );
}
