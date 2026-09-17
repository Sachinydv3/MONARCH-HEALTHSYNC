import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/Input';
import { cn } from '../../utils/cn';

interface HealthInfoStepProps {
  formData: any;
  updateField: (field: string, value: any) => void;
  toggleDisease: (disease: string) => void;
}

export const HealthInfoStep: React.FC<HealthInfoStepProps> = ({
  formData,
  updateField,
  toggleDisease,
}) => {
  const { t } = useTranslation();

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6 ml-1">{t('registration.sections.healthInformation')}</h2>

      <div className="space-y-4">
        <label className="block text-sm font-bold text-slate-700 mb-2">Chronic Diseases</label>
        <div className="flex flex-wrap gap-2">
          {['Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Kidney Disease', 'None'].map(disease => (
            <button
              key={disease}
              onClick={() => toggleDisease(disease)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-medium transition-all border",
                formData.chronicDiseases.includes(disease)
                  ? "bg-primary text-white border-primary shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:border-primary"
              )}
            >
              {disease}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Allergies"
          placeholder="None or specify allergies..."
          value={formData.allergies}
          onChange={(e) => updateField('allergies', e.target.value)}
        />
        <Input
          label="Current Medications"
          placeholder="List currently taking medicines..."
          value={formData.currentMedications}
          onChange={(e) => updateField('currentMedications', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700">Smoking</label>
          <select
            className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
            value={formData.smokingStatus}
            onChange={(e) => updateField('smokingStatus', e.target.value)}
          >
            <option value="">Select</option>
            <option value="never">Never</option>
            <option value="former">Former</option>
            <option value="current">Current</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700">Alcohol</label>
          <select
            className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
            value={formData.alcoholStatus}
            onChange={(e) => updateField('alcoholStatus', e.target.value)}
          >
            <option value="">Select</option>
            <option value="never">Never</option>
            <option value="occasional">Occasional</option>
            <option value="regular">Regular</option>
          </select>
        </div>
      </div>

      <Input
        label="Last Health Checkup Date"
        type="date"
        value={formData.lastCheckupDate}
        onChange={(e) => updateField('lastCheckupDate', e.target.value)}
      />
    </div>
  );
};
