import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';
import { User, MapPin, AlertCircle, ChevronRight, Star } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ReferralScreenProps {
  patientName: string;
  onComplete: (referral: any) => void;
  onBack: () => void;
}

export const ReferralScreen: React.FC<ReferralScreenProps> = ({
  patientName,
  onComplete,
  onBack,
}) => {
  const { t } = useTranslation();
  const [specialist, setSpecialist] = useState('doc-1');
  const [facility, setFacility] = useState('fac-1');
  const [urgency, setUrgency] = useState('NORMAL');

  const specialists = [
    { id: 'doc-1', name: 'Dr. Priya Sharma', spec: 'Cardiology Specialist', rating: '4.9', availability: 'Available Today' },
    { id: 'doc-2', name: 'Dr. Amit Verma', spec: 'Neurology Specialist', rating: '4.7', availability: 'Available Tomorrow' },
    { id: 'doc-3', name: 'Dr. Sneha Patil', spec: 'Endocrinology Specialist', rating: '4.8', availability: 'Available in 2 days' },
  ];

  const facilities = [
    { id: 'fac-1', name: 'Pune District Hospital', distance: '4.2 km' },
    { id: 'fac-2', name: 'Kondgaon Rural Health Centre', distance: '1.1 km' },
    { id: 'fac-3', name: 'Maharashtra State Medical College', distance: '12.5 km' },
  ];

  const handleRefer = () => {
    onComplete({
      specialistId: specialist,
      facilityId: facility,
      urgency,
      patientName,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface max-w-md mx-auto shadow-2xl border-x border-slate-100 relative overflow-hidden">
      <header className="flex items-center justify-between px-4 py-4 bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
            <span className="text-xl">←</span>
          </button>
          <h1 className="text-lg font-bold text-slate-900">Specialist Referral</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
          <span>A अ</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Referring For</span>
          <h2 className="text-3xl font-bold text-slate-900">{patientName}</h2>
        </div>

        <div className="space-y-8">
          {/* Specialist Selection */}
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <User size={20} className="text-primary" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Select Specialist</h3>
            </div>
            <div className="space-y-3">
              {specialists.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSpecialist(doc.id)}
                  className={cn(
                    "w-full p-4 text-left rounded-2xl border-2 transition-all flex items-center gap-4 active:scale-95",
                    specialist === doc.id ? "border-primary bg-primary-light shadow-sm" : "border-slate-100 bg-white hover:border-slate-200"
                  )}
                >
                  <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    <img src={`https://i.pravatar.cc/150?u=${doc.id}`} alt={doc.name} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">{doc.name}</p>
                    <p className="text-xs text-slate-500">{doc.spec}</p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className="flex items-center gap-1 text-amber-600 font-bold text-xs">
                      <Star size={12} fill="currentColor" />
                      {doc.rating}
                    </div>
                    <p className="text-[10px] text-slate-400">{doc.availability}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Facility Selection */}
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={20} className="text-primary" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Target Facility</h3>
            </div>
            <div className="space-y-3">
              {facilities.map((fac) => (
                <button
                  key={fac.id}
                  onClick={() => setFacility(fac.id)}
                  className={cn(
                    "w-full p-4 text-left rounded-2xl border-2 transition-all flex items-center justify-between active:scale-95",
                    facility === fac.id ? "border-primary bg-primary-light shadow-sm" : "border-slate-100 bg-white hover:border-slate-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg transition-colors",
                      facility === fac.id ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                    )}>
                      <MapPin size={16} />
                    </div>
                    <p className="font-bold text-slate-900">{fac.name}</p>
                  </div>
                  <span className="text-xs font-medium text-slate-400">{fac.distance}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Urgency Selection */}
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={20} className="text-primary" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Urgency Level</h3>
            </div>
            <div className="flex gap-3">
              {['NORMAL', 'URGENT', 'EMERGENCY'].map((level) => (
                <button
                  key={level}
                  onClick={() => setUrgency(level)}
                  className={cn(
                    "flex-1 py-3 text-xs font-bold rounded-2xl border-2 transition-all active:scale-95",
                    urgency === level
                      ? "border-primary bg-primary text-white shadow-md"
                      : "border-slate-100 bg-white text-slate-500 hover:border-slate-200"
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-surface via-surface to-transparent">
        <Button className="w-full" size="lg" onClick={handleRefer}>
          Create Referral →
        </Button>
      </div>
    </div>
  );
};
