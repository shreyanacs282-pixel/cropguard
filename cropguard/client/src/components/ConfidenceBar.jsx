import { useEffect, useState } from 'react';

/**
 * A labelled progress bar. Used for confidence and for the severity score,
 * because a number alone is hard to read at a glance.
 */
export default function ConfidenceBar({ value = 0, label, colorClass = 'bg-leaf-500' }) {
  const [width, setWidth] = useState(0);

  // Animate from zero on mount so the number is noticed.
  useEffect(() => {
    const id = requestAnimationFrame(() => setWidth(Math.max(0, Math.min(100, value))));
    return () => cancelAnimationFrame(id);
  }, [value]);

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm text-soil-600">{label}</span>
        <span className="text-xl font-bold tabular-nums text-leaf-900">{Math.round(value)}%</span>
      </div>
      <div
        className="h-2.5 overflow-hidden rounded-full bg-soil-100"
        role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100} aria-label={label}
      >
        <div className={`h-full rounded-full transition-all duration-700 ${colorClass}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
