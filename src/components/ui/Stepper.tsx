import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Check } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Step {
  label: string;
  id: number;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full px-2 py-6 relative">
      {/* Progress Line Background */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

      {/* Active Progress Line */}
      <div
        className="absolute top-1/2 left-0 h-0.5 bg-primary transition-all duration-500 -translate-y-1/2 z-0"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />

      {steps.map((step, index) => {
        const isCompleted = index < currentStep - 1;
        const isActive = index === currentStep - 1;

        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                isCompleted
                  ? 'bg-primary text-white'
                  : isActive
                    ? 'bg-white border-2 border-primary text-primary ring-4 ring-primary/10 scale-110'
                    : 'bg-white border-2 border-slate-200 text-slate-400'
              )}
            >
              {isCompleted ? <Check size={14} strokeWidth={3} /> : step.id}
            </div>
            <span className={cn(
              'text-[10px] font-medium uppercase tracking-wider text-center max-w-[60px]',
              isActive ? 'text-primary' : 'text-slate-500'
            )}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
