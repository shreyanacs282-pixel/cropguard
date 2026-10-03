import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/index.jsx';
import Disclaimer from '../components/Disclaimer.jsx';
import { LeafIcon, CameraIcon, ChartIcon, ClockIcon, BookIcon, CheckIcon } from '../components/Icons.jsx';

export default function Home() {
  const { t } = useI18n();

  const steps = [
    { icon: CameraIcon, title: t('home.step1.title'), text: t('home.step1.text') },
    { icon: LeafIcon,   title: t('home.step2.title'), text: t('home.step2.text') },
    { icon: CheckIcon,  title: t('home.step3.title'), text: t('home.step3.text') }
  ];

  const features = [
    { icon: ClockIcon, title: t('home.f1.title'), text: t('home.f1.text') },
    { icon: BookIcon,  title: t('home.f2.title'), text: t('home.f2.text') },
    { icon: CameraIcon,title: t('home.f3.title'), text: t('home.f3.text') },
    { icon: ChartIcon, title: t('home.f4.title'), text: t('home.f4.text') }
  ];

  return (
    <div>
      {/* ---------------------------- HERO ---------------------------- */}
      <section className="relative overflow-hidden bg-leaf-800 text-white">
        {/* A simple field-and-sun illustration drawn in SVG - no image files needed. */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" viewBox="0 0 800 400"
             preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle cx="670" cy="80" r="52" fill="#E8B33C" />
          <path d="M0 300 Q200 240 400 300 T800 290 L800 400 L0 400Z" fill="#1B3517" />
          <path d="M0 330 Q220 280 430 335 T800 325 L800 400 L0 400Z" fill="#23471E" />
          {Array.from({ length: 16 }).map((_, i) => (
            <path key={i} d={`M${30 + i * 50} 400 C${30 + i * 50} 350 ${10 + i * 50} 340 ${20 + i * 50} 310`}
                  stroke="#92C07E" strokeWidth="3" fill="none" />
          ))}
        </svg>

        <div className="container-page relative py-16 sm:py-24">
          <span className="badge bg-white/15 text-leaf-50">
            <LeafIcon className="h-4 w-4" /> {t('app.tagline')}
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {t('home.title')}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-leaf-100">{t('home.intro')}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/analyze" className="btn bg-white text-leaf-800 hover:bg-leaf-50">
              <CameraIcon className="h-5 w-5" /> {t('home.cta')}
            </Link>
            <Link to="/about" className="btn border border-white/40 text-white hover:bg-white/10">
              {t('home.learn')}
            </Link>
          </div>
        </div>
      </section>

      <div className="container-page py-12 sm:py-16">
        {/* --------------------------- STEPS --------------------------- */}
        <h2 className="section-title">{t('home.stepsTitle')}</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="card-pad">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf-100 font-bold text-leaf-800">
                  {i + 1}
                </span>
                <s.icon className="h-6 w-6 text-leaf-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-leaf-900">{s.title}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-soil-600">{s.text}</p>
            </li>
          ))}
        </ol>

        {/* ------------------------- FEATURES -------------------------- */}
        <h2 className="section-title mt-14">{t('home.featuresTitle')}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="card-pad flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-50">
                <f.icon className="h-5 w-5 text-leaf-600" />
              </span>
              <div>
                <h3 className="font-semibold text-leaf-900">{f.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-soil-600">{f.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}
