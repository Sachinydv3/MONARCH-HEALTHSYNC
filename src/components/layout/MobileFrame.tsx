import React from 'react';
import { cn } from '../../utils/cn';

interface MobileFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "relative mx-auto w-[320px] h-[640px] bg-slate-900 rounded-[3.5rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-slate-800 ring-4 ring-slate-700/50",
      className
    )}>
      {/* Top Notch/Speaker Area */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-slate-800 rounded-b-3xl z-30 flex items-center justify-center">
        <div className="w-10 h-1 bg-slate-700 rounded-full" />
      </div>

      {/* Screen Content */}
      <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden shadow-inner border border-slate-900">
        {children}
      </div>
    </div>
  );
};
