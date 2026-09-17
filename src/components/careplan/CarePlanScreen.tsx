import React, { useState } from 'react';
import { Pill, Activity, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface CarePlanScreenProps {
  patientName: string;
  onBack: () => void;
}

export const CarePlanScreen: React.FC<CarePlanScreenProps> = ({
  patientName,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'meds' | 'diag' | 'follow'>('meds');

  return (
    <div className="min-h-screen flex flex-col bg-surface max-w-md mx-auto shadow-2xl border-x border-slate-100 relative overflow-hidden">
      <header className="flex items-center px-4 py-4 bg-white border-b border-slate-100 sticky top-0 z-20">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 mr-3">
          <span className="text-xl">←</span>
        </button>
        <h1 className="text-lg font-semibold text-slate-900">Care Plan</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">{patientName}</h2>
          <p className="text-slate-500 text-sm">Recovery Roadmap & Treatment Plan</p>
        </div>

        {/* Progress Card */}
        <div className="bg-primary p-6 rounded-3xl text-white shadow-lg mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-primary-light text-xs font-bold uppercase tracking-widest mb-2">Overall Progress</p>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-bold">65%</span>
              <span className="text-primary-light text-sm mb-1">Completed</span>
            </div>
            <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
              <div className="bg-white h-full w-[65%] rounded-full shadow-inner" />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-slate-200/50 rounded-2xl gap-1 mb-6">
          <button
            onClick={() => setActiveTab('meds')}
            className={cn(
              "flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2",
              activeTab === 'meds' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Pill size={14} /> Medicine
          </button>
          <button
            onClick={() => setActiveTab('diag')}
            className={cn(
              "flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2",
              activeTab === 'diag' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Activity size={14} /> Diagnostics
          </button>
          <button
            onClick={() => setActiveTab('follow')}
            className={cn(
              "flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2",
              activeTab === 'follow' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Calendar size={14} /> Follow-up
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 'meds' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <MedicationCard
                name="Amlodipine"
                dosage="5mg"
                frequency="Once Daily (Morning)"
                duration="30 Days"
                status="active"
              />
              <MedicationCard
                name="Atorvastatin"
                dosage="20mg"
                frequency="Once Daily (Night)"
                duration="30 Days"
                status="active"
              />
              <MedicationCard
                name="Aspirin"
                dosage="75mg"
                frequency="Once Daily"
                duration="Permanent"
                status="completed"
              />
            </div>
          )}

          {activeTab === 'diag' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <DiagnosticCard
                test="ECG (Electrocardiogram)"
                date="2026-09-15"
                status="Pending"
                priority="Urgent"
              />
              <DiagnosticCard
                test="Lipid Profile"
                date="2026-09-20"
                status="Completed"
                priority="Normal"
              />
              <DiagnosticCard
                test="Chest X-Ray"
                date="2026-09-15"
                status="Pending"
                priority="Normal"
              />
            </div>
          )}

          {activeTab === 'follow' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-light text-primary rounded-xl">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Next Specialist Visit</p>
                    <p className="text-xs text-slate-500">Oct 12, 2026 • 10:30 AM</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Reschedule</Button>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
                <AlertCircle size={20} className="text-amber-600 shrink-0" />
                <p className="text-xs text-amber-700">Reminder: Please maintain a fasting state for 12 hours before your next blood test.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-surface via-surface to-transparent">
        <Button className="w-full" size="lg" onClick={() => alert('Opening full medical record...')}>
          View Complete Health Record →
        </Button>
      </div>
    </div>
  );
};

const MedicationCard: React.FC<{ name: string; dosage: string; frequency: string; duration: string; status: 'active' | 'completed' }> = ({
  name, dosage, frequency, duration, status,
}) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className={cn(
        "p-3 rounded-xl",
        status === 'active' ? "bg-primary-light text-primary" : "bg-slate-100 text-slate-400"
      )}>
        <Pill size={20} />
      </div>
      <div>
        <p className="font-bold text-slate-900">{name} <span className="text-slate-400 font-normal text-xs">{dosage}</span></p>
        <p className="text-xs text-slate-500">{frequency} • {duration}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      {status === 'active' ? (
        <input type="checkbox" className="w-5 h-5 rounded-full border-slate-300 text-primary focus:ring-primary" />
      ) : (
        <CheckCircle2 size={20} className="text-green-500" />
      )}
    </div>
  </div>
);

const DiagnosticCard: React.FC<{ test: string; date: string; status: string; priority: string }> = ({
  test, date, status, priority,
}) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className={cn(
        "p-3 rounded-xl",
        priority === 'Urgent' ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
      )}>
        <Activity size={20} />
      </div>
      <div>
        <p className="font-bold text-slate-900">{test}</p>
        <p className="text-xs text-slate-500">Scheduled: {date}</p>
      </div>
    </div>
    <span className={cn(
      "text-[10px] font-bold px-2 py-1 rounded-full uppercase",
      status === 'Completed' ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-500"
    )}>
      {status}
    </span>
  </div>
);

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
