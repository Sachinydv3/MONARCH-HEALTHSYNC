import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-slate-200 shadow-sm',
        className
      )}
      {...props}
    />
  );
};
