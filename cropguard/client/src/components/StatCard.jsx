/** One number on the dashboard. */
export default function StatCard({ label, value, icon: Icon, tone = 'leaf' }) {
  const tones = {
    leaf:    'bg-leaf-50 text-leaf-700',
    harvest: 'bg-harvest-100 text-harvest-600',
    clay:    'bg-clay-100 text-clay-600',
    soil:    'bg-soil-100 text-soil-600'
  };

  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        {Icon && (
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}>
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div>
          <p className="text-2xl font-bold tabular-nums leading-none text-leaf-900">{value}</p>
          <p className="mt-1 text-sm text-soil-600">{label}</p>
        </div>
      </div>
    </div>
  );
}
