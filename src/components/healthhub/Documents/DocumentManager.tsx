import React, { useState } from 'react';
import { HealthDocument } from '../../../types/index';

interface DocumentCardProps {
  doc: HealthDocument;
  language: 'en' | 'hi';
  onToggleSummary: () => void;
  showSummary: boolean;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc, language, onToggleSummary, showSummary }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 truncate max-w-[150px]">{doc.fileName}</h4>
            <p className="text-xs text-slate-500">{doc.category}</p>
          </div>
        </div>
        <button
          onClick={onToggleSummary}
          className="text-xs font-medium text-blue-600 hover:text-blue-800"
        >
          {showSummary ? 'Hide' : 'Summary'}
        </button>
      </div>

      {showSummary && (
        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs leading-relaxed text-blue-900">
            {language === 'en' ? doc.aiSummaryEn : doc.aiSummaryHi}
          </p>
        </div>
      )}
    </div>
  );
};

interface DocumentManagerProps {
  documents: HealthDocument[];
  onUpload: (file: File, category: string) => Promise<void>;
}

export const DocumentManager: React.FC<DocumentManagerProps> = ({ documents, onUpload }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(new Set());

  const toggleDoc = (id: string) => {
    const next = new Set(expandedDocs);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpandedDocs(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setLanguage('en')}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md transition-all",
              language === 'en' ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"
            )}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md transition-all",
              language === 'hi' ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"
            )}
          >
            हिन्दी
          </button>
        </div>
        <button
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.onchange = async (e: any) => {
              const file = e.target.files[0];
              if (file) await onUpload(file, 'GENERAL');
            };
            input.click();
          }}
          className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          Upload Record
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map(doc => (
          <DocumentCard
            key={doc.id}
            doc={doc}
            language={language}
            showSummary={expandedDocs.has(doc.id)}
            onToggleSummary={() => toggleDoc(doc.id)}
          />
        ))}
      </div>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
