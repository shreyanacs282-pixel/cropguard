import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/index.jsx';
import { getStats } from '../api/client.js';
import StatCard from '../components/StatCard.jsx';
import SeverityBadge, { SEVERITY_STYLES } from '../components/SeverityBadge.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { ChartIcon, LeafIcon, BugIcon, CheckIcon, AlertIcon, ClockIcon } from '../components/Icons.jsx';

export default function Dashboard() {
  const { t } = useI18n();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getStats().then(setStats).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="container-page py-12"><p className="text-clay-600">{error}</p></div>;
  if (!stats) return <div className="container-page py-12"><p className="text-soil-600">{t('common.loading')}</p></div>;

  const maxSeverity = Math.max(1, ...Object.values(stats.bySeverity || {}));

  return (
    <div className="container-page py-8 sm:py-12">
      <h1 className="section-title">{t('dash.title')}</h1>
      <p className="mt-2 text-soil-600">{t('dash.subtitle')}</p>

      {stats.total === 0 ? (
        <div className="mt-6">
          <EmptyState message={t('dash.empty')} actionLabel={t('home.cta')} actionTo="/analyze" />
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label={t('dash.total')}    value={stats.total}     icon={ChartIcon} />
            <StatCard label={t('dash.healthy')}  value={stats.healthy}   icon={CheckIcon} />
            <StatCard label={t('dash.diseases')} value={stats.diseases}  icon={LeafIcon}  tone="harvest" />
            <StatCard label={t('dash.pests')}    value={stats.pests}     icon={BugIcon}   tone="harvest" />
            <StatCard label={t('dash.high')}     value={stats.highSeverity} icon={AlertIcon} tone="clay" />
            <StatCard label={t('dash.avgConf')}  value={`${stats.averageConfidence}%`} icon={ClockIcon} tone="soil" />
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {/* Severity breakdown - a simple bar chart, no chart library needed. */}
            <section className="card-pad">
              <h2 className="mb-4 text-lg font-semibold text-leaf-900">{t('dash.severitySplit')}</h2>
              <div className="space-y-3">
                {['Low', 'Medium', 'High'].map((level) => {
                  const count = stats.bySeverity?.[level] || 0;
                  return (
                    <div key={level}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <SeverityBadge level={level} />
                        <span className="font-semibold tabular-nums text-leaf-900">{count}</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-soil-100">
                        <div className={`h-full rounded-full ${SEVERITY_STYLES[level].bar}`}
                             style={{ width: `${(count / maxSeverity) * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="card-pad">
              <h2 className="mb-4 text-lg font-semibold text-leaf-900">{t('dash.topCrops')}</h2>
              {stats.topCrops?.length ? (
                <ul className="space-y-2">
                  {stats.topCrops.map((c) => (
                    <li key={c.crop} className="flex items-center justify-between border-b border-leaf-50 pb-2 text-[15px]">
                      <span className="text-soil-900">{c.crop}</span>
                      <span className="font-semibold tabular-nums text-leaf-900">{c.count}</span>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-soil-600">{t('dash.empty')}</p>}
            </section>
          </div>

          <section className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-leaf-900">{t('dash.recent')}</h2>
              <Link to="/history" className="btn-ghost">{t('common.viewAll')}</Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {stats.recent.map((r) => (
                <div key={r._id} className="card flex items-center gap-3 p-3">
                  {r.thumbnail
                    ? <img src={r.thumbnail} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    : <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-leaf-50">
                        <LeafIcon className="h-5 w-5 text-leaf-400" />
                      </span>}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-leaf-900">{r.detection}</p>
                    <p className="truncate text-xs text-soil-600">{r.crop} · {r.confidence}%</p>
                  </div>
                  <SeverityBadge level={r.severity} className="text-xs" />
                </div>
              ))}
            </div>
          </section>

          <p className="mt-6 text-xs text-soil-600">
            Storage: {stats.storage === 'mongodb' ? 'MongoDB' : 'in-memory (restarting the server clears it)'}
          </p>
        </>
      )}
    </div>
  );
}
