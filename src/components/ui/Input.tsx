import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full mb-4">
      <label className="text-sm font-medium text-slate-700 ml-1">
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full px-4 py-3 bg-white border-2 rounded-xl outline-none transition-all duration-200',
            'border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10',
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : '',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};
