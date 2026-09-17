import React from 'react';
import { ChevronLeft, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface RegistrationHeaderProps {
  onBack: () => void;
}

export const RegistrationHeader: React.FC<RegistrationHeaderProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const languages = [
    { code: 'en', label: 'English', value: 'En' },
    { code: 'hi', label: 'हिन्दी', value: 'हि' },
    { code: 'mr', label: 'मराठी', value: 'म' },
  ];

  return (
    <header className="flex items-center justify-between px-4 py-4 bg-white border-b border-slate-100 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold text-slate-900">
          {t('registration.header.title')}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            // Cycle through languages for demo
            const nextLang = languages[(languages.findIndex(l => l.code === language) + 1) % languages.length].code as any;
            i18n.changeLanguage(nextLang);
          }}
          className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-700 text-xs font-medium"
        >
          <Languages size={14} />
          <span>
            {languages.find(l => l.code === language)?.value} {languages.find(l => l.code === language)?.value}
          </span>
        </button>
      </div>
    </header>
  );
};
