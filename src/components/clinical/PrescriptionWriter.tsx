import React, { useState } from 'react';
import { Medication } from '../../types';
import { cn } from '../../utils/cn';

interface PrescriptionWriterProps {
  patientId: string;
  doctorId: string;
  onIssue: (meds: Medication[], notes: string, signed: boolean) => Promise<void>;
}

export const PrescriptionWriter: React.FC<PrescriptionWriterProps> = ({ patientId, doctorId, onIssue }) => {
  const [meds, setMeds] = useState<Medication[]>([]);
  const [notes, setNotes] = useState('');
  const [isSigning, setIsSigning] = useState(false);

  const addMedication = () => {
    setMeds([...meds, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const updateMed = (index: number, field: keyof Medication, value: string) => {
    const next = [...meds];
    next[index] = { ...next[index], [field]: value };
    setMeds(next);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900">Prescription Writer</h3>
        <button
          onClick={addMedication}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Medication
        </button>
      </div>

      <div className="space-y-4">
        {meds.map((med, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 relative group">
            <div className="md:col-span-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Medication</label>
              <input
                type="text"
                placeholder="e.g. Metformin"
                className="w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 outline-none"
                value={med.name}
                onChange={(e) => updateMed(idx, 'name', e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Dosage</label>
              <input
                type="text"
                placeholder="e.g. 500mg"
                className="w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 outline-none"
                value={med.dosage}
                onChange={(e) => updateMed(idx, 'dosage', e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Frequency</label>
              <input
                type="text"
                placeholder="e.g. Twice daily"
                className="w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 outline-none"
                value={med.frequency}
                onChange={(e) => updateMed(idx, 'frequency', e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Duration</label>
              <input
                type="text"
                placeholder="e.g. 30 days"
                className="w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 outline-none"
                value={med.duration}
                onChange={(e) => updateMed(idx, 'duration', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase">Clinical Notes</label>
        <textarea
          className="w-full p-3 text-sm border rounded-lg h-24 focus:ring-1 focus:ring-blue-500 outline-none"
          placeholder="Enter instructions, precautions, or follow-up plan..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="flex gap-3 pt-4 border-t border-slate-100">
        <button
          onClick={() => onIssue(meds, notes, false)}
          className="flex-1 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
        >
          Save as Draft
        </button>
        <button
          onClick={() => {
            setIsSigning(true);
            setTimeout(() => {
              onIssue(meds, notes, true);
              setIsSigning(false);
            }, 1000);
          }}
          className={cn(
            "flex-1 py-2 text-sm font-bold text-white rounded-lg shadow-sm transition-all",
            isSigning ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          )}
        >
          {isSigning ? 'Signing...' : 'Approve & Digitally Sign'}
        </button>
      </div>
    </div>
  );
};
