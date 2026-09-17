import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Users,
  ShieldCheck,
  BarChart3,
  HeartPulse,
  Globe,
  Smartphone,
  LayoutDashboard,
  AlertCircle,
  Phone
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Chatbot } from '../components/ui/Chatbot';
import { cn } from '../utils/cn';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-soft hover:shadow-md transition-all group">
    <div className="w-14 h-14 bg-primary-light text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </div>
);

export const LandingPage: React.FC<{ onEnterApp: (role: 'patient' | 'worker' | 'admin') => void }> = ({ onEnterApp }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-[#F7FBFF] font-sans">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">M</div>
          <span className="text-xl font-black text-[#0B2A6F] tracking-tight">MONARCH HEALTHSYNC</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full">
            <button
              onClick={() => changeLanguage('en')}
              className={cn("px-3 py-1 text-xs font-bold rounded-full transition-all", i18n.language === 'en' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700")}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage('mr')}
              className={cn("px-3 py-1 text-xs font-bold rounded-full transition-all", i18n.language === 'mr' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700")}
            >
              MR
            </button>
            <button
              onClick={() => changeLanguage('hi')}
              className={cn("px-3 py-1 text-xs font-bold rounded-full transition-all", i18n.language === 'hi' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700")}
            >
              HI
            </button>
          </div>
          <button className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">{t('landing.nav.about')}</button>
          <button className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">{t('landing.nav.government')}</button>
          <Button className="rounded-full px-6" onClick={() => onEnterApp('admin')}>{t('landing.nav.adminLogin')}</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light text-primary rounded-full text-xs font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t('landing.hero.badge')}
          </div>
          <h1 className="text-6xl font-black text-[#0B2A6F] leading-tight">
            {t('landing.hero.titlePart1')} <br />
            <span className="text-primary">{t('landing.hero.titlePart2')}</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
            {t('landing.hero.description')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="px-8 py-6 text-lg rounded-2xl shadow-lg shadow-primary/20" onClick={() => onEnterApp('patient')}>
              {t('landing.hero.patientApp')}
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-2xl border-2" onClick={() => onEnterApp('worker')}>
              {t('landing.hero.workerPortal')}
            </Button>
          </div>
          <div className="flex items-center gap-8 pt-8 border-t border-slate-200">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900">12K+</span>
              <span className="text-xs font-medium text-slate-500 uppercase">{t('landing.hero.stats.patients')}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900">87%</span>
              <span className="text-xs font-medium text-slate-500 uppercase">{t('landing.hero.stats.success')}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900">34m</span>
              <span className="text-xs font-medium text-slate-500 uppercase">{t('landing.hero.stats.waitTime')}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="relative grid grid-cols-2 gap-4">
            <div className="absolute -z-10 top-0 right-0 w-full h-full opacity-20">
               <img
                 src="/assets/hero-image.png"
                 alt="Healthcare Professional"
                 className="w-full h-full object-cover rounded-full"
               />
            </div>
            <div className="space-y-4 pt-12">
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 animate-in slide-in-from-left-8 duration-700">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <HeartPulse size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{t('landing.heroCards.smartScreening.title')}</h4>
                <p className="text-xs text-slate-500">{t('landing.heroCards.smartScreening.description')}</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 animate-in slide-in-from-left-8 duration-1000">
                <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{t('landing.heroCards.universalId.title')}</h4>
                <p className="text-xs text-slate-500">{t('landing.heroCards.universalId.description')}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 animate-in slide-in-from-right-8 duration-700">
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{t('landing.heroCards.mobileFirst.title')}</h4>
                <p className="text-xs text-slate-500">{t('landing.heroCards.mobileFirst.description')}</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 animate-in slide-in-from-right-8 duration-1000">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <LayoutDashboard size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{t('landing.heroCards.districtAdmin.title')}</h4>
                <p className="text-xs text-slate-500">{t('landing.heroCards.districtAdmin.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="bg-red-50 border-2 border-red-100 rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-200/30 rounded-full blur-3xl -mr-32 -mt-32" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-black uppercase tracking-wider">
                <AlertCircle size={14} />
                SOS Support
              </div>
              <h2 className="text-4xl font-black text-red-900 leading-tight">
                {t('landing.emergency.title')}
              </h2>
              <p className="text-red-700/80 text-lg">
                {t('landing.emergency.description')}
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-red-100 hover:border-red-300 transition-colors group">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <HeartPulse size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{t('landing.emergency.chronicSupport.title')}</h4>
                <p className="text-slate-500 mb-6">{t('landing.emergency.chronicSupport.description')}</p>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-4 font-bold" onClick={() => onEnterApp('patient')}>
                  {t('landing.emergency.buttonText')}
                </Button>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-red-100 hover:border-red-300 transition-colors group">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{t('landing.emergency.medicalEmergency.title')}</h4>
                <p className="text-slate-500 mb-6">{t('landing.emergency.medicalEmergency.description')}</p>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-4 font-bold" onClick={() => onEnterApp('patient')}>
                  {t('landing.emergency.buttonText')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-8 py-24 border-t border-slate-100">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-slate-900">{t('landing.features.title')}</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            {t('landing.features.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Users}
            title={t('landing.features.cards.peopleFirst.title')}
            description={t('landing.features.cards.peopleFirst.description')}
          />
          <FeatureCard
            icon={ShieldCheck}
            title={t('landing.features.cards.secureTrusted.title')}
            description={t('landing.features.cards.secureTrusted.description')}
          />
          <FeatureCard
            icon={BarChart3}
            title={t('landing.features.cards.dataDriven.title')}
            description={t('landing.features.cards.dataDriven.description')}
          />
        </div>
      </section>

      {/* Government Footer */}
      <footer className="bg-[#0B2A6F] text-white py-16">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary font-bold text-xl">M</div>
              <span className="text-xl font-black tracking-tight">MONARCH HEALTHSYNC</span>
            </div>
            <p className="text-blue-100 leading-relaxed opacity-80">
              {t('landing.footer.description')}
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-white/10 rounded-lg text-xs font-bold">{t('landing.footer.badges.abdm')}</div>
              <div className="px-4 py-2 bg-white/10 rounded-lg text-xs font-bold">{t('landing.footer.badges.fhir')}</div>
              <div className="px-4 py-2 bg-white/10 rounded-lg text-xs font-bold">{t('landing.footer.badges.govt')}</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 space-y-6">
            <h4 className="text-xl font-bold">{t('landing.footer.cta.title')}</h4>
            <div className="grid grid-cols-1 gap-4">
              <Button variant="outline" className="bg-white text-primary border-none py-6 rounded-2xl text-lg font-bold" onClick={() => onEnterApp('patient')}>
                {t('landing.footer.cta.patientExp')}
              </Button>
              <Button variant="outline" className="bg-white/20 text-white border-white/20 py-6 rounded-2xl text-lg font-bold" onClick={() => onEnterApp('worker')}>
                {t('landing.footer.cta.workerPortal')}
              </Button>
            </div>
          </div>
        </div>
      </footer>
      <Chatbot />
    </div>
  );
};
