import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { cn } from '../../utils/cn';

const languages = [
  { code: 'en', name: 'English', label: 'English' },
  { code: 'hi', name: 'हिंदी', label: 'Hindi' },
  { code: 'mr', name: 'मराठी', label: 'Marathi' },
];

export const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
      <Globe size={14} className="ml-2 text-slate-500" />
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none pr-2 py-1 cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};
