import React from 'react';
import { Button } from '../ui/Button';
import { AlertCircle, CheckCircle2, Info, Activity } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TriageScreenProps {
  patientName: string;
  vitals: any;
  onTriageComplete: (decision: 'PHC' | 'REFERRAL') => void;
  onBack: () => void;
}

export const TriageScreen: React.FC<TriageScreenProps> = ({
  patientName,
  vitals,
  onTriageComplete,
  onBack,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-surface max-w-md mx-auto shadow-2xl border-x border-slate-100 relative overflow-hidden">
      <header className="flex items-center justify-between px-4 py-4 bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
            <span className="text-xl">←</span>
          </button>
          <h1 className="text-lg font-bold text-slate-900">Digital Triage</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
          <span>A अ</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Patient Record</span>
          <h2 className="text-3xl font-bold text-slate-900">{patientName}</h2>
          <div className="mt-2 flex items-center gap-2 text-slate-500 text-sm">
            <Activity size={14} className="text-primary" />
            <span>Vitals analyzed by Monarch AI</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 space-y-8">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={20} className="text-primary" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Vitals Summary</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label: 'BP', value: vitals.bp, unit: '' },
              { label: 'Pulse', value: vitals.pulse, unit: ' bpm' },
              { label: 'Temp', value: vitals.temp, unit: ' °F' },
              { label: 'SpO2', value: vitals.spo2, unit: '%' },
            ].map((v, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:border-primary/30">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">{v.label}</span>
                <span className="text-lg font-bold text-slate-900">{v.value}{v.unit}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 mb-2">Triage Decision</h4>

            <button
              onClick={() => onTriageComplete('PHC')}
              className="w-full p-4 text-left bg-white border-2 border-slate-100 rounded-2xl hover:border-primary hover:shadow-md transition-all group active:scale-95"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-100 text-green-600 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                  <CheckCircle2 size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900">Routine Care</p>
                  <p className="text-xs text-slate-500 leading-relaxed">Manageable at the local PHC / Clinic. Schedule routine follow-up.</p>
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-primary" />
              </div>
            </button>

            <button
              onClick={() => onTriageComplete('REFERRAL')}
              className="w-full p-4 text-left bg-white border-2 border-slate-100 rounded-2xl hover:border-primary hover:shadow-md transition-all group active:scale-95"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                  <AlertCircle size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900">Refer to Specialist</p>
                  <p className="text-xs text-slate-500 leading-relaxed">Requires advanced diagnosis or cardiology expert intervention.</p>
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-primary" />
              </div>
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3">
          <Info size={20} className="text-blue-600 shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed font-medium">
            Digital triage is a support tool. Please ensure clinical judgment is applied before final referral.
          </p>
        </div>
      </div>
    </div>
  );
};

function ChevronRight({ size, className }: { size: number, className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>;
}
