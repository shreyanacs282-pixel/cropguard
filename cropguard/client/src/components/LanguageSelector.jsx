import { useI18n } from '../i18n/index.jsx';
import { GlobeIcon } from './Icons.jsx';

/** Language dropdown. Adding a language to i18n/index.jsx adds it here too. */
export default function LanguageSelector({ className = '' }) {
  const { lang, setLang, languages, t } = useI18n();

  return (
    <label className={`inline-flex items-center gap-2 ${className}`}>
      <GlobeIcon className="h-5 w-5 text-leaf-600" />
      <span className="sr-only">{t('common.language')}</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="rounded-full border border-leaf-100 bg-white px-3 py-1.5 text-sm font-medium text-leaf-800 focus:border-leaf-400 focus:outline-none"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
    </label>
  );
}
