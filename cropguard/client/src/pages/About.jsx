import { useI18n } from '../i18n/index.jsx';
import Disclaimer from '../components/Disclaimer.jsx';
import { PhoneIcon, BookIcon, LeafIcon } from '../components/Icons.jsx';

/** Educational section plus the "get agricultural help" contacts. */
export default function About() {
  const { t } = useI18n();

  const topics = [
    { q: t('about.q1'), a: t('about.a1') },
    { q: t('about.q2'), a: t('about.a2') },
    { q: t('about.q3'), a: t('about.a3') },
    { q: t('about.q4'), a: t('about.a4') },
    { q: t('about.q5'), a: t('about.a5') }
  ];

  const helpers = [
    { icon: PhoneIcon, title: t('expert.kisan.title'), text: t('expert.kisan.text'),
      action: t('expert.kisan.action'), href: 'tel:18001801551' },
    { icon: BookIcon, title: t('expert.kvk.title'), text: t('expert.kvk.text'),
      action: t('expert.kvk.action'), href: 'https://kvk.icar.gov.in/' },
    { icon: LeafIcon, title: t('expert.dept.title'), text: t('expert.dept.text'),
      action: t('expert.dept.action'), href: 'https://agriwelfare.gov.in/' }
  ];

  return (
    <div className="container-page py-8 sm:py-12">
      <h1 className="section-title">{t('about.title')}</h1>

      <div className="mt-6 space-y-4">
        {topics.map((topic) => (
          <details key={topic.q} className="card-pad group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-leaf-900">
              {topic.q}
              <span className="text-soil-300 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-prose leading-relaxed text-soil-900">{topic.a}</p>
          </details>
        ))}
      </div>

      <h2 className="section-title mt-14">{t('expert.title')}</h2>
      <p className="mt-2 max-w-xl text-soil-600">{t('expert.subtitle')}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {helpers.map((h) => (
          <div key={h.title} className="card-pad flex flex-col">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-50">
              <h.icon className="h-5 w-5 text-leaf-600" />
            </span>
            <h3 className="mt-4 font-semibold text-leaf-900">{h.title}</h3>
            <p className="mt-1 flex-1 text-[15px] leading-relaxed text-soil-600">{h.text}</p>
            <a href={h.href} target="_blank" rel="noreferrer" className="btn-outline mt-4 text-sm">
              {h.action}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </div>
  );
}
