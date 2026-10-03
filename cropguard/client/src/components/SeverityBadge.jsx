import { useI18n } from '../i18n/index.jsx';

/** Colour coding used everywhere severity appears. */
export const SEVERITY_STYLES = {
  Low:    { chip: 'bg-leaf-100 text-leaf-800',      bar: 'bg-leaf-500',    border: 'border-l-leaf-500' },
  Medium: { chip: 'bg-harvest-100 text-harvest-600', bar: 'bg-harvest-400', border: 'border-l-harvest-400' },
  High:   { chip: 'bg-clay-100 text-clay-600',       bar: 'bg-clay-400',    border: 'border-l-clay-400' }
};

export default function SeverityBadge({ level = 'Low', className = '' }) {
  const { t } = useI18n();
  const style = SEVERITY_STYLES[level] || SEVERITY_STYLES.Low;
  return <span className={`badge ${style.chip} ${className}`}>{t(`severity.${level}`)}</span>;
}
