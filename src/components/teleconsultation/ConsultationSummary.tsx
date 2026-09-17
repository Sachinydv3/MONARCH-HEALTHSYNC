import React from 'react';
import { Button } from '../ui/Button';
import { CheckCircle2 } from 'lucide-react';

interface ConsultationSummaryProps {
  doctorName: string;
  patientName: string;
  duration: string;
  onClose: () => void;
}

export const ConsultationSummary: React.FC<ConsultationSummaryProps> = ({
  doctorName,
  patientName,
  duration,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-primary p-6 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold">Consultation Ended</h2>
          <p className="text-primary-light opacity-90">Session successfully completed</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-xs text-slate-500 block mb-1">Specialist</span>
              <span className="font-semibold text-slate-900">{doctorName}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-xs text-slate-500 block mb-1">Patient</span>
              <span className="font-semibold text-slate-900">{patientName}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-xs text-slate-500 block mb-1">Duration</span>
              <span className="font-semibold text-slate-900">{duration}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-xs text-slate-500 block mb-1">Status</span>
              <span className="font-semibold text-green-600">Synced</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={() => alert('Opening medical notes...')}>
              Add Clinical Notes
            </Button>
            <Button variant="outline" className="w-full" size="lg" onClick={onClose}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
