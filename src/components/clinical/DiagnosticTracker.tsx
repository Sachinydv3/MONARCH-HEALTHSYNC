import React from 'react';
import { DiagnosticOrder } from '../../types';
import { cn } from '../../utils/cn';

interface DiagnosticTrackerProps {
  order: DiagnosticOrder;
}

export const DiagnosticTracker: React.FC<DiagnosticTrackerProps> = ({ order }) => {
  const statuses: DiagnosticOrder['status'][] = ['ORDERED', 'COLLECTED', 'COMPLETED'];

  const getCurrentIndex = () => {
    if (order.status === 'ORDERED') return 0;
    if (order.status === 'COLLECTED') return 1;
    if (order.status === 'COMPLETED') return 2;
    return -1;
  };

  const currentIndex = getCurrentIndex();

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-900">Diagnostic Tracking</h3>
        <span className={cn(
          "px-2 py-1 rounded text-[10px] font-bold uppercase text-white",
          order.status === 'COMPLETED' ? "bg-emerald-500" : "bg-blue-500"
        )}>
          {order.status}
        </span>
      </div>

      <div className="relative flex justify-between items-center">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
        />

        {statuses.map((status, idx) => (
          <div key={status} className="relative z-10 flex flex-col items-center gap-2">
            <div className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
              idx <= currentIndex
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-white border-slate-300 text-slate-400"
            )}>
              {idx < currentIndex ? (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.293V5a1 1 0 012 0v7.293l1.293-1.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="text-[10px] font-bold">{idx + 1}</span>
              )}
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-tight",
              idx <= currentIndex ? "text-blue-600" : "text-slate-400"
            )}>
              {status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded border border-slate-200 flex items-center justify-center text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">{order.testName}</p>
            <p className="text-[10px] text-slate-500">Ordered by Dr. Sharma</p>
          </div>
        </div>
        {order.status === 'COMPLETED' && (
          <button className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded hover:bg-blue-700 transition-colors">
            View Report
          </button>
        )}
      </div>
    </div>
  );
};
