import React from 'react';
import { useTranslation } from 'react-i18next';

interface ReviewStepProps {
  formData: any;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ formData }) => {
  const { t } = useTranslation();

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <h3 className="text-lg font-bold text-slate-900">Review Registration</h3>
      <div className="bg-white rounded-2xl p-4 border border-slate-100 space-y-4 shadow-soft">
        <div className="space-y-2">
          <p className="text-xs font-bold text-primary uppercase tracking-wider">Basic Info</p>
          <div className="space-y-2 pl-2 border-l-2 border-slate-100">
            {[
              { label: t('registration.fields.fullName'), value: formData.fullName },
              { label: t('registration.fields.dob'), value: formData.dateOfBirth },
              { label: t('registration.fields.gender'), value: formData.gender },
              { label: t('registration.fields.mobileNumber'), value: formData.mobileNumber },
              { label: t('registration.fields.villageAddress'), value: formData.villageAddress },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-1 border-b border-slate-50 last:border-none">
                <span className="text-xs text-slate-500">{item.label}</span>
                <span className="text-sm font-bold text-slate-900 capitalize">{item.value || 'Not provided'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <p className="text-xs font-bold text-primary uppercase tracking-wider">Health Info</p>
          <div className="space-y-2 pl-2 border-l-2 border-slate-100">
            <div className="flex justify-between items-center py-1 border-b border-slate-50 last:border-none">
              <span className="text-xs text-slate-500">Chronic Diseases</span>
              <span className="text-sm font-bold text-slate-900">{formData.chronicDiseases.join(', ') || 'None'}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-50 last:border-none">
              <span className="text-xs text-slate-500">Allergies</span>
              <span className="text-sm font-bold text-slate-900">{formData.allergies || 'None'}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-50 last:border-none">
              <span className="text-xs text-slate-500">Medications</span>
              <span className="text-sm font-bold text-slate-900">{formData.currentMedications || 'None'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <p className="text-xs font-bold text-primary uppercase tracking-wider">Documents</p>
          <div className="space-y-2 pl-2 border-l-2 border-slate-100">
            {Object.entries(formData.documents).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-1 border-b border-slate-50 last:border-none">
                <span className="text-xs text-slate-500 capitalize">{key}</span>
                <span className="text-sm font-bold text-slate-900">{String(value) || 'Not uploaded'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
