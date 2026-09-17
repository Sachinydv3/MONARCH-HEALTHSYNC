import React from 'react';
import { ChevronLeft, Signal } from 'lucide-react';
import { useConnectionStatus } from '../../hooks/teleconsultation/useConnectionStatus';

interface ConsultationHeaderProps {
  doctorName: string;
  specialization: string;
  timer: string;
  onBack: () => void;
}

export const ConsultationHeader: React.FC<ConsultationHeaderProps> = ({
  doctorName,
  specialization,
  timer,
  onBack,
}) => {
  const { label, color } = useConnectionStatus();

  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-start justify-between text-white">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-lg font-semibold leading-tight">{doctorName}</h1>
          <p className="text-xs text-slate-300 font-medium">{specialization}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-mono bg-black/30 px-2 py-0.5 rounded">
              {timer}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full">
          <div className={cn("w-2 h-2 rounded-full animate-pulse", color)} />
          <span className="text-xs font-medium">{label}</span>
        </div>
        <div className="flex gap-0.5 items-end h-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                "w-0.5 rounded-full bg-white/40",
                i <= 3 ? "h-full" : "h-1/2"
              )}
              style={{ height: `${i * 25}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper for tailwind classes
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
