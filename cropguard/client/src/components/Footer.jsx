import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/index.jsx';
import { LeafIcon } from './Icons.jsx';
import Disclaimer from './Disclaimer.jsx';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-16 border-t border-leaf-100 bg-white">
      <div className="container-page py-10">
        <Disclaimer compact />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <LeafIcon className="h-6 w-6 text-leaf-600" />
            <div>
              <p className="font-bold text-leaf-900">{t('app.name')}</p>
              <p className="text-xs text-soil-600">{t('app.tagline')}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-soil-600">
            <Link to="/analyze" className="hover:text-leaf-700">{t('nav.analyze')}</Link>
            <Link to="/library" className="hover:text-leaf-700">{t('nav.library')}</Link>
            <Link to="/about" className="hover:text-leaf-700">{t('nav.about')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
