import React from 'react';
import { Calendar, MapPin, Phone } from 'lucide-react';
import { Input } from '../ui/Input';
import { GenderSelector } from '../ui/GenderSelector';
import { useTranslation } from 'react-i18next';

interface BasicInfoStepProps {
  formData: any;
  updateField: (field: string, value: any) => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  formData,
  updateField,
  errors,
  setErrors,
}) => {
  const { t } = useTranslation();

  const handleBlur = (field: string, value: string) => {
    let error = '';
    if (!value || value.trim() === '') {
      error = t('registration.validation.required');
    } else if (field === 'mobileNumber' && !/^[6-9]\d{9}$/.test(value)) {
      error = t('registration.validation.invalidPhone');
    }

    setErrors(prev => ({ ...prev, [field]: error }));
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-slate-900 mb-6 ml-1">
        {t('registration.sections.basicInformation')}
      </h2>

      <Input
        label={t('registration.fields.fullName')}
        placeholder={t('registration.fields.fullNamePlaceholder')}
        value={formData.fullName}
        onChange={(e) => updateField('fullName', e.target.value)}
        onBlur={(e) => handleBlur('fullName', e.target.value)}
        error={errors.fullName}
        required
      />

      <Input
        label={t('registration.fields.dob')}
        type="date"
        value={formData.dateOfBirth}
        onChange={(e) => updateField('dateOfBirth', e.target.value)}
        onBlur={(e) => handleBlur('dateOfBirth', e.target.value)}
        error={errors.dateOfBirth}
        icon={<Calendar size={18} />}
        required
      />

      <GenderSelector
        label={t('registration.fields.gender')}
        value={formData.gender}
        onChange={(val) => {
          updateField('gender', val);
          if (!val) setErrors(prev => ({ ...prev, gender: t('registration.validation.missingGender') }));
          else setErrors(prev => ({ ...prev, gender: '' }));
        }}
        options={[
          { label: t('registration.options.female'), value: 'female' },
          { label: t('registration.options.male'), value: 'male' },
          { label: t('registration.options.other'), value: 'other' },
        ]}
        error={errors.gender}
      />

      <Input
        label={t('registration.fields.mobileNumber')}
        type="tel"
        placeholder={t('registration.fields.mobileNumberPlaceholder')}
        value={formData.mobileNumber}
        onChange={(e) => updateField('mobileNumber', e.target.value)}
        onBlur={(e) => handleBlur('mobileNumber', e.target.value)}
        error={errors.mobileNumber}
        icon={<Phone size={18} />}
      />

      <Input
        label={t('registration.fields.villageAddress')}
        placeholder={t('registration.fields.villageAddressPlaceholder')}
        value={formData.villageAddress}
        onChange={(e) => updateField('villageAddress', e.target.value)}
        onBlur={(e) => handleBlur('villageAddress', e.target.value)}
        error={errors.villageAddress}
        icon={<MapPin size={18} />}
      />
    </div>
  );
};
