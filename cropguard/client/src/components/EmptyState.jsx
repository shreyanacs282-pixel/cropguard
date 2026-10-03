import { Link } from 'react-router-dom';
import { LeafIcon } from './Icons.jsx';

/** Shown wherever there is no data yet. An empty screen should invite action. */
export default function EmptyState({ message, actionLabel, actionTo }) {
  return (
    <div className="card flex flex-col items-center gap-3 px-6 py-12 text-center">
      <LeafIcon className="h-10 w-10 text-leaf-300" />
      <p className="max-w-sm text-soil-600">{message}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn-primary mt-2">{actionLabel}</Link>
      )}
    </div>
  );
}
