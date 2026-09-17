import React from 'react';
import { Calendar, FileText, Pill, ClipboardCheck, Bell, User, Home, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../ui/LanguageSelector';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  onClick?: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ icon, title, subtitle, color, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full p-4 bg-white border border-slate-100 rounded-2xl shadow-soft hover:bg-slate-50 transition-all active:scale-95 text-left"
  >
    <div className="flex items-center gap-4">
      <div className={cn("p-3 rounded-xl text-white shadow-sm", color)}>
        {icon}
      </div>
      <div className="text-left">
        <p className="font-bold text-slate-800 text-sm">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
    <div className="text-slate-300">
      <ChevronRight size={20} />
    </div>
  </button>
);

export const PatientHomeScreen: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-surface max-w-md mx-auto shadow-2xl border-x border-slate-100 relative overflow-hidden">
      {/* Top Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <span className="font-bold text-slate-900 text-sm">Monarch HealthSync</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600 relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf345f60?auto=format&fit=crop&q=80&w=100&h=100" alt="User" />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8 pb-24">
        {/* Greeting */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">{t('home.greeting')}</h2>
          <p className="text-slate-500 mt-1">{t('home.subtitle')}</p>
        </div>

        {/* Action Grid */}
        <div className="space-y-4">
          <ActionCard
            icon={<Calendar size={20} />}
            title={t('home.bookAppointment')}
            subtitle={t('home.bookAppointmentSubtitle')}
            color="bg-blue-500"
            onClick={() => onNavigate('appointments')}
          />
          <ActionCard
            icon={<FileText size={20} />}
            title={t('home.viewRecords')}
            subtitle={t('home.viewRecordsSubtitle')}
            color="bg-teal-500"
            onClick={() => onNavigate('records')}
          />
          <ActionCard
            icon={<Pill size={20} />}
            title={t('home.medicineAvailability')}
            subtitle={t('home.medicineAvailabilitySubtitle')}
            color="bg-indigo-500"
            onClick={() => onNavigate('pharmacy')}
          />
          <ActionCard
            icon={<ClipboardCheck size={20} />}
            title={t('home.trackReports')}
            subtitle={t('home.trackReportsSubtitle')}
            color="bg-amber-500"
            onClick={() => onNavigate('reports')}
          />
          <ActionCard
            icon={<Bell size={20} />}
            title={t('home.reminders')}
            subtitle={t('home.remindersSubtitle')}
            color="bg-rose-500"
            onClick={() => onNavigate('reminders')}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex items-center justify-between z-20">
        <NavItem icon={<Home size={20} />} label={t('home.navHome')} active />
        <NavItem icon={<BookOpen size={20} />} label={t('home.navRecords')} />
        <NavItem icon={<Calendar size={20} />} label={t('home.navAppointments')} />
        <NavItem icon={<User size={20} />} label={t('home.navProfile')} />
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <button className={cn(
    "flex flex-col items-center gap-1 transition-colors",
    active ? "text-primary" : "text-slate-400 hover:text-slate-600"
  )}>
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);
