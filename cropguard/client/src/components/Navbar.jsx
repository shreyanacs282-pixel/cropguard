import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useI18n } from '../i18n/index.jsx';
import LanguageSelector from './LanguageSelector.jsx';
import { LeafIcon, MenuIcon, XIcon } from './Icons.jsx';

const LINKS = [
  { to: '/',          key: 'nav.home' },
  { to: '/analyze',   key: 'nav.analyze' },
  { to: '/library',   key: 'nav.library' },
  { to: '/dashboard', key: 'nav.dashboard' },
  { to: '/history',   key: 'nav.history' },
  { to: '/about',     key: 'nav.about' }
];

export default function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-medium transition ${
      isActive ? 'bg-leaf-700 text-white' : 'text-leaf-800 hover:bg-leaf-50'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-leaf-100 bg-white/95 backdrop-blur">
      <nav className="container-page flex h-16 items-center gap-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <LeafIcon className="h-7 w-7 text-leaf-600" />
          <span className="text-lg font-bold tracking-tight text-leaf-900">{t('app.name')}</span>
        </Link>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              {t(l.key)}
            </NavLink>
          ))}
          <LanguageSelector className="ml-2" />
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <LanguageSelector />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="rounded-full p-2 text-leaf-800 hover:bg-leaf-50"
          >
            {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-leaf-100 bg-white lg:hidden">
          <div className="container-page grid gap-1 py-3">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-medium ${
                    isActive ? 'bg-leaf-700 text-white' : 'text-leaf-800 hover:bg-leaf-50'
                  }`
                }
              >
                {t(l.key)}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
