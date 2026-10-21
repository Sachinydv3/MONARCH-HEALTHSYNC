import React from 'react';
import { Patient } from '../../../types/index';
import { cn } from '../../../utils/cn';

interface PatientProfileCardProps {
  patient: Patient;
  criticalInfo: {
    bloodGroup: string;
    allergies: string[];
    chronicConditions: string[];
  };
}

export const PatientProfileCard: React.FC<PatientProfileCardProps> = ({ patient, criticalInfo }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-6 items-start">
      <div className="flex-shrink-0">
        <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold">
          {patient.fullName.charAt(0)}
        </div>
      </div>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Identity</p>
          <h2 className="text-xl font-bold text-slate-900">{patient.fullName}</h2>
          <p className="text-sm text-slate-600">ABHA ID: {patient.abhaId || 'Not linked'}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Quick Vitals</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded border border-red-100">
              Blood Group: {criticalInfo.bloodGroup}
            </span>
            {criticalInfo.allergies.map((allergy, idx) => (
              <span key={idx} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded border border-amber-100">
                Allergy: {allergy}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Chronic Conditions</p>
          <div className="flex flex-wrap gap-2">
            {criticalInfo.chronicConditions.length > 0 ? (
              criticalInfo.chronicConditions.map((condition, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded border border-blue-100">
                  {condition}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">No chronic conditions recorded</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
