import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';
import { Thermometer, Activity, Wind, Droplets, ClipboardList } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ScreeningScreenProps {
  patientName: string;
  onComplete: (data: any) => void;
  onBack: () => void;
}

export const ScreeningScreen: React.FC<ScreeningScreenProps> = ({
  patientName,
  onComplete,
  onBack,
}) => {
  const { t } = useTranslation();
  const [vitals, setVitals] = useState({
    bp: '',
    pulse: '',
    temp: '',
    spo2: '',
  });
  const [complaint, setComplaint] = useState('');

  const handleNext = () => {
    if (!vitals.bp || !vitals.pulse || !vitals.temp || !vitals.spo2) {
      alert('Please enter all vitals');
      return;
    }
    onComplete({ vitals, complaint });
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface max-w-md mx-auto shadow-2xl border-x border-slate-100 relative overflow-hidden">
      <header className="flex items-center justify-between px-4 py-4 bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
            <span className="text-xl">←</span>
          </button>
          <h1 className="text-lg font-bold text-slate-900">Patient Screening</h1>
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
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Screening in progress...</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 space-y-8">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={20} className="text-primary" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Vital Signs</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Blood Pressure</label>
              <div className="relative">
                <Input
                  placeholder="120/80"
                  value={vitals.bp}
                  onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
                  label=""
                  error=""
                  className="pl-10"
                />
                <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Pulse Rate</label>
              <div className="relative">
                <Input
                  placeholder="72 bpm"
                  type="number"
                  value={vitals.pulse}
                  onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })}
                  label=""
                  error=""
                  className="pl-10"
                />
                <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Temperature</label>
              <div className="relative">
                <Input
                  placeholder="98.6 °F"
                  type="number"
                  value={vitals.temp}
                  onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
                  label=""
                  error=""
                  className="pl-10"
                />
                <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">SpO2 (%)</label>
              <div className="relative">
                <Input
                  placeholder="98%"
                  type="number"
                  value={vitals.spo2}
                  onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })}
                  label=""
                  error=""
                  className="pl-10"
                />
                <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList size={20} className="text-primary" />
              <label className="text-sm font-bold text-slate-800">Chief Complaint</label>
            </div>
            <textarea
              className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm"
              rows={4}
              placeholder="Describe the patient's main symptoms and history..."
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-surface via-surface to-transparent">
        <Button className="w-full" size="lg" onClick={handleNext}>
          Proceed to Triage →
        </Button>
      </div>
    </div>
  );
};
