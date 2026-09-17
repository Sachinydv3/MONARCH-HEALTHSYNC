import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

interface DocumentsStepProps {
  formData: any;
  updateDocument: (docType: string, fileName: string | null) => void;
}

export const DocumentsStep: React.FC<DocumentsStepProps> = ({
  formData,
  updateDocument,
}) => {
  const { t } = useTranslation();

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6 ml-1">{t('registration.sections.documents')}</h2>

      <div className="space-y-4">
        {[
          { id: 'aadhar', label: 'Aadhar Card', icon: '🆔' },
          { id: 'rationCard', label: 'Ration Card', icon: '📄' },
          { id: 'other', label: 'Other Health IDs', icon: '🏥' },
        ].map(doc => (
          <div
            key={doc.id}
            className={cn(
              "p-4 rounded-2xl border-2 border-dashed transition-all flex items-center justify-between group",
              formData.documents[doc.id]
                ? "border-green-500 bg-green-50"
                : "border-slate-200 bg-white hover:border-primary"
            )}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{doc.icon}</span>
              <div>
                <p className="text-sm font-bold text-slate-800">{doc.label}</p>
                <p className="text-xs text-slate-500">
                  {formData.documents[doc.id]
                    ? formData.documents[doc.id]
                    : 'No file uploaded'}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                const fileName = `uploaded_${doc.id}_${Math.floor(Math.random()*1000)}.pdf`;
                updateDocument(doc.id, fileName);
              }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                formData.documents[doc.id]
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white"
              )}
            >
              {formData.documents[doc.id] ? 'Replace' : 'Upload'}
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
        <span className="text-amber-600">⚠️</span>
        <p className="text-xs text-amber-700 leading-relaxed">
          Documents are encrypted and stored securely according to ABDM guidelines.
          Only authorized doctors can access these records with patient consent.
        </p>
      </div>
    </div>
  );
};
