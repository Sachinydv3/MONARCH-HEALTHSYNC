import React, { useState } from 'react';
import { BasicInfoStep } from './BasicInfoStep';
import { HealthInfoStep } from './HealthInfoStep';
import { DocumentsStep } from './DocumentsStep';
import { ReviewStep } from './ReviewStep';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

interface PatientRegistrationScreenProps {
  onComplete?: (data: any) => void;
}

export const PatientRegistrationScreen: React.FC<PatientRegistrationScreenProps> = ({
  onComplete,
}) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    villageAddress: '',
    chronicDiseases: [] as string[],
    allergies: '',
    currentMedications: '',
    smokingStatus: '',
    alcoholStatus: '',
    lastCheckupDate: '',
    documents: {
      aadhar: null as string | null,
      rationCard: null as string | null,
      other: null as string | null,
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleDisease = (disease: string) => {
    setFormData(prev => {
      const current = prev.chronicDiseases;
      const next = current.includes(disease)
        ? current.filter(d => d !== disease)
        : [...current, disease];
      return { ...prev, chronicDiseases: next };
    });
  };

  const updateDocument = (docType: string, fileName: string | null) => {
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [docType]: fileName }
    }));
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = t('registration.validation.required');
    if (!formData.dateOfBirth) newErrors.dateOfBirth = t('registration.validation.invalidDob');
    if (!formData.gender) newErrors.gender = t('registration.validation.missingGender');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    } else if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      alert(`Patient registered successfully!`);
      if (onComplete) {
        onComplete(formData);
      }
    }
  };

  const steps = [
    { id: 1, label: t('registration.steps.basicInfo') },
    { id: 2, label: t('registration.steps.healthInfo') },
    { id: 3, label: t('registration.steps.documents') },
    { id: 4, label: t('registration.steps.review') },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface max-w-md mx-auto shadow-2xl border-x border-slate-100 relative overflow-hidden">
      <header className="flex items-center justify-between px-4 py-4 bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
            <span className="text-xl">←</span>
          </button>
          <h1 className="text-lg font-bold text-slate-900">{t('registration.header.title')}</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
          <span className="flex items-center gap-1">A अ</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <div className="flex items-center justify-between w-full mb-10 relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-200 z-0" />
          <div
            className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-500 z-0"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((step, idx) => {
            const isActive = idx === currentStep - 1;
            const isCompleted = idx < currentStep - 1;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2",
                  isActive ? "bg-primary border-primary text-white scale-110 shadow-md" :
                  isCompleted ? "bg-primary border-primary text-white" :
                  "bg-white border-slate-300 text-slate-400"
                )}>
                  {isCompleted ? '✓' : step.id}
                </div>
                <span className={cn(
                  "text-[10px] font-medium text-center whitespace-nowrap",
                  isActive ? "text-primary font-bold" : "text-slate-500"
                )}>{step.label}</span>
              </div>
            );
          })}
        </div>

        <div className="space-y-6">
          {currentStep === 1 && (
            <BasicInfoStep
              formData={formData}
              updateField={updateField}
              errors={errors}
              setErrors={setErrors}
            />
          )}
          {currentStep === 2 && (
            <HealthInfoStep
              formData={formData}
              updateField={updateField}
              toggleDisease={toggleDisease}
            />
          )}
          {currentStep === 3 && (
            <DocumentsStep
              formData={formData}
              updateDocument={updateDocument}
            />
          )}
          {currentStep === 4 && (
            <ReviewStep formData={formData} />
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-surface via-surface to-transparent">
        <Button className="w-full" size="lg" onClick={handleNext}>
          {currentStep === 4 ? 'Confirm & Save' : 'Next →'}
        </Button>
      </div>
    </div>
  );
};
