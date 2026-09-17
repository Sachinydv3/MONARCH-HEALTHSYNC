import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GenderSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  error?: string;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({
  label,
  value,
  onChange,
  options,
  error,
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full mb-4">
      <label className="text-sm font-medium text-slate-700 ml-1">
        {label}
      </label>
      <div className="flex p-1 bg-slate-100 rounded-2xl gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              'flex-1 py-2.5 text-sm font-medium rounded-xl transition-all duration-200',
              value === opt.value
                ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {error && (
        <p className="text-xs text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};
